import { useState } from "react";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import Button from "../components/Button";
import RoteiroItem from "../components/RoteiroItem";
import EmptyState from "../components/EmptyState";
import { PLACES } from "../data/places";
import { useUserData } from "../context/UserDataContext";
import "./Roteiro.css";

const hoje = () => new Date().toISOString().slice(0, 10);

export default function Roteiro() {
  const { roteiro, salvarRoteiro, limparRoteiro } = useUserData();

  // Cópia local para editar; só vai para o contexto ao clicar em Salvar.
  const [rascunho, setRascunho] = useState(roteiro);
  const [novoLugar, setNovoLugar] = useState("");
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");

  const alterado = JSON.stringify(rascunho) !== JSON.stringify(roteiro);
  const disponiveis = PLACES.filter((p) => !rascunho.itens.some((i) => i.placeId === p.id));

  function atualizar(mudancas) {
    setRascunho((r) => ({ ...r, ...mudancas }));
    setMensagem("");
  }

  function adicionarLugar() {
    if (!novoLugar) return;
    atualizar({ itens: [...rascunho.itens, { placeId: novoLugar, horario: "", nota: "" }] });
    setNovoLugar("");
  }

  function mudarItem(index, campo, valor) {
    atualizar({ itens: rascunho.itens.map((item, i) => (i === index ? { ...item, [campo]: valor } : item)) });
  }

  function moverItem(index, direcao) {
    const itens = [...rascunho.itens];
    const destino = index + direcao;
    [itens[index], itens[destino]] = [itens[destino], itens[index]];
    atualizar({ itens });
  }

  function removerItem(index) {
    atualizar({ itens: rascunho.itens.filter((_, i) => i !== index) });
  }

  function handleSalvar(e) {
    e.preventDefault();
    const novos = {};
    if (rascunho.nome.trim().length < 3) novos.nome = "Dê um nome ao roteiro (mínimo de 3 letras).";
    if (!rascunho.data) novos.data = "Escolha a data do passeio.";
    else if (rascunho.data < hoje()) novos.data = "A data não pode estar no passado.";
    if (!rascunho.itens.length) novos.itens = "Adicione pelo menos um lugar ao roteiro.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    salvarRoteiro({ ...rascunho, nome: rascunho.nome.trim() });
    setMensagem("Roteiro salvo! Ele também aparece no seu Painel.");
  }

  function handleLimpar() {
    limparRoteiro();
    setRascunho({ nome: "", data: "", itens: [] });
    setErros({});
    setMensagem("Roteiro apagado.");
  }

  return (
    <div className="page-enter">
      <PageHeader kicker="Área restrita · meu roteiro" titulo="Monte seu roteiro" texto="Escolha os lugares, defina a ordem e o horário de cada parada. Você pode editar quando quiser." />

      <form className="wrap roteiro" onSubmit={handleSalvar} noValidate>
        <section className="roteiro__dados">
          <h2>Dados do passeio</h2>
          <FormField id="nome-roteiro" label="Nome do roteiro" placeholder="Ex.: Sábado no litoral norte" value={rascunho.nome} onChange={(e) => atualizar({ nome: e.target.value })} error={erros.nome} />
          <FormField id="data-roteiro" label="Data" type="date" min={hoje()} value={rascunho.data} onChange={(e) => atualizar({ data: e.target.value })} error={erros.data} />

          <div className="roteiro__resumo">
            <div>
              <b>{rascunho.itens.length}</b>
              <span>{rascunho.itens.length === 1 ? "parada" : "paradas"}</span>
            </div>
            <div>
              <b>{rascunho.itens.filter((i) => i.horario).length}</b>
              <span>com horário</span>
            </div>
          </div>

          {mensagem && <p className="auth__success" role="status">{mensagem}</p>}
          <Button type="submit" block disabled={!alterado && Boolean(roteiro.nome)}>
            {roteiro.nome ? "Salvar alterações" : "Salvar roteiro"}
          </Button>
          {(roteiro.nome || rascunho.itens.length > 0) && (
            <Button type="button" variant="ghost" block onClick={handleLimpar}>
              Apagar roteiro
            </Button>
          )}
        </section>

        <section className="roteiro__paradas">
          <div className="roteiro__adicionar">
            <label htmlFor="novo-lugar" className="sr-only">
              Escolha um lugar
            </label>
            <select id="novo-lugar" className="select" value={novoLugar} onChange={(e) => setNovoLugar(e.target.value)} disabled={!disponiveis.length}>
              <option value="">{disponiveis.length ? "Escolha um lugar do guia…" : "Todos os lugares já estão no roteiro"}</option>
              {disponiveis.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({p.categoria})
                </option>
              ))}
            </select>
            <Button type="button" variant="dark" onClick={adicionarLugar} disabled={!novoLugar}>
              + Adicionar
            </Button>
          </div>
          {erros.itens && <p className="field__error">{erros.itens}</p>}

          {rascunho.itens.length ? (
            <ol className="roteiro__lista">
              {rascunho.itens.map((item, i) => (
                <RoteiroItem
                  key={item.placeId}
                  item={item}
                  place={PLACES.find((p) => p.id === item.placeId)}
                  posicao={i}
                  total={rascunho.itens.length}
                  onMudar={(campo, valor) => mudarItem(i, campo, valor)}
                  onMover={(direcao) => moverItem(i, direcao)}
                  onRemover={() => removerItem(i)}
                />
              ))}
            </ol>
          ) : (
            <EmptyState titulo="Seu roteiro está vazio" texto="Escolha um lugar acima ou use o botão “Adicionar ao roteiro” no Guia turístico." acao={{ to: "/guia", rotulo: "Abrir o guia" }} />
          )}
        </section>
      </form>
    </div>
  );
}
