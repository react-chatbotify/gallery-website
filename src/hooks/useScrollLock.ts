import { useLayoutEffect } from 'react';

import useIsDesktop from '@/hooks/useIsDesktop';

/**
 * Locks scrolling of page.
 *
 * @param shouldLock boolean indicating whether to lock scrolling
 */
const useScrollLock = (shouldLock: boolean) => {
  const isDesktop = useIsDesktop(); // ← evaluate desktop vs mobile

  useLayoutEffect(() => {
    if (!shouldLock) {
      return;
    }

    const scrollY = window.scrollY;
    const original = {
      height: document.body.style.height,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    // only on mobile: prevent touch-move outside scrollable areas
    let preventTouchMove: (e: TouchEvent) => void;
    let preventWheel: (e: WheelEvent) => void;
    if (!isDesktop) {
      preventTouchMove = (e) => {
        let el = e.target as HTMLElement | null;
        while (el && el !== document.body) {
          const { overflow, overflowY } = window.getComputedStyle(el);
          if (/auto|scroll/.test(overflow + overflowY)) return;
          el = el.parentElement;
        }
        e.preventDefault();
      };
      preventWheel = (e) => e.preventDefault();

      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      document.addEventListener('wheel', preventWheel, { passive: false });
    }

    return () => {
      // restore styles
      Object.assign(document.body.style, {
        height: original.height,
        overflow: original.overflow,
        position: original.position,
        top: original.top,
        width: original.width,
      });
      window.scrollTo(0, scrollY);

      // only remove on mobile
      if (!isDesktop) {
        document.removeEventListener('touchmove', preventTouchMove!);
        document.removeEventListener('wheel', preventWheel!);
      }
    };
  }, [shouldLock, isDesktop]);
};

export default useScrollLock;
