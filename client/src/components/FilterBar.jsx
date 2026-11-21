import { IoSearchOutline, IoCloseCircleOutline, IoSparklesOutline, IoPawOutline } from 'react-icons/io5';
import { FaDog, FaCat } from 'react-icons/fa';
import '../styles/filter-bar.css';

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedSpecies,
  onSpeciesChange,
  selectedSize,
  onSizeChange,
  onClearFilters,
  hasActiveFilters,
  totalResults
}) {
  const speciesList = [
    { id: 'all', label: 'Todos', icon: IoSparklesOutline },
    { id: 'cachorro', label: 'Cachorros', icon: FaDog },
    { id: 'gato', label: 'Gatos', icon: FaCat },
    { id: 'outros', label: 'Outros', icon: IoPawOutline },
  ];

  return (
    <div className="filter-bar-container">
      {/* Top search & size row */}
      <div className="filter-top-row">
        {/* Search input */}
        <div className="search-input-wrapper">
          <IoSearchOutline className="search-icon" aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome ou cidade (ex: Penedo, Mel, Maceió)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar pets por nome ou cidade"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Limpar busca"
              aria-label="Limpar campo de busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Size selector dropdown */}
        <div className="size-select-wrapper">
          <label htmlFor="size-select" className="size-label">Porte:</label>
          <select
            id="size-select"
            className="size-select"
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
          >
            <option value="all">Todos os Portes</option>
            <option value="Pequeno">Pequeno Porte</option>
            <option value="Médio">Médio Porte</option>
            <option value="Grande">Grande Porte</option>
          </select>
        </div>
      </div>

      {/* Species filter chips row */}
      <div className="filter-bottom-row">
        <div className="species-chips-group" role="group" aria-label="Filtrar por espécie">
          {speciesList.map((item) => {
            const Icon = item.icon;
            const isActive = selectedSpecies === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`species-chip ${isActive ? 'chip-active' : ''}`}
                onClick={() => onSpeciesChange(item.id)}
                aria-pressed={isActive}
              >
                <Icon className="chip-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status / Clear filters */}
        <div className="filter-meta">
          <span className="results-count">
            <strong>{totalResults}</strong> {totalResults === 1 ? 'pet disponível' : 'pets disponíveis'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={onClearFilters}
              title="Restaurar todos os filtros"
            >
              <IoCloseCircleOutline />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

