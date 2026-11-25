const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getPets() {
  const response = await fetch(`${API_BASE_URL}/pets`);
  if (!response.ok) {
    throw new Error(`Falha ao carregar os pets (${response.status}: ${response.statusText})`);
  }
  return response.json();
}

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

export async function createPet(data) {
  const response = await fetch(`${API_BASE_URL}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || 'Erro ao cadastrar pet.');
  }

  return responseData;
}

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
