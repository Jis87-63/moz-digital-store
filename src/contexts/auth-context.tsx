import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getUserData = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  };

  const createUserData = async (firebaseUser: FirebaseUser, additionalData: any) => {
    const userData: User = {
      uid: firebaseUser.uid,
      username: additionalData.username || firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      phone: additionalData.phone || '',
      createdAt: new Date(),
      isAdmin: false
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    return userData;
  };

  const register = async (userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      await updateProfile(user, {
        displayName: userData.username
      });

      const newUser = await createUserData(user, userData);
      setCurrentUser(newUser);
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à Moz Store Digital",
      });
    } catch (error: any) {
      let message = "Erro ao criar conta";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = "Este email já está em uso";
          break;
        case 'auth/weak-password':
          message = "A senha deve ter pelo menos 6 caracteres";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
      }
      
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: message,
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta",
      });
    } catch (error: any) {
      let message = "Erro ao fazer login";
      
      switch (error.code) {
        case 'auth/user-not-found':
          message = "Usuário não encontrado";
          break;
        case 'auth/wrong-password':
          message = "Senha incorreta";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
      }
      
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Tente novamente",
      });
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        const userData = await getUserData(user.uid);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    firebaseUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};