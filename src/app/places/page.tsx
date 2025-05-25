'use client';

import React, { useEffect, useState } from 'react';
import { 
  MapPinIcon, 
  StarIcon, 
  ClockIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  MapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { fetchSheetData, transformPlaceData } from '@/lib/data';
import { Spinner } from '@/components/Spinner';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1550697851-920b181d8ca8?w=800&h=600&fit=crop';

export default function PlacesPage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Places");

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await fetchSheetData('Places');
        // Skip header row and transform data using the transformer
        const transformedPlaces = data.slice(1).map(transformPlaceData);
        setPlaces(transformedPlaces);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, []);

  const stats = [
    { name: 'Pet-Friendly Locations', value: places.length, icon: BuildingStorefrontIcon },
    { name: 'Happy Visitors', value: '1,000+', icon: UserGroupIcon },
    { name: 'Cities Covered', value: '10+', icon: MapIcon },
  ];

  const categories = [
    "All Places",
    "Pet-Friendly Cafe",
    "Dog Park",
    "Pet-Friendly Hotel",
    "Pet Store",
    "Pet-Friendly Restaurant"
  ];

  const filteredPlaces = selectedCategory === "All Places" 
    ? places 
    : places.filter(place => place.type === selectedCategory);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading places: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pet-Friendly Places</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover locations where your pets are welcome
          </p>
        </div>

        {/* Stats section */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col items-center gap-y-4">
                <stat.icon className="h-12 w-12 text-indigo-600" />
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Category Filter */}
        <div className="mt-16">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  category === selectedCategory
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={place.imageUrl || DEFAULT_IMAGE}
                  alt={place.name}
                  fill
                  className="object-cover"
                  onError={(e: any) => {
                    e.target.src = DEFAULT_IMAGE;
                  }}
                />
                {place.petFriendly && (
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-green-500/90">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                    <span className="text-sm text-indigo-600">{place.type}</span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{place.rating}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">{place.description}</p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{place.address}</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{place.hours}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Features</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {place.features.map((feature: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Amenities</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {place.amenities.map((amenity: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {place.events && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Events</h4>
                    <p className="mt-1 text-sm text-gray-600">{place.events}</p>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Established {place.established}
                  </div>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Place CTA */}
        <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-indigo-900">Know a Pet-Friendly Place?</h2>
            <p className="mt-4 text-lg leading-6 text-indigo-700">
              Help other pet parents discover great places by adding your recommendations.
            </p>
            <div className="mt-6">
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Add a Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 