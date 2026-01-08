import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get all unique categories from blog posts
    const categories = await prisma.blogs.findMany({
      where: {
        status: true, // Only get published blog posts
        deleted_at: null, // Only get non-deleted records
      },
      select: {
        categories: {
          // where: {
          //   deleted_at: null, // Only include non-deleted categories
          // },
          select: {
            name: true,
          }
        }
      },
    });

    // Extract unique category names
    const uniqueCategoryNames = Array.from(
      new Set(categories.map(blog => blog.categories.name).filter(name => name))
    );

    return NextResponse.json(uniqueCategoryNames);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}