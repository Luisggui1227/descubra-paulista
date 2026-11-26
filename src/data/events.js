// Eventos FICTÍCIOS, só para demonstração do protótipo.
export const TIPOS_EVENTO = ["Todos", "Música", "Cultura", "Feira", "Esporte", "Gastronomia"];

export const EVENTOS = [
  {
    id: "luau-janga",
    titulo: "Luau na orla do Janga",
    tipo: "Música",
    data: "2026-12-05",
    horario: "19:00",
    local: "Orla do Janga",
    preco: 0,
    descricao: "Voz e violão ao ar livre, com repertório de MPB e forró pé de serra.",
  },
  {
    id: "feira-artesanato",
    titulo: "Feira de artesanato local",
    tipo: "Feira",
    data: "2026-12-06",
    horario: "09:00",
    local: "Praça de Pau Amarelo",
    preco: 0,
    descricao: "Artesãos da cidade com peças em renda, cerâmica, madeira e palha.",
  },
  {
    id: "visita-forte",
    titulo: "Visita guiada ao Forte de Pau Amarelo",
    tipo: "Cultura",
    data: "2026-12-12",
    horario: "10:00",
    local: "Forte de Pau Amarelo",
    preco: 10,
    descricao: "Passeio com guia contando a história do forte e da invasão holandesa de 1630.",
  },
  {
    id: "corrida-orla",
    titulo: "Corrida da orla 5 km",
    tipo: "Esporte",
    data: "2026-12-13",
    horario: "06:30",
    local: "Orla de Pau Amarelo",
    preco: 35,
    descricao: "Corrida e caminhada à beira-mar, com largada ao nascer do sol.",
  },
  {
    id: "festival-frutos-mar",
    titulo: "Festival de frutos do mar",
    tipo: "Gastronomia",
    data: "2026-12-19",
    horario: "12:00",
    local: "Maria Farinha",
    preco: 0,
    descricao: "Barracas de quiosques locais com pratos de peixe, camarão e caldinhos.",
  },
  {
    id: "ciranda",
    titulo: "Roda de ciranda",
    tipo: "Cultura",
    data: "2026-12-20",
    horario: "17:00",
    local: "Praia de Conceição",
    preco: 0,
    descricao: "Ciranda aberta ao público na beira da praia, para todas as idades.",
  },
  {
    id: "show-verao",
    titulo: "Show de abertura do verão",
    tipo: "Música",
    data: "2027-01-09",
    horario: "20:00",
    local: "Orla do Janga",
    preco: 20,
    descricao: "Bandas da região Metropolitana com frevo, brega e rock.",
  },
  {
    id: "passeio-barco",
    titulo: "Passeio de barco ao pôr do sol",
    tipo: "Esporte",
    data: "2027-01-16",
    horario: "16:30",
    local: "Maria Farinha",
    preco: 60,
    descricao: "Saída do píer de Maria Farinha para ver o pôr do sol no mar.",
  },
];

// "2026-12-05" -> "sáb., 5 de dez."
export function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" });
}

export const formatarPreco = (valor) => (valor === 0 ? "Gratuito" : `R$ ${valor}`);
