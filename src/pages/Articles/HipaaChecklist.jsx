import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function HipaaChecklist() {
  return (
    <>
      <Helmet>
        <title>HIPAA Compliance Checklist for Medical Spa Automation</title>
        <meta name="description" content="Ensure your med spa software meets HIPAA standards. Use this detailed checklist to protect patient data, avoid penalties, and build trust." />
      </Helmet>
      <section className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">HIPAA Compliance Checklist for Medical Spa Automation</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Medical spas handle protected health information (PHI) daily. From intake forms and treatment notes to photos and billing data, every digital touchpoint must comply with HIPAA. Here’s what your software should offer:
        </p>

        <ul className="space-y-6">
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">🔒 Data Encryption</h3>
            <p>All PHI must be encrypted both at rest (e.g., in databases or backups) and in transit (e.g., emails or cloud sync). Industry-standard: AES-256 and TLS 1.2+.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">🧑‍💼 Role-Based Access Controls</h3>
            <p>Limit access by staff role. Front desk vs. providers vs. admin should have different data visibility. This reduces internal snooping and meets HIPAA’s “minimum necessary” rule.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">📝 Audit Trails</h3>
            <p>Your software should log every access, view, and edit of PHI. This log must be exportable and show who accessed what, when, and from where.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">🔐 Multi-Factor Authentication (MFA)</h3>
            <p>MFA protects against weak/stolen passwords. Systems should require a second verification step (e.g., text code, biometric scan).</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">⏳ Auto Logoff</h3>
            <p>Inactivity should trigger automatic logout to prevent unauthorized access from unattended devices, especially shared tablets or front desk stations.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">💾 Backup & Disaster Recovery</h3>
            <p>Your platform should run encrypted backups and offer a disaster recovery plan. Ask how fast they can restore data after an outage or ransomware attack.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">📄 Business Associate Agreement (BAA)</h3>
            <p>All vendors handling PHI must sign a BAA. No BAA? They’re not HIPAA compliant. This includes cloud storage, CRM tools, and text/email vendors.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold text-indigo-700">👩‍🏫 Staff Training & Admin Support</h3>
            <p>Choose software that supports HIPAA training (tooltips, help docs, admin controls). Document team training and regularly update protocols.</p>
          </li>
        </ul>

        <p className="mt-10 text-gray-700 dark:text-gray-300">
          ⚠️ Common gaps: generic spa software, shared logins, unencrypted messaging, and lack of documented policies.
          <br />
          ✅ Use this checklist to vet your tools and stay compliant—because HIPAA isn’t optional.
        </p>
      </section>
    </>
  );
}
