import "./PlaceCard.css";

export function FortIllustration({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F2B84B" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V9h3V6h3v3h6V6h3v3h3v12z" />
      <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
      <path d="M3 9h18" />
    </svg>
  );
}

export function Heart({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#E8643A" : "none"} stroke={filled ? "#E8643A" : "#10212B"} strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-4.4-9.3-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z" />
    </svg>
  );
}

/** Cartão de um ponto turístico, reutilizado na lista do guia. */
export default function PlaceCard({ place, favorito, onFavoritar, onAbrir }) {
  return (
    <article className="place">
      <div
        className={`place__img ${place.imagem ? "" : "place__img--ilustracao"}`}
        style={place.imagem ? { backgroundImage: `url(${place.imagem})` } : undefined}
      >
        {!place.imagem && <FortIllustration />}
        <span className="place__tag">{place.categoria}</span>
        <button
          className="place__fav"
          onClick={() => onFavoritar(place.id)}
          aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={favorito}
        >
          <Heart filled={favorito} />
        </button>
      </div>
      <div className="place__body">
        <h3>{place.nome}</h3>
        <p>{place.resumo}</p>
        <div className="place__meta">
          <span>📍 {place.bairro}</span>
          <span>⏱ {place.tempo}</span>
        </div>
        <button className="place__link" onClick={() => onAbrir(place)}>
          Ver detalhes →
        </button>
      </div>
    </article>
  );
}
