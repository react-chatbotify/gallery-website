import { useCallback, useEffect, useRef } from 'react';

/**
 * Provides seamless infinite horizontal auto-scrolling for a container.
 * Auto-scrolls content at a constant rate defined by `speed`.
 * Pauses auto-scroll on hover and resumes on hover end.
 * Enables click-and-drag manual scrolling, skipping drag for links and buttons.
 * Wraps scroll position when reaching half the scroll width to create a loop.
 *
 * @param speed scroll speed in pixels per millisecond (default: 0.1)
 * @param resetTrigger optional dependency to reset/restart the scroll effect when changed
 */
const useSeamlessScroll = (speed = 0.1, resetTrigger: any = null) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastTime = useRef<number>(0);

  // auto-scroll loop with consistent timing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf: number;

    const step = (currentTime: number) => {
      if (!lastTime.current) lastTime.current = currentTime;

      if (!isPaused.current && !isDragging.current) {
        const deltaTime = currentTime - lastTime.current;
        const scrollAmount = speed * deltaTime;

        el.scrollLeft += scrollAmount;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      lastTime.current = currentTime;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      lastTime.current = 0;
    };
  }, [speed, resetTrigger]);

  // pointer events for hover + drag
  const onPointerEnter = useCallback(() => {
    // pause auto-scroll on hover
    isPaused.current = true;
  }, []);

  const onPointerLeave = useCallback(() => {
    // resume auto-scroll on hover end
    isPaused.current = false;
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    lastTime.current = 0;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    // skip drag initiation on links or buttons
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    const el = containerRef.current!;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = containerRef.current!;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft.current - (x - startX.current);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    lastTime.current = 0;
  }, []);

  return {
    containerRef,
    handlers: {
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
      style: {
        cursor: 'grab',
        overflow: 'hidden',
        width: '100%' as const,
      },
    },
  };
};

export default useSeamlessScroll;
