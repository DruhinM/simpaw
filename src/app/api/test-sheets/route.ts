import { NextResponse } from 'next/server';
import { getSheetData, appendSheetData } from '@/lib/sheets';

export async function GET() {
  try {
    // Try to read data from Tips sheet
    const data = await getSheetData('Tips!A1:F1');
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Sheets test error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
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