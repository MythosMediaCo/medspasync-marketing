import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MedSpaSync Pro</title>
        <meta name="description" content="Privacy practices for MedSpaSync Pro." />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-lg dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p>We respect your privacy and only retain uploaded files long enough to process them.</p>
        </div>
      </section>
    </>
  );
}
