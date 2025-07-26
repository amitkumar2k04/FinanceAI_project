import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import FeaturesSection from '../components/FeaturesSection.jsx';
import StatisticsSection from '../components/StatisticsSection.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';

/**
 * HomePage aggregates all of the landing sections for the personal finance
 * assistant.  It intentionally excludes the chat interface, which is now
 * provided on its own route.  Each section component is kept separate
 * for readability and to enable independent animations and future
 * enhancements.
 */
function HomePage() {
  return (
    <>
      {/* Hero section introduces the application and invites the user to interact */}
      <HeroSection />
      {/* Feature overview explains what the assistant can help with */}
      <FeaturesSection />
      {/* Quantitative proof points build trust */}
      <StatisticsSection />
      {/* Testimonials provide social proof and humanize the assistant */}
      <TestimonialsSection />
    </>
  );
}

export default HomePage;