const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Busca todos os pets cadastrados na API.
 */
export async function getPets() {
  const response = await fetch(`${API_BASE_URL}/pets`);
  if (!response.ok) {
    throw new Error(`Falha ao carregar os pets (${response.status}: ${response.statusText})`);
  }
  return response.json();
}

/**
 * Busca os dados de um pet específico pelo ID.
 */
export async function getPetById(id) {
  const response = await fetch(`${API_BASE_URL}/pets/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Falha ao carregar os detalhes do pet (${response.status}: ${response.statusText})`);
  }
  return response.json();
}

/**
 * Envia uma nova solicitação de adoção para a API.
 * @param {Object} data - { pet_id, nome_completo, whatsapp, rotina }
 */
export async function createSolicitacao(data) {
  const response = await fetch(`${API_BASE_URL}/solicitacoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || 'Erro ao registrar solicitação de adoção.');
  }

  return responseData;
}

