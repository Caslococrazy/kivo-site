import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[120px] pb-[90px]">
      <div className="wrap text-center">
        <div className="num text-[clamp(60px,10vw,120px)] leading-none text-green">404</div>
        <h1 className="mt-6 text-[clamp(24px,3vw,36px)]">Essa página não existe.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          O link pode ter mudado ou nunca existiu. A curva de crescimento continua na home.
        </p>
        <Link href="/" className="btn mt-10 inline-block">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
