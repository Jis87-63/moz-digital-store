export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gradient mb-8 text-center">Termos de Uso</h1>
        <div className="bg-card rounded-xl p-8 shadow-elegant">
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Aceitação dos Termos</h2>
              <p className="leading-relaxed">
                Ao acessar e usar a Moz Store Digital, você concorda em cumprir estes termos de uso. 
                Se não concordar com qualquer parte destes termos, não use nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Descrição do Serviço</h2>
              <p className="leading-relaxed">
                A Moz Store Digital é uma plataforma de venda de produtos digitais incluindo ebooks, 
                jogos, recargas, contas PayPal e serviços de streaming para o mercado moçambicano.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Contas de Usuário</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Você deve fornecer informações precisas e atualizadas ao criar sua conta</li>
                <li>É responsável por manter a segurança de sua conta e senha</li>
                <li>Não pode compartilhar sua conta com terceiros</li>
                <li>Deve ter pelo menos 18 anos ou consentimento dos pais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Produtos e Pagamentos</h2>
              <p className="leading-relaxed mb-4">
                Todos os preços estão em Meticais (MZN) e incluem impostos aplicáveis. 
                Aceitamos pagamentos via Gibrapay (M-Pesa, E-Mola).
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Os produtos digitais são entregues imediatamente após confirmação do pagamento</li>
                <li>Links de download são válidos por tempo limitado</li>
                <li>Preços podem ser alterados sem aviso prévio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Política de Reembolso</h2>
              <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-primary mb-2">Reembolso em 24 Horas</p>
                <p className="leading-relaxed">
                  Oferecemos reembolso integral para produtos digitais defeituosos ou não entregues 
                  dentro de 24 horas após a compra. Após este período, não são aceitos reembolsos 
                  devido à natureza digital dos produtos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Propriedade Intelectual</h2>
              <p className="leading-relaxed">
                Todos os produtos vendidos mantêm seus direitos autorais originais. A compra concede 
                apenas licença de uso pessoal, não transferindo direitos de propriedade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Proibições</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Revenda ou distribuição dos produtos adquiridos</li>
                <li>Uso de métodos de pagamento fraudulentos</li>
                <li>Tentativas de hack ou acesso não autorizado</li>
                <li>Violação de direitos autorais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Limitação de Responsabilidade</h2>
              <p className="leading-relaxed">
                A Moz Store Digital não se responsabiliza por danos indiretos decorrentes do uso 
                dos produtos. Nossa responsabilidade limita-se ao valor pago pelo produto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Alterações nos Termos</h2>
              <p className="leading-relaxed">
                Reservamo-nos o direito de alterar estes termos a qualquer momento. 
                Alterações entram em vigor imediatamente após publicação no site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">10. Contato</h2>
              <div className="bg-muted rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> mozstoredigitalp2@gmail.com</p>
                <p className="mb-2"><strong>Telefone:</strong> +258 87 650 685</p>
                <p><strong>Telegram:</strong> t.me/EllonMuskDev</p>
              </div>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-8 pt-4 border-t">
                <strong>Última atualização:</strong> Janeiro 2025<br/>
                <strong>Lei aplicável:</strong> República de Moçambique
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};