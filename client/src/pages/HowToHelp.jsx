import { useState } from 'react';
import {
  IoHeartOutline,
  IoCopyOutline,
  IoCheckmarkDone,
  IoHomeOutline,
  IoPeopleOutline,
  IoBagAddOutline,
  IoHelpCircleOutline,
  IoChevronDown,
  IoChevronUp,
  IoLocationOutline
} from 'react-icons/io5';
import { FaWhatsapp, FaQrcode } from 'react-icons/fa';
import '../styles/how-to-help.css';

export function HowToHelp() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [volunteerInterest, setVolunteerInterest] = useState('');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const pixKey = "pix@adoptyourpet.org";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => {
      setCopiedPix(false);
    }, 3000);
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (volunteerInterest) {
      setVolunteerSubmitted(true);
      setTimeout(() => {
        setVolunteerSubmitted(false);
        setVolunteerInterest('');
      }, 4000);
    }
  };

  const faqs = [
    {
      question: "Quanto custa adotar um animal pela AdoptYourPet?",
      answer: "A adoção é 100% gratuita! Nosso objetivo é encontrar lares amorosos e responsáveis. Nós não cobramos nenhuma taxa para entregar o animal castrado, vacinado e vermifugado."
    },
    {
      question: "Quais são os requisitos mínimos para adotar?",
      answer: "Ser maior de 21 anos, apresentar documento oficial com foto e comprovante de residência, concordar com a entrevista de alinhamento e garantir um ambiente seguro (casas sem rotas de fuga ou apartamentos com redes de proteção nas janelas)."
    },
    {
      question: "Como funciona ser um Lar Temporário (LT)?",
      answer: "Você acolhe o pet em sua casa por algumas semanas enquanto ele se recupera ou aguarda adoção. Nós fornecemos ração, medicamentos e arcamos com todos os custos veterinários. Você só precisa oferecer amor e abrigo!"
    },
    {
      question: "Como as doações via PIX são utilizadas?",
      answer: "100% das doações são destinadas para compras de sacos de ração, vacinas importadas, castrações em clínicas parceiras, exames laboratoriais e cirurgias de animais resgatados em estado crítico."
    },
    {
      question: "Posso doar rações abertas ou medicamentos que sobraram?",
      answer: "Sim! Aceitamos rações (desde que dentro da validade e bem conservadas), medicamentos de uso veterinário ou humano dentro da validade, toalhas, caminhas, coleiras e jornais limpos."
    }
  ];

  return (
    <main className="help-page">
      <div className="help-container">
        <header className="help-hero">
          <span className="help-badge">
            <IoHeartOutline />
            Corrente do Bem
          </span>
          <h1>Como Ajudar Nosso Projeto</h1>
          <p className="help-subtitle">
            Nem todo mundo pode adotar, mas todo mundo pode ajudar a transformar o destino de animais resgatados em Penedo e região. Escolha a forma que mais combina com você:
          </p>
        </header>
        <div className="help-pillars-grid">
          <section id="pix" className="help-card pillar-pix">
            <div className="pillar-header">
              <div className="pillar-icon-box">
                <FaQrcode />
              </div>
              <span className="pillar-tag">Ajuda Imediata</span>
            </div>

            <h3>Doação Financeira via PIX</h3>
            <p>
              Qualquer quantia faz uma diferença gigante para comprar remédios, vacinas e ração para nossos abrigados.
            </p>

            <div className="pix-box">
              <span className="pix-title">Chave Oficial (E-mail):</span>
              <div className="pix-key-display">
                <code>{pixKey}</code>
                <button
                  type="button"
                  className={`copy-btn ${copiedPix ? 'copied' : ''}`}
                  onClick={handleCopyPix}
                  aria-label="Copiar chave PIX"
                >
                  {copiedPix ? (
                    <>
                      <IoCheckmarkDone />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <IoCopyOutline />
                      <span>Copiar PIX</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="impact-calculator">
              <div className="impact-item">
                <strong>R$ 30</strong>
                <span>Garante 1 dose de vacina V10</span>
              </div>
              <div className="impact-item">
                <strong>R$ 60</strong>
                <span>Alimenta 1 pet por 30 dias</span>
              </div>
              <div className="impact-item">
                <strong>R$ 150</strong>
                <span>Cobre 1 castração completa</span>
              </div>
            </div>
          </section>
          <section id="lar-temporario" className="help-card">
            <div className="pillar-header">
              <div className="pillar-icon-box">
                <IoHomeOutline />
              </div>
              <span className="pillar-tag">Acolhimento</span>
            </div>

            <h3>Seja um Lar Temporário</h3>
            <p>
              Abra as portas da sua casa por um período determinado. A ONG custeia alimentação e saúde; você entra com carinho e segurança até que a adoção definitiva aconteça.
            </p>

            <ul className="pillar-perks">
              <li>✓ Custos de ração pagos pela ONG</li>
              <li>✓ Medicamentos e suporte veterinário inclusos</li>
              <li>✓ Acompanhamento contínuo da nossa equipe</li>
            </ul>

            <a
              href="https://wa.me/5582999990000?text=Olá!%20Gostaria%20de%20me%20cadastrar%20como%20Lar%20Temporário."
              target="_blank"
              rel="noreferrer"
              className="pillar-action-btn"
            >
              <FaWhatsapp />
              <span>Quero ser Lar Temporário</span>
            </a>
          </section>
          <section id="voluntariado" className="help-card">
            <div className="pillar-header">
              <div className="pillar-icon-box">
                <IoPeopleOutline />
              </div>
              <span className="pillar-tag">Tempo & Dedicação</span>
            </div>

            <h3>Seja Voluntário(a)</h3>
            <p>
              Precisamos de pessoas com diferentes habilidades para fortalecer nossa causa na cidade:
            </p>

            <div className="volunteer-badges">
              <span className="v-badge">Carona Solidária</span>
              <span className="v-badge">Fotografia de Pets</span>
              <span className="v-badge">Feirinhas de Adoção</span>
              <span className="v-badge">Gestão de Redes</span>
              <span className="v-badge">Passeios e Banhos</span>
            </div>

            <form onSubmit={handleVolunteerSubmit} className="volunteer-quick-form">
              <input
                type="text"
                placeholder="Qual sua área de interesse?"
                value={volunteerInterest}
                onChange={(e) => setVolunteerInterest(e.target.value)}
                required
              />
              <button type="submit" className="pillar-action-btn">
                <span>Quero Ajudar</span>
              </button>
            </form>

            {volunteerSubmitted && (
              <p className="volunteer-feedback">
                ✓ Maravilha! Em breve entraremos em contato com você.
              </p>
            )}
          </section>
          <section id="doacao-materiais" className="help-card">
            <div className="pillar-header">
              <div className="pillar-icon-box">
                <IoBagAddOutline />
              </div>
              <span className="pillar-tag">Itens Materiais</span>
            </div>

            <h3>Doação de Suprimentos</h3>
            <p>
              Aceitamos itens novos ou usados em bom estado de conservação:
            </p>

            <ul className="pillar-perks">
              <li>✓ Ração para cães e gatos (adulto e filhote)</li>
              <li>✓ Tapetes higiênicos, jornais e areia sanitária</li>
              <li>✓ Vermífugos, antipulgas e remédios válidos</li>
              <li>✓ Caminhas, coleiras, guias e caixas de transporte</li>
            </ul>

            <div className="dropoff-point">
              <IoLocationOutline />
              <span><strong>Ponto de Coleta:</strong> Centro Histórico, Penedo - AL</span>
            </div>
          </section>
        </div>
        <section className="faq-section">
          <div className="faq-header">
            <div className="faq-badge">
              <IoHelpCircleOutline />
              <span>Tire Suas Dúvidas</span>
            </div>
            <h2>Perguntas Frequentes</h2>
            <p>Esclareça os principais pontos sobre o nosso processo de adoção e voluntariado.</p>
          </div>

          <div className="faq-accordion-group">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleFaq(index);
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-row">
                    <h4>{faq.question}</h4>
                    <span className="faq-icon-arrow">
                      {isOpen ? <IoChevronUp /> : <IoChevronDown />}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="faq-answer-row">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
