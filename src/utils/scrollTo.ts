const NAV_OFFSET = 56;

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
    if (smooth) animateScrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (updateHash) {
      window.history.pushState(null, '', '#home');
    }
    return true;
  }

  const element = document.getElementById(cleanId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    if (smooth) animateScrollTo(offsetPosition);
    else window.scrollTo({ top: offsetPosition, behavior: 'instant' });
    if (updateHash) {
      window.history.pushState(null, '', `#${cleanId}`);
    }
    return true;
  }

  return false;
};

let activeScroll = 0;

const runScroll = (targetY: number, duration: number, ease: (t: number) => number) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;
  const startTime = performance.now();
  const id = ++activeScroll; // a newer scroll cancels this one

  const step = (now: number) => {
    if (id !== activeScroll) return;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: startY + diff * ease(progress), behavior: 'instant' });
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Smooth scroll for page navigation; duration grows with distance (450–900ms). */
export const animateScrollTo = (targetY: number) => {
  const distance = Math.abs(targetY - window.scrollY);
  runScroll(targetY, Math.min(900, Math.max(450, distance * 0.35)), easeInOutCubic);
};

/** Short ease-out scroll for jumping between sections inside a blog post. */
export const fastScrollTo = (targetY: number, duration = 240) => runScroll(targetY, duration, easeOutCubic);
