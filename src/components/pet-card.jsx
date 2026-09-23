import { IoLocationOutline } from "react-icons/io5";
import '../styles/pet-card.css';

export function PetCard({ pet, isExpanded, onToggleForm, onSubmitForm }) {
  return (
    <div className="pet-card carousel-card">
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
          className="card-btn" 
          onClick={() => onToggleForm(pet.id)}
        >
          {isExpanded ? "FECHAR ✕" : "QUERO ADOTAR"}
        </button>

        {isExpanded && (
          <form onSubmit={(e) => onSubmitForm(e, pet.nome)} className="accordion-form">
            <input type="text" placeholder="Nome Completo" required />
            <input type="tel" placeholder="WhatsApp" required />
            <textarea placeholder="Como é sua rotina?" rows="2" required></textarea>
            <button type="submit" className="accordion-submit">ENVIAR</button>
          </form>
        )}
      </div>
    </div>
  );
}