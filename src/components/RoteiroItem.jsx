import "./RoteiroItem.css";

/**
 * Uma parada do roteiro, com horário, anotação e botões para mover e remover.
 * Props: item, place, posicao, total, onMudar(campo, valor), onMover(direcao), onRemover().
 */
export default function RoteiroItem({ item, place, posicao, total, onMudar, onMover, onRemover }) {
  return (
    <li className="parada">
      <span className="parada__num">{posicao + 1}</span>
      <div className="parada__info">
        <div className="parada__topo">
          <h3>{place.nome}</h3>
          <span className="parada__cat">{place.categoria}</span>
        </div>
        <p>📍 {place.bairro} · ⏱ {place.tempo}</p>
        <div className="parada__campos">
          <label>
            <span>Horário</span>
            <input type="time" value={item.horario} onChange={(e) => onMudar("horario", e.target.value)} />
          </label>
          <label className="parada__nota">
            <span>Anotação</span>
            <input type="text" maxLength={80} placeholder="Ex.: levar protetor solar" value={item.nota} onChange={(e) => onMudar("nota", e.target.value)} />
          </label>
        </div>
      </div>
      <div className="parada__acoes">
        <button type="button" onClick={() => onMover(-1)} disabled={posicao === 0} aria-label={`Subir ${place.nome}`}>
          ↑
        </button>
        <button type="button" onClick={() => onMover(1)} disabled={posicao === total - 1} aria-label={`Descer ${place.nome}`}>
          ↓
        </button>
        <button type="button" className="parada__remover" onClick={onRemover} aria-label={`Remover ${place.nome}`}>
          ✕
        </button>
      </div>
    </li>
  );
}
