import { Link } from 'react-router-dom';
import { IoPawOutline, IoHeartOutline } from 'react-icons/io5';
import { HeroSection } from '../components/HeroSection.jsx';
import { About } from '../components/about.jsx';
import { Steps } from '../components/step-step.jsx';
import { PetsCarousel } from '../components/pets-carousel.jsx';
import '../styles/App.css';

export function Home() {
  return (
    <main className="home-page">
      <HeroSection />

      <PetsCarousel />

      <About />

      <Steps />

      <section className="cta-help-banner">
        <div className="cta-help-container">
          <div className="cta-help-content">
            <span className="cta-help-tag">FAÇA A DIFERENÇA</span>
            <h2>Não pode adotar agora? Você ainda pode salvar vidas!</h2>
            <p>
              Toda ajuda é fundamental: seja doando qualquer valor via PIX, apadrinhando uma castração,
              sendo lar temporário ou voluntário em nossos resgates.
            </p>
            <div className="cta-help-buttons">
              <Link to="/como-ajudar" className="cta-help-btn-primary">
                <IoHeartOutline />
                <span>Ver Formas de Ajudar</span>
              </Link>
              <Link to="/adocao" className="cta-help-btn-secondary">
                <IoPawOutline />
                <span>Ver Todos os Pets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

