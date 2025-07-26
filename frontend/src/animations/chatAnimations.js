import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once when this module is imported.  Doing so
// ensures scroll‑based animations work in any component that imports
// these helpers.  Registration is idempotent so calling it multiple
// times is safe.
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate a new chat message bubble into view.  Use this helper after
 * adding an element to the DOM.  It fades the bubble in and slides it
 * upward for a subtle appearance effect.
 *
 * @param {HTMLElement} el The message element to animate
 */
export function animateMessageBubble(el) {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out',
  });
}

/**
 * Automatically scroll a container to its bottom.  Call this after
 * messages are appended so the latest content is visible.  Without
 * animation, the container jump is immediate; GSAP isn’t required
 * here but this helper centralises the behaviour.
 *
 * @param {HTMLElement} container The scrolling container
 */
export function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

/**
 * Create a typing indicator animation on a set of dot elements.  Each
 * dot will bounce in sequence to simulate typing.  Dots should
 * already have CSS classes like `animate-bounce` applied for base
 * animation; this helper staggers the start times for a more
 * compelling effect.
 *
 * @param {NodeListOf<HTMLElement>|HTMLElement[]} dots A collection of dot elements
 */
export function animateTypingIndicator(dots) {
  return gsap.to(dots, {
    keyframes: {
      y: ['0%', '-30%', '0%'],
    },
    duration: 0.6,
    ease: 'sine.inOut',
    repeat: -1,
    stagger: {
      each: 0.1,
    },
  });
}