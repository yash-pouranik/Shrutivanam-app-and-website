"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Mail } from "lucide-react";
import Image from "next/image";

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

const coursesLinks = [
  { href: "/courses/vedic-maths", label: "Vedic Mathematics" },
  { href: "/courses/yoga", label: "Yoga" },
  { href: "/courses/sanskrit", label: "Sanskrit" },
  { href: "/courses/philosophy", label: "Indian Philosophy" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard and admin pages
  const isInternalPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isInternalPage) return null;

  return (
    <footer className="bg-white border-t border-[#EBDBCD] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF7F32] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-100 transition-transform group-hover:scale-110">
                <Image
                  src="/shrutivanam.logo.png"
                  alt="Shrutivanam logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <Image
                src="/shrutivanam.txt.png"
                alt="Shrutivanam"
                width={270}
                height={72}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            
            <p className="text-[#635A56] text-lg font-semibold leading-relaxed mb-10 max-w-md">
              Giving your child the best start in their spiritual and intellectual journey with authentic Vedic wisdom.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: MessageCircle, href: "https://wa.me/9039457108" },
                { icon: InstagramIcon, href: "https://www.instagram.com/shrutivanam_official?igsh=OHM1MzlmeXVtZXc0" },
                { icon: YoutubeIcon, href: "https://youtube.com/@shrutivanam108?si=mw8Z-G0d5CuBiZYw" },
                { icon: Mail, href: "mailto:shrutivanam108@gmail.com" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-[#FEF7ED] flex items-center justify-center text-[#FF7F32] hover:bg-[#FF7F32] hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-[#3B2E2A] text-sm font-black uppercase tracking-widest mb-8">
                Learn
              </h3>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#635A56] hover:text-[#FF7F32] font-bold text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Program Links */}
            <div>
              <h3 className="text-[#3B2E2A] text-sm font-black uppercase tracking-widest mb-8">
                Programs
              </h3>
              <ul className="space-y-4">
                {coursesLinks.map((course) => (
                  <li key={course.href}>
                    <Link
                      href={course.href}
                      className="text-[#635A56] hover:text-[#FF7F32] font-bold text-sm transition-colors"
                    >
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (Desktop Only or last) */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[#3B2E2A] text-sm font-black uppercase tracking-widest mb-8">
                Contact
              </h3>
              <p className="text-[#635A56] font-bold text-sm mb-2">shrutivanam108@gmail.com</p>
              <p className="text-[#A89F9B] text-xs font-bold italic uppercase tracking-wider">
                Ancient Knowledge. <br />
                Modern Path.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-[#FEF7ED] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#A89F9B] text-sm font-bold">
            © {new Date().getFullYear()} Shrutivanam. All rights reserved.
          </p>
          <p className="text-[#FF7F32] text-sm font-black italic">
            &quot;सा विद्या या विमुक्तये&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
