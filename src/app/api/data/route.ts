import { NextResponse } from 'next/server';
import { getSheetData, updateSheetData, appendSheetData, deleteSheetRow } from '@/lib/sheets';

// Helper function to handle CORS
function corsResponse(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return corsResponse(new NextResponse(null, { status: 200 }));
}

export async function GET(request: Request) {
  try {
    // Log environment variables (excluding sensitive data)
    console.log('API Route - Starting request');
    console.log('API Route - Environment check:', {
      hasSheetId: !!process.env.SHEET_ID,
      hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      sheetIdPreview: process.env.SHEET_ID?.substring(0, 5) + '...',
      clientEmailPreview: process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.split('@')[0] + '...',
    });

    // Validate environment variables
    if (!process.env.SHEET_ID || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      const missing = [];
      if (!process.env.SHEET_ID) missing.push('SHEET_ID');
      if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) missing.push('GOOGLE_SHEETS_CLIENT_EMAIL');
      if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) missing.push('GOOGLE_SHEETS_PRIVATE_KEY');
      
      console.error('API Route - Missing environment variables:', missing);
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get('sheet');
    
    if (!sheet) {
      console.error('API Route - Missing sheet parameter');
      return corsResponse(NextResponse.json(
        { error: 'Sheet parameter is required' },
        { status: 400 }
      ));
    }

    console.log('API Route - Fetching data:', { sheet });
    const range = `${sheet}!A1:P`;

    try {
      const data = await getSheetData(range);
      console.log('API Route - Data fetched successfully:', {
        rowCount: data.data.length,
        sheet,
        range
      });
      
      return corsResponse(NextResponse.json({ 
        success: true, 
        data: data.data,
        meta: {
          sheet,
          range,
          rowCount: data.data.length
        }
      }));
    } catch (sheetError: any) {
      console.error('API Route - Google Sheets API Error:', {
        message: sheetError.message,
        code: sheetError.code,
        status: sheetError.status,
        errors: sheetError.errors,
        response: sheetError.response?.data
      });
      throw sheetError;
    }
  } catch (error: any) {
    console.error('API Route - Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
      type: error.constructor.name
    });
    
    return corsResponse(NextResponse.json(
      { 
        error: 'Failed to fetch data', 
        message: error.message,
        code: error.code,
        type: error.constructor.name
      },
      { status: 500 }
    ));
  }
}

export async function POST(request: Request) {
  try {
    const { sheet, data } = await request.json();
    
    if (!sheet || !data) {
      return corsResponse(NextResponse.json(
        { error: 'Sheet and data parameters are required' },
        { status: 400 }
      ));
    }

    const result = await appendSheetData(sheet, [data]);
    return corsResponse(NextResponse.json({ success: true, result }));
  } catch (error: any) {
    console.error('Error adding data:', error);
    return corsResponse(NextResponse.json(
      { error: 'Failed to add data', details: error.message },
      { status: 500 }
    ));
  }
}

export async function PUT(request: Request) {
  try {
    const { sheet, rowIndex, values } = await request.json();

    if (!sheet || !rowIndex || !values) {
      return corsResponse(NextResponse.json(
        { error: 'Sheet, rowIndex, and values are required' },
        { status: 400 }
      ));
    }

    const result = await updateSheetData(`${sheet}!A${rowIndex}:Z${rowIndex}`, [values]);
    return corsResponse(NextResponse.json({ result }));
  } catch (error) {
    console.error('Error updating data:', error);
    return corsResponse(NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    ));
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get('sheet');
    const rowIndex = searchParams.get('rowIndex');

    if (!sheet || !rowIndex) {
      return corsResponse(NextResponse.json(
        { error: 'Sheet and rowIndex are required' },
        { status: 400 }
      ));
    }

    const result = await deleteSheetRow(sheet, parseInt(rowIndex));
    return corsResponse(NextResponse.json({ result }));
  } catch (error) {
    console.error('Error deleting data:', error);
    return corsResponse(NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    ));
  }
} 