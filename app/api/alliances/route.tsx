

import { Alliance } from '@/types/types';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mapId = searchParams.get('mapId')
  if (!mapId) {
    return NextResponse.json({ error: 'No mapId provided' });
  }
  console.log('Loading alliances for mapId:', mapId);
  const alliances = await kv.get<Alliance[]>(`alliances:${mapId}`);
  console.log('alliances:' , alliances);
  return NextResponse.json(alliances);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const mapId = body.mapId;
  const alliances = body.alliances;
  if (alliances) {
    console.log('Saving alliances:', alliances);
    await kv.set(`alliances:${mapId}`, alliances);
  }
  return NextResponse.json({ success: true });
}


