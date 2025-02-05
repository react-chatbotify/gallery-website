import { useMemo } from 'react';

/**
 * Checks if user is on desktop or mobile.
 */
const useIsDesktop = () => {
  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined' || !window.navigator) {
      return false;
    }

    const userAgent = navigator.userAgent;
    const isNotMobileUA = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
    const isWideEnough = window.innerWidth >= 768;

    // device is desktop if it is not a mobile agent and if the width is wide enough
    return isNotMobileUA && isWideEnough;
  }, []);

  // boolean indicating if user is on desktop (otherwise treated as on mobile)
  return isDesktop;
};

export default useIsDesktop;