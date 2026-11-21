import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoPawOutline, IoHeartOutline, IoMenu, IoClose } from 'react-icons/io5';
import '../styles/navbar.css';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-icon-wrap">
            <IoPawOutline className="logo-icon" />
          </span>
          <span className="logo-text">AdoptYourPet<span className="logo-accent">.</span></span>
        </Link>

        <nav className="navbar-links" aria-label="Navegação principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Início
          </NavLink>
          <NavLink
            to="/adocao"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Catálogo de Pets
          </NavLink>
          <NavLink
            to="/como-ajudar"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Como Ajudar
          </NavLink>
        </nav>

        <div className="navbar-cta-group">
          <Link to="/adocao" className="navbar-cta-btn">
            <IoHeartOutline className="cta-icon" />
            <span>Quero Adotar</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Início
            </NavLink>
            <NavLink
              to="/adocao"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Catálogo de Pets
            </NavLink>
            <NavLink
              to="/como-ajudar"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Como Ajudar
            </NavLink>

            <Link to="/adocao" className="mobile-cta-btn" onClick={closeMobileMenu}>
              <IoHeartOutline size={20} />
              <span>Ver Pets para Adoção</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

