import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

/**
 * HeroSection presents the main heading and tagline for the personal
 * finance assistant.  It uses a gradient background and a call‑to‑action
 * link that anchors down to the chat box.  By isolating this into its own
 * component we allow future tweaks (e.g. swapping illustrations or adding
 * animations) without cluttering the root component.  Heroicons provide
 * lightweight vector icons that integrate seamlessly with Tailwind.
 */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * HeroSection renders a marketing header with a call‑to‑action button.
 * In this iteration we convert the CTA into a route change.  When the
 * "Start Chatting" button is clicked the user is navigated to the
 * `/chat` route.  Using `useNavigate` decouples the hero from any
 * stateful chat logic; routing concerns are handled by React Router
 * instead of passing down a callback.
 */
const HeroSection = () => {
  // Acquire the navigate function from react‑router to perform imperative navigation.
  const navigate = useNavigate();
  // Create refs for elements we want to animate
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate hero elements when the component mounts
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-4 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
          Personal Finance Assistant
        </h1>
        <p ref={subheadingRef} className="text-lg md:text-xl mb-8">
          Get instant answers and insights for budgeting, saving and investing.
        </p>
        <a
          ref={ctaRef}
          href="/chat"
          // Intercept the click to perform client‑side navigation instead of a
          // full page reload.  `preventDefault` stops the anchor from
          // performing its default action, then we call `navigate` to
          // transition to the chat route.  GSAP hover effects remain intact.
          onClick={(e) => {
            e.preventDefault();
            navigate('/chat');
          }}
          onMouseEnter={() => {
            gsap.to(ctaRef.current, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
          }}
          onMouseLeave={() => {
            gsap.to(ctaRef.current, { scale: 1.0, duration: 0.2, ease: 'power1.out' });
          }}
          className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
          Start Chatting
        </a>
      </div>
    </header>
  );
};

export default HeroSection;