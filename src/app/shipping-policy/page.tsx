'use client';

import React from 'react';
import { TruckIcon } from '@heroicons/react/24/outline';

export default function ShippingPolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Shipping and Delivery Policy</h1>
        
        {/* No Shipping Required Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <TruckIcon className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-green-800">No Shipping Required</h2>
              <p className="text-green-700 mt-1">
                Simpaw is a digital service platform. All our services and content are delivered digitally, 
                so no physical shipping is required. You get instant access to all features upon account creation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Digital Services</h2>
            <p className="text-gray-600 mb-4">
              Simpaw primarily provides digital services and content. Our platform offers:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Instant access to digital content</li>
              <li>Online donation processing</li>
              <li>Digital receipts and confirmations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Delivery of Services</h2>
            <p className="text-gray-600 mb-4">Our service delivery includes:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Immediate access to platform features upon account creation</li>
              <li>Real-time donation processing</li>
              <li>Instant email confirmations</li>
              <li>Access to donor dashboard and resources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Email Communications</h2>
            <p className="text-gray-600 mb-4">You will receive:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Donation confirmation emails</li>
              <li>Tax receipts (for eligible donations)</li>
              <li>Updates about your recurring donations</li>
              <li>Newsletter (if subscribed)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Service Availability</h2>
            <p className="text-gray-600 mb-4">
              Our platform is available 24/7, except during scheduled maintenance periods.
              We strive to maintain 99.9% uptime for all our digital services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Technical Requirements</h2>
            <p className="text-gray-600 mb-4">To access our services, you need:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>A modern web browser</li>
              <li>Stable internet connection</li>
              <li>Valid email address</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about our digital services, contact us at:
              <br />
              Email: admin@simpaw.in
              <br />
              Response Time: Within 24-48 hours
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 