import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUrlPreSign } from '@/lib/utils';

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export async function GET(request: NextRequest) {
    try {
        const galleries = await prisma.galleries.findMany({
            where: {
                status: true,
                deleted_at: null,
            },
            orderBy: {
                sort: 'asc',
            },
        });

        // Serialize BigInt values to strings
        const serializedGalleries = serializeBigInt(galleries);

        // Convert media_path to presigned URLs
        const galleriesWithPresignedUrls = await Promise.all(
            serializedGalleries.map(async (gallery: any) => ({
                ...gallery,
                media_path: await getUrlPreSign(gallery.media_path),
            }))
        );

        return NextResponse.json(galleriesWithPresignedUrls);
    } catch (error) {
        console.error('Error fetching galleries:', error);
        return NextResponse.json(
            { message: 'Failed to fetch galleries' },
            { status: 500 }
        );
    }
}
