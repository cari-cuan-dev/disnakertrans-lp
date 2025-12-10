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
  created_at: string;
  updated_at: string;
  category_id: string | null;
  sort: number | null;
  // categories?: {
  //   id: string;
  //   name: string;
  // } | null;
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
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const whereClause: any = {
      status: statusParam ? statusParam === 'true' : true, // Only get active items by default
    };

    if (categoryParam) {
      whereClause.category_id = BigInt(categoryParam);
    }

    if (searchParam) {
      whereClause.OR = [
        {
          title: {
            contains: searchParam,
            mode: 'insensitive' as const,
          },
        },
        {
          subtitle: {
            contains: searchParam,
            mode: 'insensitive' as const,
          },
        },
      ];
    }

    const documentations = await prisma.documentations.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc', // Order by newest first
      },
      // include: {
      //   categories: {
      //     select: {
      //       id: true,
      //       name: true,
      //     },
      //   },
      // },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(documentations);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching documentations:', error);
    return NextResponse.json(
      { message: 'Failed to fetch documentations' },
      { status: 500 }
    );
  }
}