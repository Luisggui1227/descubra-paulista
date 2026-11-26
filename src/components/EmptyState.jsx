import Button from "./Button";

/**
 * Mensagem para listas vazias.
 * Props: titulo, texto e acao opcional: { rotulo, to } para um link ou { rotulo, onClick } para um botão.
 */
export default function EmptyState({ titulo, texto, acao }) {
  return (
    <div className="empty-state">
      <h3>{titulo}</h3>
      {texto && <p>{texto}</p>}
      {acao && (
        <Button to={acao.to} onClick={acao.onClick} variant="dark">
          {acao.rotulo}
        </Button>
      )}
    </div>
  );
}
