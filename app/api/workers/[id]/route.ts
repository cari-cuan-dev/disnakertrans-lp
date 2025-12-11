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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Unwrap the params promise as required by Next.js
    const unwrappedParams = await params;
    const { id } = unwrappedParams;

    // Validate the id parameter
    if (!id) {
      return NextResponse.json(
        { message: 'Worker ID is required' },
        { status: 400 }
      );
    }

    // Convert id to BigInt, validating that it's a valid number
    let workerId: bigint;
    try {
      workerId = BigInt(id);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid worker ID format' },
        { status: 400 }
      );
    }

    const worker = await kerjaBerkahPrisma.workers.findUnique({
      where: {
        id: workerId,
        deleted_at: null,
      },
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
        user_id: true,
      },
    });

    if (!worker) {
      return NextResponse.json(
        { message: 'Worker not found' },
        { status: 404 }
      );
    }

    // Transform data to match the expected structure
    const transformedData = {
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
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching worker by ID:', error);
    return NextResponse.json(
      { message: 'Failed to fetch worker' },
      { status: 500 }
    );
  }
}