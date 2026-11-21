import { useState, useEffect, useMemo, useCallback } from 'react';
import { getPets, createSolicitacao } from '../services/api.js';
import { FilterBar } from '../components/FilterBar.jsx';
import { PetGrid } from '../components/PetGrid.jsx';
import {
  IoPawOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoClose,
  IoRefreshOutline
} from 'react-icons/io5';
import '../styles/catalog.css';

export function Catalog() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [expandedPetId, setExpandedPetId] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Carrega os pets do banco de dados MySQL via API
  const loadPets = useCallback(async () => {
    try {
      const data = await getPets();
      setPets(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar pets:", err);
      setError("Não foi possível conectar à API de pets. Verifique se o servidor backend está rodando na porta 3001.");
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
          console.error("Erro ao carregar pets:", err);
          setError("Não foi possível conectar à API de pets. Verifique se o servidor backend está rodando na porta 3001.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle open/close do formulário inline do card
  const handleToggleForm = (id) => {
    setExpandedPetId((prevId) => (prevId === id ? null : id));
  };

  // Callback ao submeter o formulário de um card via API
  const handleSubmitForm = async (payload, petNome) => {
    try {
      const result = await createSolicitacao(payload);
      setFeedbackToast({
        type: 'success',
        message: result.message || `Interesse registrado com sucesso para ${petNome}! Entraremos em contato via WhatsApp.`
      });
      setTimeout(() => {
        setFeedbackToast(null);
      }, 5000);
      return result;
    } catch (err) {
      setFeedbackToast({
        type: 'error',
        message: err.message || `Falha ao registrar interesse para ${petNome}.`
      });
      setTimeout(() => {
        setFeedbackToast(null);
      }, 5000);
      throw err;
    }
  };

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSpecies('all');
    setSelectedSize('all');
    setExpandedPetId(null);
  };

  // Filtragem reativa com useMemo sobre a lista de pets vindos da API
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Filtro de busca textual (nome ou local)
      const term = searchTerm.trim().toLowerCase();
      const matchSearch =
        term === '' ||
        (pet.nome && pet.nome.toLowerCase().includes(term)) ||
        (pet.local && pet.local.toLowerCase().includes(term)) ||
        (pet.descricao && pet.descricao.toLowerCase().includes(term));

      // Filtro por espécie / tipo
      let matchSpecies = true;
      if (selectedSpecies !== 'all') {
        const petTipo = (pet.tipo || pet.especie || '').toLowerCase();
        if (selectedSpecies === 'cachorro') {
          matchSpecies = petTipo.includes('cachorr') || petTipo.includes('cão');
        } else if (selectedSpecies === 'gato') {
          matchSpecies = petTipo.includes('gat');
        } else if (selectedSpecies === 'outros') {
          matchSpecies = !petTipo.includes('cachorr') && !petTipo.includes('gat') && !petTipo.includes('cão');
        }
      }

      // Filtro por porte
      const matchSize =
        selectedSize === 'all' ||
        (pet.porte && pet.porte.toLowerCase() === selectedSize.toLowerCase());

      return matchSearch && matchSpecies && matchSize;
    });
  }, [pets, searchTerm, selectedSpecies, selectedSize]);

  const hasActiveFilters = searchTerm !== '' || selectedSpecies !== 'all' || selectedSize !== 'all';

  return (
    <main className="catalog-page">
      <div className="catalog-container">
        {/* Header da Página */}
        <header className="catalog-header">
          <div className="catalog-badge">
            <IoPawOutline />
            <span>Adoção com Amor</span>
          </div>
          <h1>Catálogo de Amiguinhos</h1>
          <p className="catalog-subtitle">
            Conheça todos os nossos resgatados prontos para ganhar uma família.
            Utilize os filtros abaixo para encontrar o pet ideal para o seu perfil e rotina.
          </p>
        </header>

        {/* Notificação toast de feedback quando um formulário é enviado */}
        {feedbackToast && (
          <div className={`catalog-toast ${feedbackToast.type === 'error' ? 'toast-error' : 'toast-success'}`} role="alert">
            {feedbackToast.type === 'error' ? (
              <IoAlertCircleOutline className="toast-icon icon-error" />
            ) : (
              <IoCheckmarkCircleOutline className="toast-icon icon-success" />
            )}
            <span>{feedbackToast.message}</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setFeedbackToast(null)}
              aria-label="Fechar notificação"
            >
              <IoClose />
            </button>
          </div>
        )}

        {/* Barra de Filtros */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          totalResults={filteredPets.length}
        />

        {/* Renderização Condicional: Carregamento, Erro ou Grade */}
        {loading && (
          <div className="catalog-loading-state" role="status">
            <div className="loading-spinner"></div>
            <p>Carregando pets do banco de dados...</p>
          </div>
        )}

        {!loading && error && (
          <div className="catalog-error-state" role="alert">
            <IoAlertCircleOutline className="error-icon" />
            <h3>Ops! Não foi possível carregar os pets</h3>
            <p>{error}</p>
            <button type="button" className="retry-btn" onClick={loadPets}>
              <IoRefreshOutline />
              <span>Tentar Novamente</span>
            </button>
          </div>
        )}

        {!loading && !error && (
          <PetGrid
            pets={filteredPets}
            expandedPetId={expandedPetId}
            onToggleForm={handleToggleForm}
            onSubmitForm={handleSubmitForm}
            onResetFilters={handleClearFilters}
          />
        )}
      </div>
    </main>
  );
}
