import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        const { code } = await params;

        if (!code) {
            return NextResponse.json(
                { message: 'Parameter code is required' },
                { status: 400 }
            );
        }

        const parameter = await prisma.parameters.findUnique({
            where: {
                code: code,
                deleted_at: null,
            },
        });

        if (!parameter) {
            return NextResponse.json(
                { message: 'Parameter not found' },
                { status: 404 }
            );
        }

        // Return the value directly or the whole object
        return NextResponse.json(serializeBigInt(parameter));
    } catch (error) {
        console.error('Error fetching parameter:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
