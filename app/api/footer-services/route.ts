import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface FooterServiceItem {
  id: string;
  name: string;
  type: string;
  url: string | null;
  category_id: string | null;
  status: boolean;
  created_at?: string | null;
  updated_at?: string | null;
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
      status: statusParam ? statusParam === 'true' : true, // Only get active items by default
    };

    const footerServices = await prisma.footer_services.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(footerServices);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching footer services:', error);
    return NextResponse.json(
      { message: 'Failed to fetch footer services' },
      { status: 500 }
    );
  }
}