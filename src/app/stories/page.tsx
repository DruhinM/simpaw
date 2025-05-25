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
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {story.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
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
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 