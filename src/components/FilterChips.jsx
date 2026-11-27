/**
 * Grupo de botões de filtro (um selecionado por vez).
 * Props:
 *  - opcoes: lista de textos ou de objetos { valor, rotulo }
 *  - valor: opção selecionada
 *  - onChange(valor): chamada ao clicar
 */
export default function FilterChips({ opcoes, valor, onChange, rotulo = "Filtros" }) {
  return (
    <div className="chips" role="group" aria-label={rotulo}>
      {opcoes.map((opcao) => {
        const item = typeof opcao === "string" ? { valor: opcao, rotulo: opcao } : opcao;
        return (
          <button
            key={item.valor}
            type="button"
            className="chip"
            aria-pressed={valor === item.valor}
            onClick={() => onChange(item.valor)}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}
