'use client';

import React, { useEffect, useState, useRef } from 'react';
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
import { Pagination } from '@/components/Pagination';
import { Dialog } from '@headlessui/react';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1550697851-920b181d8ca8?w=800&h=600&fit=crop';
const ITEMS_PER_PAGE = 4;

export default function PlacesPage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Places");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', type: '', description: '', email: '' });
  const formRef = useRef<HTMLFormElement>(null);

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

  const filteredPlaces = selectedCategory === "All Places" 
    ? places 
    : places.filter(place => place.type === selectedCategory);

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

  // Dynamic stats
  const uniqueCities = Array.from(new Set(places.map((p) => (p.address || '').split(',').slice(-2, -1)[0]?.trim()).filter(Boolean)));
  const stats = [
    { name: 'Pet-Friendly Locations', value: places.length, icon: BuildingStorefrontIcon },
    { name: 'Happy Visitors', value: '1,000+', icon: UserGroupIcon },
    { name: 'Cities Covered', value: uniqueCities.length, icon: MapIcon },
  ];

  const categories = [
    "All Places",
    "Pet-Friendly Cafe",
    "Dog Park",
    "Pet-Friendly Hotel",
    "Pet Store",
    "Pet-Friendly Restaurant"
  ];

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
                <stat.icon className="h-12 w-12 text-[#F4A300]" />
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
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); // Reset to first page when changing category
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  category === selectedCategory
                    ? 'bg-[#007C91] text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-[#E6F7FA]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {currentPlaces.map((place) => (
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
                    <span className="text-sm text-[#007C91]">{place.type}</span>
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
                  <button className="rounded-md bg-[#F4A300] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#007C91]">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Add Place CTA */}
        <div className="mt-16 rounded-2xl bg-[#E6F7FA] py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-[#007C91]" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#007C91]">Know a Pet-Friendly Place?</h2>
            <p className="mt-4 text-lg leading-6 text-[#007C91]">
              Help other pet parents discover great places by adding your recommendations.
            </p>
            <div className="mt-6">
              <button
                className="rounded-md bg-[#007C91] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#F4A300]"
                onClick={() => setIsModalOpen(true)}
              >
                Add a Place
              </button>
            </div>
          </div>
        </div>
        {/* Modal for Add Place */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div aria-hidden className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-8 z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Add a Pet-Friendly Place</Dialog.Title>
              <form ref={formRef} onSubmit={e => {
                e.preventDefault();
                const mailto = `mailto:druhin.mukherjee@gmail.com?subject=Pet%20Friendly%20Place%20Submission&body=Name:%20${encodeURIComponent(form.name)}%0AEmail:%20${encodeURIComponent(form.email)}%0AType:%20${encodeURIComponent(form.type)}%0AAddress:%20${encodeURIComponent(form.address)}%0ADescription:%20${encodeURIComponent(form.description)}`;
                window.open(mailto, '_blank');
                setIsModalOpen(false);
                setForm({ name: '', address: '', type: '', description: '', email: '' });
              }} className="space-y-4">
                <input required className="w-full border rounded px-3 py-2" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input required type="email" className="w-full border rounded px-3 py-2" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Place Name & Type (e.g. Cafe, Park)" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                <textarea required className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} />
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Send</button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
} 