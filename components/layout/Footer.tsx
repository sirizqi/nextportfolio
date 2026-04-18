import Link from 'next/link';
import { SiGithub, SiInstagram, SiX, SiThreads, SiWhatsapp, SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const socials = [
  { icon: SiGithub, href: 'https://github.com/sirizqi', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/rizqis/', label: 'LinkedIn' },
  { icon: SiInstagram, href: 'https://www.instagram.com/sirizqi_/', label: 'Instagram' },
  { icon: SiX, href: 'https://x.com/sirizqi11', label: 'X (Twitter)' },
  { icon: SiThreads, href: 'https://www.threads.com/@sirizqi_', label: 'Threads' },
  { icon: SiWhatsapp, href: 'https://wa.me/6285882266490', label: 'WhatsApp' },
  { icon: SiGmail, href: 'mailto:rizqisarasajati1109@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <Link href="/" aria-label="siRizqi Home">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gradient">si</span>
              <span className="text-foreground">Rizqi</span>
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Professional Product Executor. Expert in Product Life Cycle, Design, and Engineering.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2026 siRizqi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
