import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { OWNER_PROFILE, SOCIAL_LINKS } from '../data/socialLinks';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="px-[var(--gutter)] pt-14 pb-20 border-t border-[#292724] bg-[#050505] text-[#A39D94]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="#top"
              onClick={(e) => handleNav(e, 'top')}
              className="font-serif-editorial text-[32px] leading-none text-[#F1EEE7] hover:text-[#FF8047] transition-colors w-fit"
            >
              {OWNER_PROFILE.name}
            </a>
            <p className="text-[14px] text-[#A39D94] max-w-[360px] leading-[1.65]">
              {OWNER_PROFILE.role} · {OWNER_PROFILE.institution}
            </p>
            <p className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]/80 mt-1">
              {OWNER_PROFILE.location}
            </p>
          </div>

          {/* Section Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono-editorial uppercase tracking-[0.15em] text-[#F1EEE7]/80">
              INDEX
            </span>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-2 text-[13px]">
              <a
                href="#work"
                onClick={(e) => handleNav(e, 'work')}
                className="hover:text-[#F1EEE7] transition-colors w-fit"
              >
                Selected Work
              </a>
              <a
                href="#about"
                onClick={(e) => handleNav(e, 'about')}
                className="hover:text-[#F1EEE7] transition-colors w-fit"
              >
                About &amp; Provenance
              </a>
              <a
                href="#skills"
                onClick={(e) => handleNav(e, 'skills')}
                className="hover:text-[#F1EEE7] transition-colors w-fit"
              >
                Capabilities &amp; Stack
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNav(e, 'contact')}
                className="hover:text-[#F1EEE7] transition-colors w-fit"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Verified Profiles */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono-editorial uppercase tracking-[0.15em] text-[#F1EEE7]/80">
              VERIFIED CHANNELS
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-[#F1EEE7] transition-colors w-fit"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] font-mono-editorial text-[#A39D94]/70">
                    ({item.handle})
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF8047] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#292724]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono-editorial text-[#A39D94]">
          <span>
            © {currentYear} {OWNER_PROFILE.name}. Crafted with editorial restraint.
          </span>

          <button
            type="button"
            onClick={() => onNavigate('top')}
            className="group inline-flex items-center gap-2 text-[#F1EEE7] hover:text-[#FF8047] transition-colors uppercase tracking-[0.12em] whitespace-nowrap shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
