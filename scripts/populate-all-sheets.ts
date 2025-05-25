import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Initialize sheets
async function getSheets() {
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

// Clear sheet data
async function clearSheet(sheet: string) {
  const sheets = await getSheets();
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.SHEET_ID,
      range: `${sheet}!A1:Z`,
    });
    console.log(`Cleared ${sheet} sheet`);
  } catch (error) {
    console.error(`Error clearing ${sheet} sheet:`, error);
  }
}

// Add data to sheet
async function appendSheetData(range: string, values: any[][]) {
  const sheets = await getSheets();
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
  return response.data;
}

// Sample data for each sheet
const tips = [
  [
    'tip1',
    'Basic Training Tips',
    'Training',
    'Start with simple commands like sit, stay, and come. Consistency and positive reinforcement are key.',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    new Date().toISOString(),
    'Dogs',
    'Beginner',
    'John Smith',
    '5 minutes',
    'Training treats, leash',
    'Weekly',
    'High',
    'Yes'
  ],
  [
    'tip2',
    'Healthy Diet Guide',
    'Nutrition',
    'Feed your pet a balanced diet appropriate for their age, size, and activity level.',
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=600&fit=crop',
    new Date().toISOString(),
    'All Pets',
    'Intermediate',
    'Dr. Sarah Wilson',
    '10 minutes',
    'Quality pet food, feeding schedule',
    'Daily',
    'High',
    'Yes'
  ],
  [
    'tip3',
    'Exercise Needs',
    'Health',
    'Regular exercise keeps your pet healthy and prevents behavioral issues.',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    new Date().toISOString(),
    'Dogs, Cats',
    'Beginner',
    'Mike Thompson',
    '15 minutes',
    'Toys, open space',
    'Daily',
    'Medium',
    'Yes'
  ],
  [
    'tip4',
    'Grooming Basics',
    'Care',
    'Regular brushing, nail trimming, and dental care are essential for your pet\'s wellbeing.',
    'https://images.unsplash.com/photo-1516734212186-65266f08a5e4?w=800&h=600&fit=crop',
    new Date().toISOString(),
    'All Pets',
    'Intermediate',
    'Lisa Anderson',
    '20 minutes',
    'Brush, nail clippers, pet toothbrush',
    'Weekly',
    'High',
    'Yes'
  ]
];

const stories = [
  [
    'story1',
    'Finding Max',
    'Sarah Johnson',
    'A heartwarming story of how I found my best friend at a local shelter.',
    '2024-03-15',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=600&fit=crop',
    'Adoption Success',
    'Dog',
    'Max',
    '2 years',
    'Golden Retriever',
    'Local Shelter',
    500,
    'Yes',
    'A full story about finding and bonding with Max at the shelter.'
  ],
  [
    'story2',
    'Second Chances',
    'Mike Peterson',
    'How adopting a senior dog changed both our lives for the better.',
    '2024-03-14',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    'Senior Pet Care',
    'Dog',
    'Buddy',
    '8 years',
    'Labrador Mix',
    'Senior Dog Rescue',
    750,
    'Yes',
    'The complete journey of adopting and caring for a senior dog.'
  ],
  [
    'story3',
    'The Miracle Recovery',
    'Dr. Emily Chen',
    'A remarkable story of a rescue dog\'s journey to health and happiness.',
    '2024-03-13',
    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=600&fit=crop',
    'Recovery Journey',
    'Dog',
    'Luna',
    '3 years',
    'Mixed Breed',
    'Emergency Rescue',
    1000,
    'Yes',
    'A detailed account of Luna\'s recovery and transformation.'
  ]
];

