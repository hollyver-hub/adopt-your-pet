import '../styles/banner.css';

export function Banner() {
  return (
    <section className="hero-section">
      <nav className="nav-bar">
        <div className="logo">AdoptYourPet.</div>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#passos">Passo a Passo</a>
          <a href="#vitrine">Vitrine</a>
        </div>
      </nav>

      <div className="hero-content">
        <span className="hero-subtitle">PENEDO-AL</span>
        <h1>UM NOVO AMIGO<br /> MUDA TUDO.</h1>
        <p>Resgate, cuidado e conexão. Descubra como transformamos vidas na nossa comunidade.</p>
      </div>
    </section>
  );
}