import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface DocumentationItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  file_path: string;
  size: string | null;
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
    const statusParam = searchParams.get('status');

    const whereClause: any = {
      status: statusParam ? statusParam === 'true' : true, // Only get active items by default
    };

    const documentations = await prisma.documentations.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        type: true,
        file_path: true,
        size: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(documentations);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching documentation:', error);
    return NextResponse.json(
      { message: 'Failed to fetch documentation' },
      { status: 500 }
    );
  }
}