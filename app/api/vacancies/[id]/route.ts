import { NextRequest } from 'next/server';
import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma';
import { NextResponse } from 'next/server';

export interface VacancyItem {
  id: string;
  title: string;
  salary_start: string;
  salary_end?: string | null;
  type: unknown;  // JSON type
  description?: string | null;
  benefits?: unknown | null; // JSON type
  created_at?: string | null;

  // Company data
  company_name?: string | null;
  company_location?: string | null;
  company_address?: string | null;
  company_description?: string | null;
  company_hr_name?: string | null;
  company_hr_position?: string | null;
  company_hr_email?: string | null;
  company_hr_phone?: string | null;
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
        { message: 'Vacancy ID is required' },
        { status: 400 }
      );
    }

    // Convert id to BigInt, validating that it's a valid number
    let vacancyId: bigint;
    try {
      vacancyId = BigInt(id);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid vacancy ID format' },
        { status: 400 }
      );
    }

    const vacancy = await kerjaBerkahPrisma.vacancies.findUnique({
      where: {
        id: vacancyId,
        deleted_at: null,
      },
      select: {
        id: true,
        title: true,
        salary_start: true,
        salary_end: true,
        type: true,
        description: true,
        benefits: true,
        created_at: true,
        companies: {
          select: {
            name: true,
            city: true,
            address: true,
            description: true,
            hr_name: true,
            hr_position: true,
            hr_email: true,
            hr_phone: true,
          }
        }
      },
    });

    if (!vacancy) {
      return NextResponse.json(
        { message: 'Vacancy not found' },
        { status: 404 }
      );
    }

    // Transform data to match the expected structure
    const transformedData = {
      id: vacancy.id.toString(),
      title: vacancy.title,
      salary_start: vacancy.salary_start.toString(),
      salary_end: vacancy.salary_end?.toString() || null,
      type: vacancy.type,
      description: vacancy.description,
      benefits: vacancy.benefits,
      created_at: vacancy.created_at?.toISOString() || null,
      company_name: vacancy.companies?.name,
      company_location: vacancy.companies?.city,
      company_address: vacancy.companies?.address,
      company_description: vacancy.companies?.description,
      company_hr_name: vacancy.companies?.hr_name,
      company_hr_position: vacancy.companies?.hr_position,
      company_hr_email: vacancy.companies?.hr_email,
      company_hr_phone: vacancy.companies?.hr_phone,
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching vacancy by ID:', error);
    return NextResponse.json(
      { message: 'Failed to fetch vacancy' },
      { status: 500 }
    );
  }
}