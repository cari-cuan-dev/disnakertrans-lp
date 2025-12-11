import { NextRequest } from 'next/server';
import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma';
import { NextResponse } from 'next/server';

export interface WorkerItem {
  id: string;
  name: string;
  skills: unknown; // JSON type
  skill: string; // Main skill
  email: string;
  phone: string;
  birth_date: string;
  experience: string;
  city: string;
  address: string;
  education: string;
  languages: unknown; // JSON type
  description?: string | null;
  certifications?: unknown | null; // JSON type
  created_at?: string | null;
  user_id?: string | null;
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
    const query = searchParams.get('q');
    const experience = searchParams.get('experience');
    const location = searchParams.get('location');

    // Build where clause based on filters
    const whereClause: any = {
      AND: [
        { deleted_at: null }, // Only active workers
      ]
    };

    if (query) {
      whereClause.AND.push({
        OR: [
          { name: { contains: query, mode: 'insensitive' as const } },
          { skill: { contains: query, mode: 'insensitive' as const } },
          { skills: { path: '$', string_contains: query } }, // Search in JSON field
        ],
      });
    }

    if (experience && experience !== 'all') {
      whereClause.AND.push({
        experience: { contains: experience, mode: 'insensitive' as const }
      });
    }

    if (location && location !== 'all') {
      whereClause.AND.push({
        city: { contains: location, mode: 'insensitive' as const }
      });
    }

    const workers = await kerjaBerkahPrisma.workers.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        skills: true,
        skill: true,
        email: true,
        phone: true,
        birth_date: true,
        experience: true,
        city: true,
        address: true,
        education: true,
        languages: true,
        description: true,
        certifications: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Transform data to match the expected structure
    const transformedData = workers.map(worker => ({
      id: worker.id.toString(),
      name: worker.name,
      skills: worker.skills,
      skill: worker.skill,
      email: worker.email,
      phone: worker.phone,
      birth_date: worker.birth_date,
      experience: worker.experience,
      city: worker.city,
      address: worker.address,
      education: worker.education,
      languages: worker.languages,
      description: worker.description,
      certifications: worker.certifications,
      created_at: worker.created_at?.toISOString() || null,
      user_id: worker.user_id?.toString() || null,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching workers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch workers' },
      { status: 500 }
    );
  }
}