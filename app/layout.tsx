import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "OctopusTech - Global Software Solutions",
  description:
    "OctopusTech is a global team of 4 passionate developers creating custom software solutions. We specialize in web applications, mobile apps, backend development, and cloud solutions for growing businesses.",
  keywords:
    "software development, custom software solutions, web applications, mobile apps, backend development, cloud solutions, startup solutions, software consulting, global team, small business software",
  authors: [{ name: "OctopusTech" }],
  creator: "OctopusTech",
  publisher: "OctopusTech",
  metadataBase: new URL("https://octopustech.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  category: "Technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "OctopusTech - Global Software Solutions",
    description:
      "OctopusTech is a global team of 4 passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses.",
    url: "https://octopustech.vercel.app/",
    siteName: "OctopusTech",
    images: [
      {
        url: "https://octopustech.vercel.app/og-image2.png",
        width: 1200,
        height: 630,
        alt: "OctopusTech - Global Software Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OctopusTech - Global Software Solutions",
    description:
      "OctopusTech is a global team of 4 passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses.",
    images: ["https://octopustech.vercel.app/og-image2.png"],
    creator: "@octopustech",
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
  applicationName: "octopustech",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "octopustech",
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
              name: "OctopusTech",
              url: "https://octopustech.vercel.app",
              logo: "https://octopustech.vercel.app/logooctopus.png",
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
                "https://twitter.com/octopustech",
                "https://linkedin.com/company/octopustech",
              ],
            }),
          }}
        />
        {/* Explicit meta tags for better Telegram compatibility */}
        <meta
          property="og:title"
          content="OctopusTech - Global Software Solutions"
        />
        <meta
          property="og:description"
          content="OctopusTech is a global team of 4 passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses."
        />
        <meta
          property="og:image"
          content="https://octopustech.vercel.app/og-image2.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="OctopusTech - Global Software Solutions"
        />
        <meta property="og:url" content="https://octopustech.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OctopusTech" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="OctopusTech - Global Software Solutions"
        />
        <meta
          name="twitter:description"
          content="OctopusTech is a global team of 4 passionate developers creating custom software solutions. We specialize in web applications, mobile apps, and cloud solutions for growing businesses."
        />
        <meta
          name="twitter:image"
          content="https://octopustech.vercel.app/og-image2.png"
        />
        <meta name="twitter:creator" content="@octopustech" />

        {/* Telegram-specific meta tags for better preview */}
        <meta name="telegram:channel" content="@octopustech" />
        <meta name="telegram:site" content="@octopustech" />

        {/* Additional meta tags for better compatibility */}
        <meta
          name="image"
          content="https://octopustech.vercel.app/og-image2.png"
        />
        <meta
          name="thumbnail"
          content="https://octopustech.vercel.app/og-image2.png"
        />
        <meta
          name="msapplication-TileImage"
          content="https://octopustech.vercel.app/og-image2.png"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
