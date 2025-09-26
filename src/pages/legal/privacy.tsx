export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gradient mb-8 text-center">Política de Privacidade</h1>
        <div className="bg-card rounded-xl p-8 shadow-elegant">
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Informações que Coletamos</h2>
              <p className="leading-relaxed mb-4">
                A Moz Store Digital coleta as seguintes informações:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informações de conta:</strong> nome de usuário, email, número de telefone</li>
                <li><strong>Informações de pagamento:</strong> dados de transação via Gibrapay</li>
                <li><strong>Informações de uso:</strong> produtos visualizados, compras realizadas</li>
                <li><strong>Informações técnicas:</strong> endereço IP, tipo de dispositivo, navegador</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Como Usamos suas Informações</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processar e entregar produtos digitais comprados</li>
                <li>Gerenciar sua conta e fornecer suporte ao cliente</li>
                <li>Enviar confirmações de pedidos e atualizações importantes</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Prevenir fraudes e garantir segurança</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Compartilhamento de Informações</h2>
              <p className="leading-relaxed mb-4">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Com provedores de pagamento (Gibrapay) para processar transações</li>
                <li>Com autoridades legais quando exigido por lei</li>
                <li>Para proteger nossos direitos, propriedade ou segurança</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Segurança dos Dados</h2>
              <p className="leading-relaxed">
                Utilizamos medidas de segurança apropriadas para proteger suas informações, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Criptografia SSL/TLS para transmissão de dados</li>
                <li>Autenticação Firebase para gerenciamento seguro de contas</li>
                <li>Monitoramento regular de segurança</li>
                <li>Acesso restrito aos dados pessoais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Cookies e Tecnologias Similares</h2>
              <p className="leading-relaxed">
                Usamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Manter você conectado à sua conta</li>
                <li>Lembrar suas preferências (tema, idioma)</li>
                <li>Analisar o uso do site para melhorias</li>
                <li>Personalizar sua experiência de compra</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Seus Direitos</h2>
              <p className="leading-relaxed mb-4">
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Acesso:</strong> solicitar cópia dos seus dados</li>
                <li><strong>Correção:</strong> atualizar informações incorretas</li>
                <li><strong>Exclusão:</strong> solicitar remoção da sua conta</li>
                <li><strong>Portabilidade:</strong> receber seus dados em formato legível</li>
                <li><strong>Oposição:</strong> opor-se ao processamento de seus dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Retenção de Dados</h2>
              <p className="leading-relaxed">
                Mantemos suas informações pessoais apenas pelo tempo necessário para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Fornecer nossos serviços</li>
                <li>Cumprir obrigações legais (registros fiscais por 5 anos)</li>
                <li>Resolver disputas e fazer cumprir acordos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Menores de Idade</h2>
              <p className="leading-relaxed">
                Nossos serviços são destinados a pessoas com 18 anos ou mais. Não coletamos 
                intencionalmente informações de menores de 18 anos sem consentimento dos pais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Alterações nesta Política</h2>
              <p className="leading-relaxed">
                Podemos atualizar esta política periodicamente. Alterações significativas serão 
                comunicadas por email ou notificação no site com 30 dias de antecedência.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">10. Contato</h2>
              <p className="leading-relaxed mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
              </p>
              <div className="bg-muted rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> mozstoredigitalp2@gmail.com</p>
                <p className="mb-2"><strong>Telefone:</strong> +258 87 650 685</p>
                <p><strong>Telegram:</strong> t.me/EllonMuskDev</p>
              </div>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-8 pt-4 border-t">
                <strong>Última atualização:</strong> Janeiro 2025<br/>
                <strong>Lei aplicável:</strong> Lei de Proteção de Dados de Moçambique
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};