import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { SheetData } from '@/types';

// Initialize auth
const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Initialize sheets
export async function getSheets() {
  const client = await auth.getClient();
  return google.sheets({ 
    version: 'v4', 
    auth: client 
  });
}

// Get data from sheet
export async function getSheetData(range: string): Promise<SheetData> {
  const sheets = await getSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  return {
    data: response.data.values || [],
  };
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