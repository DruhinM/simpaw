'use client';

import { useState, useEffect } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  StarIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { fetchSheetData, transformVetData } from '@/lib/data';
import { Spinner } from '@/components/Spinner';
import { Pagination } from '@/components/Pagination';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';

interface Vet {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  rating: number;
  imageUrl: string;
  emergency: boolean;
}

const ITEMS_PER_PAGE = 4;

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', vetName: '', location: '', contact: '', reason: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function loadVets() {
      try {
        const data = await fetchSheetData('Vets');
        // Skip header row and transform data
        const transformedVets = data.slice(1).map(transformVetData);
        // Sort by rating, highest first
        transformedVets.sort((a: Vet, b: Vet) => b.rating - a.rating);
        setVets(transformedVets);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadVets();
  }, []);

  const totalPages = Math.ceil(vets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVets = vets.slice(startIndex, endIndex);

  // Calculate dynamic stats
  const totalClinics = vets.length;
  const averageRating = vets.reduce((acc, vet) => acc + vet.rating, 0) / vets.length;
  const emergencyServices = vets.filter(vet => vet.emergency).length;

  const stats = [
    { name: 'Verified Clinics', value: `${totalClinics}+`, icon: BuildingOffice2Icon },
    { name: 'Average Rating', value: averageRating.toFixed(1), icon: StarIcon },
    { name: 'Emergency Services', value: `${emergencyServices}+`, icon: ShieldCheckIcon },
  ];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading veterinary clinics: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find a Vet</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Trusted veterinary clinics in your area
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

        {/* Search Filters */}
        <div className="mt-16">
          <div className="rounded-xl bg-gray-50 p-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your location"
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                <select
                  id="specialty"
                  name="specialty"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>All Specialties</option>
                  <option>General Care</option>
                  <option>Surgery</option>
                  <option>Emergency Care</option>
                </select>
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Any Time</option>
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {currentVets.map((vet) => (
            <div key={vet.id} className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={vet.imageUrl}
                  alt={vet.name}
                  fill
                  className="object-cover"
                />
                {vet.emergency && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Verified</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{vet.name}</h3>
                  <div className="flex items-center gap-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{vet.rating}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{vet.address}</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{vet.phone}</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{vet.email}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Services</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {vet.services.map((service, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                    Book Appointment
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

        {/* Emergency Services CTA */}
        <div className="mt-16 rounded-2xl bg-red-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-red-600" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-red-900">24/7 Emergency Services</h2>
            <p className="mt-4 text-lg leading-6 text-red-700">
              For urgent pet care needs, our emergency veterinary partners are available around the clock.
            </p>
            <div className="mt-6">
              <button className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                Find Emergency Care
              </button>
            </div>
          </div>
        </div>

        {/* Request to Add a Vet Section */}
        <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-indigo-900">Know a great vet we missed?</h2>
            <p className="mt-4 text-lg leading-6 text-indigo-700">
              Help us keep our directory up to date by requesting to add a veterinary clinic.
            </p>
            <div className="mt-6">
              <button
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={() => setIsModalOpen(true)}
              >
                Request to Add a Vet
              </button>
            </div>
          </div>
        </div>

        {/* Modal for vet submission */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div aria-hidden className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-8 z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Request to Add a Vet</Dialog.Title>
              <form ref={formRef} onSubmit={e => {
                e.preventDefault();
                const mailto = `mailto:druhin.mukherjee@gmail.com?subject=Vet%20Addition%20Request&body=Your%20Name:%20${encodeURIComponent(form.name)}%0AVet%20Name:%20${encodeURIComponent(form.vetName)}%0ALocation:%20${encodeURIComponent(form.location)}%0AContact:%20${encodeURIComponent(form.contact)}%0AReason:%20${encodeURIComponent(form.reason)}`;
                window.open(mailto, '_blank');
                setIsModalOpen(false);
                setForm({ name: '', vetName: '', location: '', contact: '', reason: '' });
              }} className="space-y-4">
                <input required className="w-full border rounded px-3 py-2" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Vet Name" value={form.vetName} onChange={e => setForm(f => ({ ...f, vetName: e.target.value }))} />
                <input className="w-full border rounded px-3 py-2" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                <input className="w-full border rounded px-3 py-2" placeholder="Contact Info (optional)" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
                <textarea className="w-full border rounded px-3 py-2" placeholder="Why should we add this vet?" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} rows={3} />
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