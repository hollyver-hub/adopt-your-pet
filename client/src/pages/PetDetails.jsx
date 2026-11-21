import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPetById, getPets, createSolicitacao } from '../services/api.js';
import {
  IoArrowBack,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoPawOutline,
  IoCheckmarkCircleOutline,
  IoShareSocialOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
  IoRefreshOutline
} from 'react-icons/io5';
import '../styles/pet-details.css';

export function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherPets, setOtherPets] = useState([]);
  const [formData, setFormData] = useState({
    nome_completo: '',
    whatsapp: '',
    email: '',
    tipoMoradia: 'Casa com Quintal Telado',
    temOutrosPets: 'Sim',
    rotina: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [shareFeedback, setShareFeedback] = useState(false);
  const loadPetData = useCallback(async () => {
    try {
      const petData = await getPetById(id);
      if (!petData) {
        setError('Pet não encontrado.');
        setPet(null);
      } else {
        setPet(petData);
        setError(null);
        try {
          const allPets = await getPets();
          setOtherPets(allPets.filter((p) => p.id !== Number(id)).slice(0, 3));
        } catch {
        }
      }
    } catch (err) {
      console.error("Erro ao carregar detalhes do pet:", err);
      setError("Erro ao carregar os dados do pet. Verifique a conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    getPetById(id)
      .then(async (petData) => {
        if (!isMounted) return;
        if (!petData) {
          setError('Pet não encontrado.');
          setPet(null);
          setLoading(false);
        } else {
          setPet(petData);
          setError(null);
          setLoading(false);
          try {
            const allPets = await getPets();
            if (isMounted) {
              setOtherPets(allPets.filter((p) => p.id !== Number(id)).slice(0, 3));
            }
          } catch {
          }
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Erro ao carregar detalhes do pet:", err);
        setError("Erro ao carregar os dados do pet. Verifique a conexão com o servidor.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome_completo.trim() || !formData.whatsapp.trim() || !formData.rotina.trim()) {
      setFormError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    const detalhesRotina = `Moradia: ${formData.tipoMoradia}. Possui outros animais: ${formData.temOutrosPets}. Detalhes da rotina/experiência: ${formData.rotina.trim()}`;

    const payload = {
      pet_id: pet.id,
      nome_completo: formData.nome_completo.trim(),
      whatsapp: formData.whatsapp.trim(),
      rotina: detalhesRotina
    };

    try {
      await createSolicitacao(payload);
      setFormSubmitted(true);
      setFormData({
        nome_completo: '',
        whatsapp: '',
        email: '',
        tipoMoradia: 'Casa com Quintal Telado',
        temOutrosPets: 'Sim',
        rotina: ''
      });
    } catch (err) {
      setFormError(err.message || 'Erro ao registrar solicitação de adoção no banco de dados.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Adote o(a) ${pet?.nome} - AdoptYourPet`,
        text: `Conheça o(a) ${pet?.nome}, disponível para adoção responsável!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    }
  };
  if (loading) {
    return (
      <main className="pet-details-page">
        <div className="details-loading-box">
          <div className="loading-spinner"></div>
          <p>Carregando perfil completo do pet...</p>
        </div>
      </main>
    );
  }
  if (error || !pet) {
    return (
      <main className="pet-details-page">
        <div className="pet-not-found-box">
          <IoAlertCircleOutline className="not-found-icon" />
          <h2>Pet não encontrado</h2>
          <p>{error || "O animal que você procura não está mais disponível ou o link é inválido."}</p>
          <div className="not-found-actions">
            <button type="button" className="retry-btn" onClick={loadPetData}>
              <IoRefreshOutline />
              <span>Tentar Novamente</span>
            </button>
            <Link to="/adocao" className="back-to-catalog-btn">
              <IoArrowBack />
              <span>Voltar ao Catálogo</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pet-details-page">
      <div className="pet-details-container">
        <nav className="details-nav-row" aria-label="Navegação">
          <button type="button" onClick={() => navigate('/adocao')} className="back-link">
            <IoArrowBack />
            <span>Voltar para o catálogo</span>
          </button>

          <ol className="breadcrumb-list">
            <li><Link to="/">Início</Link></li>
            <li>/</li>
            <li><Link to="/adocao">Catálogo</Link></li>
            <li>/</li>
            <li className="active" aria-current="page">{pet.nome}</li>
          </ol>
        </nav>
        <div className="pet-details-grid">
          <div className="pet-details-gallery">
            <div className="details-img-wrapper">
              <img src={pet.foto} alt={`Foto ampliada de ${pet.nome}`} className="details-main-img" />
              <span className="details-badge-species">{pet.especie}</span>
              {pet.porte && <span className="details-badge-porte">{pet.porte}</span>}
            </div>
            <div className="health-check-card">
              <h4>
                <IoShieldCheckmarkOutline className="health-header-icon" />
                Status de Saúde & Cuidados
              </h4>
              <ul className="health-list">
                <li className={pet.castrado ? 'check-yes' : 'check-pending'}>
                  <IoCheckmarkCircle />
                  <span>{pet.castrado ? 'Castrado(a)' : 'Castração garantida pela ONG'}</span>
                </li>
                <li className={pet.vacinado ? 'check-yes' : 'check-pending'}>
                  <IoCheckmarkCircle />
                  <span>{pet.vacinado ? 'Vacinado(a) V10 / Antirrábica' : 'Primeira dose aplicada'}</span>
                </li>
                <li className={pet.vermifugado ? 'check-yes' : 'check-pending'}>
                  <IoCheckmarkCircle />
                  <span>{pet.vermifugado ? 'Vermifugado(a) e livre de parasitas' : 'Em tratamento'}</span>
                </li>
              </ul>
            </div>
            <button type="button" className="share-pet-btn" onClick={handleShare}>
              <IoShareSocialOutline />
              <span>{shareFeedback ? 'Link copiado!' : 'Compartilhar perfil de ' + pet.nome}</span>
            </button>
          </div>
          <div className="pet-details-info">
            <header className="pet-info-header">
              <div className="pet-name-line">
                <h1>{pet.nome}</h1>
                <span className="pet-highlight-age">{pet.idade}</span>
              </div>

              <p className="pet-location-tag">
                <IoLocationOutline />
                <span>{pet.local}</span>
              </p>
            </header>
            {pet.temperamento && pet.temperamento.length > 0 && (
              <div className="pet-tags-group">
                {pet.temperamento.map((tag, idx) => (
                  <span key={idx} className="personality-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="pet-story-block">
              <h3>História & Personalidade</h3>
              <p>{pet.historia || pet.descricao}</p>
            </div>
            <section className="details-adopt-section">
              {formSubmitted ? (
                <div className="details-form-success" role="alert">
                  <IoCheckmarkCircleOutline className="success-icon" />
                  <h3>Solicitação Registrada no Banco de Dados!</h3>
                  <p>
                    Obrigado pelo carinho com o(a) <strong>{pet.nome}</strong>! Sua solicitação foi salva com sucesso no sistema. Nossa equipe voluntária
                    analisará suas informações e entrará em contato via WhatsApp para os próximos passos.
                  </p>
                  <button
                    type="button"
                    className="reset-form-btn"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Enviar outra solicitação
                  </button>
                </div>
              ) : (
                <div className="details-form-card">
                  <div className="adopt-card-header">
                    <h3>Quero Adotar o(a) {pet.nome}</h3>
                    <p>Preencha os dados abaixo para enviar sua solicitação diretamente ao nosso sistema:</p>
                  </div>

                  {formError && (
                    <div className="details-form-error" role="alert">
                      <IoAlertCircleOutline />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="details-adopt-form">
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="nome_completo">Nome Completo *</label>
                        <input
                          id="nome_completo"
                          type="text"
                          name="nome_completo"
                          value={formData.nome_completo}
                          onChange={handleInputChange}
                          placeholder="Ex: Maria Silva"
                          required
                          disabled={submitting}
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="whatsapp">WhatsApp com DDD *</label>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="(82) 99999-9999"
                          required
                          disabled={submitting}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="email">E-mail (opcional)</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seuemail@exemplo.com"
                          disabled={submitting}
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="tipoMoradia">Tipo de Moradia *</label>
                        <select
                          id="tipoMoradia"
                          name="tipoMoradia"
                          value={formData.tipoMoradia}
                          onChange={handleInputChange}
                          disabled={submitting}
                        >
                          <option value="Casa com Quintal Telado">Casa com Quintal Telado</option>
                          <option value="Apartamento com Redes">Apartamento com Redes</option>
                          <option value="Sítio / Chácara">Sítio / Chácara</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="rotina">Conte sobre sua rotina, espaço e experiência com animais: *</label>
                      <textarea
                        id="rotina"
                        name="rotina"
                        rows="3"
                        value={formData.rotina}
                        onChange={handleInputChange}
                        placeholder="Ex: Moro com minha família, passamos o dia em casa, temos quintal seguro e tempo para passeios diários..."
                        required
                        disabled={submitting}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`submit-adoption-btn ${submitting ? 'btn-submitting' : ''}`}
                      disabled={submitting}
                    >
                      <IoPawOutline />
                      <span>{submitting ? "Enviando Solicitação..." : "Confirmar Solicitação de Adoção"}</span>
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        </div>
        {otherPets.length > 0 && (
          <section className="more-pets-section">
            <div className="more-pets-header">
              <h2>Outros Amiguinhos que Buscam um Lar</h2>
              <Link to="/adocao" className="see-all-pets-link">
                Ver todos os pets disponíveis →
              </Link>
            </div>

            <div className="more-pets-grid">
              {otherPets.map((other) => (
                <article key={other.id} className="other-pet-card">
                  <div className="other-img-wrap">
                    <img src={other.foto} alt={other.nome} />
                    <span className="other-badge">{other.especie}</span>
                  </div>
                  <div className="other-content">
                    <h4>{other.nome}</h4>
                    <p className="other-location">
                      <IoLocationOutline />
                      {other.local}
                    </p>
                    <Link to={`/pets/${other.id}`} className="other-btn">
                      Ver Detalhes
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
