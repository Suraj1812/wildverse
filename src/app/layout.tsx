import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AosInit from "@/components/ui/aos-init";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wildverse.vercel.app"),
  applicationName: "WildVerse",
  title: {
    default: "WildVerse",
    template: "%s | WildVerse",
  },
  description:
    "WildVerse showcases wildlife stories, species highlights, conservation insights, and immersive animal-first experiences.",
  keywords: [
    "wildlife",
    "animals",
    "conservation",
    "biodiversity",
    "ecosystems",
    "species",
    "nature",
  ],
  authors: [{ name: "WildVerse Team" }],
  creator: "WildVerse Team",
  publisher: "WildVerse",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "WildVerse",
    title: "WildVerse",
    description:
      "Explore wildlife species, habitats, and conservation efforts through immersive visuals and stories.",
    images: [
      {
        url: "/favicon.ico",
        width: 256,
        height: 256,
        alt: "WildVerse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WildVerse",
    description:
      "Explore wildlife species, habitats, and conservation efforts through immersive visuals and stories.",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AosInit />
        {children}
      </body>
    </html>
  );
}
