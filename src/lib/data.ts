// Fetch data from API with retries
export async function fetchSheetData(sheet: string, retries = 3) {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to fetch data from sheet: ${sheet} (attempt ${i + 1}/${retries})`);
      const response = await fetch(`/api/data?sheet=${sheet}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch data');
      }
      
      return data.data;
    } catch (error) {
      console.error(`Error fetching data (attempt ${i + 1}/${retries}):`, error);
      lastError = error;
      
      // Wait before retrying (exponential backoff)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError;
}

// Add data to sheet
export async function addSheetData(sheet: string, data: any[]) {
  const response = await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sheet, data }),
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result;
}

// Default image URL to use when no image is provided
const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1550697851-920b181d8ca8?w=800&h=600&fit=crop';

// Transform data for different content types
export function transformTipData(tip: any) {
  return {
    id: tip[0] || String(Date.now()),
    title: tip[1] || '',
    category: tip[2] || 'General',
    content: tip[3] || '',
    imageUrl: tip[4] || DEFAULT_IMAGE_URL,
    createdAt: tip[5] || new Date().toISOString(),
    petType: tip[6] || 'All Pets',
    difficulty: tip[7] || 'Beginner',
    author: tip[8] || '',
    duration: tip[9] || '5 minutes',
    requirements: tip[10] || '',
    frequency: tip[11] || 'As needed',
    priority: tip[12] || 'Medium',
    featured: tip[13] === 'Yes'
  };
}

export function transformStoryData(story: any) {
  return {
    id: story[0] || String(Date.now()),
    title: story[1] || '',
    author: story[2] || '',
    preview: story[3] || '',
    date: story[4] ? new Date(story[4]).toISOString() : new Date().toISOString(),
    imageUrl: story[5] || DEFAULT_IMAGE_URL,
    category: story[6] || 'General',
    petType: story[7] || '',
    petName: story[8] || '',
    petAge: story[9] || '',
    breed: story[10] || '',
    source: story[11] || '',
    likes: parseInt(story[12]) || 0,
    featured: story[13] === 'Yes',
    fullStory: story[14] || ''
  };
}

export function transformVetData(vet: any) {
  return {
    id: vet[0] || String(Date.now()),
    name: vet[1] || '',
    address: vet[2] || '',
    phone: vet[3] || '',
    email: vet[4] || '',
    services: vet[5] ? vet[5].split(',').map((s: string) => s.trim()) : [],
    rating: parseFloat(vet[6]) || 0,
    imageUrl: vet[7] || DEFAULT_IMAGE_URL,
    hours: vet[8] || '',
    emergency: vet[9] === 'Yes',
    animals: vet[10] ? vet[10].split(',').map((a: string) => a.trim()) : [],
    languages: vet[11] ? vet[11].split(',').map((l: string) => l.trim()) : [],
    insurance: vet[12] || '',
    staff: vet[13] ? vet[13].split(',').map((s: string) => s.trim()) : [],
    specialization: vet[14] || '',
    experience: vet[15] || ''
  };
}

export function transformPlaceData(place: any) {
  return {
    id: place[0] || String(Date.now()),
    name: place[1] || '',
    type: place[2] || '',
    address: place[3] || '',
    features: place[4] ? place[4].split(',').map((f: string) => f.trim()) : [],
    rating: parseFloat(place[5]) || 0,
    description: place[6] || '',
    imageUrl: place[7] || DEFAULT_IMAGE_URL,
    hours: place[8] || '',
    petFriendly: place[9] === 'Yes',
    restrictions: place[10] || '',
    size: place[11] || '',
    amenities: place[12] ? place[12].split(',').map((a: string) => a.trim()) : [],
    events: place[13] || '',
    parking: place[14] || '',
    established: place[15] || ''
  };
}

// Add transformation function for donations
export function transformDonationData(donation: any) {
  return {
    id: donation[0] || String(Date.now()),
    name: donation[1] || '',
    email: donation[2] || '',
    amount: parseInt(donation[3]) || 0,
    tier: donation[4] || '',
    status: donation[5] || '',
    date: donation[6] || new Date().toISOString(),
    frequency: donation[7] || 'One-time',
    paymentMethod: donation[8] || '',
    fund: donation[9] || 'General Fund',
    recurringDonor: donation[10] === 'Yes',
    notes: donation[11] || '',
    communication: donation[12] || '',
    anonymity: donation[13] || '',
    receipt: donation[14] || ''
  };
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  description: string;
  image: string;
  location: string;
  status: string;
}

interface Story {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
}

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface Vet {
  id: string;
  name: string;
  location: string;
  contact: string;
  specialization: string;
}

interface Place {
  id: string;
  name: string;
  type: string;
  location: string;
  contact: string;
  description: string;
}

type SheetRow = string[];

export const getPets = async (): Promise<Pet[]> => {
  const data = await fetchSheetData('Pets');
  // Skip header row
  return data.slice(1).map((pet: SheetRow) => ({
    id: pet[0] || String(Date.now()),
    name: pet[1] || '',
    type: pet[2] || '',
    breed: pet[3] || '',
    age: Number(pet[4]) || 0,
    description: pet[5] || '',
    image: pet[6] || DEFAULT_IMAGE_URL,
    location: pet[7] || '',
    status: pet[8] || 'Available'
  }));
}

export const getStories = async (): Promise<Story[]> => {
  const data = await fetchSheetData('Stories');
  // Skip header row
  return data.slice(1).map((story: SheetRow) => ({
    id: story[0] || String(Date.now()),
    title: story[1] || '',
    content: story[2] || '',
    image: story[3] || DEFAULT_IMAGE_URL,
    date: story[4] || new Date().toISOString()
  }));
}

export const getTips = async (): Promise<Tip[]> => {
  const data = await fetchSheetData('Tips');
  // Skip header row
  return data.slice(1).map((tip: SheetRow) => ({
    id: tip[0] || String(Date.now()),
    title: tip[1] || '',
    content: tip[2] || '',
    category: tip[3] || 'General'
  }));
}

export const getVets = async (): Promise<Vet[]> => {
  const data = await fetchSheetData('Vets');
  // Skip header row
  return data.slice(1).map((vet: SheetRow) => ({
    id: vet[0] || String(Date.now()),
    name: vet[1] || '',
    location: vet[2] || '',
    contact: vet[3] || '',
    specialization: vet[4] || ''
  }));
}

export const getPlaces = async (): Promise<Place[]> => {
  const data = await fetchSheetData('Places');
  // Skip header row
  return data.slice(1).map((place: SheetRow) => ({
    id: place[0] || String(Date.now()),
    name: place[1] || '',
    type: place[2] || '',
    location: place[3] || '',
    contact: place[4] || '',
    description: place[5] || ''
  }));
}

export const getDonations = async (): Promise<{ amount: number; date: string; donor: string }[]> => {
  const data = await fetchSheetData('Donations');
  // Skip header row
  return data.slice(1).map((donation: SheetRow) => ({
    amount: Number(donation[3]) || 0,
    date: donation[6] || new Date().toISOString(),
    donor: donation[1] || 'Anonymous'
  }));
} 