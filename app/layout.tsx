import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
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
    description:
      "Less confusion. More impact.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans selection:text-white">
        {children}
      </body>
    </html>
  );
}
