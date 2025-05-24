import {
  HeartIcon,
  GiftIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  UserGroupIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function DonatePage() {
  const stats = [
    { name: 'Pets Helped', value: '2,500+', icon: HeartIcon },
    { name: 'Active Donors', value: '1,000+', icon: UserGroupIcon },
    { name: 'Success Rate', value: '95%', icon: SparklesIcon },
  ];

  const donationTiers = [
    {
      name: 'Friend',
      price: '500',
      description: 'Help provide food and basic supplies for one pet in need',
      features: [
        'Feed a pet for a week',
        'Receive monthly updates',
        'Get a thank you card'
      ],
      icon: HeartIcon,
      color: 'rose'
    },
    {
      name: 'Guardian',
      price: '1,000',
      description: 'Support medical care and shelter for rescued pets',
      features: [
        'All Friend benefits',
        'Sponsor a specific pet',
        'Receive quarterly impact report',
        'Name featured on website'
      ],
      icon: ShieldCheckIcon,
      color: 'indigo',
      popular: true
    },
    {
      name: 'Champion',
      price: '2,500',
      description: 'Make a lasting impact on multiple pets lives',
      features: [
        'All Guardian benefits',
        'VIP access to pet events',
        'Personal impact dashboard',
        'Priority updates on sponsored pets'
      ],
      icon: SparklesIcon,
      color: 'amber'
    }
  ];

  const impactAreas = [
    {
      name: 'Emergency Medical Care',
      description: 'Provide urgent medical treatment for injured or sick pets',
      icon: GiftIcon
    },
    {
      name: 'Food & Supplies',
      description: 'Ensure pets have nutritious food and essential supplies',
      icon: CurrencyDollarIcon
    },
    {
      name: 'Shelter & Rehabilitation',
      description: 'Support safe spaces for pets to recover and find new homes',
      icon: HandRaisedIcon
    },
    {
      name: 'Monthly Support',
      description: 'Set up recurring donations to help pets consistently',
      icon: ArrowPathIcon
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Difference</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your donation helps provide food, shelter, and medical care to pets in need. Every contribution, no matter the size, makes a real impact.
          </p>
        </div>

        {/* Stats Section */}
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

        {/* Impact Areas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">Your Impact Areas</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area) => (
              <div key={area.name} className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <area.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{area.name}</h3>
                <p className="mt-2 text-sm text-center text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">Choose Your Impact Level</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {donationTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${
                  tier.popular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-x-4">
                  <tier.icon className={`h-8 w-8 text-${tier.color}-600`} />
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">₹{tier.price}</span>
                  <span className="text-sm font-semibold text-gray-600">/month</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-3 text-sm text-gray-600">
                      <HeartIcon className="h-5 w-5 text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ${
                  tier.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}>
                  Donate {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* One-time Donation */}
        <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-indigo-900">Prefer a One-time Donation?</h2>
            <p className="mt-4 text-lg leading-6 text-indigo-700">
              Every contribution helps! Choose your own amount and make a difference today.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              {['₹500', '₹1,000', '₹2,500', '₹5,000'].map((amount) => (
                <button
                  key={amount}
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
                >
                  {amount}
                </button>
              ))}
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Custom Amount
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex items-center justify-center gap-x-4 rounded-xl bg-gray-50 p-8">
              <ShieldCheckIcon className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-base font-semibold text-gray-900">Secure Payments</h3>
                <p className="mt-1 text-sm text-gray-600">Your donation is safe and secure</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-4 rounded-xl bg-gray-50 p-8">
              <SparklesIcon className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-base font-semibold text-gray-900">100% to Pets</h3>
                <p className="mt-1 text-sm text-gray-600">Every penny goes to helping pets in need</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 