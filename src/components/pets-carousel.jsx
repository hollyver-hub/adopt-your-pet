import { useState, useEffect } from 'react';
import { petsVitrine } from '../data/pets.js';
import { PetCard } from './pet-card.jsx';
import '../styles/pets-carousel.css';

export function PetsCarousel() {
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
    <section id="vitrine" className="pets-carousel-section">
      <div className="showcase-header">
        <span className="showcase-tag">DISPONÍVEIS PARA ADOÇÃO</span>
        <h2>CONHEÇA NOSSOS PETS</h2>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow" onClick={prevPet}>&#8592;</button>

        <div className="carousel-cards-container">
          {getVisiblePets().map((pet, index) => (
            <PetCard 
              key={`${pet.id}-${index}`}
              pet={pet}
              isExpanded={expandedPetId === pet.id}
              onToggleForm={toggleAdoptForm}
              onSubmitForm={handleAdoptSubmit}
            />
          ))}
        </div>

        <button className="carousel-arrow" onClick={nextPet}>&#8594;</button>
      </div>
    </section>
  );
}