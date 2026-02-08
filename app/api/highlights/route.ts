import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { convertImageToPresignedUrl } from '@/lib/utils';

export interface HighlightData {
    id: string;
    title: string;
    description: string;
    image_path: string | null;
    features: { item: string }[] | null;
    status: boolean;
}

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.highlights.findFirst({
            where: {
                status: true,
                deleted_at: null,
            },
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                image_path: true,
                features: true,
                status: true,
            },
        });

        if (!data) {
            return NextResponse.json(null);
        }

        // Convert image_path to presigned S3 URL
        const dataWithPresignedUrl = await convertImageToPresignedUrl(data);

        const serializedData = serializeBigInt(dataWithPresignedUrl);

        return NextResponse.json(serializedData);
    } catch (error) {
        console.error('Error fetching highlights:', error);
        return NextResponse.json(
            { message: 'Failed to fetch highlights' },
            { status: 500 }
        );
    }
}
