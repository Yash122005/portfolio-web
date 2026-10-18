import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'yash_portfolio_motion_pref';

export interface MotionPreferenceState {
  motionEnabled: boolean;
  systemReduced: boolean;
  userOverride: 'on' | 'off' | null;
  toggleMotion: () => void;
}

export function useReducedMotionPreference(): MotionPreferenceState {
  const [systemReduced, setSystemReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [userOverride, setUserOverride] = useState<'on' | 'off' | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'on' || saved === 'off') return saved;
    } catch {
      // ignore storage errors
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemReduced(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const motionEnabled = userOverride !== null ? userOverride === 'on' : !systemReduced;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-motion', motionEnabled ? 'on' : 'off');
  }, [motionEnabled]);

  const toggleMotion = useCallback(() => {
    setUserOverride((prev) => {
      const currentEffective = prev !== null ? prev === 'on' : !systemReduced;
      const next: 'on' | 'off' = currentEffective ? 'off' : 'on';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, [systemReduced]);

  return {
    motionEnabled,
    systemReduced,
    userOverride,
    toggleMotion,
  };
}
