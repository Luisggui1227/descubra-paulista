import { Link } from "react-router-dom";
import "./StatCard.css";

/**
 * Cartão com um número em destaque que leva para outra página.
 * Props: numero, rotulo, to (rota), cor ("teal" | "coral" | "sun").
 */
export default function StatCard({ numero, rotulo, to, cor = "teal" }) {
  return (
    <Link to={to} className={`stat stat--${cor}`}>
      <b>{numero}</b>
      <span>{rotulo}</span>
      <i aria-hidden="true">→</i>
    </Link>
  );
}