const vets = [
  [
    'vet1',
    'Central Pet Care Clinic',
    '123 Main Street, Anytown, USA',
    '+1 (555) 123-4567',
    'info@centralpetcare.com',
    'General Practice, Surgery, Dental Care',
    '4.8',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop',
    'Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM',
    'Yes',
    'Dogs, Cats, Small Animals',
    'English, Spanish',
    'All major insurance accepted',
    'Dr. John Smith, Dr. Maria Garcia',
    'Full-service veterinary hospital',
    '20+ years'
  ],
  [
    'vet2',
    'Pawsome Veterinary Hospital',
    '456 Oak Avenue, Anytown, USA',
    '+1 (555) 987-6543',
    'care@pawsomevet.com',
    'Emergency Care, Exotic Pets, Orthopedics',
    '4.9',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=600&fit=crop',
    '24/7 Emergency Care',
    'Yes',
    'All Animals, Exotic Pets',
    'English, Mandarin',
    'Payment plans available',
    'Dr. Sarah Lee, Dr. James Wilson',
    'State-of-the-art emergency facility',
    '15+ years'
  ],
  [
    'vet3',
    'Happy Tails Animal Hospital',
    '789 Pine Road, Anytown, USA',
    '+1 (555) 456-7890',
    'contact@happytailsvet.com',
    'Preventive Care, Internal Medicine, Dermatology',
    '4.7',
    'https://images.unsplash.com/photo-1606425270259-d1c94aac353f?w=800&h=600&fit=crop',
    'Monday-Saturday: 8AM-8PM',
    'Yes',
    'Dogs, Cats, Birds',
    'English, French',
    'CareCredit accepted',
    'Dr. Emily Brown, Dr. Michael Chen',
    'Specializing in preventive care',
    '10+ years'
  ]
];

const places = [
  [
    'place1',
    'Paws & Brews Cafe',
    'Pet-Friendly Cafe',
    '789 Park Road, Anytown, USA',
    'Dog Menu, Water Bowls, Outdoor Seating, Pet Treats',
    '4.8',
    'A cozy cafe where pets are not just allowed but celebrated. Features a special menu for dogs and dedicated pet play area.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    'Monday-Sunday: 8AM-8PM',
    'Yes',
    'Dogs must be leashed, Vaccination required',
    '2000 sq ft',
    'WiFi, Pet Photography, Pet Birthday Celebrations, Dog Wash Station',
    'Weekly Puppy Meetups, Monthly Pet Adoption Events',
    'Free street parking, Dedicated pet relief area',
    '2020'
  ],
  [
    'place2',
    'Central Bark Dog Park',
    'Dog Park',
    '101 Green Valley, Anytown, USA',
    'Fenced Areas, Agility Equipment, Water Fountains, Shade Structures',
    '4.9',
    'A spacious off-leash dog park with separate areas for small and large dogs, featuring agility equipment and shaded rest areas.',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    'Daily: 6AM-10PM',
    'Yes',
    'Must have current vaccinations, No aggressive dogs',
    '5 acres',
    'Dog Wash Station, Benches, Lighting, First Aid Station',
    'Monthly Training Workshops, Seasonal Dog Festivals',
    'Large parking lot with easy access',
    '2018'
  ],
  [
    'place3',
    'The Furry Inn',
    'Pet-Friendly Hotel',
    '234 Comfort Lane, Anytown, USA',
    'Pet Beds, Pet Room Service, Dog Walking Service, Pet Sitting',
    '4.7',
    'Luxury hotel that caters to both pets and their owners. Each room comes with pet amenities and access to pet-specific services.',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
    '24/7',
    'Yes',
    'Maximum 2 pets per room, Weight limit 50lbs',
    '100 rooms',
    'Pet Spa, Grooming Services, Pet Menu, Pet Welcome Package',
    'Pet Movie Nights, Pet Social Hours',
    'Valet parking, Pet relief areas on each floor',
    '2019'
  ],
  [
    'place4',
    'Pawsome Pet Supply',
    'Pet Store',
    '567 Market Street, Anytown, USA',
    'Wide Aisles, Pet Testing Area, Fitting Room, Self-Service Bath',
    '4.6',
    'A comprehensive pet supply store where pets are welcome to try products before purchase. Features a self-service bath station.',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
    'Monday-Saturday: 9AM-9PM, Sunday: 10AM-7PM',
    'Yes',
    'Pets must be leashed or in carriers',
    '15000 sq ft',
    'Nutrition Consultation, Product Testing Area, Grooming Services',
    'Monthly Pet Health Seminars, Adoption Days',
    'Large parking lot with cart return',
    '2015'
  ],
  [
    'place5',
    'Whiskers & Wine Restaurant',
    'Pet-Friendly Restaurant',
    '890 Dining Drive, Anytown, USA',
    'Heated Patio, Pet Menu, Water Service, Treat Bar',
    '4.8',
    'Upscale restaurant with a dedicated pet-friendly patio. Offers a special menu for dogs and complimentary water service.',
    'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=800&h=600&fit=crop',
    'Tuesday-Sunday: 11AM-10PM',
    'Yes',
    'Well-behaved pets only, Outdoor patio seating only',
    '3000 sq ft patio',
    'Pet Blankets, Heat Lamps, Misting System, Pet Waste Stations',
    'Yappy Hour Thursdays, Pet Birthday Package',
    'Valet parking available',
    '2021'
  ]
];

