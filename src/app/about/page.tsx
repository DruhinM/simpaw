'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            The story of how love for a dog inspired a platform for pet parents.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-16">
              {/* Origin Story */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Story</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Simpaw was born from the love story between a family and their beloved dog, Simba. 
                  Founded by Druhin Mukherjee and Anushree, this platform emerged from their personal 
                  journey of pet parenthood and the countless experiences they shared with their 
                  four-legged family member.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Through their adventures with Simba, they discovered the joys and challenges of being 
                  pet parents. This experience inspired them to create a platform that would help other 
                  pet parents navigate their journey with confidence and joy.
                </p>
              </div>

              {/* Mission */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Mission</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At Simpaw, we believe that every pet deserves the best care possible, and every pet 
                  parent deserves access to the resources and support they need. Our platform is built 
                  on the foundation of making pet care simpler, more accessible, and more enjoyable for 
                  everyone.
                </p>
              </div>

              {/* What We Offer */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">What We Offer</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-x-4">
                    <div className="flex-none rounded-full bg-gray-100 p-2">
                      <div className="h-6 w-6 text-indigo-600 flex items-center justify-center">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Expert Pet Care Tips</h3>
                      <p className="mt-2 text-gray-600">
                        Curated advice from experienced pet professionals to help you give your pet the best care.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex-none rounded-full bg-gray-100 p-2">
                      <div className="h-6 w-6 text-indigo-600 flex items-center justify-center">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Trusted Vet Directory</h3>
                      <p className="mt-2 text-gray-600">
                        Connect with qualified veterinarians who can provide the care your pet needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex-none rounded-full bg-gray-100 p-2">
                      <div className="h-6 w-6 text-indigo-600 flex items-center justify-center">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Pet-Friendly Places</h3>
                      <p className="mt-2 text-gray-600">
                        Discover locations where you and your pet can create lasting memories together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Join Us */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Join Our Community</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Whether you're a new pet parent or have years of experience, Simpaw is here to support 
                  you on your journey. Join our growing community of pet lovers and let's make the world 
                  a better place for our furry friends, one paw at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 