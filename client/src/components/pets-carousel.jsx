import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoArrowForward, IoPawOutline, IoRefreshOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { getPets, createSolicitacao } from '../services/api.js';
import { PetCard } from './pet-card.jsx';
import '../styles/pets-carousel.css';

export function PetsCarousel() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [expandedPetId, setExpandedPetId] = useState(null);

  // Carrega pets reais da API
  const loadPets = useCallback(async () => {
    try {
      const data = await getPets();
      setPets(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar pets no carrossel:", err);
      setError("Não foi possível carregar os destaques da vitrine.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getPets()
      .then((data) => {
        if (isMounted) {
          setPets(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Erro ao carregar pets no carrossel:", err);
          setError("Não foi possível carregar os destaques da vitrine.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextPet = () => {
    if (pets.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pets.length);
    setExpandedPetId(null);
  };

  const prevPet = () => {
    if (pets.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
    setExpandedPetId(null);
  };

  const getVisiblePets = () => {
    if (pets.length === 0) return [];
    if (isMobile || pets.length < 3) return [pets[currentIndex % pets.length]];
    return [
      pets[currentIndex % pets.length],
      pets[(currentIndex + 1) % pets.length],
      pets[(currentIndex + 2) % pets.length],
    ];
  };

  const toggleAdoptForm = (id) => {
    setExpandedPetId(expandedPetId === id ? null : id);
  };

  const handleAdoptSubmit = async (payload) => {
    return await createSolicitacao(payload);
  };

  return (
    <section id="vitrine" className="pets-carousel-section">
      <div className="showcase-header-wrap">
        <div className="showcase-header">
          <span className="showcase-tag">Destaques da Semana</span>
          <h2>Conheça Nossos Pets</h2>
          <p className="showcase-subtitle">Eles estão ansiosos por carinho, um cantinho quentinho e uma nova história.</p>
        </div>

        <Link to="/adocao" className="showcase-catalog-btn">
          <IoPawOutline />
          <span>Ver catálogo completo ({pets.length})</span>
        </Link>
      </div>

      {loading && (
        <div className="carousel-loading-box">
          <div className="loading-spinner"></div>
          <p>Buscando amiguinhos na vitrine...</p>
        </div>
      )}

      {!loading && error && (
        <div className="carousel-error-box">
          <IoAlertCircleOutline className="carousel-error-icon" />
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={loadPets}>
            <IoRefreshOutline />
            <span>Recarregar Vitrine</span>
          </button>
        </div>
      )}

      {!loading && !error && pets.length > 0 && (
        <div className="carousel-wrapper">
          <button
            className="carousel-arrow"
            onClick={prevPet}
            aria-label="Pet anterior"
          >
            <IoArrowBack />
          </button>

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

          <button
            className="carousel-arrow"
            onClick={nextPet}
            aria-label="Próximo pet"
          >
            <IoArrowForward />
          </button>
        </div>
      )}
    </section>
  );
}
