import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface BlogItem {
  id: string;
  title: string;
  img_cover_path: string;
  content: string;
  tags: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  sort: number | null;
  categories: {
    id: string;
    name: string;
  };
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
    const category = searchParams.get('category');
    const service = searchParams.get('service');
    const search = searchParams.get('search');
    
    // Build where clause based on filters
    const whereClause: any = {
      status: true, // Only get published blog posts
    };

    // Handle category_id filter
    const categoryId = searchParams.get('category_id');
    if (categoryId) {
      whereClause.category_id = BigInt(categoryId);
    }

    // Handle category name filter
    if (category && !categoryId) { // Only apply category name filter if category_id is not present
      whereClause.categories = {
        name: category
      };
    }

    if (service) {
      const serviceConditions = [
        {
          categories: {
            name: service
          }
        },
        {
          tags: {
            contains: service,
            mode: 'insensitive' as const
          }
        }
      ];

      whereClause.OR = whereClause.OR
        ? [...whereClause.OR, ...serviceConditions]
        : serviceConditions;
    }

    if (search) {
      whereClause.OR = whereClause.OR ? [...whereClause.OR, {
        title: {
          contains: search,
          mode: 'insensitive' as const
        }
      }, {
        content: {
          contains: search,
          mode: 'insensitive' as const
        }
      }] : [{
        title: {
          contains: search,
          mode: 'insensitive' as const
        }
      }, {
        content: {
          contains: search,
          mode: 'insensitive' as const
        }
      }];
    }

    const blogs = await prisma.blogs.findMany({
      where: whereClause,
      orderBy: {
        sort: 'asc',
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(blogs);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}