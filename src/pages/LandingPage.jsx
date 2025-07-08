import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CompetitiveDiff from '../components/CompetitiveDiff';
import Pricing from '../components/Pricing';
import SocialProof from '../components/SocialProof';
import TrustSecurity from '../components/TrustSecurity';
import MobileFirst from '../components/MobileFirst';
import ContentMarketing from '../components/ContentMarketing';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <CompetitiveDiff />
      <SocialProof />
      <Pricing />
      <TrustSecurity />
      <MobileFirst />
      <ContentMarketing />
      <Footer />
    </div>
  );
};

export default LandingPage;
