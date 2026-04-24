import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <body className="min-h-full antialiased selection:bg-orange-500 selection:text-white">
        <Providers>
          <Navbar />
          
          <div className="relative z-10 bg-white">
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
