import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBox from "../components/SearchBox";
import FilterChips from "../components/FilterChips";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";
import { EVENTOS, TIPOS_EVENTO } from "../data/events";
import { useUserData } from "../context/UserDataContext";
import "./Agenda.css";

const MESES = [
  { valor: "todos", rotulo: "Todos os meses" },
  { valor: "2026-12", rotulo: "Dezembro de 2026" },
  { valor: "2027-01", rotulo: "Janeiro de 2027" },
];

export default function Agenda() {
  const { eventos: salvos, alternarEvento } = useUserData();
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [mes, setMes] = useState("todos");
  const [soGratis, setSoGratis] = useState(false);
  const [soSalvos, setSoSalvos] = useState(false);

  const termo = busca.trim().toLowerCase();
  const lista = EVENTOS.filter((e) => tipo === "Todos" || e.tipo === tipo)
    .filter((e) => mes === "todos" || e.data.startsWith(mes))
    .filter((e) => !soGratis || e.preco === 0)
    .filter((e) => !soSalvos || salvos.includes(e.id))
    .filter((e) => `${e.titulo} ${e.local} ${e.descricao}`.toLowerCase().includes(termo))
    .sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario));

  function limparFiltros() {
    setBusca("");
    setTipo("Todos");
    setMes("todos");
    setSoGratis(false);
    setSoSalvos(false);
  }

  return (
    <div className="page-enter">
      <PageHeader kicker="Área restrita · agenda" titulo="Agenda de eventos" texto="Shows, feiras, cultura e esporte em Paulista. Salve os eventos que você não quer perder.">
        <SearchBox valor={busca} onChange={setBusca} placeholder="Buscar evento, local…" />
        <label className="sr-only" htmlFor="mes">
          Mês
        </label>
        <select id="mes" className="select" value={mes} onChange={(e) => setMes(e.target.value)}>
          {MESES.map((m) => (
            <option key={m.valor} value={m.valor}>
              {m.rotulo}
            </option>
          ))}
        </select>
      </PageHeader>

      <div className="wrap agenda">
        <div className="agenda__filtros">
          <FilterChips opcoes={TIPOS_EVENTO} valor={tipo} onChange={setTipo} rotulo="Tipo de evento" />
          <label className="agenda__check">
            <input type="checkbox" checked={soGratis} onChange={(e) => setSoGratis(e.target.checked)} /> Só gratuitos
          </label>
          <label className="agenda__check">
            <input type="checkbox" checked={soSalvos} onChange={(e) => setSoSalvos(e.target.checked)} /> Só salvos ({salvos.length})
          </label>
        </div>

        <p className="agenda__total" aria-live="polite">
          {lista.length} {lista.length === 1 ? "evento encontrado" : "eventos encontrados"}
        </p>

        <div className="agenda__lista">
          {lista.length ? (
            lista.map((e) => <EventCard key={e.id} evento={e} salvo={salvos.includes(e.id)} onSalvar={alternarEvento} />)
          ) : (
            <EmptyState
              titulo="Nenhum evento com esses filtros"
              texto="Tente outro tipo, outro mês ou limpe a busca."
              acao={{ rotulo: "Limpar filtros", onClick: limparFiltros }}
            />
          )}
        </div>
      </div>
      <p className="data-note">Eventos fictícios, criados para demonstração do protótipo.</p>
    </div>
  );
}
