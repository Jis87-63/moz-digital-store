export const License = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gradient mb-8 text-center">Licença de Uso</h1>
        <div className="bg-card rounded-xl p-8 shadow-elegant">
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Direitos Autorais</h2>
              <p className="text-lg leading-relaxed">
                © 2025 Moz Store Digital. Todos os direitos reservados. Este site e todo o seu conteúdo, 
                incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais 
                e compilações de dados, são propriedade da Moz Store Digital.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Licença de Uso</h2>
              <p className="leading-relaxed mb-4">
                Esta licença concede ao usuário os seguintes direitos limitados:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Uso pessoal e não comercial dos produtos digitais adquiridos</li>
                <li>Download e armazenamento local dos produtos comprados</li>
                <li>Acesso aos produtos enquanto a conta estiver ativa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Restrições</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proibida a redistribuição, venda ou compartilhamento dos produtos</li>
                <li>Vedada a engenharia reversa ou modificação dos produtos</li>
                <li>Uso comercial requer licença específica</li>
                <li>Violação dos termos resulta em cancelamento imediato da licença</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Jurisdição</h2>
              <p className="leading-relaxed">
                Esta licença é válida exclusivamente para uso em território moçambicano e está 
                sujeita às leis da República de Moçambique. Qualquer disputa será resolvida 
                nos tribunais competentes de Moçambique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Contato</h2>
              <div className="bg-muted rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> mozstoredigitalp2@gmail.com</p>
                <p className="mb-2"><strong>Telefone:</strong> +258 87 650 685</p>
                <p><strong>Telegram:</strong> t.me/EllonMuskDev</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};