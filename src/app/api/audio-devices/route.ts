import { NextResponse } from 'next/server';
import { getAudioDevicesApiUrl } from '@/src/utils/ApiUrls';

export async function GET() {
  try {
    const upstreamBase = getAudioDevicesApiUrl();
    console.info(`Starting GET ${upstreamBase}`);
    const res = await fetch(upstreamBase, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Upstream fetch failed' }, { status: 502 });
  }
}

