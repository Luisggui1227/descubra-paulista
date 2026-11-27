import { useState } from "react";
import "./FormField.css";

/**
 * Campo de formulário reutilizável: rótulo, input e mensagem de erro.
 * Em campos de senha mostra o botão de mostrar/ocultar.
 */
export default function FormField({ id, label, type = "text", error, children, ...inputProps }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="field__input">
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-erro` : undefined}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            className="field__eye"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {visible && <path d="M3 3l18 18" />}
            </svg>
          </button>
        )}
      </div>
      {children}
      {error && (
        <p className="field__error" id={`${id}-erro`}>
          {error}
        </p>
      )}
    </div>
  );
}
