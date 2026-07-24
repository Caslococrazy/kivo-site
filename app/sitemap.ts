import type { MetadataRoute } from "next";
import { casos } from "@/content/casos";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/servicos", "/metodo", "/casos", "/sobre", "/contato"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const casoRoutes = casos.map((caso) => ({
    url: `${SITE.url}/casos/${caso.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...casoRoutes];
}
