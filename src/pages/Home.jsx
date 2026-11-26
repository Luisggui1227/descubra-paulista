import { Link } from "react-router-dom";
import Button from "../components/Button";
import orla from "../assets/orla.jpg";
import barcos from "../assets/barcos.jpg";
import "./Home.css";

// Recursos do app: a lista é percorrida com .map() para montar os cartões.
const RECURSOS = [
  { titulo: "Guia turístico", texto: "Praias, história e lazer com busca, filtros e favoritos.", to: "/guia", icone: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" },
  { titulo: "Agenda de eventos", texto: "Shows, feiras e cultura da cidade. Salve os que não quer perder.", to: "/agenda", icone: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4" },
  { titulo: "Meu roteiro", texto: "Monte o seu passeio: escolha os lugares, a ordem e o horário.", to: "/roteiro", icone: "M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" },
  { titulo: "Painel", texto: "Favoritos, eventos salvos e roteiro reunidos em um só lugar.", to: "/painel", icone: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" },
];

export default function Home() {
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${orla})` }} role="img" aria-label="Barcos de pesca na maré baixa no litoral de Paulista" />
        <div className="wrap hero__content">
          <span className="kicker kicker--light">Paulista · Pernambuco</span>
          <h1>Descubra Paulista</h1>
          <p>Praias, história e cultura da cidade reunidas em um só lugar. Encontre o que fazer, monte seu roteiro e salve seus lugares favoritos.</p>
          <div className="hero__cta">
            <Button to="/cadastro">Criar conta grátis</Button>
            <Button to="/guia" variant="outline-light">
              Explorar o guia
            </Button>
          </div>
          <div className="hero__stats">
            <div><b>5</b><span>pontos no guia</span></div>
            <div><b>8</b><span>eventos na agenda</span></div>
            <div><b>100%</b><span>gratuito</span></div>
          </div>
        </div>
      </section>

      <section className="home-section wrap">
        <div className="home-section__head">
          <div>
            <span className="kicker">O que o app oferece</span>
            <h2>Tudo o que fazer na cidade, sem procurar em mil lugares</h2>
          </div>
          <p>Hoje as informações sobre Paulista estão espalhadas em redes sociais e sites desatualizados. O Descubra Paulista junta tudo.</p>
        </div>
        <div className="recursos">
          {RECURSOS.map((r) => (
            <Link to={r.to} className="recurso" key={r.titulo}>
              <div className="recurso__icone">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={r.icone} />
                </svg>
              </div>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap teaser">
        <div className="teaser__img" style={{ backgroundImage: `url(${barcos})` }} role="img" aria-label="Barcos coloridos na orla" />
        <div className="teaser__body">
          <span className="kicker kicker--light">Área do visitante</span>
          <h2>Entre e tenha o guia completo</h2>
          <p>Com a sua conta, você acessa a área restrita: guia com filtros, agenda de eventos, roteiro personalizado e um painel com tudo o que salvou.</p>
          <Button to="/login">Entrar na minha conta</Button>
        </div>
      </section>
    </div>
  );
}
