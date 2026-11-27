import "./SearchBox.css";

/** Campo de busca reutilizável. Props: valor, onChange(texto), placeholder. */
export default function SearchBox({ valor, onChange, placeholder = "Buscar…" }) {
  return (
    <label className="search-box">
      <span className="sr-only">Buscar</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E707A" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input type="search" value={valor} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}
