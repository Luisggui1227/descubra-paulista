import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha";
import Painel from "./pages/Painel";
import Guia from "./pages/Guia";
import Agenda from "./pages/Agenda";
import Roteiro from "./pages/Roteiro";

// Páginas da área restrita: só abrem para quem fez login.
const restrita = (pagina) => <ProtectedRoute>{pagina}</ProtectedRoute>;

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* Área restrita */}
        <Route path="/painel" element={restrita(<Painel />)} />
        <Route path="/guia" element={restrita(<Guia />)} />
        <Route path="/agenda" element={restrita(<Agenda />)} />
        <Route path="/roteiro" element={restrita(<Roteiro />)} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
