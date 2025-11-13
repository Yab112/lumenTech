import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LumenTech - Global Software Solutions",
    short_name: "LumenTech",
    description:
      "Global team of passionate developers creating custom software solutions for growing businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/lumen.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/lumen.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
