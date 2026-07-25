import type { Metadata } from "next";

export const SITE = {
  name: "Kivo",
  tagline: "Escalando ofertas e empresas no mercado.",
  description:
    "Kivo é uma agência de gestão de tráfego pago em Curitiba, com atuação nacional. Meta Ads, Google Ads, funis e dados — para marcas que querem escalar com previsibilidade.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kivosocial.com.br",
  locale: "pt_BR",
  twitter: "@kivo",
};

interface BuildMetadataArgs {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  noIndex = false,
  ogImage = "/og-image.png",
}: BuildMetadataArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    sameAs: [
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "pt-BR",
  };
}
