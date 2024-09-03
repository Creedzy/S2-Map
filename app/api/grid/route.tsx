

import { GridCell } from '@/types/types';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mapId = searchParams.get('mapId')
  if (!mapId) {
    return NextResponse.json({ error: 'No mapId provided' });
  }
  console.log('Searching grids for mapId:', mapId);
  const grid = await kv.get<GridCell[][]>(`grid:${mapId}`);
  console.log('grid:' , grid);
  return NextResponse.json(grid);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const mapId = body.mapId;
  const grid = body.grid;
  if (grid) {
    console.log('Saving grid:', grid);
    await kv.set(`grid:${mapId}`, grid);
  }
  return NextResponse.json({ success: true });
}

