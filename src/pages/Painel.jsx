import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import { PLACES } from "../data/places";
import { EVENTOS, formatarData } from "../data/events";
import "./Painel.css";

// Interesses escolhidos no cadastro -> categorias do guia.
const INTERESSE_PARA_CATEGORIA = { Praias: "Praias", História: "História", Cultura: "História", Lazer: "Lazer", Gastronomia: "Lazer" };

export default function Painel() {
  const { user } = useAuth();
  const { favoritos, eventos, roteiro } = useUserData();

  const lugaresFavoritos = PLACES.filter((p) => favoritos.includes(p.id));
  const proximosEventos = EVENTOS.filter((e) => eventos.includes(e.id)).sort((a, b) => a.data.localeCompare(b.data));
  const categorias = (user.interesses ?? []).map((i) => INTERESSE_PARA_CATEGORIA[i]).filter(Boolean);
  const sugestoes = PLACES.filter((p) => !favoritos.includes(p.id) && (categorias.length === 0 || categorias.includes(p.categoria))).slice(0, 3);

  return (
    <div className="page-enter">
      <PageHeader kicker="Área restrita · painel" titulo={`Olá, ${user.nome.split(" ")[0]}!`} texto="Aqui fica tudo o que você salvou no Descubra Paulista.">
        {user.interesses?.length > 0 && (
          <div className="painel__interesses">
            Seus interesses:
            {user.interesses.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        )}
      </PageHeader>

      <div className="wrap painel">
        <div className="painel__stats">
          <StatCard numero={favoritos.length} rotulo="lugares favoritos" to="/guia" cor="coral" />
          <StatCard numero={eventos.length} rotulo="eventos salvos" to="/agenda" cor="teal" />
          <StatCard numero={roteiro.itens.length} rotulo="paradas no roteiro" to="/roteiro" cor="sun" />
        </div>

        <div className="painel__grade">
          <section className="painel__bloco">
            <header>
              <h2>Próximos eventos</h2>
              <Link to="/agenda">Ver agenda →</Link>
            </header>
            {proximosEventos.length ? (
              <ul className="painel__lista">
                {proximosEventos.map((e) => (
                  <li key={e.id}>
                    <b>{e.titulo}</b>
                    <span>
                      {formatarData(e.data)} · {e.horario} · {e.local}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="painel__vazio">Nenhum evento salvo. Na agenda, toque em “+ Salvar”.</p>
            )}
          </section>

          <section className="painel__bloco">
            <header>
              <h2>{roteiro.nome || "Meu roteiro"}</h2>
              <Link to="/roteiro">{roteiro.itens.length ? "Editar →" : "Montar →"}</Link>
            </header>
            {roteiro.data && <p className="painel__data">📅 {formatarData(roteiro.data)}</p>}
            {roteiro.itens.length ? (
              <ol className="painel__lista painel__lista--numerada">
                {roteiro.itens.map((item) => {
                  const lugar = PLACES.find((p) => p.id === item.placeId);
                  return (
                    <li key={item.placeId}>
                      <b>{lugar?.nome}</b>
                      <span>{item.horario ? `às ${item.horario}` : "sem horário"}{item.nota ? ` · ${item.nota}` : ""}</span>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="painel__vazio">Seu roteiro ainda está vazio.</p>
            )}
          </section>

          <section className="painel__bloco">
            <header>
              <h2>Favoritos</h2>
              <Link to="/guia">Abrir guia →</Link>
            </header>
            {lugaresFavoritos.length ? (
              <ul className="painel__lista">
                {lugaresFavoritos.map((p) => (
                  <li key={p.id}>
                    <b>♥ {p.nome}</b>
                    <span>{p.categoria} · {p.bairro}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="painel__vazio">Você ainda não favoritou nenhum lugar.</p>
            )}
          </section>

          <section className="painel__bloco painel__bloco--destaque">
            <header>
              <h2>Sugestões para você</h2>
            </header>
            <p className="painel__sub">{categorias.length ? "Com base nos interesses do seu cadastro." : "Lugares para começar."}</p>
            {sugestoes.length ? (
              <ul className="painel__lista">
                {sugestoes.map((p) => (
                  <li key={p.id}>
                    <b>{p.nome}</b>
                    <span>{p.resumo}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="painel__vazio">Você já favoritou todos os lugares dessas categorias. 🎉</p>
            )}
            <Button to="/guia" variant="dark">
              Explorar o guia
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
