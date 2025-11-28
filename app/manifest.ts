import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LumenTech - Global Software Solutions",
    short_name: "LumenTech",
    description:
      "Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions.",
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
        sizes: "16x16",
        type: "image/jpeg",
      },
      {
        src: "/lumen.jpeg",
        sizes: "32x32",
        type: "image/jpeg",
      },
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
      {
        src: "/lumen.jpeg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
    shortcuts: [
      {
        name: "Services",
        short_name: "Services",
        description: "View our software development services",
        url: "/#services",
        icons: [{ src: "/lumen.jpeg", sizes: "32x32" }],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Get in touch with us",
        url: "/#contact",
        icons: [{ src: "/lumen.jpeg", sizes: "32x32" }],
      },
    ],
  };
}
