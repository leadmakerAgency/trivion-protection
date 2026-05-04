import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSurface = "dark" | "light";

const variantClassesDark: Record<ButtonVariant, string> = {
  primary:
    "border border-solid border-accent bg-accent text-background font-semibold hover:bg-accent-dark",
  secondary:
    "border border-solid border-accent bg-card text-accent font-semibold hover:bg-panel",
  ghost: "text-foreground/90 hover:bg-panel hover:text-accent",
};

const variantClassesLight: Record<ButtonVariant, string> = {
  primary:
    "border border-solid border-accent-dark bg-accent text-background font-semibold hover:bg-accent-dark hover:text-background",
  secondary:
    "border border-solid border-surface-light-edge bg-white text-accent-dark font-semibold shadow-sm hover:border-accent-dark/40 hover:bg-surface-light",
  ghost:
    "text-foreground-on-light hover:bg-surface-light-edge hover:text-accent-dark",
};

type Common = {
  variant?: ButtonVariant;
  /** Use "light" on `bg-surface-light` and other paper-tone sections for readable contrast */
  surface?: ButtonSurface;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type ButtonAsLink = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export const Button = (props: ButtonAsButton | ButtonAsLink) => {
  const { variant = "primary", surface = "dark", className = "" } = props;
  const focus =
    surface === "light" ? "focus-ring-on-light" : "focus-ring";
  const base = `${focus} inline-flex items-center justify-center gap-2 rounded-sm border-solid px-5 py-3 text-base font-medium shadow-none [background-image:none] appearance-none transition-colors`;
  const palette = surface === "light" ? variantClassesLight : variantClassesDark;

  if ("href" in props && props.href) {
    // Drop custom Button props so they are not forwarded to <Link />.
    const { href, children, variant: _omitVariant, surface: _omitSurface, className: _omitClass, ...rest } =
      props;
    void _omitVariant;
    void _omitSurface;
    void _omitClass;
    return (
      <Link
        href={href}
        className={`${base} ${palette[variant]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { children, type = "button", variant: _omitV, surface: _omitS, className: _omitC, ...rest } =
    props as ButtonAsButton;
  void _omitV;
  void _omitS;
  void _omitC;
  return (
    <button
      type={type}
      className={`${base} ${palette[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
