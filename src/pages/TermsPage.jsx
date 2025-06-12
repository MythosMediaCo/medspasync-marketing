import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | MedSpaSync Pro</title>
        <meta name="description" content="Terms of service for using MedSpaSync Pro." />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-lg dark:prose-invert">
          <h1>Terms of Service</h1>
          <p>All the standard legal stuff you would expect when using MedSpaSync Pro.</p>
        </div>
      </section>
    </>
  );
}
