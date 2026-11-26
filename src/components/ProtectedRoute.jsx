import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Só deixa entrar em páginas da área restrita quem está logado.
export default function ProtectedRoute({ children }) {
  const { user, saiu } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={
          saiu
            ? { sucesso: "Você saiu da sua conta com segurança." }
            : { from: location.pathname, aviso: "Faça login para acessar a área restrita." }
        }
      />
    );
  }
  return children;
}
