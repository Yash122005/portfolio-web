import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { OWNER_PROFILE } from '../data/socialLinks';

interface NavbarProps {
  motionEnabled: boolean;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  motionEnabled,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={motionEnabled ? { opacity: 0, y: -14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 md:top-4 left-3 right-3 sm:left-6 sm:right-6 z-40 mx-auto max-w-[1180px]"
    >
      <div
        className={`flex items-center justify-between gap-4 md:gap-8 h-[60px] md:h-[68px] px-4 sm:px-6 md:px-7 rounded-[20px] border transition-colors duration-300 ${
          scrolled
            ? 'bg-[#0C0B0AE6] border-[#F1EEE7]/15 shadow-[0_14px_40px_rgba(0,0,0,0.65)]'
            : 'bg-[#100F0EC4] border-[#F1EEE7]/12 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
        } backdrop-blur-xl`}
      >
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="font-serif-editorial text-[24px] md:text-[27px] font-medium tracking-[-0.02em] text-[#F1EEE7] hover:text-[#FF8047] transition-colors whitespace-nowrap shrink-0"
        >
          {OWNER_PROFILE.name}
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#A39D94]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F1EEE7]'
                    : 'text-[#A39D94] hover:text-[#F1EEE7]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#FF8047] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] text-[12px] font-medium tracking-[0.015em] text-[#F1EEE7] bg-[#F1EEE7]/[0.07] hover:bg-[#FF8047] hover:text-[#050505] border border-[#F1EEE7]/18 hover:border-[#FF8047] transition-all duration-200 whitespace-nowrap shrink-0 group"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-editorial-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-[10px] text-[11px] font-mono-editorial uppercase tracking-[0.1em] text-[#F1EEE7] border border-[#F1EEE7]/15 bg-[#151413]/80 hover:border-[#FF8047]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-editorial-nav"
            aria-label="Mobile Navigation"
            initial={motionEnabled ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-2 p-5 rounded-[18px] bg-[#0E0D0CF5] border border-[#F1EEE7]/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          >
            <div className="flex flex-col divide-y divide-[#292724]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center justify-between py-3.5 font-serif-editorial text-[26px] text-[#F1EEE7] hover:text-[#FF8047] transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF8047]" />
                </a>
              ))}
            </div>
            <div className="pt-4 mt-2 border-t border-[#292724]">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-[12px] text-[13px] font-medium bg-[#FF8047] text-[#050505] hover:bg-[#ff9261] transition-colors"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
