import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Pool de conexão com MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "adocao_pets",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Converte o registro bruto do banco para o formato esperado pelo front-end:
 * - vacinado, castrado e vermifugado convertidos para booleans reais
 * - temperamento garantido como array de strings
 */
function formatPet(row) {
  let temperamento = row.temperamento;

  if (typeof temperamento === "string") {
    try {
      temperamento = JSON.parse(temperamento);
    } catch {
      temperamento = [];
    }
  }

  return {
    id: Number(row.id),
    nome: row.nome,
    especie: row.especie,
    tipo: row.tipo || (row.especie?.toLowerCase().includes("gato") ? "gato" : "cachorro"),
    sexo: row.sexo || "Não informado",
    porte: row.porte || "Médio",
    idade: row.idade,
    local: row.local,
    foto: row.foto,
    descricao: row.descricao,
    vacinado: Boolean(row.vacinado),
    castrado: Boolean(row.castrado),
    vermifugado: Boolean(row.vermifugado),
    temperamento: Array.isArray(temperamento) ? temperamento : [],
    historia: row.historia || row.descricao,
    status: row.status || "disponivel",
    criado_em: row.criado_em,
  };
}

// GET /pets - Retorna todos os pets cadastrados
app.get("/pets", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pets ORDER BY id ASC");
    const formattedPets = rows.map(formatPet);
    res.json(formattedPets);
  } catch (err) {
    console.error("Erro ao listar pets:", err);
    res.status(500).json({ error: "Erro ao buscar pets no banco de dados." });
  }
});

// GET /pets/:id - Retorna um pet específico por ID
app.get("/pets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM pets WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Pet não encontrado." });
    }
    res.json(formatPet(rows[0]));
  } catch (err) {
    console.error(`Erro ao buscar pet com ID ${id}:`, err);
    res.status(500).json({ error: "Erro ao consultar pet no banco de dados." });
  }
});

// POST /solicitacoes - Registra solicitação de adoção
app.post("/solicitacoes", async (req, res) => {
  const { pet_id, nome_completo, whatsapp, rotina } = req.body;

  // Validação dos campos obrigatórios
  if (!pet_id || !nome_completo?.trim() || !whatsapp?.trim() || !rotina?.trim()) {
    return res.status(400).json({
      error: "Campos obrigatórios ausentes: pet_id, nome_completo, whatsapp e rotina devem ser preenchidos.",
    });
  }

  try {
    // Verifica se o pet existe
    const [pets] = await pool.query("SELECT id, nome FROM pets WHERE id = ?", [pet_id]);
    if (pets.length === 0) {
      return res.status(404).json({ error: "Pet informado não foi encontrado." });
    }

    const [result] = await pool.query(
      `INSERT INTO solicitacoes_adocao (pet_id, nome_completo, whatsapp, rotina)
       VALUES (?, ?, ?, ?)`,
      [Number(pet_id), nome_completo.trim(), whatsapp.trim(), rotina.trim()]
    );

    res.status(201).json({
      id: result.insertId,
      pet_id: Number(pet_id),
      pet_nome: pets[0].nome,
      message: `Solicitação de adoção para ${pets[0].nome} registrada com sucesso!`,
    });
  } catch (err) {
    console.error("Erro ao registrar solicitação de adoção:", err);
    res.status(500).json({ error: "Erro ao salvar solicitação no banco de dados." });
  }
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`API REST rodando em http://localhost:${PORT}`);
});
