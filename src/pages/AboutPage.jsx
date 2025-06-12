import React from "react";

const AboutPage = () => {
  return (
    <section className="pt-24 pb-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About MedSpaSync Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Built by someone who lived the reconciliation nightmare for 10 years.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h2>The Problem We Solve</h2>
          <p>
            Manual reconciliation of Alle, Aspire, and POS data is broken. Industry
            research confirms what medical spa professionals already know – it
            creates "increased administrative burdens" and pulls staff away from
            patient care.
          </p>

          <h2>Our Solution</h2>
          <p>
            MedSpaSync Pro is the industry's first complete solution for medical spa
            rewards reconciliation. Built by a 10-year medical spa veteran who
            understood both the operational pain and the technical requirements
            needed to solve it.
          </p>

          <h2>Why It Hadn't Been Built Before</h2>
          <p>Industry analysis reveals that building this solution requires:</p>
          <ul>
            <li>$150K–$500K+ development investment</li>
            <li>Specialized AI platforms and machine learning expertise</li>
            <li>Complex API integrations across multiple reward systems</li>
            <li>Deep understanding of medical spa operations</li>
          </ul>
          <p>
            We overcame these barriers to deliver what research confirms "might not be
            readily available" from any other platform.
          </p>

          <h2>Our Mission</h2>
          <p>
            To eliminate the 8–15 hours monthly that medical spa staff waste on
            manual reconciliation, so they can focus on what matters most – patient
            care and growing their business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
