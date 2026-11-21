import { Link } from 'react-router-dom';
import { IoPawOutline, IoLocationOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5';
import { FaInstagram, FaWhatsapp, FaHeart } from 'react-icons/fa';
import '../styles/footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <IoPawOutline className="footer-logo-icon" />
              <span>AdoptYourPet<span className="logo-accent">.</span></span>
            </div>
            <p className="footer-tagline">
              Promovendo a ponte do amor entre animais abandonados e lares responsáveis em Penedo-AL e região do Baixo São Francisco.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-pill">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-pill">
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-title">Navegação</h4>
            <ul className="footer-links">
              <li><Link to="/">Página Inicial</Link></li>
              <li><Link to="/adocao">Catálogo de Pets</Link></li>
              <li><Link to="/como-ajudar">Como Ajudar (PIX & Doações)</Link></li>
              <li><a href="/#sobre">Quem Somos</a></li>
              <li><a href="/#passos">Passo a Passo de Adoção</a></li>
            </ul>
          </div>

          {/* Ways to help */}
          <div className="footer-col">
            <h4 className="footer-title">Como Ajudar</h4>
            <ul className="footer-links">
              <li><Link to="/como-ajudar#pix">Doação Financeira via PIX</Link></li>
              <li><Link to="/como-ajudar#lar-temporario">Seja Lar Temporário</Link></li>
              <li><Link to="/como-ajudar#voluntariado">Voluntariado e Resgates</Link></li>
              <li><Link to="/como-ajudar#doacao-materiais">Doação de Ração e Remédios</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-col">
            <h4 className="footer-title">Contato & Região</h4>
            <ul className="footer-contact-list">
              <li>
                <IoLocationOutline className="contact-icon" />
                <span>Penedo - AL, Brasil</span>
              </li>
              <li>
                <IoMailOutline className="contact-icon" />
                <span>contato@adoptyourpet.org</span>
              </li>
              <li>
                <IoCallOutline className="contact-icon" />
                <span>(82) 99999-0000</span>
              </li>
            </ul>
            <div className="pix-pill">
              <span className="pix-label">Chave PIX:</span>
              <span className="pix-val">pix@adoptyourpet.org</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} AdoptYourPet. Desenvolvido para a disciplina de Programação Web I.
          </p>
          <p className="made-with-love">
            Feito com <FaHeart className="heart-pulse" /> para transformar vidas.
          </p>
        </div>
      </div>
    </footer>
  );
}
