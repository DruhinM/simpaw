'use client';

import React, { useEffect, useState, useRef } from 'react';
import { fetchSheetData, transformTipData } from '@/lib/data';
import { Spinner } from '@/components/Spinner';
import { Pagination } from '@/components/Pagination';
import { 
  ArrowPathIcon,
  CloudArrowUpIcon,
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

interface Tip {
  id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  featured: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', tip: '', category: '', imageUrl: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function loadTips() {
      try {
        const data = await fetchSheetData('Tips');
        // Skip header row and transform data
        const transformedTips = data.slice(1).map(transformTipData);
        // Sort by date, most recent first
        transformedTips.sort((a: Tip, b: Tip) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setTips(transformedTips);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTips();
  }, []);

  const totalPages = Math.ceil(tips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTips = tips.slice(startIndex, endIndex);

  // Calculate dynamic stats
  const totalTips = tips.length;
  const uniqueCategories = new Set(tips.map(tip => tip.category)).size;
  const featuredTips = tips.filter(tip => tip.featured).length;

  const stats = [
    { name: 'Total Tips', value: `${totalTips}+`, icon: ArrowPathIcon },
    { name: 'Categories', value: uniqueCategories, icon: CloudArrowUpIcon },
    { name: 'Featured Tips', value: featuredTips, icon: StarIcon },
  ];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading tips: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Care Tips & Tricks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {tip.imageUrl && (
              <div className="relative h-64 w-full">
                <Image
                  src={tip.imageUrl}
                  alt={tip.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="p-6 min-h-[220px] flex flex-col">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                {tip.category}
              </span>
              <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-gray-600 text-base leading-relaxed flex-1" style={{ minHeight: '120px' }}>{tip.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(tip.createdAt).toLocaleDateString()}
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

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tips & Tricks</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Expert advice to help you be the best pet parent
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

          {/* Submit Your Tip Section */}
          <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-indigo-900">Have a tip to share?</h2>
              <p className="mt-4 text-lg leading-6 text-indigo-700">
                Help other pet parents by sharing your best tips and tricks!
              </p>
              <div className="mt-6">
                <button
                  className="rounded-md bg-[#F4A300] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#007C91]"
                  onClick={() => setIsModalOpen(true)}
                >
                  Submit Your Tip
                </button>
              </div>
            </div>
          </div>

          {/* Modal for tip submission */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div aria-hidden className="fixed inset-0 bg-black opacity-30" />
              <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-8 z-10">
                <Dialog.Title className="text-lg font-bold mb-4">Submit Your Tip</Dialog.Title>
                <form ref={formRef} onSubmit={e => {
                  e.preventDefault();
                  const mailto = `mailto:druhin.mukherjee@gmail.com?subject=Pet%20Tip%20Submission&body=Name:%20${encodeURIComponent(form.name)}%0AEmail:%20${encodeURIComponent(form.email)}%0ACategory:%20${encodeURIComponent(form.category)}%0ATip:%20${encodeURIComponent(form.tip)}%0AImage%20URL:%20${encodeURIComponent(form.imageUrl)}`;
                  window.open(mailto, '_blank');
                  setIsModalOpen(false);
                  setForm({ name: '', email: '', tip: '', category: '', imageUrl: '' });
                }} className="space-y-4">
                  <input required className="w-full border rounded px-3 py-2" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <input required type="email" className="w-full border rounded px-3 py-2" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  <input required className="w-full border rounded px-3 py-2" placeholder="Category (e.g. Training, Nutrition)" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                  <textarea required minLength={20} className="w-full border rounded px-3 py-2" placeholder="Your Tip (at least 20 characters)" value={form.tip} onChange={e => setForm(f => ({ ...f, tip: e.target.value }))} rows={4} />
                  <input className="w-full border rounded px-3 py-2" placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} />
                  <div className="flex justify-end gap-2">
                    <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-[#F4A300] text-white hover:bg-[#007C91]">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
} 