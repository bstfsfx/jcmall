import type { MetadataRoute } from "next";
import { getProducts } from "@/actions/product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const products = await getProducts();
  const locales = ['en', 'zh'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const staticPages = [
      { url: `${baseUrl}/${locale}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
      { url: `${baseUrl}/${locale}/shop`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
      { url: `${baseUrl}/${locale}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
      { url: `${baseUrl}/${locale}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    ];

    const productPages = products.map((p) => ({
      url: `${baseUrl}/${locale}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    sitemap.push(...staticPages, ...productPages);
  }

  return sitemap;
}
