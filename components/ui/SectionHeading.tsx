import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  tag?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  tag,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`mb-16 max-w-xl md:mb-[72px] ${className}`}>
      {tag && <div className="mb-4 text-[13px] text-faint">{tag}</div>}
      <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.14] text-ink">{title}</h2>
      {description && <p className="mt-5 text-muted">{description}</p>}
    </Reveal>
  );
}
