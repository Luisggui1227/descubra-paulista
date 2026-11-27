import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "./EsqueciSenha.css";

const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Fluxo em 3 passos: 1) informar e-mail, 2) aviso de e-mail enviado, 3) nova senha.
export default function EsqueciSenha() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erros, setErros] = useState({});

  function enviarLink(e) {
    e.preventDefault();
    if (!emailValido(email)) {
      setErros({ email: "Informe um e-mail válido." });
      return;
    }
    setErros({});
    setPasso(2);
  }

  function salvarSenha(e) {
    e.preventDefault();
    const novos = {};
    if (senha.length < 6) novos.senha = "A senha precisa ter no mínimo 6 caracteres.";
    if (!confirmar || confirmar !== senha) novos.confirmar = "As senhas não conferem.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    resetPassword(email, senha);
    navigate("/login", { state: { email: email.trim(), sucesso: "Senha alterada! Entre com a nova senha." } });
  }

  return (
    <AuthLayout
      kicker="Recuperar acesso"
      title="Acontece com todo mundo"
      text="Em poucos passos você cria uma nova senha e volta a explorar."
    >
      <div className="passos" aria-label={`Passo ${passo} de 3`}>
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= passo ? "ativo" : ""} />
        ))}
      </div>

      {passo === 1 && (
        <form onSubmit={enviarLink} noValidate>
          <h1>Esqueci minha senha</h1>
          <p className="auth__sub">Informe o e-mail da sua conta e enviaremos um link para criar uma nova senha.</p>
          <FormField id="email" label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} error={erros.email} />
          <Button type="submit" variant="dark" block>
            Enviar link de recuperação
          </Button>
          <p className="auth__alt">
            <Link to="/login">← Voltar para o login</Link>
          </p>
        </form>
      )}

      {passo === 2 && (
        <div className="esqueci__enviado">
          <div className="esqueci__icone">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0F7C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
          <h1>Verifique seu e-mail</h1>
          <p className="auth__sub">
            Se existir uma conta com <b>{email}</b>, você vai receber um link em instantes.
          </p>
          <Button variant="dark" block onClick={() => setPasso(3)}>
            Simular: abrir o link do e-mail
          </Button>
          <p className="auth__alt">
            <Link to="/login">Voltar para o login</Link>
          </p>
        </div>
      )}

      {passo === 3 && (
        <form onSubmit={salvarSenha} noValidate>
          <h1>Nova senha</h1>
          <p className="auth__sub">Escolha uma senha nova para a sua conta.</p>
          <FormField id="nova-senha" label="Nova senha" type="password" placeholder="Mín. 6 caracteres" value={senha} onChange={(e) => setSenha(e.target.value)} error={erros.senha} />
          <FormField id="confirmar-senha" label="Confirmar nova senha" type="password" placeholder="Repita a senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} error={erros.confirmar} />
          <Button type="submit" block>
            Salvar nova senha
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
