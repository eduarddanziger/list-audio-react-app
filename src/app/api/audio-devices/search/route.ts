import { NextResponse } from 'next/server';
import { getAudioDevicesApiUrl } from '@/src/utils/ApiUrls';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') ?? '';
    const upstreamBase = getAudioDevicesApiUrl();
    const upstreamSearch = `${upstreamBase}/search`;
    console.info(`Starting GET ${upstreamSearch}`);
    const upstreamUrl = `${upstreamSearch}?${new URLSearchParams({ query })}`;
    const res = await fetch(upstreamUrl, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Upstream search failed' }, { status: 502 });
  }
}