const donations = [
  [
    'don1',
    'Sarah Johnson',
    'sarah@example.com',
    '500',
    'Friend',
    'Completed',
    new Date('2024-03-15').toISOString(),
    'Monthly',
    'Credit Card',
    'Animal Shelter Support',
    'No',
    'First-time donor',
    'Newsletter: Yes',
    'Anonymous: No',
    'Tax receipt requested'
  ],
  [
    'don2',
    'Mike Peterson',
    'mike@example.com',
    '1000',
    'Guardian',
    'Completed',
    new Date('2024-03-14').toISOString(),
    'One-time',
    'PayPal',
    'Medical Fund',
    'Yes',
    'Returning donor',
    'Newsletter: Yes',
    'Anonymous: Yes',
    'Tax receipt sent'
  ],
  [
    'don3',
    'Emily Chen',
    'emily@example.com',
    '2500',
    'Champion',
    'Completed',
    new Date('2024-03-13').toISOString(),
    'Annual',
    'Bank Transfer',
    'General Fund',
    'Yes',
    'Corporate match',
    'Newsletter: No',
    'Anonymous: No',
    'Tax receipt sent'
  ]
];

async function populateAllSheets() {
  try {
    // Clear all sheets first
    await clearSheet('Tips');
    await clearSheet('Stories');
    await clearSheet('Vets');
    await clearSheet('Places');
    await clearSheet('Donations');

    // Tips Sheet
    console.log('Populating Tips sheet...');
    await appendSheetData('Tips!A1', [
      ['ID', 'Title', 'Category', 'Content', 'ImageUrl', 'CreatedAt', 'PetType', 'Difficulty', 'Author', 'Duration', 'Requirements', 'Frequency', 'Priority', 'Featured'],
      ...tips
    ]);

    // Stories Sheet
    console.log('Populating Stories sheet...');
    await appendSheetData('Stories!A1', [
      ['ID', 'Title', 'Author', 'Preview', 'Date', 'ImageUrl', 'Category', 'PetType', 'PetName', 'PetAge', 'Breed', 'Source', 'Likes', 'Featured', 'FullStory'],
      ...stories
    ]);

    // Vets Sheet
    console.log('Populating Vets sheet...');
    await appendSheetData('Vets!A1', [
      ['ID', 'Name', 'Address', 'Phone', 'Email', 'Services', 'Rating', 'ImageUrl', 'Hours', 'Emergency', 'Animals', 'Languages', 'Insurance', 'Staff', 'Specialization', 'Experience'],
      ...vets
    ]);

    // Places Sheet
    console.log('Populating Places sheet...');
    await appendSheetData('Places!A1', [
      ['ID', 'Name', 'Type', 'Address', 'Features', 'Rating', 'Description', 'ImageUrl', 'Hours', 'PetFriendly', 'Restrictions', 'Size', 'Amenities', 'Events', 'Parking', 'Established'],
      ...places
    ]);

    // Donations Sheet
    console.log('Populating Donations sheet...');
    await appendSheetData('Donations!A1', [
      ['ID', 'Name', 'Email', 'Amount', 'Tier', 'Status', 'Date', 'Frequency', 'PaymentMethod', 'Fund', 'RecurringDonor', 'Notes', 'Communication', 'Anonymity', 'Receipt'],
      ...donations
    ]);

    console.log('All sheets populated successfully!');
  } catch (error) {
    console.error('Error populating sheets:', error);
  }
}

// Run the population script
populateAllSheets(); 