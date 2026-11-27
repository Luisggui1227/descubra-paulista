import { createContext, useContext, useState } from "react";

// Guarda usuários e sessão no navegador (protótipo, sem back-end).
const USERS_KEY = "dp-users";
const SESSION_KEY = "dp-session";

const DEMO_USER = {
  nome: "Visitante Demo",
  email: "demo@paulista.com",
  senha: "123456",
  interesses: ["Praias"],
};

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // sem localStorage: segue só em memória
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => read(USERS_KEY, [DEMO_USER]));
  const [user, setUser] = useState(() => read(SESSION_KEY, null));
  // true logo depois do logoff, para a tela de login mostrar a mensagem certa
  const [saiu, setSaiu] = useState(false);

  const findUser = (email) =>
    users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  function saveUsers(next) {
    setUsers(next);
    write(USERS_KEY, next);
  }

  function login(email, senha) {
    const found = findUser(email);
    if (!found || found.senha !== senha) {
      return { ok: false, erro: "E-mail ou senha incorretos." };
    }
    const session = { nome: found.nome, email: found.email, interesses: found.interesses };
    setUser(session);
    setSaiu(false);
    write(SESSION_KEY, session);
    return { ok: true, user: session };
  }

  function logout() {
    setSaiu(true);
    setUser(null);
    write(SESSION_KEY, null);
  }

  function register({ nome, email, senha, interesses }) {
    if (findUser(email)) {
      return { ok: false, erro: "Este e-mail já está cadastrado." };
    }
    saveUsers([...users, { nome, email: email.trim(), senha, interesses }]);
    return { ok: true };
  }

  function resetPassword(email, novaSenha) {
    const found = findUser(email);
    if (!found) return { ok: false };
    saveUsers(users.map((u) => (u === found ? { ...u, senha: novaSenha } : u)));
    return { ok: true };
  }

  const value = { user, saiu, login, logout, register, resetPassword };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
