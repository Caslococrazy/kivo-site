import Logo from "./Logo";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "WhatsApp", href: "https://wa.me/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hair py-9 text-[13px] text-faint">
      <div className="wrap flex flex-wrap items-center justify-between gap-5">
        <Logo size={19} href="/" />
        <span>
          © {new Date().getFullYear()} Kivo · Tráfego pago &amp; performance ·
          Curitiba, BR
        </span>
        <div className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
