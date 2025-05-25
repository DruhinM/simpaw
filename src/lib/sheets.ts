import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { SheetData } from '@/types';

interface SheetRow {
  [key: string]: string | number | boolean;
}

// Format private key by replacing literal \n with actual newlines
const formatPrivateKey = (key: string) => {
  // Remove any extra spaces and ensure proper line breaks
  return key
    .replace(/\\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
};

// Validate environment variables
const validateEnvVariables = () => {
  const missing = [];
  if (!process.env.SHEET_ID) missing.push('SHEET_ID');
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) missing.push('GOOGLE_SHEETS_CLIENT_EMAIL');
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) missing.push('GOOGLE_SHEETS_PRIVATE_KEY');
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Initialize auth
const getAuth = () => {
  validateEnvVariables();
  
  const privateKey = formatPrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY!);
  console.log('Private key length:', privateKey.length);
  console.log('Private key starts with:', privateKey.substring(0, 50));
  
  return new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Initialize sheets
export async function getSheets() {
  try {
    const auth = getAuth();
    const client = await auth.getClient();
    return google.sheets({
      version: 'v4',
      auth: client as any // Type assertion needed due to Google API types mismatch
    });
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
}

// Get data from sheet
export async function getSheetData(range: string): Promise<SheetData> {
  try {
    validateEnvVariables();
    console.log('Fetching data from sheet ID:', process.env.SHEET_ID);
    console.log('Using range:', range);

    const sheets = await getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    console.log('Response received:', !!response.data);
    console.log('Values received:', !!response.data.values);
    console.log('Number of rows:', response.data.values?.length || 0);

    return {
      data: response.data.values || [],
    };
  } catch (error) {
    console.error('Error getting sheet data:', error);
    throw error;
  }
}

// Append data to sheet
export async function appendSheetData(range: string, values: (string | number | boolean)[][]) {
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

// Update data in sheet
export async function updateSheetData(range: string, values: any[][]) {
  const sheets = await getSheets();
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
  return response.data;
}

// Delete row from sheet
export async function deleteSheetRow(sheetName: string, rowIndex: number) {
  const sheets = await getSheets();
  const response = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: getSheetId(sheetName),
              dimension: 'ROWS',
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    },
  });
  return response.data;
}

// Helper function to get sheet ID
function getSheetId(sheetName: string) {
  // You'll need to manually map sheet names to their IDs
  // You can get these IDs from the Google Sheets URL
  const sheetIds: { [key: string]: number } = {
    'Tips': 0,
    'Stories': 1,
    'Vets': 2,
    'Places': 3,
    'Donations': 4,
  };
  return sheetIds[sheetName];
}

export const appendToSheet = async (sheetName: string, values: SheetRow[]): Promise<void> => {
  // ... existing code ...
} 