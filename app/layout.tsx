import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { seoKeywords } from "@/app/constants/keywords";

export const metadata: Metadata = {
  title: "LumenTech - Global Software Solutions",
  description:
    "Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions.",
  keywords: seoKeywords.join(", "),
  authors: [{ name: "LumenTech" }],
  creator: "LumenTech",
  publisher: "LumenTech",
  metadataBase: new URL("https://lumentech.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  category: "Technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "LumenTech - Global Software Solutions",
    description:
      "Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions.",
    url: "https://lumentech.vercel.app/",
    siteName: "LumenTech",
    images: [
      {
        url: "https://lumentech.vercel.app/lumen-herosection.png",
        width: 1200,
        height: 630,
        alt: "LumenTech - Global Software Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumenTech - Global Software Solutions",
    description:
      "Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions.",
    images: ["https://lumentech.vercel.app/lumen-herosection.png"],
    creator: "@lumentech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "X2kFv1J397jTur9AxkAED_pIqsdLVu-_7qJteIkRTvw",
    yandex: "367cbb79bad959fa",
  },
  generator: "Next.js",
  applicationName: "lumentech",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "lumentech",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/lumen.jpeg", sizes: "any" },
      { url: "/lumen.jpeg", sizes: "16x16", type: "image/jpeg" },
      { url: "/lumen.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/lumen.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/lumen.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        rel: "android-chrome",
        url: "/lumen.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head suppressHydrationWarning>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LumenTech",
              alternateName: "Lumen Labs",
              url: "https://lumentech.vercel.app",
              logo: "https://lumentech.vercel.app/lumen.jpeg",
              description:
                "Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "9.1450",
                  longitude: "38.7614",
                },
              },
              knowsAbout: [
                "TypeScript",
                "Python",
                "Dart",
                "React",
                "Next.js",
                "Angular",
                "Flutter",
                "React Native",
                "Node.js",
                "FastAPI",
                "Firebase",
                "GCP",
                "AWS",
                "OpenAI",
                "LangChain",
                "Pinecone",
                "Full-Stack Development",
                "Microservices",
                "Event-Driven Systems",
                "AI/ML",
                "LLMs",
                "RAG pipelines",
                "CI/CD",
                "Docker",
                "Kubernetes",
                "Serverless Architecture",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Software Development Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Full-Stack Product Development",
                      description:
                        "Handling everything from backend architecture to frontend interfaces",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cross-Platform Mobile Apps",
                      description:
                        "Using Flutter and React Native to build apps that deploy across iOS and Android",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cloud-Native Infrastructure",
                      description:
                        "Implementing CI/CD, Docker, serverless architectures, and scalable deployments on platforms like GCP, AWS, and Firebase",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Microservices and Event-Driven Systems",
                      description:
                        "Designing future-proof architectures with Domain-Driven Design (DDD), message queues, and real-time pipelines",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI/ML and Automation",
                      description:
                        "Integrating advanced AI features such as large language models (LLMs), chatbots, recommendation engines, retrieval-augmented generation (RAG) pipelines, and automation capabilities",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Real-Time and Secure Workflows",
                      description:
                        "Managing notifications, live collaboration tools, authentication, and authorization securely and effectively",
                    },
                  },
                ],
              },
              sameAs: [
                "https://www.upwork.com/agencies/1960387200481392711/",
              ],
            }),
          }}
        />
        {/* Explicit meta tags for better Telegram compatibility */}
        <meta
          property="og:title"
          content="LumenTech - Global Software Solutions"
        />
        <meta
          property="og:description"
          content="Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions."
        />
        <meta
          property="og:image"
          content="https://lumentech.vercel.app/lumen-herosection.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="LumenTech - Global Software Solutions"
        />
        <meta property="og:url" content="https://lumentech.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LumenTech" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LumenTech - Global Software Solutions"
        />
        <meta
          name="twitter:description"
          content="Lumen Labs specializes in engineering scalable software tailored for ambitious startups and visionary teams, focusing on delivering real business outcomes. We excel in building high-impact digital platforms, moving products from MVPs to fully scalable SaaS solutions."
        />
        <meta
          name="twitter:image"
          content="https://lumentech.vercel.app/lumen-herosection.png"
        />
        <meta name="twitter:creator" content="@lumentech" />

        {/* Telegram-specific meta tags for better preview */}
        <meta name="telegram:channel" content="@lumentech" />
        <meta name="telegram:site" content="@lumentech" />

        {/* Additional meta tags for better compatibility */}
        <meta
          name="image"
          content="https://lumentech.vercel.app/lumen-herosection.png"
        />
        <meta
          name="thumbnail"
          content="https://lumentech.vercel.app/lumen-herosection.png"
        />
        <meta
          name="msapplication-TileImage"
          content="https://lumentech.vercel.app/lumen-herosection.png"
        />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Favicon Links - Using lumen.jpeg */}
        <link rel="icon" type="image/jpeg" href="/lumen.jpeg" />
        <link rel="shortcut icon" type="image/jpeg" href="/lumen.jpeg" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/lumen.jpeg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="ET-AA" />
        <meta name="geo.placename" content="Addis Ababa" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://www.upwork.com" />
        <link rel="dns-prefetch" href="https://www.upwork.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
