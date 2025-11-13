import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "LumenTech - Global Software Solutions",
  description:
    "LumenTech is a global team of passionate developers creating custom software solutions. We specialize in web applications, mobile apps, backend development, and cloud solutions for growing businesses.",
  keywords:
    "software development, custom software solutions, web applications, mobile apps, backend development, cloud solutions, startup solutions, software consulting, global team, small business software",
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
      "LumenTech is a global team of passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses.",
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
      "LumenTech is a global team of passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses.",
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
              url: "https://lumentech.vercel.app",
              logo: "https://lumentech.vercel.app/lumen.jpeg",
              description:
                "Enterprise-grade software solutions for Fortune 500 companies and high-growth startups",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ET",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
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
          content="LumenTech is a global team of passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses."
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
          content="LumenTech is a global team of passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses."
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
