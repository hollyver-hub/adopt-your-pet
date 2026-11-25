# AdoptYourPet 🐾

> Plataforma web full-stack desenvolvida para a divulgação e gestão de adoção responsável de animais resgatados em Penedo - AL e região do Baixo São Francisco.

Projeto acadêmico desenvolvido para a disciplina de **Programação Web I (Avaliação AB1)**.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados (MySQL)](#-banco-de-dados-mysql)
- [Documentação da API REST](#-documentação-da-api-rest)
- [Como Executar o Projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [1. Configurar o Banco de Dados](#1-configurar-o-banco-de-dados)
  - [2. Configurar e Iniciar o Back-end](#2-configurar-e-iniciar-o-back-end)
  - [3. Configurar e Iniciar o Front-end](#3-configurar-e-iniciar-o-front-end)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 📖 Visão Geral

O **AdoptYourPet** tem como objetivo conectar animais em situação de vulnerabilidade ou acolhidos por protetores independentes a famílias dispostas a adotar de forma responsável. O sistema é composto por uma **Single Page Application (SPA)** moderna em React conectada a uma **API REST** em Node.js com persistência em banco de dados relacional **MySQL**.

---

## ✨ Funcionalidades Principais

### Front-end (React)
- **Navegação SPA com React Router**:
  - `/`: Página inicial com banner institucional, métricas de impacto, carrossel de pets em destaque, passo a passo e sobre o projeto.
  - `/adocao`: Catálogo completo com busca textual em tempo real (nome/cidade), filtros rápidos por espécie (Cachorros, Gatos, Outros), filtro por porte (Pequeno, Médio, Grande) e feedback visual para buscas sem resultados (*empty state*).
  - `/pets/:id`: Página de perfil detalhado do animal com galeria em destaque, checklist de saúde (vacinas, castração, vermifugação), tags de temperamento, botão nativo de compartilhamento de link e formulário completo de adoção.
  - `/como-ajudar`: Formas de apoio à causa, incluindo chave PIX oficial com cópia em 1 clique para a área de transferência, orientações sobre Lar Temporário e voluntariado, além de FAQ interativo em acordeom.
- **Formulário Expansível no Card (`PetCard`)**:
  - Cada card permite visualizar detalhes ou expandir um formulário inline de manifestação de interesse, integrado com feedback em tempo real e fechamento automático após submissão.
- **Design Responsivo & Estilização Customizada**:
  - Interface construída com CSS3 modular, tipografia geométrica (**Syne** para títulos e **Inter** para corpo), enquadramento de fotos com `object-fit: cover` e suporte completo a dispositivos móveis.

### Back-end (Node.js & Express)
- **API RESTful com ES Modules**:
  - Endpoints padronizados com respostas em JSON e códigos de status HTTP semânticos (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Error`).
- **Pool de Conexões MySQL (`mysql2/promise`)**:
  - Reutilização inteligente de conexões para alto desempenho e suporte a requisições concorrentes.
- **Segurança contra SQL Injection**:
  - Todas as consultas utilizam *Prepared Statements* com marcadores de parâmetro (`?`).
- **Normalização de Tipos de Dados**:
  - Conversão de `TINYINT` do MySQL para `boolean` nativo (`true`/`false`) e parsing seguro de arrays JSON (`temperamento`).

---

## 🛠 Arquitetura e Tecnologias

### Front-end
- **React 19**
- **Vite 8**
- **React Router DOM 7**
- **React Icons 5** (famílias Ionicons 5 e FontAwesome)
- **CSS3** (Variáveis, Flexbox, CSS Grid, animações e responsividade)

### Back-end
- **Node.js 20+**
- **Express 5**
- **CORS**
- **Dotenv**
- **MySQL2** (com suporte a Promises e Pool)

### Banco de Dados
- **MySQL 8.x**

---

## 📁 Estrutura do Projeto

```text
ab1-project/
├── client/                     # Front-end React (SPA)
│   ├── public/                 # Favicon e ícones estáticos
│   ├── src/
│   │   ├── assets/             # Imagens e vetores
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── about.jsx       # Seção Quem Somos
│   │   │   ├── banner.jsx      # Banner institucional
│   │   │   ├── FilterBar.jsx   # Barra de filtros (busca, chips, portes)
│   │   │   ├── footer.jsx      # Rodapé informativo
│   │   │   ├── HeroSection.jsx # Cabeçalho principal com CTAs
│   │   │   ├── Navbar.jsx      # Menu com navegação ativa e drawer mobile
│   │   │   ├── pet-card.jsx    # Card do animal com formulário inline
│   │   │   ├── PetGrid.jsx     # Grade responsiva de pets
│   │   │   ├── pets-carousel.jsx # Vitrine carrossel da Home
│   │   │   ├── ScrollToTop.jsx # Utilitário de scroll suave ao mudar de rota
│   │   │   └── step-step.jsx   # Seção Passo a Passo
│   │   ├── data/
│   │   │   └── pets.js         # Base de dados local de apoio
│   │   ├── pages/              # Telas da aplicação
│   │   │   ├── Catalog.jsx     # Catálogo de adoção com filtros
│   │   │   ├── Home.jsx        # Página inicial integrada
│   │   │   ├── HowToHelp.jsx   # Como Ajudar (PIX, Voluntariado, FAQ)
│   │   │   └── PetDetails.jsx  # Perfil completo e formulário dedicado
│   │   ├── services/
│   │   │   └── api.js          # Camada de comunicação HTTP (Fetch API)
│   │   ├── styles/             # Folhas de estilo modulares em CSS
│   │   ├── App.jsx             # Definição e roteamento da aplicação
│   │   ├── index.css           # Resets globais
│   │   └── main.jsx            # Bootstrap do React
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Back-end Node.js (API REST)
│   ├── .env                    # Variáveis de ambiente (credenciais locais)
│   ├── .env.example            # Exemplo para configuração do ambiente
│   ├── package.json
│   ├── seed.js                 # Script para sincronizar dados no banco
│   └── server.js               # Servidor Express e rotas da API
│
├── INTEGRACAO.md               # Detalhamento técnico linha por linha da integração
└── README.md                   # Documentação geral do projeto
```

---

## 🗄 Banco de Dados (MySQL)

O banco de dados utilizado é o `adocao_pets`. A estrutura das tabelas é composta por:

### Tabela `pets`
Armazena as informações dos animais disponíveis para adoção:

```sql
CREATE DATABASE IF NOT EXISTS adocao_pets;
USE adocao_pets;

CREATE TABLE IF NOT EXISTS pets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  sexo VARCHAR(20) DEFAULT 'Não informado',
  porte VARCHAR(30) DEFAULT 'Médio',
  idade VARCHAR(50) NOT NULL,
  local VARCHAR(100) NOT NULL,
  foto TEXT NOT NULL,
  descricao TEXT NOT NULL,
  vacinado BOOLEAN DEFAULT FALSE,
  castrado BOOLEAN DEFAULT FALSE,
  vermifugado BOOLEAN DEFAULT FALSE,
  temperamento JSON DEFAULT NULL,
  historia TEXT DEFAULT NULL,
  status VARCHAR(30) DEFAULT 'disponivel',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela `solicitacoes_adocao`
Registra o interesse e os dados de contato do adotante:

```sql
CREATE TABLE IF NOT EXISTS solicitacoes_adocao (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pet_id INT UNSIGNED NOT NULL,
  nome_completo VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(30) NOT NULL,
  rotina TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_solicitacoes_pet FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
```

---

## 📡 Documentação da API REST

A API roda por padrão em `http://localhost:3001`.

### 1. Listar todos os pets
- **Endpoint**: `GET /pets`
- **Descrição**: Retorna a lista completa de animais cadastrados, com tipos normalizados.
- **Exemplo de Resposta (`200 OK`)**:
  ```json
  [
    {
      "id": 1,
      "nome": "Mel",
      "especie": "Cachorra",
      "sexo": "Fêmea",
      "porte": "Médio",
      "idade": "2 anos",
      "local": "Penedo - AL",
      "foto": "https://...",
      "descricao": "Muito dócil, adora brincar e já é castrada.",
      "vacinado": true,
      "castrado": true,
      "vermifugado": true,
      "temperamento": ["Dócil", "Brincalhona", "Sociável"],
      "historia": "Mel foi resgatada próximo ao centro histórico...",
      "status": "disponivel",
      "criado_em": "2026-11-21T17:57:19.000Z"
    }
  ]
  ```

### 2. Buscar detalhes de um pet por ID
- **Endpoint**: `GET /pets/:id`
- **Descrição**: Retorna o perfil individual do pet.
- **Códigos**: `200 OK` em caso de sucesso; `404 Not Found` caso o ID não exista.

### 3. Cadastrar novo pet
- **Endpoint**: `POST /pets`
- **Headers**: `Content-Type: application/json`
- **Campos Obrigatórios**: `nome`, `especie`, `idade`, `local`, `foto`, `descricao`
- **Campos Opcionais**: `sexo`, `porte`, `vacinado`, `castrado`, `vermifugado`, `temperamento` (array ou string), `historia`, `status`
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Bidu",
    "especie": "Cachorro",
    "sexo": "Macho",
    "porte": "Pequeno",
    "idade": "1 ano",
    "local": "Penedo - AL",
    "foto": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80",
    "descricao": "Dócil, brincalhão e cheio de energia para alegrar a casa.",
    "vacinado": true,
    "castrado": true,
    "vermifugado": true,
    "temperamento": ["Dócil", "Brincalhão", "Sociável"],
    "historia": "Bidu foi resgatado e acolhido com muito carinho.",
    "status": "disponivel"
  }
  ```
- **Exemplo de Resposta (`201 Created`)**:
  ```json
  {
    "id": 13,
    "message": "Pet cadastrado com sucesso!",
    "pet": {
      "id": 13,
      "nome": "Bidu",
      "especie": "Cachorro",
      "sexo": "Macho",
      "porte": "Pequeno",
      "idade": "1 ano",
      "local": "Penedo - AL",
      "foto": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80",
      "descricao": "Dócil, brincalhão e cheio de energia para alegrar a casa.",
      "vacinado": true,
      "castrado": true,
      "vermifugado": true,
      "temperamento": ["Dócil", "Brincalhão", "Sociável"],
      "historia": "Bidu foi resgatado e acolhido com muito carinho.",
      "status": "disponivel",
      "criado_em": "2026-11-25T00:41:33.000Z"
    }
  }
  ```
- **Códigos de Erro**:
  - `400 Bad Request`: Campos obrigatórios ausentes ou vazios.
  - `500 Internal Server Error`: Falha ao inserir o pet no banco de dados.

### 4. Registrar solicitação de adoção
- **Endpoint**: `POST /solicitacoes`
- **Headers**: `Content-Type: application/json`
- **Corpo da Requisição**:
  ```json
  {
    "pet_id": 1,
    "nome_completo": "Maria Oliveira",
    "whatsapp": "82999990000",
    "rotina": "Moro em casa com quintal seguro e tenho tempo livre."
  }
  ```
- **Exemplo de Resposta (`201 Created`)**:
  ```json
  {
    "id": 1,
    "pet_id": 1,
    "pet_nome": "Mel",
    "message": "Solicitação de adoção para Mel registrada com sucesso!"
  }
  ```
- **Códigos de Erro**:
  - `400 Bad Request`: Dados obrigatórios faltando ou vazios.
  - `404 Not Found`: Pet com o `pet_id` informado não encontrado.
  - `500 Internal Server Error`: Falha na conexão ou execução no MySQL.

---

## 📬 Testando com o Postman

O projeto inclui o arquivo **`AdoptYourPet.postman_collection.json`** na raiz do repositório (e na pasta `server/`) com todas as rotas configuradas.

### Como importar e executar no Postman:
1. Abra o **Postman**.
2. Clique no botão **Import** (canto superior esquerdo).
3. Selecione o arquivo **`AdoptYourPet.postman_collection.json`**.
4. A collection **AdoptYourPet API** será importada com a variável de ambiente `baseUrl` configurada para `http://localhost:3001`.
5. Com a API rodando (`cd server && npm start`), clique nas requisições da collection e clique em **Send** para testar imediatamente cada rota:
   - `1. Listar todos os pets` (`GET /pets`)
   - `2. Buscar pet por ID` (`GET /pets/1`)
   - `3. Cadastrar novo pet` (`POST /pets`)
   - `4. Registrar solicitação de adoção` (`POST /solicitacoes`)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior instalada)
- **MySQL Server** ativo na porta `3306`

---

### 1. Configurar o Banco de Dados
Certifique-se de que o servidor MySQL está em execução. O banco `adocao_pets` deve estar criado conforme a seção de esquema acima.

---

### 2. Configurar e Iniciar o Back-end

1. Abra um terminal e navegue até a pasta `server`:
   ```bash
   cd server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Verifique o arquivo `.env` (ou copie a partir do `.env.example`):
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=adocao_pets
   ```

4. *(Opcional)* Popule o banco com os 12 pets iniciais:
   ```bash
   npm run seed
   ```

5. Inicie a API:
   ```bash
   npm start
   ```
   > A API iniciará em: **`http://localhost:3001`**

---

### 3. Configurar e Iniciar o Front-end

1. Em um segundo terminal, navegue até a pasta `client`:
   ```bash
   cd client
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento Vite:
   ```bash
   npm run dev
   ```

4. Acesse no navegador o endereço indicado (por padrão: **`http://localhost:5173`**).

---

## 📜 Scripts Disponíveis

### No Front-end (`client/`):
- `npm run dev`: Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR).
- `npm run build`: Compila os assets e gera a versão otimizada de produção em `dist/`.
- `npm run lint`: Executa a verificação estática de código com o `oxlint`.
- `npm run preview`: Executa localmente o build de produção para testes de homologação.

### No Back-end (`server/`):
- `npm start`: Inicia o servidor Node.js com o arquivo `server.js`.
- `npm run dev`: Inicia o servidor com o modo observador (`node --watch server.js`).
- `npm run seed`: Executa a sincronização dos 12 registros de pets no MySQL.
- `npm run reset-db`: Reseta o banco de dados (recria as tabelas no novo formato unificado e popula os dados).

---

Desenvolvido para fins acadêmicos na disciplina de **Programação Web I**.
