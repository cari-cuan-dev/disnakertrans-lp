import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface AboutItem {
  id: string;
  type: string;
  content: string;
  status: boolean;
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
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');

    const whereClause: any = {
      deleted_at: null, // Only get non-deleted records
      // status: statusParam ? statusParam === 'true' : true, // Only get active items by default
    };

    if (typeParam) {
      whereClause.type = typeParam;
    }

    // console.log(whereClause)
    const abouts = await prisma.abouts.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        type: true,
        content: true,
        // status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(abouts);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching about items:', error);
    return NextResponse.json(
      { message: 'Failed to fetch about items' },
      { status: 500 }
    );
  }
}