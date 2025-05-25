'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using SimpawPets&apos; services, you agree to these terms.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Service</h2>
            <p className="text-gray-600 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not interfere with the service's functionality</li>
              <li>Not attempt to gain unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Donations and Payments</h2>
            <p className="text-gray-600 mb-4">
              All donations are processed through Razorpay. By making a donation, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide valid payment information</li>
              <li>Accept our refund policy</li>
              <li>Comply with payment processor terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on Simpaw, including text, graphics, logos, and software, is protected by intellectual property rights.
              You may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Simpaw is provided &ldquo;As is&rdquo; basis without warranties. We are not liable for any damages arising from your use of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these terms, contact us at:
              <br />
              Email: admin@simpaw.in
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 