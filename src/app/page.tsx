'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/tips"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get Started
                  </Link>
                  <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
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
