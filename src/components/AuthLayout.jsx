import "./AuthLayout.css";
import ceu from "../assets/ceu.jpg";

/**
 * Moldura das telas de autenticação (login, cadastro, esqueci a senha):
 * imagem com mensagem à esquerda e o formulário à direita.
 */
export default function AuthLayout({ kicker, title, text, children }) {
  return (
    <div className="auth page-enter">
      <aside className="auth__side" style={{ backgroundImage: `url(${ceu})` }}>
        <div>
          <span className="kicker kicker--light">{kicker}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </aside>
      <div className="auth__main">
        <div className="auth__card">{children}</div>
      </div>
    </div>
  );
}
