'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, UserGroupIcon, BuildingOffice2Icon, LightBulbIcon, UserIcon, MapPinIcon, UsersIcon, CodeBracketIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
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
    <div className="relative pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-indigo-50 pb-8 pt-20 lg:pt-32">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 px-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-600 font-bold text-lg">simpaw</span>
              <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded">Open Source</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              India's Open Source Pet Community
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover stories, connect with pet parents, find trusted vets, and explore pet-friendly places. Make a difference for pets across India with <span className="font-semibold text-orange-600">simpaw</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="#join" className="rounded-md bg-[#F4A300] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#007C91] transition">Join the Community</Link>
              <Link href="https://simpaw.in/donate" className="rounded-md border border-orange-500 px-6 py-3 text-base font-semibold text-orange-500 bg-white hover:bg-orange-50 transition">Support Us</Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/avatars.png" alt="Community avatar 1" width={40} height={40} className="rounded-full border-2 border-white -ml-2 first:ml-0" />
              <Image src="/avatars2.png" alt="Community avatar 2" width={40} height={40} className="rounded-full border-2 border-white -ml-2" />
              <Image src="/avatars3.png" alt="Community avatar 3" width={40} height={40} className="rounded-full border-2 border-white -ml-2" />
              <span className="ml-2 text-gray-700 font-medium">+2,000 pet parents joined</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <Image src="/hero-illustration.png" alt="Pet parents illustration" width={400} height={350} className="rounded-2xl shadow-xl object-cover" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16 z-10 relative">
        <div className="bg-orange-50 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <BookIcon className="h-8 w-8 text-orange-500 mb-3" />
          <h3 className="font-bold text-lg mb-2">Stories from India</h3>
          <p className="text-gray-600 mb-4">Read and share real-life stories of pets and their parents across the country.</p>
          <Link href="/stories" className="text-orange-600 font-semibold hover:underline">Explore Stories</Link>
        </div>
        <div className="bg-indigo-50 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <LightBulbIcon className="h-8 w-8 text-indigo-500 mb-3" />
          <h3 className="font-bold text-lg mb-2">Tips & Tricks</h3>
          <p className="text-gray-600 mb-4">Get expert advice and community crowd wisdom for daily pet care and happiness.</p>
          <Link href="/tips" className="text-indigo-600 font-semibold hover:underline">See Tips</Link>
        </div>
        <div className="bg-green-50 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <BuildingStorefrontIcon className="h-8 w-8 text-green-500 mb-3" />
          <h3 className="font-bold text-lg mb-2">Vet Directory</h3>
          <p className="text-gray-600 mb-4">Find trusted vets near you, read reviews, and connect with animal experts.</p>
          <Link href="/vets" className="text-green-600 font-semibold hover:underline">Find Vets</Link>
        </div>
      </section>

      {/* Pet-Friendly Places & Community-Driven */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-orange-600">Pet-Friendly Places</span>
          </div>
          <p className="text-gray-700 mb-4">Discover restaurants, parks, travel spots, cafes and more that welcome your furry friends. Browse, rate, and add your own recommendations!</p>
          <Link href="/places" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 w-max">Browse Places</Link>
        </div>
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <UsersIcon className="h-6 w-6 text-indigo-500" />
            <span className="font-bold text-indigo-600">Community-Driven & Free</span>
          </div>
          <p className="text-gray-700 mb-4">simpaw is 100% open source and community-driven. Contribute stories, help moderate, suggest places, and build tools for pet parents in India.</p>
          <Link href="https://simpaw.in/donate" className="rounded-md border border-[#007C91] px-4 py-2 text-sm font-semibold text-[#007C91] bg-white hover:bg-[#E6F7FA] w-max">Contribute</Link>
        </div>
      </section>

      {/* Make a Difference / Contribute */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <HeartIcon className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-orange-600">Make a Difference</span>
          </div>
          <p className="text-gray-700 mb-4">Support animal NGOs, community projects, and pet rescue operations. Every contribution counts for India's animals!</p>
          <Link href="https://simpaw.in/donate" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 w-max">Donate Now</Link>
        </div>
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <CodeBracketIcon className="h-6 w-6 text-indigo-500" />
            <span className="font-bold text-indigo-600">Contribute & Build</span>
          </div>
          <p className="text-gray-700 mb-4">Join the open-source movement. Help build features, moderate, write, or share your expertise to empower pet parents nationwide.</p>
          <a href="https://simpaw.in/donate" target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#007C91] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#F4A300] w-max">Start Contributing</a>
        </div>
      </section>

      {/* Stories from the Community */}
      <section className="bg-white py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-1">Stories from the Community</h2>
            <p className="text-gray-700">Celebrating the journeys of Indian pets and their families</p>
          </div>
          <Link href="/stories" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600">See All Stories</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-xl p-6 flex flex-col gap-2 shadow">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="h-6 w-6 text-orange-500" />
              <span className="font-semibold">Anjali & Simba</span>
              <span className="text-xs text-gray-500">Mumbai</span>
            </div>
            <blockquote className="italic text-gray-800 mb-2">“Simba was rescued from the street, and now he's the heart of our home.”</blockquote>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 rounded px-2 py-1 w-max">Featured Story</span>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 flex flex-col gap-2 shadow">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="h-6 w-6 text-indigo-500" />
              <span className="font-semibold">Rahul & Bella</span>
              <span className="text-xs text-gray-500">Delhi</span>
            </div>
            <blockquote className="italic text-gray-800 mb-2">“Bella brought joy to our family during lockdown. She's more than just a pet.”</blockquote>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 rounded px-2 py-1 w-max">Community Pick</span>
          </div>
          <div className="bg-green-50 rounded-xl p-6 flex flex-col gap-2 shadow">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="h-6 w-6 text-green-500" />
              <span className="font-semibold">Priya & Max</span>
              <span className="text-xs text-gray-500">Bangalore</span>
            </div>
            <blockquote className="italic text-gray-800 mb-2">“From adoption to adventure, Max has changed my life in every way.”</blockquote>
            <span className="text-xs font-semibold text-green-600 bg-green-100 rounded px-2 py-1 w-max">Top Rated</span>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-orange-50 py-16 px-6 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Be a Part of India's Pet Revolution</h2>
          <p className="text-lg text-gray-700 mb-8">Whether you're a pet parent, animal lover, or want to make an impact — simpaw is your open home to share, learn, and help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#join" className="rounded-md bg-[#F4A300] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#007C91] transition">Join Now</Link>
            <a href="https://github.com/DruhinM/simpaw" target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#007C91] px-6 py-3 text-base font-semibold text-[#007C91] bg-white hover:bg-[#E6F7FA] w-max">Contribute</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add BookIcon for feature card
function BookIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8zm0 0v2m0 0a8 8 0 110 16 8 8 0 010-16z" />
    </svg>
  );
}
