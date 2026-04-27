import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

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
  openGraph: {
    type: "website",
    siteName: "Shrutivanam",
    title: "Shrutivanam — Modern Spiritual Education",
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
      className={`${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#FEF7ED] text-[#3B2E2A] antialiased overflow-x-hidden font-[family-name:var(--font-poppins)]">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
