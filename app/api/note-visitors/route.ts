import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface NoteVisitorItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
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

    // const whereClause: any = {
    //   status: statusParam ? statusParam === 'true' : true, // Only get active items by default
    // };

    const noteVisitors = await prisma.note_visitors.findMany({
      // where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        icon: true,
        title: true,
        subtitle: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        // status: true,
      }
    });

    // Serialize BigInt values to strings
    const serializedData = serializeBigInt(noteVisitors);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching note visitors:', error);
    return NextResponse.json(
      { message: 'Failed to fetch note visitors' },
      { status: 500 }
    );
  }
}