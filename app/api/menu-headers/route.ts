import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface MenuHeader {
  id: string;
  name: string;
  type: string;
  url: string | null;
  category_id: string | null;
  status: boolean;
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
  menu_sub_headers: MenuSubHeader[];
}

export interface MenuSubHeader {
  id: string;
  menu_header_id: string;
  name: string;
  type: string;
  url: string | null;
  category_id: string | null;
  status: boolean;
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
}

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export async function GET(request: NextRequest) {
  try {
    const menuHeaders = await prisma.menu_headers.findMany({
      where: {
        status: true,
      },
      orderBy: {
        sort: 'asc', // Order by sort column ascending
      },
      select: {
        id: true,
        name: true,
        type: true,
        url: true,
        status: true,
        sort: true,
        created_at: true,
        updated_at: true,
        category_id: true,
        categories: {
          select: {
            id: true,
            name: true,
          }
        },
        menu_sub_headers: {
          where: {
            status: true,
          },
          orderBy: {
            sort: 'asc', // Order by sort column ascending
          },
          select: {
            id: true,
            menu_header_id: true,
            name: true,
            type: true,
            url: true,
            status: true,
            sort: true,
            created_at: true,
            updated_at: true,
            category_id: true,
            categories: {
              select: {
                id: true,
                name: true,
              }
            },
          },
        },
      },
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(menuHeaders);

    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching menu headers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu headers' },
      { status: 500 }
    );
  }
}