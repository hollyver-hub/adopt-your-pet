import React, { useState, useEffect } from 'react';
import './App.css';

const petsVitrine = [
  {
    id: 1,
    nome: "Mel",
    especie: "Cachorra",
    idade: "2 anos",
    local: "Penedo - AL",
    foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    descricao: "Muito dócil, adora brincar e já é castrada."
  },
  {
    id: 2,
    nome: "Simba",
    especie: "Gato",
    idade: "1 ano",
    local: "Penedo - AL",
    foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    descricao: "Calmo, independente e ideal para apartamentos."
  },
  {
    id: 3,
    nome: "Bob",
    especie: "Cachorro",
    idade: "4 meses",
    local: "Neópolis - SE",
    foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    descricao: "Filhote cheio de energia e muito curioso."
  },
  {
    id: 4,
    nome: "Luna",
    especie: "Gata",
    idade: "2 anos",
    local: "Coruripe - AL",
    foto: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
    descricao: "Carinhosa, adora tirar cochilos ao sol."
  },
  {
    id: 5,
    nome: "Thor",
    especie: "Cachorro",
    idade: "3 anos",
    local: "Maceió - AL",
    foto: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
    descricao: "Protetor, leal e ótimo para espaços grandes."
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // NOVO: Controla qual card está com a sanfona aberta
  const [expandedPetId, setExpandedPetId] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % petsVitrine.length);
    setExpandedPetId(null);
  };

  const prevPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + petsVitrine.length) % petsVitrine.length);
    setExpandedPetId(null);
  };

  const getVisiblePets = () => {
    if (isMobile) return [petsVitrine[currentIndex % petsVitrine.length]];
    return [
      petsVitrine[currentIndex % petsVitrine.length],
      petsVitrine[(currentIndex + 1) % petsVitrine.length],
      petsVitrine[(currentIndex + 2) % petsVitrine.length],
    ];
  };

  const toggleAdoptForm = (id) => {
    setExpandedPetId(expandedPetId === id ? null : id);
  };

  const handleAdoptSubmit = (e, petName) => {
    e.preventDefault();
    alert(`Obrigado pelo interesse no(a) ${petName}! Nossa equipe entrará em contato em breve.`);
    setExpandedPetId(null);
  };

  return (
    <div className="retro-container">
      
      <section className="hero-section">
        <nav className="nav-bar">
          <div className="logo">PetLove.</div>
          <div className="nav-links">
            <a href="#sobre">Sobre</a>
            <a href="#passos">Passo a Passo</a>
            <a href="#vitrine">Vitrine</a>
          </div>
        </nav>
        <div className="hero-content">
          <span className="hero-subtitle">EST. 2026 // PENEDO-AL</span>
          <h1>UM NOVO AMIGO<br /> MUDA TUDO.</h1>
          <p>Resgate, cuidado e conexão. Descubra como transformamos vidas na nossa comunidade.</p>
        </div>
      </section>

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

      <section id="vitrine" className="pets-carousel-section">
        <div className="showcase-header">
          <span className="showcase-tag">DISPONÍVEIS PARA ADOÇÃO</span>
          <h2>CONHEÇA NOSSOS PETS</h2>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-arrow" onClick={prevPet}>&#8592;</button>

          <div className="carousel-cards-container">
            {getVisiblePets().map((pet, index) => (
              <div key={`${pet.id}-${index}`} className="retro-pet-card carousel-card">
                <div className="pet-img-wrapper">
                  <img src={pet.foto} alt={pet.nome} />
                  <span className="pet-badge">{pet.especie}</span>
                </div>
                
                <div className="pet-card-content">
                  <div className="pet-title-row">
                    <h3>{pet.nome}</h3>
                    <span className="pet-age">{pet.idade}</span>
                  </div>
                  
                  <p className="pet-location">📍 {pet.local}</p>
                  <p className="pet-desc">{pet.descricao}</p>
                  
                  <button 
                    className="retro-card-btn" 
                    onClick={() => toggleAdoptForm(pet.id)}
                  >
                    {expandedPetId === pet.id ? "FECHAR ✕" : "QUERO ADOTAR"}
                  </button>

                  {expandedPetId === pet.id && (
                    <form onSubmit={(e) => handleAdoptSubmit(e, pet.nome)} className="accordion-form">
                      <input type="text" placeholder="Nome Completo" required />
                      <input type="tel" placeholder="WhatsApp" required />
                      <textarea placeholder="Como é sua rotina?" rows="2" required></textarea>
                      <button type="submit" className="accordion-submit">ENVIAR</button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow" onClick={nextPet}>&#8594;</button>
        </div>
      </section>

      <footer className="footer-section">
        <p className="copy">&copy; 2026 PetLove. Desenvolvido para Programação Web I.</p>
      </footer>

    </div>
  );
}

export default App;