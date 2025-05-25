'use client';

import { useEffect, useState } from 'react';
import { fetchSheetData, transformTipData } from '@/lib/data';
import { Spinner } from '@/components/Spinner';
import { 
  AcademicCapIcon, 
  HeartIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Tip {
  id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTips() {
      try {
        const data = await fetchSheetData('Tips');
        // Skip header row and transform data
        const transformedTips = data.slice(1).map(transformTipData);
        setTips(transformedTips);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTips();
  }, []);

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

  const stats = [
    { name: 'Happy Pet Parents', value: '10,000+', icon: UserGroupIcon },
    { name: 'Expert Tips', value: '500+', icon: AcademicCapIcon },
    { name: 'Success Stories', value: '2,500+', icon: SparklesIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Care Tips & Tricks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {tip.imageUrl && (
              <img 
                src={tip.imageUrl} 
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                {tip.category}
              </span>
              <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-gray-600">{tip.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(tip.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                  <stat.icon className="h-12 w-12 text-indigo-600" />
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 rounded-2xl bg-gray-50 py-10 px-6 sm:py-16 sm:px-12 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Want more detailed guidance?</h2>
              <p className="mt-4 text-lg leading-6 text-gray-600">
                Check out our comprehensive guides and connect with expert pet trainers.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-6">
                <button className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                  View Guides
                </button>
                <button className="text-sm font-semibold leading-6 text-gray-900">
                  Find Trainers <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 