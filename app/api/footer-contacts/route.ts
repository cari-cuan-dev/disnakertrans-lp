import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface FooterContactItem {
  id: string;
  type: string;
  title: string;
  url: string | null;
  created_at?: string | null;
  updated_at?: string | null;
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
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');

    const whereClause: any = {
      deleted_at: null, // Only get non-deleted records
    };

    const footerContacts = await prisma.footer_contacts.findMany({
      where: whereClause,
      orderBy: {
        sort: 'asc', // Sort by the sort column in ascending order
      },
      select: {
        id: true,
        type: true,
        title: true,
        url: true,
        // status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(footerContacts);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching footer contacts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch footer contacts' },
      { status: 500 }
    );
  }
}