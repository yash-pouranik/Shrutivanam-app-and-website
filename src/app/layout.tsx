import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseOrb from "@/components/MouseOrb";
import Providers from "@/components/Providers";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shrutivanam — Spiritual Learning Platform",
    template: "%s | Shrutivanam",
  },
  description:
    "Shrutivanam offers authentic courses in Vedic Mathematics, Yoga, Sanskrit, and Indian Philosophy. Ancient wisdom made accessible for modern learners.",
  keywords: [
    "Vedic Maths course online",
    "Learn Sanskrit for beginners",
    "Yoga philosophy course India",
    "Spiritual education platform",
    "Indian philosophy online",
    "Vedic learning",
  ],
  openGraph: {
    type: "website",
    siteName: "Shrutivanam",
    title: "Shrutivanam — Spiritual Learning Platform",
    description:
      "Authentic courses in Vedic Mathematics, Yoga, Sanskrit & Indian Philosophy",
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-[#0d0b1e] text-[#F5F0E8] antialiased selection:bg-[#C9A84C]/30 selection:text-white">
        <Providers>
          <MouseOrb />
          <Navbar />
          
          {/* Main content wrapper for curtain reveal */}
          <div className="relative z-10 bg-[#0d0b1e] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border-b border-white/5">
            <main className="min-h-[calc(100vh-80px)] pt-24 md:pt-28">
              {children}
            </main>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
