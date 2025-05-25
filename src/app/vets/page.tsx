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
  ShieldCheckIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  UsersIcon,
  ClockIcon,
  IdentificationIcon,
  CurrencyDollarIcon
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
  hours?: string;
  specialization?: string;
  languages?: string[];
  animals?: string[];
  experience?: string;
  staff?: string[];
  insurance?: string;
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
  // Add filter state
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

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

  // Extract unique cities from addresses
  const allCities = Array.from(new Set(vets.map(vet => {
    const parts = vet.address.split(',').map(s => s.trim());
    return parts.length > 1 ? parts[parts.length - 2] : 'Unknown';
  }))).filter(Boolean);
  allCities.unshift('All Cities');

  // Extract unique specialties from services
  const allSpecialties = Array.from(new Set(vets.flatMap(vet => vet.services))).filter(Boolean);
  allSpecialties.unshift('All Specialties');

  // Filter vets based on selected filters
  const filteredVets = vets.filter(vet => {
    const parts = vet.address.split(',').map(s => s.trim());
    const vetCity = parts.length > 1 ? parts[parts.length - 2] : 'Unknown';
    const cityMatch = selectedCity === 'All Cities' || vetCity === selectedCity;
    const specialtyMatch = selectedSpecialty === 'All Specialties' || vet.services.includes(selectedSpecialty);
    return cityMatch && specialtyMatch;
  });

  const totalPages = Math.ceil(filteredVets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVets = filteredVets.slice(startIndex, endIndex);

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
            <div className="mb-6">
              <div className="mb-2 font-semibold text-gray-700">Filter by City</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allCities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setCurrentPage(1); }}
                    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${selectedCity === city ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-200 hover:bg-indigo-50'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold text-gray-700">Filter by Specialty</div>
              <div className="flex flex-wrap gap-2">
                {allSpecialties.map(specialty => (
                  <button
                    key={specialty}
                    onClick={() => { setSelectedSpecialty(specialty); setCurrentPage(1); }}
                    className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors shadow-sm ${selectedSpecialty === specialty ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-900 border-gray-200 hover:bg-pink-50'}`}
                    style={{ minWidth: '120px', marginBottom: '8px' }}
                  >
                    {specialty}
                  </button>
                ))}
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
                  {vet.hours && (
                    <div className="flex items-center gap-x-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.hours}</span>
                    </div>
                  )}
                  {vet.specialization && (
                    <div className="flex items-center gap-x-3">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.specialization}</span>
                    </div>
                  )}
                  {vet.languages && vet.languages.length > 0 && (
                    <div className="flex items-center gap-x-3">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.languages.join(', ')}</span>
                    </div>
                  )}
                  {vet.animals && vet.animals.length > 0 && (
                    <div className="flex items-center gap-x-3">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.animals.join(', ')}</span>
                    </div>
                  )}
                  {vet.experience && (
                    <div className="flex items-center gap-x-3">
                      <IdentificationIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.experience}</span>
                    </div>
                  )}
                  {vet.staff && vet.staff.length > 0 && (
                    <div className="flex items-center gap-x-3">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.staff.join(', ')}</span>
                    </div>
                  )}
                  {vet.insurance && (
                    <div className="flex items-center gap-x-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{vet.insurance}</span>
                    </div>
                  )}
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