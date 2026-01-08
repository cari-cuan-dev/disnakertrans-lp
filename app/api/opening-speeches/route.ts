import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { convertImagesToPresignedUrls } from '@/lib/utils';

export interface OpeningSpeechItem {
  id: string;
  type: string;
  role: string;
  name: string;
  image_path: string;
  speech: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get('type');
    const limitParam = searchParams.get('limit');

    const whereClause: any = {
      deleted_at: null, // Only get non-deleted records
    };

    if (typeParam) {
      whereClause.type = typeParam;
    }

    const openingSpeeches = await prisma.opening_speeches.findMany({
      where: whereClause,
      orderBy: {
        id: 'asc', // Order by ID or another field as needed
      },
      select: {
        id: true,
        type: true,
        role: true,
        name: true,
        image_path: true,
        speech: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(openingSpeeches);

    // Convert image_path to presigned URLs
    const openingSpeechesWithPresignedUrls = await convertImagesToPresignedUrls(serializedData);

    // Apply limit if specified
    const limitedData = limitParam ? openingSpeechesWithPresignedUrls.slice(0, parseInt(limitParam)) : openingSpeechesWithPresignedUrls;

    return NextResponse.json(limitedData);
  } catch (error) {
    console.error('Error fetching opening speeches:', error);
    return NextResponse.json(
      { message: 'Failed to fetch opening speeches' },
      { status: 500 }
    );
  }
}