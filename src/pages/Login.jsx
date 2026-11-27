import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const aviso = location.state?.aviso;
  const sucesso = location.state?.sucesso;

  const [email, setEmail] = useState(location.state?.email ?? "");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const novos = {};
    if (!emailValido(email)) novos.email = "Informe um e-mail válido.";
    if (!senha) novos.senha = "Informe sua senha.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    const resultado = login(email, senha);
    if (!resultado.ok) {
      setErros({ senha: resultado.erro });
      return;
    }
    navigate(location.state?.from ?? "/painel", { replace: true });
  }

  return (
    <AuthLayout
      kicker="Bem-vindo de volta"
      title="A cidade está te esperando"
      text="Entre para acessar o guia completo, seus favoritos e seus roteiros."
    >
      <form onSubmit={handleSubmit} noValidate>
        <h1>Entrar</h1>
        <p className="auth__sub">Acesse a área restrita do Descubra Paulista.</p>
        {aviso && <p className="auth__alert">{aviso}</p>}
        {sucesso && <p className="auth__success">{sucesso}</p>}

        <FormField
          id="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={erros.email}
        />
        <FormField
          id="senha"
          label="Senha"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={erros.senha}
        />

        <p style={{ textAlign: "right", margin: "-4px 0 22px", fontSize: 14 }}>
          <Link className="auth__link" to="/esqueci-senha">
            Esqueci minha senha
          </Link>
        </p>

        <Button type="submit" variant="dark" block>
          Entrar
        </Button>
        <p className="auth__alt">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
        <p className="auth__alt" style={{ fontSize: 13 }}>
          Conta de teste: <b>demo@paulista.com</b> · senha <b>123456</b>
        </p>
      </form>
    </AuthLayout>
  );
}
