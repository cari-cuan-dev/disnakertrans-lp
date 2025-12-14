import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image_path: string;
  status: boolean;
  created_at?: string | null;
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

    // Get active sliders only (status = true)
    const sliders = await prisma.sliders.findMany({
      where: {
        status: true,  // Only fetch active sliders
      },
      orderBy: {
        id: 'asc',  // Order by ID ascending
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        image_path: true,
      }
    });

    // Serialize BigInt values to strings
    const serializedSliders = serializeBigInt(sliders);

    return NextResponse.json(serializedSliders);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    return NextResponse.json(
      { message: 'Failed to fetch sliders' },
      { status: 500 }
    );
  }
}