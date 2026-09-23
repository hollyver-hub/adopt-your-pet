import '../styles/step-step.css';

export function Steps() {
  return (
    <section id="passos" className="steps-section">
      <div className="steps-header">
        <span className="steps-tag">PASSO A PASSO</span>
        <h2>Quer fazer parte dessa corrente do bem e adotar? Entenda como funciona:</h2>
      </div>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-number">01</div>
          <h3>Ache seu pet</h3>
          <p>Navegue pela nossa vitrine digital e conheça os pets que buscam um novo lar.</p>
        </div>
        <div className="step-card">
          <div className="step-number">02</div>
          <h3>Formulário</h3>
          <p>Preencha o formulário online com seus dados e conte um pouco sobre sua rotina.</p>
        </div>
        <div className="step-card">
          <div className="step-number">03</div>
          <h3>Avaliação</h3>
          <p>Realizamos uma conversa rápida para alinhar o perfil do pet escolhido.</p>
        </div>
        <div className="step-card">
          <div className="step-number">04</div>
          <h3>Adoção</h3>
          <p>Tudo certo? É hora de receber seu novo melhor amigo em casa!</p>
        </div>
      </div>
    </section>
  );
}