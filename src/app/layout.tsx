import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Shrutivanam — Modern Spiritual Education",
    template: "%s | Shrutivanam",
  },
  description:
    "Authentic Vedic learning for the modern world. Courses in Vedic Maths, Yoga, Sanskrit, and Indian Philosophy.",
  keywords: [
    "spiritual education for kids",
    "Vedic Maths online",
    "Sanskrit for kids",
    "Indian philosophy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#FEF7ED] text-[#3B2E2A] antialiased overflow-x-hidden font-[family-name:var(--font-poppins)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
