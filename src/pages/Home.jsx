import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MedSpaSync Pro</title>
        <meta name="description" content="Automate your medspa workflow." />
      </Helmet>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}
