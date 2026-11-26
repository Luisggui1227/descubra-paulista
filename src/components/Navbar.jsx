// Menu provisório — será substituído pela branch feature/navbar
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="wrap" style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "20px 0" }}>
      <Link to="/">Início</Link>
      <Link to="/login">Login</Link>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/esqueci-senha">Esqueci minha senha</Link>
      <Link to="/painel">Painel</Link>
      <Link to="/guia">Guia</Link>
      <Link to="/agenda">Agenda</Link>
      <Link to="/roteiro">Meu roteiro</Link>
    </header>
  );
}
