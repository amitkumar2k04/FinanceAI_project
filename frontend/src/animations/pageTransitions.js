import { gsap } from 'gsap';

/**
 * Animate a page element entering from the right.  This helper slides the
 * element from 100% of the viewport width while fading it in.  It
 * returns a GSAP timeline so callers can append additional sequences if
 * desired.  Using a named export makes the function easy to import
 * within React components.
 *
 * @param {HTMLElement} el The DOM element to animate
 * @param {Object} opts Optional overrides for duration and easing
 */
export function pageEnterFromRight(el, opts = {}) {
  return gsap.from(el, {
    xPercent: 100,
    autoAlpha: 0,
    duration: opts.duration ?? 0.8,
    ease: opts.ease ?? 'power2.out',
  });
}

/**
 * Animate a page element exiting to the left.  This helper slides the
 * element off the screen while fading it out.  It returns a GSAP
 * timeline; callers should await completion before navigating away if
 * they want to ensure the animation finishes.
 *
 * @param {HTMLElement} el The DOM element to animate
 * @param {Object} opts Optional overrides for duration and easing
 */
export function pageExitToLeft(el, opts = {}) {
  return gsap.to(el, {
    xPercent: -100,
    autoAlpha: 0,
    duration: opts.duration ?? 0.6,
    ease: opts.ease ?? 'power2.in',
  });
}