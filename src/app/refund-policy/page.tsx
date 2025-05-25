'use client';

import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Cancellation and Refund Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Donations</h2>
            <p className="text-gray-600 mb-4">
              As a non-profit organization, we handle donations with utmost care and transparency:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>One-time donations are generally non-refundable</li>
              <li>Recurring donations can be cancelled at any time</li>
              <li>Mistaken or duplicate donations will be refunded upon request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cancellation Process</h2>
            <p className="text-gray-600 mb-4">To cancel a recurring donation:</p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>Log into your account</li>
              <li>Navigate to donation settings</li>
              <li>Click "Cancel Recurring Donation"</li>
              <li>Confirm your cancellation</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Eligibility</h2>
            <p className="text-gray-600 mb-4">Refunds may be issued in the following cases:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Technical errors resulting in duplicate charges</li>
              <li>Incorrect donation amounts</li>
              <li>Unauthorized transactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Process</h2>
            <p className="text-gray-600 mb-4">To request a refund:</p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>Contact our support team within 30 days of the donation</li>
              <li>Provide transaction details and reason for refund</li>
              <li>Allow 5-7 business days for processing</li>
              <li>Refunds will be issued to the original payment method</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Processing Time</h2>
            <p className="text-gray-600 mb-4">
              Refund processing typically takes 5-7 business days, depending on your payment method and financial institution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For refund requests or questions, contact us at:
              <br />
              Email: support@simpaw.com
              <br />
              Phone: [Your Phone Number]
              <br />
              Response Time: Within 24-48 hours
            </p>
          </section>

          <p className="mt-4 text-base text-gray-600">
            &ldquo;No refund&rdquo; policy for digital services
          </p>

          <p>What we mean by &quot;donation&quot; and &quot;refund&quot;</p>
        </div>
      </div>
    </div>
  );
} 