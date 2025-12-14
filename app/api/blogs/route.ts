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

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('category_id') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const sort = formData.get('sort') as string;
    const coverImage = formData.get('cover_image') as File | null;

    // Validate required fields
    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: 'Title, content, and category_id are required' },
        { status: 400 }
      );
    }

    // Process the cover image if provided
    let coverImagePath: string | null = null;

    if (coverImage) {
      // Convert image to buffer
      const buffer = Buffer.from(await coverImage.arrayBuffer());

      // Import S3 utility function
      const { uploadBlogCoverToS3 } = await import('@/lib/s3-blog-utils');

      // Upload to S3
      coverImagePath = await uploadBlogCoverToS3(
        buffer,
        coverImage.name,
        coverImage.type
      );

      // If upload to S3 fails, return error
      if (!coverImagePath) {
        return NextResponse.json(
          { message: 'Failed to upload image to S3' },
          { status: 500 }
        );
      }
    }

    // Parse tags JSON if provided
    let parsedTags: any = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        console.error('Invalid tags JSON:', e);
        parsedTags = [];
      }
    }

    // Create the blog post
    const newBlog = await prisma.blogs.create({
      data: {
        title,
        content,
        category_id: BigInt(categoryId),
        img_cover_path: coverImagePath || '',
        tags: parsedTags,
        status: status === 'true',
        sort: sort ? parseInt(sort) : null,
        created_at: new Date(),
      },
    });

    // Serialize and return the result
    const serializedData = serializeBigInt(newBlog);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}