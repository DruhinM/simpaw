import { 
  MapPinIcon, 
  StarIcon, 
  HeartIcon,
  PhotoIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function PlacesPage() {
  const stats = [
    { name: 'Pet-Friendly Locations', value: '1,000+', icon: BuildingStorefrontIcon },
    { name: 'Happy Visitors', value: '100,000+', icon: UserGroupIcon },
    { name: 'Cities Covered', value: '50+', icon: MapIcon },
  ];

  const places = [
    {
      name: "Central Park Cafe",
      type: "Restaurant",
      address: "123 Park Avenue, City",
      features: ["Outdoor Seating", "Water Bowls", "Pet Menu"],
      rating: 4.5,
      reviews: 234,
      description: "A cozy cafe with a dedicated pet menu and spacious outdoor seating area.",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop",
      hours: "8AM - 10PM",
      phone: "(555) 123-4567",
      website: "www.centralpawscafe.com",
      photos: 45,
      likes: 156
    },
    {
      name: "Pawsome Pet Park",
      type: "Park",
      address: "456 Recreation Road, City",
      features: ["Fenced Area", "Water Fountains", "Agility Equipment"],
      rating: 4.8,
      reviews: 567,
      description: "Large off-leash dog park with separate areas for small and large dogs.",
      image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&h=600&fit=crop",
      hours: "6AM - 9PM",
      phone: "(555) 234-5678",
      website: "www.pawsomepark.com",
      photos: 89,
      likes: 324
    },
    {
      name: "The Friendly Hotel",
      type: "Hotel",
      address: "789 Comfort Lane, City",
      features: ["Pet Beds", "Walking Service", "Pet Sitting"],
      rating: 4.6,
      reviews: 345,
      description: "Luxury hotel that welcomes pets with special amenities and services.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      hours: "24/7",
      phone: "(555) 345-6789",
      website: "www.friendlyhotel.com",
      photos: 67,
      likes: 245
    }
  ];

  const categories = [
    "All Places",
    "Restaurants",
    "Parks",
    "Hotels",
    "Cafes",
    "Groomers",
    "Pet Stores"
  ];

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
                <stat.icon className="h-12 w-12 text-indigo-600" />
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Category Filter */}
        <div className="mt-16">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  index === 0
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {places.map((place, index) => (
            <div key={index} className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                    <span className="text-sm text-indigo-600">{place.type}</span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{place.rating}</span>
                    <span className="text-sm text-gray-500">({place.reviews})</span>
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
                  <div className="flex items-center gap-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{place.phone}</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{place.website}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Features</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {place.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-x-1">
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{place.likes}</span>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <PhotoIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{place.photos}</span>
                    </div>
                  </div>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Place CTA */}
        <div className="mt-16 rounded-2xl bg-indigo-50 py-10 px-6 sm:py-16 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-indigo-900">Know a Pet-Friendly Place?</h2>
            <p className="mt-4 text-lg leading-6 text-indigo-700">
              Help other pet parents discover great places by adding your recommendations.
            </p>
            <div className="mt-6">
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Add a Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 