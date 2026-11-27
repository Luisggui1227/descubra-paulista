import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceCard, { FortIllustration } from "../components/PlaceCard";
import PageHeader from "../components/PageHeader";
import SearchBox from "../components/SearchBox";
import FilterChips from "../components/FilterChips";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { PLACES, CATEGORIAS } from "../data/places";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import "./Guia.css";

export default function Guia() {
  const { user } = useAuth();
  const { favoritos, alternarFavorito, estaNoRoteiro, adicionarAoRoteiro } = useUserData();
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState(null);

  // Fecha os detalhes com a tecla Esc.
  useEffect(() => {
    const fechar = (e) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, []);

  const termo = busca.trim().toLowerCase();
  const lista = PLACES.filter((p) => {
    const passaFiltro = filtro === "Todos" || p.categoria === filtro || (filtro === "Favoritos" && favoritos.includes(p.id));
    const passaBusca = `${p.nome} ${p.resumo} ${p.bairro}`.toLowerCase().includes(termo);
    return passaFiltro && passaBusca;
  });

  const opcoes = [...CATEGORIAS, { valor: "Favoritos", rotulo: `♥ Favoritos (${favoritos.length})` }];

  return (
    <div className="page-enter">
      <PageHeader kicker={`Olá, ${user.nome.split(" ")[0]} · área restrita`} titulo="Guia turístico de Paulista" texto="Praias, história e lazer para conhecer na cidade.">
        <SearchBox valor={busca} onChange={setBusca} placeholder="Buscar praia, forte, passeio…" />
        <FilterChips opcoes={opcoes} valor={filtro} onChange={setFiltro} rotulo="Categoria" />
      </PageHeader>

      <div className="wrap guia__lista">
        {lista.length ? (
          lista.map((p) => <PlaceCard key={p.id} place={p} favorito={favoritos.includes(p.id)} onFavoritar={alternarFavorito} onAbrir={setAberto} />)
        ) : (
          <EmptyState
            titulo={filtro === "Favoritos" ? "Nenhum favorito ainda" : "Nenhum lugar encontrado"}
            texto={filtro === "Favoritos" ? "Toque no ♥ de um cartão para salvar o lugar." : "Tente outra palavra ou outra categoria."}
          />
        )}
      </div>

      {aberto && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" onClick={(e) => e.target === e.currentTarget && setAberto(null)}>
          <div className="modal__sheet">
            <div className={`modal__img ${aberto.imagem ? "" : "place__img--ilustracao"}`} style={aberto.imagem ? { backgroundImage: `url(${aberto.imagem})` } : undefined}>
              {!aberto.imagem && <FortIllustration size={110} />}
              <button className="modal__fechar" onClick={() => setAberto(null)} aria-label="Fechar" autoFocus>
                ✕
              </button>
            </div>
            <div className="modal__body">
              <span className="kicker">{aberto.categoria}</span>
              <h2 id="modal-titulo">{aberto.nome}</h2>
              <p>{aberto.descricao}</p>
              <div className="modal__fatos">
                <div><small>Bairro</small><b>{aberto.bairro}</b></div>
                <div><small>Ideal para</small><b>{aberto.ideal}</b></div>
                <div><small>Tempo sugerido</small><b>{aberto.tempo}</b></div>
              </div>
              <div className="modal__acoes">
                <Button variant={favoritos.includes(aberto.id) ? "dark" : "primary"} onClick={() => alternarFavorito(aberto.id)}>
                  {favoritos.includes(aberto.id) ? "♥ Salvo nos favoritos" : "♡ Salvar nos favoritos"}
                </Button>
                {estaNoRoteiro(aberto.id) ? (
                  <Link className="modal__link" to="/roteiro">✓ Está no seu roteiro · ver roteiro</Link>
                ) : (
                  <Button variant="ghost" onClick={() => adicionarAoRoteiro(aberto.id)}>
                    + Adicionar ao roteiro
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
