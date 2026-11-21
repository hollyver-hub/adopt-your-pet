import { IoPawOutline, IoRefreshOutline } from 'react-icons/io5';
import { PetCard } from './pet-card.jsx';
import '../styles/pet-grid.css';

export function PetGrid({
  pets,
  expandedPetId,
  onToggleForm,
  onSubmitForm,
  onResetFilters
}) {
  if (!pets || pets.length === 0) {
    return (
      <div className="pet-grid-empty" role="status">
        <div className="empty-icon-box">
          <IoPawOutline className="empty-icon" />
        </div>
        <h3 className="empty-title">Nenhum pet encontrado</h3>
        <p className="empty-desc">
          Não localizamos nenhum amiguinho com os filtros ou termo de busca selecionados.
        </p>
        {onResetFilters && (
          <button type="button" className="empty-reset-btn" onClick={onResetFilters}>
            <IoRefreshOutline />
            <span>Limpar filtros e ver todos</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="pet-grid-container">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          isExpanded={expandedPetId === pet.id}
          onToggleForm={onToggleForm}
          onSubmitForm={onSubmitForm}
        />
      ))}
    </div>
  );
}

