import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/gracias"],
      },
    ],
    sitemap: "https://grabarte.shop/sitemap.xml",
    host: "https://grabarte.shop",
  };
}
