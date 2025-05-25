import { NextResponse } from 'next/server';
import { getSheetData, updateSheetData, appendSheetData, deleteSheetRow } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get('sheet');
    
    if (!sheet) {
      return NextResponse.json(
        { error: 'Sheet parameter is required' },
        { status: 400 }
      );
    }

    const range = `${sheet}!A1:P`;
    const data = await getSheetData(range);
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { sheet, data } = await request.json();
    
    if (!sheet || !data) {
      return NextResponse.json(
        { error: 'Sheet and data parameters are required' },
        { status: 400 }
      );
    }

    const result = await appendSheetData(sheet, [data]);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error adding data:', error);
    return NextResponse.json(
      { error: 'Failed to add data', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { sheet, rowIndex, values } = await request.json();

    if (!sheet || !rowIndex || !values) {
      return NextResponse.json({ error: 'Sheet, rowIndex, and values are required' }, { status: 400 });
    }

    const result = await updateSheetData(`${sheet}!A${rowIndex}:Z${rowIndex}`, [values]);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get('sheet');
    const rowIndex = searchParams.get('rowIndex');

    if (!sheet || !rowIndex) {
      return NextResponse.json({ error: 'Sheet and rowIndex are required' }, { status: 400 });
    }

    const result = await deleteSheetRow(sheet, parseInt(rowIndex));
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
} 