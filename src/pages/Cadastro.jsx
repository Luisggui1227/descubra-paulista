import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "./Cadastro.css";

const INTERESSES = ["Praias", "História", "Cultura", "Lazer", "Gastronomia"];
const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function forcaDaSenha(senha) {
  let pontos = 0;
  if (senha.length >= 6) pontos++;
  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos++;
  if (/\d/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha) || senha.length >= 10) pontos++;
  return pontos;
}

const CORES_FORCA = ["#E8643A", "#E8643A", "#F2B84B", "#2A9D8F", "#0F7C8C"];

export default function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [interesses, setInteresses] = useState([]);
  const [erros, setErros] = useState({});

  const atualizar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  function alternarInteresse(item) {
    setInteresses((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novos = {};
    if (form.nome.trim().length < 2) novos.nome = "Informe seu nome.";
    if (!emailValido(form.email)) novos.email = "Informe um e-mail válido.";
    if (form.senha.length < 6) novos.senha = "A senha precisa ter no mínimo 6 caracteres.";
    if (!form.confirmar || form.confirmar !== form.senha) novos.confirmar = "As senhas não conferem.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    const resultado = register({ nome: form.nome.trim(), email: form.email, senha: form.senha, interesses });
    if (!resultado.ok) {
      setErros({ email: resultado.erro });
      return;
    }
    navigate("/login", { state: { email: form.email.trim(), sucesso: "Conta criada! Agora é só entrar." } });
  }

  const forca = forcaDaSenha(form.senha);

  return (
    <AuthLayout
      kicker="Crie sua conta"
      title="Seu roteiro por Paulista começa aqui"
      text="Conte o que você curte e o guia mostra primeiro o que tem a ver com você."
    >
      <form onSubmit={handleSubmit} noValidate>
        <h1>Criar conta</h1>
        <p className="auth__sub">Leva menos de um minuto.</p>

        <FormField id="nome" label="Nome completo" autoComplete="name" placeholder="Seu nome" value={form.nome} onChange={atualizar("nome")} error={erros.nome} />
        <FormField id="email" label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" value={form.email} onChange={atualizar("email")} error={erros.email} />

        <div className="cadastro__grid">
          <FormField id="senha" label="Senha" type="password" autoComplete="new-password" placeholder="Mín. 6 caracteres" value={form.senha} onChange={atualizar("senha")} error={erros.senha}>
            <div className="cadastro__forca" aria-hidden="true">
              <i style={{ width: `${forca * 25}%`, background: CORES_FORCA[forca] }} />
            </div>
          </FormField>
          <FormField id="confirmar" label="Confirmar senha" type="password" autoComplete="new-password" placeholder="Repita a senha" value={form.confirmar} onChange={atualizar("confirmar")} error={erros.confirmar} />
        </div>

        <fieldset className="cadastro__interesses">
          <legend>Seus interesses</legend>
          <div className="chips">
            {INTERESSES.map((item) => (
              <button
                type="button"
                key={item}
                className="chip"
                aria-pressed={interesses.includes(item)}
                onClick={() => alternarInteresse(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <Button type="submit" block>
          Criar minha conta
        </Button>
        <p className="auth__alt">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
