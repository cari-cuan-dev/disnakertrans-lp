import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadBlogCoverToS3, deleteBlogCoverFromS3 } from '@/lib/s3-blog-utils';

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {

  const { id } = await params;

  // return NextResponse.json(
  //   {
  //     data: id
  //   }
  // )
  try {
    console.log("Raw params.id:", JSON.stringify(id));
    console.log("Type of params.id:", typeof id);

    // Ensure id is a string by converting it
    const stringId = String(id);
    console.log("Converted to string:", stringId);

    // Check if the conversion worked
    if (typeof stringId !== 'string') {
      console.error("FAIL 1: Could not convert id to string");
      return NextResponse.json(
        { message: 'ID must be convertible to string' },
        { status: 400 }
      );
    }

    // Trim the value
    const idStr = stringId.trim();
    console.log("After trim:", JSON.stringify(idStr));

    // Check if empty
    if (idStr === '') {
      console.error("FAIL 2: ID is empty after trimming");
      return NextResponse.json(
        { message: 'ID cannot be empty' },
        { status: 400 }
      );
    }

    // Check if it's all digits
    if (!/^[0-9]+$/.test(idStr)) {
      console.error("FAIL 3: ID contains non-numeric characters:", idStr);
      return NextResponse.json(
        { message: 'ID must contain only digits' },
        { status: 400 }
      );
    }

    // Check for leading zeros (except for "0" itself)
    if (idStr.length > 1 && idStr[0] === '0') {
      console.error("FAIL 4: ID has leading zeros:", idStr);
      return NextResponse.json(
        { message: 'ID cannot have leading zeros' },
        { status: 400 }
      );
    }

    // Convert to number and validate
    const numId = Number(idStr);
    console.log("Parsed number:", numId);

    if (!Number.isInteger(numId)) {
      console.error("FAIL 5: Not an integer:", numId);
      return NextResponse.json(
        { message: 'ID must be an integer' },
        { status: 400 }
      );
    }

    if (numId <= 0) {
      console.error("FAIL 6: Number is not positive:", numId);
      return NextResponse.json(
        { message: 'ID must be positive' },
        { status: 400 }
      );
    }

    // Now try BigInt conversion
    let bigIntId: bigint;
    try {
      bigIntId = BigInt(idStr);
      console.log("Successfully created BigInt:", bigIntId);
    } catch (conversionError) {
      console.error("BigInt creation failed for:", idStr, "Error:", conversionError);
      return NextResponse.json(
        { message: `BigInt conversion failed for ID: ${idStr}` },
        { status: 400 }
      );
    }

    // Execute the database query
    const blog = await prisma.blogs.findUnique({
      where: {
        id: bigIntId,
        status: true,
        deleted_at: null, // Only get non-deleted records
      },
      include: {
        categories: {
          where: {
            deleted_at: null, // Only include non-deleted categories
          },
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!blog) {
      console.log("Blog not found for ID:", bigIntId.toString());
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    console.log("Successfully found blog for ID:", bigIntId.toString());

    // Serialize and return the result
    const serializedData = serializeBigInt(blog);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error in blog detail API:', error);

    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Parse the form data
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('category_id') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const sort = formData.get('sort') as string;
    const coverImage = formData.get('cover_image') as File | null;

    // Get the current blog to check if there's an existing image to delete
    const currentBlog = await prisma.blogs.findUnique({
      where: {
        id: BigInt(id),
        deleted_at: null // Only get non-deleted records
      }
    });

    if (!currentBlog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Process the cover image if provided
    let coverImagePath = currentBlog.img_cover_path; // Use existing path as default

    if (coverImage) {
      // If there's an existing image in S3, delete it
      if (currentBlog.img_cover_path && currentBlog.img_cover_path.startsWith('http')) {
        await deleteBlogCoverFromS3(currentBlog.img_cover_path);
      }

      // Convert image to buffer
      const buffer = Buffer.from(await coverImage.arrayBuffer());

      // Upload to S3
      const newImagePath = await uploadBlogCoverToS3(
        buffer,
        coverImage.name,
        coverImage.type
      );

      // If upload to S3 fails, return error
      if (!newImagePath) {
        return NextResponse.json(
          { message: 'Failed to upload new image to S3' },
          { status: 500 }
        );
      }

      // Set the new image path
      coverImagePath = newImagePath;
    }

    // Parse tags JSON if provided
    let parsedTags: any = currentBlog.tags || []; // Use existing tags as default
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        console.error('Invalid tags JSON:', e);
        parsedTags = currentBlog.tags || [];
      }
    }

    // Update the blog post
    const updatedBlog = await prisma.blogs.update({
      where: { id: BigInt(id) },
      data: {
        title: title || currentBlog.title,
        content: content || currentBlog.content,
        category_id: categoryId ? BigInt(categoryId) : currentBlog.category_id,
        img_cover_path: coverImagePath || currentBlog.img_cover_path, // Preserve existing if no new image
        tags: parsedTags,
        status: status !== undefined ? status === 'true' : currentBlog.status,
        sort: sort ? parseInt(sort) : currentBlog.sort,
        updated_at: new Date(),
      },
    });

    // Serialize and return the result
    const serializedData = serializeBigInt(updatedBlog);
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Get the blog to check if there's an image to delete from S3
    const blog = await prisma.blogs.findUnique({
      where: {
        id: BigInt(id),
        deleted_at: null // Only get non-deleted records
      }
    });

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    // If there's an image in S3, delete it
    if (blog.img_cover_path && blog.img_cover_path.startsWith('http')) {
      await deleteBlogCoverFromS3(blog.img_cover_path);
    }

    // Delete the blog post
    await prisma.blogs.delete({
      where: { id: BigInt(id) },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}