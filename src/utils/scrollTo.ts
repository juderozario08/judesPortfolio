const NAV_OFFSET = 90;

export interface ScrollToOptions {
  smooth?: boolean;
  offset?: number;
  updateHash?: boolean;
}

/**
 * Scrolls to a target element by ID or to the top of the page if ID is 'home' or empty.
 * Returns true if element was found and scrolled to, or false if element does not exist.
 */
export const scrollToSection = (
  targetId: string,
  optionsOrSmooth: boolean | ScrollToOptions = {}
): boolean => {
  const options: ScrollToOptions =
    typeof optionsOrSmooth === 'boolean'
      ? { smooth: optionsOrSmooth }
      : optionsOrSmooth;

  const { smooth = true, offset = NAV_OFFSET, updateHash = false } = options;
  const cleanId = targetId.replace(/^#/, '');

  if (!cleanId || cleanId === 'home') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    if (updateHash) {
      window.history.pushState(null, '', '#home');
    }
    return true;
  }

  const element = document.getElementById(cleanId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? 'smooth' : 'instant',
    });
    if (updateHash) {
      window.history.pushState(null, '', `#${cleanId}`);
    }
    return true;
  }

  return false;
};

/**
 * Snappy programmatic smooth scroll with cubic ease-out curve.
 */
export const fastScrollTo = (targetY: number, duration = 240) => {
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY + diff * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
