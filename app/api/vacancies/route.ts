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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const location = searchParams.get('location');
    const type = searchParams.get('type');

    // Build where clause based on filters
    const whereClause: any = {
      AND: [
        { deleted_at: null }, // Only active vacancies
      ]
    };

    if (query) {
      whereClause.AND.push({
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { companies: { name: { contains: query, mode: 'insensitive' as const } } },
        ],
      });
    }

    if (location && location !== 'all') {
      whereClause.AND.push({
        companies: { city: { contains: location, mode: 'insensitive' as const } }
      });
    }

    // Note: JSON filtering in Prisma can be complex, so we'll skip type filtering for now
    // until we can properly handle the JSON type field in the database

    const vacancies = await kerjaBerkahPrisma.vacancies.findMany({
      where: whereClause,
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
      orderBy: {
        created_at: 'desc',
      },
    });

    // Transform data to match the expected structure
    const transformedData = vacancies.map(vacancy => ({
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
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return NextResponse.json(
      { message: 'Failed to fetch vacancies' },
      { status: 500 }
    );
  }
}