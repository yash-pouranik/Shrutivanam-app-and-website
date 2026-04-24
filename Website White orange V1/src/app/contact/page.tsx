import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shrutivanam. Ask about our Vedic Mathematics, Yoga, Sanskrit, or Philosophy courses. We respond promptly on WhatsApp.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
