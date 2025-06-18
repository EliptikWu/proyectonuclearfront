import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://back-aulas-production.up.railway.app';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/aulas`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}