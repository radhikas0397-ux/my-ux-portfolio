import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./responsive.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radhikasharma.design"),
  title: {
    default: "Radhika Sharma — UI/UX Designer",
    template: "%s — Radhika Sharma",
  },
  description: "Less confusion. More impact.",
  keywords: [
    "UI/UX Designer",
    "Product Design",
    "Dashboard Design",
    "Design Systems",
    "Climate-tech",
    "AI-assisted Design",
    "Radhika Sharma",
  ],
  authors: [{ name: "Radhika Sharma" }],
  openGraph: {
    title: "Radhika Sharma — UI/UX Designer",
    description: "Less confusion. More impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${satoshi.variable} ${cormorant.variable} h-full bg-background antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-accent/30 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
