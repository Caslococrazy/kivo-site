import Link from "next/link";
import type { CSSProperties } from "react";

interface LogoProps {
  size?: number;
  href?: string | null;
  className?: string;
  ariaHidden?: boolean;
}

function LogoMark() {
  return (
    <>
      <span className="k">k</span>
      <span className="i">
        <em>i</em>
      </span>
      <span className="vo">vo</span>
    </>
  );
}

export default function Logo({
  size = 24,
  href = "/",
  className = "",
  ariaHidden = false,
}: LogoProps) {
  const style: CSSProperties = { fontSize: size };

  if (!href) {
    return (
      <div
        className={`logo ${className}`}
        style={style}
        aria-hidden={ariaHidden}
      >
        <LogoMark />
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`logo ${className}`}
      style={style}
      aria-label="Kivo — início"
    >
      <LogoMark />
    </Link>
  );
}
