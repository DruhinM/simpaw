import { NextResponse } from 'next/server';
import { getSheetData, appendSheetData } from '@/lib/sheets';

export async function GET() {
  try {
    const data = await getSheetData('Tips!A1:Z1000');
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Sheets test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        env: {
          hasSheetId: !!process.env.SHEET_ID,
          hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        }
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Try to append a test row to Tips sheet
    const testData = [
      [
        Date.now().toString(), // ID
        'Test Tip',           // Title
        'General',            // Category
        'This is a test tip', // Content
        'https://example.com/image.jpg', // ImageUrl
        new Date().toISOString(), // CreatedAt
      ]
    ];
    
    const result = await appendSheetData('Tips', testData);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Sheets test error:', error);
    return NextResponse.json(
      { error: 'Failed to append data', details: error.message },
      { status: 500 }
    );
  }
} 