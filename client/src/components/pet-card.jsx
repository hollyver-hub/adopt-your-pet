import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoLocationOutline,
  IoPawOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline
} from "react-icons/io5";
import { createSolicitacao } from '../services/api.js';
import '../styles/pet-card.css';

export function PetCard({ pet, isExpanded, onToggleForm, onSubmitForm }) {
  const [formData, setFormData] = useState({
    nome_completo: '',
    whatsapp: '',
    rotina: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome_completo.trim() || !formData.whatsapp.trim() || !formData.rotina.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, preencha todos os campos do formulário.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const payload = {
      pet_id: pet.id,
      nome_completo: formData.nome_completo.trim(),
      whatsapp: formData.whatsapp.trim(),
      rotina: formData.rotina.trim()
    };

    try {
      if (onSubmitForm) {
        await onSubmitForm(payload, pet.nome);
      } else {
        await createSolicitacao(payload);
      }

      setSubmitStatus('success');
      setFormData({
        nome_completo: '',
        whatsapp: '',
        rotina: ''
      });
      setTimeout(() => {
        setSubmitStatus('idle');
        if (onToggleForm) onToggleForm(pet.id);
      }, 3000);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Erro ao enviar a solicitação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="pet-card">
      <div className="pet-img-wrapper">
        <Link to={`/pets/${pet.id}`} className="pet-img-link" title={`Ver detalhes de ${pet.nome}`}>
          <img src={pet.foto} alt={`Foto do pet ${pet.nome}`} loading="lazy" />
        </Link>
        <span className="pet-badge">{pet.especie}</span>
        {pet.porte && <span className="pet-porte-badge">{pet.porte}</span>}
      </div>

      <div className="pet-card-content">
        <div className="pet-title-row">
          <Link to={`/pets/${pet.id}`} className="pet-title-link">
            <h3>{pet.nome}</h3>
          </Link>
          <span className="pet-age">{pet.idade}</span>
        </div>

        <p className="pet-location">
          <IoLocationOutline aria-hidden="true" />
          <span>{pet.local}</span>
        </p>

        <p className="pet-desc">{pet.descricao}</p>

        <div className="card-actions">
          <Link to={`/pets/${pet.id}`} className="card-btn-outline" title="Ver perfil completo">
            <IoPawOutline aria-hidden="true" />
            <span>Detalhes</span>
          </Link>

          <button
            type="button"
            className={`card-btn ${isExpanded ? 'card-btn-active' : ''}`}
            onClick={() => onToggleForm(pet.id)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Fechar ✕" : "Adotar"}
          </button>
        </div>

        {isExpanded && (
          <div className="accordion-wrapper">
            {submitStatus === 'success' ? (
              <div className="card-feedback-success" role="alert">
                <IoCheckmarkCircleOutline className="feedback-icon" />
                <p><strong>Pedido enviado com sucesso!</strong></p>
                <p>Nossa equipe entrará em contato em breve sobre o(a) {pet.nome}.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="accordion-form">
                <div className="form-header">
                  <h4>Formulário de Adoção</h4>
                  <p>Manifeste seu interesse em adotar {pet.nome}:</p>
                </div>

                {submitStatus === 'error' && (
                  <div className="card-feedback-error" role="alert">
                    <IoAlertCircleOutline />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <input
                  type="text"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleInputChange}
                  placeholder="Seu Nome Completo"
                  required
                  disabled={submitting}
                />
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="WhatsApp com DDD (ex: 82 99999-9999)"
                  required
                  disabled={submitting}
                />
                <textarea
                  name="rotina"
                  value={formData.rotina}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre sua casa, rotina e espaço..."
                  rows="2"
                  required
                  disabled={submitting}
                ></textarea>
                
                <button
                  type="submit"
                  className={`accordion-submit ${submitting ? 'btn-submitting' : ''}`}
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Enviar Solicitação"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
