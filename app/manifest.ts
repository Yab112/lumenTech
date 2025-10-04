import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OctopusTech - Global Software Solutions",
    short_name: "OctopusTech",
    description:
      "Global team of 4 passionate developers creating custom software solutions for growing businesses",
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
        src: "/logooctopus.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logooctopus.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
