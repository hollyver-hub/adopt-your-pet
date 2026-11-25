import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const petsData = [
  {
    id: 1,
    nome: "Mel",
    especie: "Cachorra",
    sexo: "Fêmea",
    porte: "Médio",
    idade: "2 anos",
    local: "Penedo - AL",
    foto: "https://images.pexels.com/photos/31040636/pexels-photo-31040636.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-31040636.jpg&fm=jpg",
    descricao: "Muito dócil, adora brincar e já é castrada.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Dócil", "Brincalhona", "Sociável", "Carinhosa"]),
    historia: "Mel foi resgatada próximo ao centro histórico de Penedo em um dia de muita chuva. Estava assustada, mas hoje é pura alegria! É extremamente companheira, se dá muito bem com outros cães e adora crianças. Pronta para encher uma família de afeto.",
    status: "disponivel"
  },
  {
    id: 2,
    nome: "Simba",
    especie: "Gato",
    sexo: "Macho",
    porte: "Pequeno",
    idade: "1 ano",
    local: "Penedo - AL",
    foto: "https://tse2.mm.bing.net/th/id/OIP.HNQ0V4YZdQv8HIsjYIGWgAHaHa?r=0&w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3",
    descricao: "Calmo, independente e ideal para apartamentos.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Tranquilo", "Independente", "Curioso", "Afetuoso"]),
    historia: "Simba foi encontrado filhote em uma caixa. Passou por tratamento e hoje é um felino saudável, elegante e sereno. Ele adora observar o movimento pela janela e tirar longos cochilos em locais fofinhos.",
    status: "disponivel"
  },
  {
    id: 3,
    nome: "Bob",
    especie: "Cachorro",
    sexo: "Macho",
    porte: "Pequeno",
    idade: "3 meses",
    local: "Neópolis - SE",
    foto: "https://tse1.mm.bing.net/th/id/OIP.dhhGqI8b4U6XvqwpsxFJqgHaH6?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    descricao: "Filhote cheio de energia e muito curioso.",
    vacinado: 1,
    castrado: 0,
    vermifugado: 1,
    temperamento: JSON.stringify(["Enérgico", "Filhote", "Curioso", "Amoroso"]),
    historia: "Bob é um bebezão resgatado junto com seus irmãos de ninhada. Ele é muito esperto, aprende rápido e adora correr atrás de bolinhas. Precisa de uma família disposta a educar um filhotinho com carinho e paciência.",
    status: "disponivel"
  },
  {
    id: 4,
    nome: "Luna",
    especie: "Gata",
    sexo: "Fêmea",
    porte: "Pequeno",
    idade: "2 anos",
    local: "Coruripe - AL",
    foto: "https://i.pinimg.com/736x/24/7b/84/247b84e0c9eda3bf60970d4d63fbd10c.jpg",
    descricao: "Carinhosa, adora tirar cochilos ao sol.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Calma", "Carinhosa", "Ronronenta", "Gentil"]),
    historia: "Luna é pura delicadeza. Resgatada em uma praia de Coruripe, hoje adora ficar no colo recebendo cafuné e ronronando bem baixinho. É tímida nos primeiros minutos, mas logo confia em quem lhe oferece amor.",
    status: "disponivel"
  },
  {
    id: 5,
    nome: "Thor",
    especie: "Cachorro",
    sexo: "Macho",
    porte: "Grande",
    idade: "3 anos",
    local: "Maceió - AL",
    foto: "https://adotar.com.br/upload/2017-12/animais_imagem315531.jpg?w=700&format=webp",
    descricao: "Protetor, leal e ótimo para espaços grandes.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Protetor", "Leal", "Ativo", "Companheiro"]),
    historia: "Thor é um grandalhão com coração de ouro. Seu tutor anterior precisou se mudar e não pôde levá-lo. Ele tem energia de sobra para passeios longos e ama proteger quem ama. Perfeito para casas com quintal.",
    status: "disponivel"
  },
  {
    id: 6,
    nome: "Jubileia",
    especie: "Cachorra",
    sexo: "Fêmea",
    porte: "Médio",
    idade: "9 anos",
    local: "Santana do São Francisco - SE",
    foto: "https://www.jornalpopulacional.com.br/storage/capaOriginal/noticia/1748541241.png",
    descricao: "Carismática, adora companhia e é ótima com crianças.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Idosinha Amorosa", "Dócil", "Paciente", "Tranquila"]),
    historia: "Jubileia é uma senhora muito especial. Cães idosos oferecem um amor maduro, sereno e muito leal. Ela não dá trabalho algum: só quer um cantinho confortável, passeios leves e muito carinho na barriga.",
    status: "disponivel"
  },
  {
    id: 7,
    nome: "Luluzinha",
    especie: "Cachorra",
    sexo: "Fêmea",
    porte: "Pequeno",
    idade: "3 meses",
    local: "Saúde - SE",
    foto: "https://i.redd.it/semuruj1on341.jpg",
    descricao: "Gosta de nadar, brincar e é muito sociável com outros pets.",
    vacinado: 1,
    castrado: 0,
    vermifugado: 1,
    temperamento: JSON.stringify(["Espoleta", "Sociável", "Divertida", "Brincalhona"]),
    historia: "Luluzinha é uma filhotinha elétrica e cheia de charme. Adora fazer amizade com todo mundo que passa e se dá muito bem com outros animais. Acompanhará todas as suas aventuras com um rabinho abanando sem parar.",
    status: "disponivel"
  },
  {
    id: 8,
    nome: "Jurema",
    especie: "Outros",
    sexo: "Fêmea",
    porte: "Médio",
    idade: "9 meses",
    local: "Carro Quebrado - SE",
    foto: "https://uploads.metropoles.com/wp-content/uploads/2023/05/02122221/Casal-viraliza-ao-decidir-adotar-dois-tamanduas-4.jpg",
    descricao: "Tímida, mas muito carinhosa quando se sente segura.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Curiosa", "Tranquila", "Especial", "Calma"]),
    historia: "Jurema é nosso mascote especial do santuário de proteção ecológica. Foi reabilitada após atropelamento e recebe acompanhamento veterinário com todo o amor de nossa equipe comunitária.",
    status: "disponivel"
  },
  {
    id: 9,
    nome: "Leona",
    especie: "Cachorra",
    sexo: "Fêmea",
    porte: "Médio",
    idade: "1 ano",
    local: "Penedo - AL",
    foto: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=700&q=80",
    descricao: "Gosta muito de passear durante o dia e também ama praia.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Ativa", "Companheira", "Amigável", "Sociável"]),
    historia: "Leona adora a brisa do Rio São Francisco e da praia. É jovem, saudável, super dócil e adora seguir seu humano para todos os lados. Procura tutores que gostem de passeios e ar livre.",
    status: "disponivel"
  },
  {
    id: 10,
    nome: "Pipoca",
    especie: "Gato",
    sexo: "Macho",
    porte: "Pequeno",
    idade: "6 meses",
    local: "Arapiraca - AL",
    foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80",
    descricao: "Lindo gatinho tigrado, adora caixas de papelão e carinho.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Brincalhão", "Curioso", "Ronronador", "Amigável"]),
    historia: "Pipoca foi resgatado em Arapiraca quando ainda cabia na palma da mão. Hoje está forte, brincalhão e procura um lar telado e seguro para encher de ronrons e brincadeiras.",
    status: "disponivel"
  },
  {
    id: 11,
    nome: "Chico",
    especie: "Cachorro",
    sexo: "Macho",
    porte: "Médio",
    idade: "4 anos",
    local: "Penedo - AL",
    foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80",
    descricao: "Equilibrado, educado e ótimo companheiro de caminhada.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Calmo", "Leal", "Companheiro", "Obediente"]),
    historia: "Chico é aquele cachorro que olha nos seus olhos e parece entender tudo o que você fala. Ele anda perfeitamente na coleira, não pula nas pessoas e adora uma soneca nos pés do sofá.",
    status: "disponivel"
  },
  {
    id: 12,
    nome: "Mia",
    especie: "Gata",
    sexo: "Fêmea",
    porte: "Pequeno",
    idade: "1 ano e meio",
    local: "Maceió - AL",
    foto: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80",
    descricao: "Pelagem macia, olhos expressivos e temperamento muito carinhoso.",
    vacinado: 1,
    castrado: 1,
    vermifugado: 1,
    temperamento: JSON.stringify(["Doce", "Carinhosa", "Tranquila", "Afetuosa"]),
    historia: "Mia adora dormir na cama perto do travesseiro. É extremamente amorosa e se adapta com facilidade tanto a quem mora sozinho quanto a famílias.",
    status: "disponivel"
  }
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "adocao_pets",
  });

  console.log("Conectado ao MySQL para popular dados...");

  for (const pet of petsData) {
    await connection.query(
      `INSERT INTO pets (id, nome, especie, sexo, porte, idade, local, foto, descricao, vacinado, castrado, vermifugado, temperamento, historia, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       nome = VALUES(nome), especie = VALUES(especie), sexo = VALUES(sexo),
       porte = VALUES(porte), idade = VALUES(idade), local = VALUES(local), foto = VALUES(foto),
       descricao = VALUES(descricao), vacinado = VALUES(vacinado), castrado = VALUES(castrado),
       vermifugado = VALUES(vermifugado), temperamento = VALUES(temperamento), historia = VALUES(historia),
       status = VALUES(status)`,
      [
        pet.id,
        pet.nome,
        pet.especie,
        pet.sexo,
        pet.porte,
        pet.idade,
        pet.local,
        pet.foto,
        pet.descricao,
        pet.vacinado,
        pet.castrado,
        pet.vermifugado,
        pet.temperamento,
        pet.historia,
        pet.status
      ]
    );
  }

  console.log(`Sucesso: ${petsData.length} pets sincronizados no banco de dados adocao_pets!`);
  await connection.end();
}

seed().catch((err) => {
  console.error("Erro ao popular o banco:", err);
  process.exit(1);
});
