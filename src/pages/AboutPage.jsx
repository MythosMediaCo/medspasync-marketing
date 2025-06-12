import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from '../components/About';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - MedSpaSync Pro</title>
        <meta name="description" content="Learn about the team behind MedSpaSync Pro." />
      </Helmet>
      <About />
    </>
  );
}
