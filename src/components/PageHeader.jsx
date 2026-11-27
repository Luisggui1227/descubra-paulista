import "./PageHeader.css";

/**
 * Cabeçalho das páginas internas (Guia, Agenda, Meu Roteiro, Painel).
 * Props: kicker (texto pequeno), titulo, texto e children (filtros, busca…).
 */
export default function PageHeader({ kicker, titulo, texto, children }) {
  return (
    <div className="page-header">
      <div className="wrap">
        {kicker && <span className="kicker">{kicker}</span>}
        <h1>{titulo}</h1>
        {texto && <p>{texto}</p>}
        {children && <div className="page-header__tools">{children}</div>}
      </div>
    </div>
  );
}
