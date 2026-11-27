import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Botão reutilizável.
 * variant: "primary" | "dark" | "ghost" | "outline-light"
 * Se receber `to`, vira um link do React Router.
 */
export default function Button({ variant = "primary", block = false, to, children, className = "", ...props }) {
  const classes = `btn btn--${variant} ${block ? "btn--block" : ""} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
