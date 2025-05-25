import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Debug: Log environment variables (without sensitive data)
console.log('Environment check:', {
  hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  hasSheetId: !!process.env.SHEET_ID,
});

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

const tips = [
  [
    'tip1',
    'Basic Training Tips',
    'Training',
    'Start with simple commands like sit, stay, and come. Consistency and positive reinforcement are key.',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    new Date().toISOString()
  ],
  [
    'tip2',
    'Healthy Diet Guide',
    'Nutrition',
    'Feed your pet a balanced diet appropriate for their age, size, and activity level.',
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=600&fit=crop',
    new Date().toISOString()
  ],
  [
    'tip3',
    'Exercise Needs',
    'Health',
    'Regular exercise keeps your pet healthy and prevents behavioral issues.',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    new Date().toISOString()
  ],
  [
    'tip4',
    'Grooming Basics',
    'Care',
    'Regular brushing, nail trimming, and dental care are essential for your pet\'s wellbeing.',
    'https://images.unsplash.com/photo-1516734212186-65266f08a5e4?w=800&h=600&fit=crop',
    new Date().toISOString()
  ]
];

async function populateSheets() {
  try {
    // First, add headers
    await appendSheetData('Tips!A1:F1', [
      ['ID', 'Title', 'Category', 'Content', 'ImageUrl', 'CreatedAt']
    ]);
    console.log('Added headers');

    // Then add data
    for (const tip of tips) {
      await appendSheetData('Tips!A2:F2', [tip]);
      console.log(`Added tip: ${tip[1]}`);
    }

    console.log('Successfully populated sheets!');
  } catch (error) {
    console.error('Error populating sheets:', error);
  }
}

populateSheets(); 