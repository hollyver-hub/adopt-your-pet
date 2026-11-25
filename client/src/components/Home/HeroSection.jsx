import { Link } from 'react-router-dom';
import { IoPawOutline, IoHeartOutline } from 'react-icons/io5';
import '../../styles/Home/hero.css';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-text-col">

            <h1 className="hero-title">
              Um novo amigo<br />
              <span className="hero-highlight">muda tudo.</span>
            </h1>

            <p className="hero-description">
              Resgate, cuidado e conexão. Criamos pontes seguras entre animais que merecem uma segunda chance e tutores dispostos a transformar vidas com amor e responsabilidade.
            </p>

            <div className="hero-btn-group">
              <Link to="/adocao" className="hero-primary-btn">
                <span>Encontrar meu Pet</span>
              </Link>
              <Link to="/como-ajudar" className="hero-secondary-btn">
                <IoHeartOutline className="btn-icon" />
                <span>Como Ajudar</span>
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <span className="stat-number">+150</span>
                <span className="stat-label">Pets Adotados</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Castrados & Cuidados</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-number">5 anos</span>
                <span className="stat-label">Atuando na Região</span>
              </div>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
                alt="Cão feliz pronto para adoção"
                className="hero-main-img"
              />
              <div className="hero-floating-card">
                <div className="floating-paw">
                  <IoPawOutline />
                </div>
                <div>
                  <strong>Adoção Responsável</strong>
                  <span>Todos os pets recebem suporte e acolhimento contínuo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

