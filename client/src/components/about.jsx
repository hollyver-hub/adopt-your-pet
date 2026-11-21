import '../styles/about.css';

export function About() {
  return (
    <section id="sobre" className="about-section">
      <div className="section-grid">
        <div className="section-text">
          <h2>01. QUEM SOMOS</h2>
          <p>Não somos apenas um abrigo. Criamos uma ponte segura entre animais que precisam de uma segunda chance e lares cheios de disposição para amar.</p>
        </div>
        <div className="section-image-box">
          <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80" alt="Cachorros felizes" />
        </div>
      </div>
    </section>
  );
}