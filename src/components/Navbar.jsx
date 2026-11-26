import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./Navbar.css";

const iniciais = (nome) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

const LINKS_RESTRITOS = [
  { to: "/painel", rotulo: "Painel" },
  { to: "/guia", rotulo: "Guia" },
  { to: "/agenda", rotulo: "Agenda" },
  { to: "/roteiro", rotulo: "Meu roteiro" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const fechar = () => setMenuAberto(false);

  // Logout: encerra a sessão e volta para o login.
  function sair() {
    fechar();
    logout();
    navigate("/login", { replace: true, state: { sucesso: "Você saiu da sua conta com segurança." } });
  }

  const links = user ? LINKS_RESTRITOS : [{ to: "/", rotulo: "Início" }, { to: "/guia", rotulo: "Guia turístico" }];

  return (
    <header className="navbar">
      <div className="wrap navbar__inner">
        <Link to={user ? "/painel" : "/"} className="navbar__logo" aria-label="Descubra Paulista" onClick={fechar}>
          <span className="navbar__mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F2B84B" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12a9 9 0 0 1 18 0z" />
              <path d="M12 12v9" />
              <path d="M8 21h8" />
            </svg>
          </span>
          <span className="navbar__brand">Descubra Paulista</span>
        </Link>

        <button
          className="navbar__toggle"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="menu-principal" className={`navbar__menu ${menuAberto ? "navbar__menu--aberto" : ""}`}>
          <nav className="navbar__links" aria-label="Principal">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={fechar}>
                {l.rotulo}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            {user ? (
              <>
                <div className="navbar__user">
                  <span className="navbar__avatar">{iniciais(user.nome)}</span>
                  <span className="navbar__name">{user.nome.split(" ")[0]}</span>
                </div>
                <Button variant="ghost" onClick={sair}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" to="/login" onClick={fechar}>
                  Entrar
                </Button>
                <Button to="/cadastro" onClick={fechar}>
                  Criar conta
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
