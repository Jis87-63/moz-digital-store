// Gibrapay payment integration for Moz Store Digital
export const GIBRAPAY_CONFIG = {
  AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQxMmFmYWNhLWVhNDctNGNkZS04NmJlLWJlMDM5Mzc2OTczMiIsImVtYWlsIjoienVuaWFtdW5pcjMwQGdtYWlsLmNvbSIsImlhdCI6MTc1Njk5MTk0MiwiZXhwIjoxNzU2OTk1NTQyfQ.7KFXSdhTEG1NkyyATa7sL256TUb_t2T_oqh3TVHdabc",
  WALLET_ID: "50c282d1-843f-4b9c-a287-2140e9e8d94b",
  API_KEY: "b3b33cba8a903626a015d592754f1dcec756e9fbb12d411516f4a79b04aba8923ebb6396da29e61c899154ab005aaf056961b819c263e1ec5d88c60b9cae6aba",
  BASE_URL: "https://gibrapay.online/api"
};

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customer_phone: string;
  callback_url?: string;
}

export interface PaymentResponse {
  status: string;
  transaction_id: string;
  payment_url?: string;
  message: string;
}

export const createPayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${GIBRAPAY_CONFIG.BASE_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GIBRAPAY_CONFIG.AUTH_TOKEN}`,
        'X-API-Key': GIBRAPAY_CONFIG.API_KEY,
        'X-Wallet-ID': GIBRAPAY_CONFIG.WALLET_ID
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro no pagamento');
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (transactionId: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${GIBRAPAY_CONFIG.BASE_URL}/payment/status/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GIBRAPAY_CONFIG.AUTH_TOKEN}`,
        'X-API-Key': GIBRAPAY_CONFIG.API_KEY,
        'X-Wallet-ID': GIBRAPAY_CONFIG.WALLET_ID
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao verificar status do pagamento');
    }

    return data;
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw error;
  }
};