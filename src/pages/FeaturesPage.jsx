import React from 'react';
import { Helmet } from 'react-helmet-async';
import Features from '../components/Features';

export default function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Features - MedSpaSync Pro</title>
        <meta name="description" content="Explore all features of MedSpaSync Pro." />
      </Helmet>
      <Features />
    </>
  );
}
