import { 
  AcademicCapIcon, 
  HeartIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function TipsPage() {
  const stats = [
    { name: 'Happy Pet Parents', value: '10,000+', icon: UserGroupIcon },
    { name: 'Expert Tips', value: '500+', icon: AcademicCapIcon },
    { name: 'Success Stories', value: '2,500+', icon: SparklesIcon },
  ];

  const tips = [
    {
      title: "Basic Training Tips",
      description: "Start with simple commands like sit, stay, and come. Consistency and positive reinforcement are key.",
      category: "Training",
      icon: AcademicCapIcon,
      color: "indigo"
    },
    {
      title: "Healthy Diet Guide",
      description: "Feed your pet a balanced diet appropriate for their age, size, and activity level.",
      category: "Nutrition",
      icon: HeartIcon,
      color: "rose"
    },
    {
      title: "Exercise Needs",
      description: "Regular exercise keeps your pet healthy and prevents behavioral issues.",
      category: "Health",
      icon: ChartBarIcon,
      color: "green"
    },
    {
      title: "Grooming Basics",
      description: "Regular brushing, nail trimming, and dental care are essential for your pet's wellbeing.",
      category: "Care",
      icon: ShieldCheckIcon,
      color: "blue"
    }
  ];

  return (
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

        {/* Tips Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tips.map((tip, index) => (
            <article 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-x-4">
                <div className={`rounded-lg bg-${tip.color}-50 p-2`}>
                  <tip.icon className={`h-6 w-6 text-${tip.color}-600`} />
                </div>
                <span className={`text-sm font-medium text-${tip.color}-600`}>{tip.category}</span>
              </div>
              <div className="group relative mt-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {tip.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {tip.description}
                </p>
              </div>
              <div className="mt-4">
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Learn more →
                </button>
              </div>
            </article>
          ))}
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
  );
} 