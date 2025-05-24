import Image from 'next/image';
import { 
  CalendarIcon, 
  UserCircleIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

export default function StoriesPage() {
  const stories = [
    {
      title: "Max's Journey to Recovery",
      author: "Sarah Johnson",
      preview: "When we found Max, he was scared and injured. Today, he's the happiest dog you'll ever meet.",
      date: "May 15, 2024",
      likes: 234,
      comments: 45,
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop"
    },
    {
      title: "Luna's Adoption Story",
      author: "Mike Peters",
      preview: "After months at the shelter, Luna finally found her forever home with us.",
      date: "May 12, 2024",
      likes: 189,
      comments: 32,
      image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop"
    },
    {
      title: "Training Success with Charlie",
      author: "Emma Wilson",
      preview: "From an energetic puppy to a well-behaved companion - our training journey.",
      date: "May 10, 2024",
      likes: 156,
      comments: 28,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pet Stories</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Real stories from pet parents like you
          </p>
        </div>

        {/* Featured Story */}
        <div className="mt-16 overflow-hidden bg-white rounded-xl shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20" />
              <div className="h-full w-full bg-gray-100" />
            </div>
            <div className="px-6 py-8 lg:px-8">
              <div className="flex items-center gap-x-4">
                <time dateTime="2024-05-20" className="text-sm text-gray-500">
                  May 20, 2024
                </time>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                  Featured
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Bella's Incredible Recovery Story</h2>
              <p className="mt-4 text-gray-600">
                From a critical injury to winning agility competitions - follow Bella's inspiring journey of resilience and determination.
              </p>
              <div className="mt-6 flex items-center gap-x-4">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-900">Dr. James Carter</p>
                  <p className="text-sm text-gray-600">Veterinarian & Pet Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12">
          {stories.map((story, index) => (
            <article key={index} className="flex flex-col bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-x-4 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <time dateTime={story.date} className="text-gray-500">{story.date}</time>
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
                  {story.preview}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                    <HeartIcon className="h-5 w-5" />
                    <span>{story.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span>{story.comments}</span>
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