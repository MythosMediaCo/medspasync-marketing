import React from 'react';
import { Helmet } from 'react-helmet-async';
import Support from '../components/Support';

export default function SupportPage() {
  return (
    <>
      <Helmet>
        <title>Support - MedSpaSync Pro</title>
        <meta name="description" content="Frequently asked questions and support information." />
      </Helmet>
      <Support />
    </>
  );
}
