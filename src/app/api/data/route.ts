import { NextResponse } from 'next/server';
import { getSheetData, updateSheetData, appendSheetData, deleteSheetRow } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get('sheet');

    if (!sheet) {
      return NextResponse.json({ error: 'Sheet parameter is required' }, { status: 400 });
    }

    const data = await getSheetData(`${sheet}!A2:Z`);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { sheet, values } = await request.json();

    if (!sheet || !values) {
      return NextResponse.json({ error: 'Sheet and values are required' }, { status: 400 });
    }

    const result = await appendSheetData(`${sheet}!A2:Z`, [values]);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error adding data:', error);
    return NextResponse.json({ error: 'Failed to add data' }, { status: 500 });
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