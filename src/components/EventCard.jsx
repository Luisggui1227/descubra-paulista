import { formatarData, formatarPreco } from "../data/events";
import "./EventCard.css";

/**
 * Cartão de um evento da agenda.
 * Props: evento (objeto), salvo (boolean), onSalvar(id).
 */
export default function EventCard({ evento, salvo, onSalvar }) {
  const [, mes, dia] = evento.data.split("-");
  const nomeMes = new Date(2026, Number(mes) - 1, 1).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");

  return (
    <article className={`event ${salvo ? "event--salvo" : ""}`}>
      <div className="event__data" aria-hidden="true">
        <b>{Number(dia)}</b>
        <span>{nomeMes}</span>
      </div>
      <div className="event__body">
        <div className="event__tags">
          <span className="event__tipo">{evento.tipo}</span>
          <span className={`event__preco ${evento.preco === 0 ? "event__preco--gratis" : ""}`}>{formatarPreco(evento.preco)}</span>
        </div>
        <h3>{evento.titulo}</h3>
        <p>{evento.descricao}</p>
        <div className="event__meta">
          <span>📅 {formatarData(evento.data)}</span>
          <span>🕑 {evento.horario}</span>
          <span>📍 {evento.local}</span>
        </div>
      </div>
      <button className="event__salvar" onClick={() => onSalvar(evento.id)} aria-pressed={salvo}>
        {salvo ? "✓ Salvo" : "+ Salvar"}
      </button>
    </article>
  );
}
