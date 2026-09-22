import React, { useState, useEffect } from 'react';
import './App.css';
import { IoLocationOutline } from "react-icons/io5";

const petsVitrine = [
  {
    id: 1,
    nome: "Mel",
    especie: "Cachorra",
    idade: "2 anos",
    local: "Penedo - AL",
    foto: "https://images.pexels.com/photos/31040636/pexels-photo-31040636.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-31040636.jpg&fm=jpg",
    descricao: "Muito dócil, adora brincar e já é castrada."
  },
  {
    id: 2,
    nome: "Simba",
    especie: "Gato",
    idade: "1 ano",
    local: "Penedo - AL",
    foto: "https://tse2.mm.bing.net/th/id/OIP.HNQ0V4YZdQv8HIsjYIGWgAHaHa?r=0&w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3",
    descricao: "Calmo, independente e ideal para apartamentos."
  },
  {
    id: 3,
    nome: "Bob",
    especie: "Cachorro",
    idade: "3 meses",
    local: "Neópolis - SE",
    foto: "https://tse1.mm.bing.net/th/id/OIP.dhhGqI8b4U6XvqwpsxFJqgHaH6?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    descricao: "Filhote cheio de energia e muito curioso."
  },
  {
    id: 4,
    nome: "Luna",
    especie: "Gata",
    idade: "2 anos",
    local: "Coruripe - AL",
    foto: "https://i.pinimg.com/736x/24/7b/84/247b84e0c9eda3bf60970d4d63fbd10c.jpg",
    descricao: "Carinhosa, adora tirar cochilos ao sol."
  },
  {
    id: 5,
    nome: "Thor",
    especie: "Cachorro",
    idade: "3 anos",
    local: "Maceió - AL",
    foto: "https://adotar.com.br/upload/2017-12/animais_imagem315531.jpg?w=700&format=webp",
    descricao: "Protetor, leal e ótimo para espaços grandes."
  },
  {
    id: 6,
    nome: "Jubileia",
    especie: "Cachorra",
    idade: "9 anos",
    local: "Santana do São Francisco - SE",
    foto: "https://www.jornalpopulacional.com.br/storage/capaOriginal/noticia/1748541241.png",
    descricao: "Carismática, adora companhia e é ótimo com crianças."
  },
  {
    id: 7,
    nome: "Luluzinha",
    especie: "Cachorra",
    idade: "3 meses",
    local: "Saúde - SE",
    foto: "https://i.redd.it/semuruj1on341.jpg",
    descricao: "Gosta de nadar, brincar e é muito sociável com outros pets."
  },
  {
    id: 8,
    nome: "Jurema",
    especie: "Cachorra",
    idade: "9 meses",
    local: "Carro Quebrado - SE",
    foto: "https://uploads.metropoles.com/wp-content/uploads/2023/05/02122221/Casal-viraliza-ao-decidir-adotar-dois-tamanduas-4.jpg",
    descricao: "Tímida, mas muito carinhosa quando se sente segura."
  },
  {
    id: 9,
    nome: "Leona",
    especie: "Cachorra",
    idade: "1 ano",
    local: "Targo - RU",
    foto: "https://wl-genial.cf.tsp.li/resize/728x/jpg/766/3b9/438a9b54edb141ef4985f88a19.jpg",
    descricao: "Gosta muito de passear durante o dia e também ama praia"
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  
  const [expandedPetId, setExpandedPetId] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
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
    <div className="body">
      
      <section className="hero-section">
        <nav className="nav-bar">
          <div className="logo">AdoptYourPet. </div>
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
                  
                  <p className="pet-location">
                    <IoLocationOutline />
                    {pet.local}
                  </p>
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
        <p className="copy">&copy; 2026 AdoptYourPet. Desenvolvido para Programação Web I.</p>
      </footer>
    </div>
  );
}

export default App;