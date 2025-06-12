import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - MedSpaSync Pro</title>
        <meta name="description" content="Contact the MedSpaSync Pro team." />
      </Helmet>
      <Contact />
    </>
  );
}
