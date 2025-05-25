'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  CalendarIcon, 
  UserCircleIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { fetchSheetData } from '@/lib/data';
import { transformStoryData } from '@/lib/data';
import { Spinner } from '@/components/Spinner';
import { Pagination } from '@/components/Pagination';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';

interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 4;

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', title: '', story: '', imageUrl: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await fetchSheetData('Stories');
        // Skip header row and transform data
        const transformedStories = data.slice(1).map(transformStoryData);
        // Sort by date, most recent first
        transformedStories.sort((a: Story, b: Story) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setStories(transformedStories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  const totalPages = Math.ceil((stories.length - 1) / ITEMS_PER_PAGE); // -1 for featured story
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1; // +1 to skip featured story
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStories = stories.slice(startIndex, endIndex);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading stories: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pet Stories</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Real stories from pet parents like you
          </p>
        </div>

        {/* Featured Story - Using first story as featured */}
        {stories.length > 0 && (
          <div className="mt-16 overflow-hidden bg-white rounded-xl shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={stories[0].imageUrl}
                  alt={stories[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20" />
              </div>
              <div className="px-6 py-8 lg:px-8">
                <div className="flex items-center gap-x-4">
                  <time dateTime={stories[0].createdAt} className="text-sm text-gray-500">
                    {new Date(stories[0].createdAt).toLocaleDateString()}
                  </time>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    Featured
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{stories[0].title}</h2>
                <p className="mt-4 text-gray-600">{stories[0].content}</p>
                <div className="mt-6 flex items-center gap-x-4">
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{stories[0].author}</p>
                    <p className="text-sm text-gray-600">Pet Parent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12">
          {currentStories.map((story) => (
            <article key={story.id} className="flex flex-col bg-white rounded-xl shadow-sm p-6">
              <div className="relative h-48 w-full mb-4">
                <Image src={story.imageUrl} alt={story.title} fill className="object-cover rounded-lg" />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <time dateTime={story.createdAt} className="text-gray-500">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">By {story.author}</span>
                </div>
              </div>
              <div className="group relative mt-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">{story.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {story.content}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                    <HeartIcon className="h-5 w-5" />
                    <span>0</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span>0</span>
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="text-gray-600 hover:text-indigo-600">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-indigo-600">
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Share Your Story CTA */}
        <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-indigo-900">Have a story to share?</h2>
            <p className="mt-4 text-lg leading-6 text-indigo-700">
              Your journey could inspire other pet parents. Share your experience with our community.
            </p>
            <div className="mt-6">
              <button
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={() => setIsModalOpen(true)}
              >
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for story submission */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div aria-hidden className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-8 z-10">
            <Dialog.Title className="text-lg font-bold mb-4">Share Your Story</Dialog.Title>
            <form ref={formRef} onSubmit={e => {
              e.preventDefault();
              const mailto = `mailto:druhin.mukherjee@gmail.com?subject=Pet%20Story%20Submission&body=Name:%20${encodeURIComponent(form.name)}%0AEmail:%20${encodeURIComponent(form.email)}%0ATitle:%20${encodeURIComponent(form.title)}%0AStory:%20${encodeURIComponent(form.story)}%0AImage%20URL:%20${encodeURIComponent(form.imageUrl)}`;
              window.open(mailto, '_blank');
              setIsModalOpen(false);
              setForm({ name: '', email: '', title: '', story: '', imageUrl: '' });
            }} className="space-y-4">
              <input required className="w-full border rounded px-3 py-2" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input required type="email" className="w-full border rounded px-3 py-2" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input required className="w-full border rounded px-3 py-2" placeholder="Story Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              <textarea required minLength={100} className="w-full border rounded px-3 py-2" placeholder="Your Story (at least 100 words)" value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} rows={6} />
              <input className="w-full border rounded px-3 py-2" placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} />
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Send</button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 