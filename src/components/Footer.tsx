import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

const courses = [
  { href: "/courses/vedic-maths", label: "Vedic Mathematics" },
  { href: "/courses/yoga", label: "Yoga" },
  { href: "/courses/sanskrit", label: "Sanskrit" },
  { href: "/courses/philosophy", label: "Indian Philosophy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.15)] mt-0">
      <div
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, #0d0b1e 0%, #130e30 50%, #0d0b1e 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center text-[#0d0b1e] text-xl font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)]">
                  ॐ
                </div>
                <span className="font-[family-name:var(--font-cinzel)] text-xl font-semibold tracking-widest text-[#E2C97E]">
                  Shrutivanam
                </span>
              </Link>
              <p
                className="font-[family-name:var(--font-cormorant)] italic text-lg text-[#C9A84C] mb-3"
              >
                सा विद्या या विमुक्तये
              </p>
              <p className="text-[#C8BFAD]/70 text-sm leading-relaxed mb-6 max-w-xs">
                That which liberates is true knowledge. Shrutivanam is a
                platform for authentic Vedic learning — bridging ancient wisdom
                and modern life.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/917566585848"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.15)] hover:border-[#C9A84C] transition-all duration-300"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.15)] hover:border-[#C9A84C] transition-all duration-300"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.15)] hover:border-[#C9A84C] transition-all duration-300"
                >
                  <YoutubeIcon size={18} />
                </a>
                <a
                  href="mailto:shrutivanam@gmail.com"
                  aria-label="Email"
                  className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.15)] hover:border-[#C9A84C] transition-all duration-300"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-widest text-[#E2C97E] uppercase mb-5">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#C8BFAD]/70 hover:text-[#E2C97E] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-widest text-[#E2C97E] uppercase mb-5">
                Courses
              </h3>
              <ul className="space-y-3">
                {courses.map((course) => (
                  <li key={course.href}>
                    <Link
                      href={course.href}
                      className="text-[#C8BFAD]/70 hover:text-[#E2C97E] text-sm transition-colors duration-200"
                    >
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="gold-divider mt-12 mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#C8BFAD]/40 text-xs">
              © {new Date().getFullYear()} Shrutivanam. All rights reserved.
            </p>
            <p className="text-[#C8BFAD]/40 text-xs font-[family-name:var(--font-cormorant)] italic">
              Ancient knowledge. Modern path. Eternal wisdom.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
