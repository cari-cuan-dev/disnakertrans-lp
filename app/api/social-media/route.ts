import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface SocialMediaItem {
  id: string;  // bigint is serialized as string in JSON
  icon: string;
  color: string;
  name: string;
  url: string | null;
  status: boolean;
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
}

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export async function GET(request: NextRequest) {
  try {
    const socialMedia = await prisma.social_media.findMany({
      where: {
        status: true,
        deleted_at: null, // Only get non-deleted records
      },
      orderBy: {
        sort: 'asc', // Order by sort column ascending
      },
      select: {
        id: true,
        icon: true,
        color: true,
        name: true,
        url: true,
        status: true,
        sort: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(socialMedia);

    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching social media:', error);
    return NextResponse.json(
      { message: 'Failed to fetch social media' },
      { status: 500 }
    );
  }
}