'use client';

import React, { useEffect, useState } from 'react';
import {
  HeartIcon,
  GiftIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  UserGroupIcon,
  HandRaisedIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { getDonations, getPets } from '@/lib/data';
import { Spinner } from '@/components/Spinner';

export default function DonatePage() {
  const [stats, setStats] = useState([
    { name: 'Pets Helped', value: '—', icon: HeartIcon },
    { name: 'Active Donors', value: '—', icon: UserGroupIcon },
    { name: 'Success Rate', value: '—', icon: SparklesIcon },
  ]);
  const [loading, setLoading] = useState(true);

  const donationTiers = [
    {
      name: 'Friend',
      price: '500',
      description: 'Help provide food and basic supplies for one pet in need',
      features: [
        'Feed a pet for a week',
        'Receive monthly updates',
        'Get a thank you card'
      ],
      icon: HeartIcon,
      color: 'rose'
    },
    {
      name: 'Guardian',
      price: '1,000',
      description: 'Support medical care and shelter for rescued pets',
      features: [
        'All Friend benefits',
        'Sponsor a specific pet',
        'Receive quarterly impact report',
        'Name featured on website'
      ],
      icon: ShieldCheckIcon,
      color: 'indigo',
      popular: true
    },
    {
      name: 'Champion',
      price: '2,500',
      description: 'Make a lasting impact on multiple pets lives',
      features: [
        'All Guardian benefits',
        'VIP access to pet events',
        'Personal impact dashboard',
        'Priority updates on sponsored pets'
      ],
      icon: SparklesIcon,
      color: 'amber'
    }
  ];

  const impactAreas = [
    {
      name: 'Emergency Medical Care',
      description: 'Provide urgent medical treatment for injured or sick pets',
      icon: GiftIcon
    },
    {
      name: 'Food & Supplies',
      description: 'Ensure pets have nutritious food and essential supplies',
      icon: CurrencyDollarIcon
    },
    {
      name: 'Shelter & Rehabilitation',
      description: 'Support safe spaces for pets to recover and find new homes',
      icon: HandRaisedIcon
    },
    {
      name: 'Monthly Support',
      description: 'Set up recurring donations to help pets consistently',
      icon: ArrowPathIcon
    }
  ];

  const [contributors, setContributors] = useState<string[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pets, donations] = await Promise.all([
          getPets(),
          getDonations(),
        ]);
        
        // Calculate unique donors
        const uniqueDonors = Array.from(new Set(donations.map(d => d.donor)));
        
        // Calculate success rate (assuming successful donations have status "Completed")
        const successfulDonations = donations.filter(d => d.status === 'Completed').length;
        const successRate = donations.length > 0 
          ? Math.round((successfulDonations / donations.length) * 100) 
          : 0;

        setStats([
          { name: 'Pets Helped', value: `${pets.length}+`, icon: HeartIcon },
          { name: 'Active Donors', value: `${uniqueDonors.length}+`, icon: UserGroupIcon },
          { name: 'Success Rate', value: `${successRate}%`, icon: SparklesIcon },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep the default values if there's an error
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const donations = await getDonations();
        const names = donations.slice(1).map((d) => d.donor).filter(Boolean);
        const uniqueNames = Array.from(new Set(names));
        setContributors(uniqueNames);
      } catch (e) {
        setContributors([]);
      }
    }
    fetchContributors();
  }, []);

  // Add NGO partners data
  const ngoPartners = [
    {
      name: 'Paws & Claws Foundation',
      logo: '/ngos/paws-claws.png',
      description: 'Providing shelter, food, and medical care to stray and abandoned animals across the city.',
      website: 'https://pawsclaws.org',
    },
    {
      name: 'Listening Hearts Foundation',
      logo: '/ngos/listening-hearts.png',
      description: 'Providing shelter, food, and medical care to stray and abandoned animals across the city.',
      website: 'https://www.instagram.com/listeninghearts_foundation?igsh=eTBldWdpdmYwNDJs',
    },
    // Add more NGOs as needed
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Difference</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your donation helps provide food, shelter, and medical care to pets in need. Every contribution, no matter the size, makes a real impact.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col items-center gap-y-4">
                  <stat.icon className="h-12 w-12 text-indigo-600" />
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* QR Code Payment Section */}
        <div className="mt-16 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex flex-col items-center text-center">
              <QrCodeIcon className="h-12 w-12 text-indigo-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Scan to Donate</h2>
              <p className="mt-2 text-lg text-gray-600">
                Choose your preferred amount and scan the QR code to make your donation
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* QR Code Display */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
                <div className="relative w-64 h-64 mb-4">
                  <Image
                    src="/qr-code.png" // Add your QR code image here
                    alt="Payment QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Scan with any UPI app or bank app
                </p>
              </div>

              {/* Donation Amounts */}
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Donation Amounts</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['500', '1000', '2500', '5000'].map((amount) => (
                    <div
                      key={amount}
                      className="flex items-center justify-center p-4 bg-indigo-50 rounded-lg text-indigo-600 font-semibold"
                    >
                      ₹{amount}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  After making your donation, please email us at druhin.mukherjee@gmail.com with:
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Your name</li>
                  <li>Transaction ID</li>
                  <li>Donation amount</li>
                  <li>Preferred tier (if any)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">Your Impact Areas</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area) => (
              <div key={area.name} className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <area.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{area.name}</h3>
                <p className="mt-2 text-sm text-center text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NGO Partners Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">Our NGO Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {ngoPartners.map((ngo) => (
              <div key={ngo.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <img src={ngo.logo} alt={ngo.name} className="h-20 w-20 object-contain mb-4 rounded-full border border-gray-200" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ngo.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{ngo.description}</p>
                <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Visit Website</a>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">Choose Your Impact Level</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {donationTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${
                  tier.popular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-x-4">
                  <tier.icon className={`h-8 w-8 text-${tier.color}-600`} />
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">₹{tier.price}</span>
                  <span className="text-sm font-semibold text-gray-600">/month</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-3 text-sm text-gray-600">
                      <HeartIcon className="h-5 w-5 text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center text-sm text-gray-600">
                  Scan QR code above and mention "{tier.name}" in your email
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributors Section */}
        {contributors.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Our Contributors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {contributors.map((name) => (
                <div key={name} className="flex items-center justify-center">
                  <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-medium shadow-sm truncate w-full text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            {contributors.length > 24 && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  And {contributors.length - 24} more amazing contributors...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 