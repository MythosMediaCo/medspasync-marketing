import React from 'react';
import { Helmet } from 'react-helmet-async';
import Pricing from '../components/Pricing';

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing - MedSpaSync Pro</title>
        <meta name="description" content="Choose the plan that's right for you." />
      </Helmet>
      <Pricing />
    </>
  );
}
