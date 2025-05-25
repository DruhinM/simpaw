'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, UserGroupIcon, BuildingOffice2Icon, LightBulbIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@/components/Spinner';
import { getPets, getDonations, getVets, getTips } from '@/lib/data';

export default function Home() {
  const [stats, setStats] = useState([
    { name: 'Pets Helped', value: '—', icon: HeartIcon, bg: 'bg-pink-50' },
    { name: 'Active Donors', value: '—', icon: UserGroupIcon, bg: 'bg-indigo-50' },
    { name: 'Vets Listed', value: '—', icon: BuildingOffice2Icon, bg: 'bg-green-50' },
    { name: 'Tips Shared', value: '—', icon: LightBulbIcon, bg: 'bg-yellow-50' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pets, donations, vets, tips] = await Promise.all([
          getPets(),
          getDonations(),
          getVets(),
          getTips(),
        ]);
        const uniqueDonors = Array.from(new Set(donations.map((d) => d.donor)));
        setStats([
          { name: 'Pets Helped', value: `${pets.length}+`, icon: HeartIcon, bg: 'bg-pink-50' },
          { name: 'Active Donors', value: `${uniqueDonors.length}+`, icon: UserGroupIcon, bg: 'bg-indigo-50' },
          { name: 'Vets Listed', value: `${vets.length}+`, icon: BuildingOffice2Icon, bg: 'bg-green-50' },
          { name: 'Tips Shared', value: `${tips.length}+`, icon: LightBulbIcon, bg: 'bg-yellow-50' },
        ]);
      } catch (e) {
        // fallback to dashes if error
        setStats([
          { name: 'Pets Helped', value: '—', icon: HeartIcon, bg: 'bg-pink-50' },
          { name: 'Active Donors', value: '—', icon: UserGroupIcon, bg: 'bg-indigo-50' },
          { name: 'Vets Listed', value: '—', icon: BuildingOffice2Icon, bg: 'bg-green-50' },
          { name: 'Tips Shared', value: '—', icon: LightBulbIcon, bg: 'bg-yellow-50' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Add NGO partners data (should match donations page)
  const ngoPartners = [
    {
      name: 'Listening Hearts Foundation',
      logo: '/ngos/listening-hearts.png',
      website: 'https://www.instagram.com/listeninghearts_foundation?igsh=eTBldWdpdmYwNDJs',
    },
    {
      name: 'Happy Tails Trust',
      logo: '/ngos/paws-claws.png',
      website: 'https://happytails.org',
    },
    // Add more NGOs as needed
  ];

  return (
    <div className="relative pt-16">
      {/* Hero section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Welcome to Simpaw
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Your one-stop destination for everything your pet needs. From expert tips to finding pet-friendly locations,
                  we're here to make pet parenting simpler and more enjoyable.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6">
                  <Link
                    href="/tips"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get Started
                  </Link>
                  <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/donate"
                    className="rounded-md bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 w-full sm:w-auto text-center"
                  >
                    Support Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src="/hero-image.jpg"
            alt="Happy dog with owner"
            width={1920}
            height={1280}
          />
        </div>
      </div>

      {/* Modern Stats Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-indigo-600 sm:text-3xl mb-2">Our Impact</h2>
          <p className="text-lg text-gray-600">Together, we're making a difference for pets and their families.</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className={`flex flex-col items-center ${stat.bg} rounded-xl shadow p-6 hover:shadow-lg transition-shadow`}>
                <stat.icon className="h-10 w-10 text-indigo-600 mb-3" />
                <dt className="text-base font-medium text-gray-600">{stat.name}</dt>
                <dd className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* How It Works Section */}
      <div className="mx-auto max-w-5xl px-6 py-12 mb-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
            <ArrowTrendingUpIcon className="h-10 w-10 text-pink-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Join the Community</h3>
            <p className="text-gray-600">Sign up and become part of a growing network of pet lovers and experts.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
            <LightBulbIcon className="h-10 w-10 text-yellow-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Share & Learn</h3>
            <p className="text-gray-600">Access tips, share your stories, and learn from others' experiences.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
            <ChatBubbleLeftRightIcon className="h-10 w-10 text-indigo-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Make an Impact</h3>
            <p className="text-gray-600">Support pets in need and see the difference your contribution makes.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mx-auto max-w-4xl px-6 py-12 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <UserIcon className="h-12 w-12 text-indigo-400 mb-2" />
            <blockquote className="italic text-lg text-gray-800 mb-2">“Simpaw has made pet parenting so much easier. The tips and community support are amazing!”</blockquote>
            <span className="font-semibold text-indigo-700">— Priya S.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <UserIcon className="h-12 w-12 text-pink-400 mb-2" />
            <blockquote className="italic text-lg text-gray-800 mb-2">“I found the best vet for my dog through Simpaw. Love the resources and the positive vibe!”</blockquote>
            <span className="font-semibold text-pink-700">— Rahul M.</span>
          </div>
        </div>
      </div>

      {/* Inspiring Pet Quote Section */}
      <div className="mx-auto max-w-3xl px-6 py-12 rounded-2xl bg-gradient-to-r from-indigo-50 to-pink-50 shadow-lg flex flex-col items-center mb-16">
        <svg className="h-10 w-10 text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h1V7a4 4 0 10-8 0v4a4 4 0 004 4v2a4 4 0 01-4-4V7a6 6 0 1112 0v4a6 6 0 01-6 6z" /></svg>
        <blockquote className="text-2xl italic font-semibold text-indigo-900 text-center">
          "The greatness of a nation and its moral progress can be judged by the way its animals are treated."
        </blockquote>
        <figcaption className="mt-4 text-indigo-700 font-medium text-lg">— Mahatma Gandhi</figcaption>
      </div>

      {/* NGO Partners Section */}
      <div className="mx-auto max-w-5xl px-6 py-10 mb-12">
        <h2 className="text-xl font-bold text-center mb-6 text-indigo-700">Our NGO Partners</h2>
        <div className="flex gap-6 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 sm:overflow-x-visible">
          {ngoPartners.map((ngo) => (
            <a key={ngo.name} href={ngo.website} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white rounded-xl shadow p-4 min-w-[180px] hover:shadow-lg transition-shadow mx-2 sm:mx-0">
              <img src={ngo.logo} alt={ngo.name} className="h-16 w-16 object-contain mb-2 rounded-full border border-gray-200" />
              <span className="text-sm font-medium text-gray-900 text-center">{ngo.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Additional Image Section */}
      <div className="mx-auto max-w-4xl px-6 mb-16 flex flex-col items-center">
        <Image
          src="/happy-pets.jpg"
          alt="Happy pets and their owners"
          width={900}
          height={500}
          className="rounded-2xl shadow-lg object-cover w-full h-auto"
          priority
        />
        <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl">Celebrating the joy and companionship pets bring to our lives. Join our community and make a difference for animals everywhere!</p>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything for Pet Parents</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to be a great pet parent
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover a wealth of resources, connect with other pet parents, and find the best services for your furry friend.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Tips & Tricks',
    description: 'Expert advice on pet care, training, nutrition, and health to help you give your pet the best life possible.',
    href: '/tips',
  },
  {
    name: 'Find Services',
    description: 'Locate veterinarians, pet-friendly locations, and other essential services in your area.',
    href: '/vets',
  },
  {
    name: 'Community Stories',
    description: 'Connect with other pet parents, share your experiences, and learn from their journeys.',
    href: '/stories',
  },
];
