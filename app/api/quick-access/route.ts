import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface QuickAccessItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  type: string;
  category_id: string | null;
  blog_id: string | null;
  url: string | null;
  status: boolean;
  created_at: string | null;
  updated_at: string | null;
  blogs?: {
    id: string;
    title: string;
  } | null;
  categories?: {
    id: string;
    name: string;
  } | null;
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
      deleted_at: null, // Only get non-deleted records
    };
    if (statusParam) {
      whereClause.status = statusParam === 'true';
    } else {
      whereClause.status = true; // Only get active quick access items by default
    }

    const quickAccessItems = await prisma.quick_accesses.findMany({
      where: whereClause,
      orderBy: {
        sort: 'asc', // Sort by the sort column in ascending order
      },
      include: {
        blogs: {
          where: {
            deleted_at: null, // Only include non-deleted blogs
          },
          // orderBy: {
          //   sort: 'asc', // Sort blogs by sort column in ascending order
          // },
          select: {
            id: true,
            title: true,
          }
        },
        categories: {
          // where: {
          //   deleted_at: null, // Only include non-deleted categories
          // },
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(quickAccessItems);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching quick access items:', error);
    return NextResponse.json(
      { message: 'Failed to fetch quick access items' },
      { status: 500 }
    );
  }
}