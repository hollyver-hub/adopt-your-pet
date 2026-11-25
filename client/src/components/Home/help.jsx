import '../../styles/App.css';
import { Link } from 'react-router-dom';

export function Help(){
    return (
    <section className="cta-help-banner">
        <div className="cta-help-container">
          <div className="cta-help-content">
            <span className="steps-tag">FAÇA A DIFERENÇA</span>
            <h2>Não pode adotar agora? Você ainda pode salvar vidas!</h2>
            <p>
              Toda ajuda é fundamental: seja doando qualquer valor via PIX, apadrinhando uma castração,
              sendo lar temporário ou voluntário em nossos resgates.
            </p>
            <div className="cta-help-buttons">
              <Link to="/como-ajudar" className="cta-help-btn-primary">
                <span>Ver Formas de Ajudar</span>
              </Link>
              <Link to="/adocao" className="cta-help-btn-secondary">
                <span>Ver Todos os Pets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}