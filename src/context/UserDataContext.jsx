import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// Dados de cada usuário logado: favoritos do guia, eventos salvos e o roteiro.
// Ficam no localStorage, separados por e-mail (protótipo sem back-end).

const ROTEIRO_VAZIO = { nome: "", data: "", itens: [] };
const VAZIO = { favoritos: [], eventos: [], roteiro: ROTEIRO_VAZIO };

const chave = (email) => `dp-dados-${email.toLowerCase()}`;

function ler(email) {
  try {
    const salvo = JSON.parse(localStorage.getItem(chave(email)));
    return salvo ? { ...VAZIO, ...salvo } : VAZIO;
  } catch {
    return VAZIO;
  }
}

const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email ?? null;
  const [dados, setDados] = useState(() => (email ? ler(email) : VAZIO));
  const [emailCarregado, setEmailCarregado] = useState(email);

  // Quando outro usuário entra, carrega os dados dele.
  if (email !== emailCarregado) {
    setEmailCarregado(email);
    setDados(email ? ler(email) : VAZIO);
  }

  useEffect(() => {
    if (!email) return;
    try {
      localStorage.setItem(chave(email), JSON.stringify(dados));
    } catch {
      // sem localStorage: os dados ficam só nesta visita
    }
  }, [email, dados]);

  const alternar = (lista, id) => (lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]);

  const value = {
    favoritos: dados.favoritos,
    eventos: dados.eventos,
    roteiro: dados.roteiro,

    alternarFavorito: (id) => setDados((d) => ({ ...d, favoritos: alternar(d.favoritos, id) })),
    alternarEvento: (id) => setDados((d) => ({ ...d, eventos: alternar(d.eventos, id) })),

    estaNoRoteiro: (placeId) => dados.roteiro.itens.some((i) => i.placeId === placeId),
    adicionarAoRoteiro: (placeId) =>
      setDados((d) =>
        d.roteiro.itens.some((i) => i.placeId === placeId)
          ? d
          : { ...d, roteiro: { ...d.roteiro, itens: [...d.roteiro.itens, { placeId, horario: "", nota: "" }] } }
      ),
    salvarRoteiro: (roteiro) => setDados((d) => ({ ...d, roteiro })),
    limparRoteiro: () => setDados((d) => ({ ...d, roteiro: ROTEIRO_VAZIO })),
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

// eslint-disable-next-line react/only-export-components
export function useUserData() {
  return useContext(UserDataContext);
}
