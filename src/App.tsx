/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { useReducedMotionPreference } from './hooks/useReducedMotion';
import { Navbar } from './components/Navbar';
import { EditorialHero } from './components/EditorialHero';
import { TextScrambleSection } from './sections/TextScrambleSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { MotionToggle } from './components/MotionToggle';

const PORTRAIT_STORAGE_KEY = 'yash_portfolio_custom_portrait_v1';

export default function App() {
  const { motionEnabled, toggleMotion } = useReducedMotionPreference();
  const [activeSection, setActiveSection] = useState<string>('top');
  const [customPortraitDataUrl, setCustomPortraitDataUrl] = useState<
    string | null
  >(() => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(PORTRAIT_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const handleUpdatePortrait = useCallback((dataUrl: string | null) => {
    setCustomPortraitDataUrl(dataUrl);
    try {
      if (dataUrl) {
        window.localStorage.setItem(PORTRAIT_STORAGE_KEY, dataUrl);
      } else {
        window.localStorage.removeItem(PORTRAIT_STORAGE_KEY);
      }
    } catch {
      // ignore storage quota errors
    }
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      if (sectionId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: motionEnabled ? 'smooth' : 'auto',
        });
        setActiveSection('top');
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: motionEnabled ? 'smooth' : 'auto',
          block: 'start',
        });
        setActiveSection(sectionId);
      }
    },
    [motionEnabled]
  );

  useEffect(() => {
    const sectionIds = ['top', 'work', 'about', 'skills', 'faq', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      if (window.scrollY < 180) {
        setActiveSection('top');
        return;
      }
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1EEE7] selection:bg-[#FF8047] selection:text-[#050505]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-[8px] focus:bg-[#FF8047] focus:text-[#050505] focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Floating Capsule Navigation */}
      <Navbar
        motionEnabled={motionEnabled}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main id="main-content">
        <EditorialHero
          motionEnabled={motionEnabled}
          onNavigate={handleNavigate}
          customPortraitDataUrl={customPortraitDataUrl}
        />

        <TextScrambleSection motionEnabled={motionEnabled} />

        <ProjectsSection motionEnabled={motionEnabled} />

        <AboutSection
          motionEnabled={motionEnabled}
          customPortraitDataUrl={customPortraitDataUrl}
          onUpdatePortrait={handleUpdatePortrait}
        />

        <SkillsSection motionEnabled={motionEnabled} />

        <FAQSection motionEnabled={motionEnabled} />

        <ContactSection motionEnabled={motionEnabled} />
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Unobtrusive Motion Toggle */}
      <MotionToggle motionEnabled={motionEnabled} onToggle={toggleMotion} />
    </div>
  );
}
