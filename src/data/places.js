import forte from "../assets/forte.jpg";
import barcos from "../assets/barcos.jpg";
import mare from "../assets/mare.jpg";
import mariaFarinha from "../assets/maria-farinha.jpg";
import conceicao from "../assets/conceicao.jpg";

// Pontos turísticos do guia. Fotos do Wikimedia Commons (créditos no README) e do grupo.
export const CATEGORIAS = ["Todos", "Praias", "História", "Lazer"];

export const PLACES = [
  {
    id: "forte",
    nome: "Forte de Pau Amarelo",
    categoria: "História",
    imagem: forte,
    credito: "Foto: Fabiana Barbosa do N. Silva / Wikimedia Commons (CC BY-SA 4.0)",
    resumo: "Fortaleza do século XVIII na orla de Pau Amarelo, um dos marcos históricos da cidade.",
    descricao:
      "Conhecido oficialmente como Forte de Nossa Senhora dos Prazeres do Pau Amarelo, foi construído pelos portugueses para defender a barra de Pau Amarelo — por onde os holandeses desembarcaram em 1630 antes de seguir para Olinda e Recife.",
    bairro: "Pau Amarelo",
    ideal: "Passeio histórico",
    tempo: "1 a 2 horas",
  },
  {
    id: "pau-amarelo",
    nome: "Praia de Pau Amarelo",
    categoria: "Praias",
    imagem: barcos,
    credito: "Foto: acervo do grupo",
    resumo: "Barcos de pescadores, maré baixa e o clima tranquilo do litoral norte.",
    descricao:
      "Na maré baixa, a faixa de areia se abre e os barcos coloridos ficam à vista. Bom lugar para caminhar pela orla e combinar com a visita ao forte.",
    bairro: "Pau Amarelo",
    ideal: "Caminhada e fotos",
    tempo: "Meio dia",
  },
  {
    id: "janga",
    nome: "Praia do Janga",
    categoria: "Praias",
    imagem: mare,
    credito: "Foto ilustrativa: acervo do grupo",
    resumo: "Orla movimentada, com quiosques e opções para passar o dia.",
    descricao:
      "Uma das praias mais conhecidas de Paulista, com orla urbana e opções de comida perto da areia. Ideal para quem quer praia com estrutura.",
    bairro: "Janga",
    ideal: "Praia com estrutura",
    tempo: "Dia inteiro",
  },
  {
    id: "maria-farinha",
    nome: "Maria Farinha",
    categoria: "Lazer",
    imagem: mariaFarinha,
    credito: "Foto: Jobosco / Wikimedia Commons (CC BY-SA 4.0)",
    resumo: "Passeios de barco e esportes aquáticos no encontro do rio com o mar.",
    descricao:
      "Ponto de saída de passeios de barco e conhecida pelos esportes náuticos. Uma boa escolha para quem quer aproveitar o mar de outro jeito.",
    bairro: "Maria Farinha",
    ideal: "Passeio de barco",
    tempo: "Meio dia",
  },
  {
    id: "conceicao",
    nome: "Praia de Conceição",
    categoria: "Praias",
    imagem: conceicao,
    credito: "Foto: Umbraosm / Wikimedia Commons (CC BY-SA 4.0)",
    resumo: "Faixa de areia mais calma para relaxar longe do movimento.",
    descricao:
      "Praia de clima mais tranquilo, boa para quem procura sossego, caminhada no fim de tarde e um banho de mar sem pressa.",
    bairro: "Conceição",
    ideal: "Descanso",
    tempo: "Meio dia",
  },
];
