'use server'

import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'

/**
 * Helper to serialize BigInt to Number for Next.js Client Components
 */
function serializeData(data: any) {
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

/**
 * Mendapatkan lowongan kerja berdasarkan User ID (ID Akun)
 */
export async function getCompanyVacancies(userId: number) {
  try {
    // Cari real company_id (ID internal tabel companies) berdasarkan User ID (ID Akun)
    const company = await kerjaBerkahPrisma.companies.findFirst({
      where: { user_id: BigInt(userId) }
    });

    if (!company) {
      console.log(`No company found for user_id: ${userId}`);
      return [];
    }

    const vacancies = await kerjaBerkahPrisma.vacancies.findMany({
      where: {
        company_id: company.id, // Gunakan Internal Company ID
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return serializeData(vacancies.map(vacancy => {
      let parsedBenefits = vacancy.benefits;

      if (typeof vacancy.benefits === 'string') {
        try {
          parsedBenefits = JSON.parse(vacancy.benefits);
        } catch (e) {
          parsedBenefits = vacancy.benefits.split(',').map(b => b.trim()).filter(b => b);
        }
      }

      return {
        ...vacancy,
        benefits: parsedBenefits,
      };
    }));
  } catch (error) {
    console.error('Error getting company vacancies:', error)
    throw error
  }
}

export async function createVacancy(data: {
  company_id: number, // Ini adalah User ID yang dikirim dari frontend
  title: string,
  salary_start: string,
  salary_end?: string,
  type: string,
  description?: string,
  benefits?: string,
}) {
  try {
    // Cari real company_id berdasarkan User ID
    const company = await kerjaBerkahPrisma.companies.findFirst({
      where: { user_id: BigInt(data.company_id) }
    });

    if (!company) {
      throw new Error(`Data perusahaan tidak ditemukan untuk User ID: ${data.company_id}`);
    }

    const benefitsArray = data.benefits ? data.benefits.split(',').map(b => b.trim()).filter(b => b) : [];
    const typeArray = data.type ? [data.type] : [];

    const newVacancy = await kerjaBerkahPrisma.vacancies.create({
      data: {
        company_id: company.id, // Gunakan Internal Company ID
        title: data.title,
        salary_start: BigInt(data.salary_start),
        salary_end: data.salary_end ? BigInt(data.salary_end) : null,
        type: typeArray as any,
        description: data.description,
        benefits: benefitsArray as any,
        created_at: new Date(),
      },
    })

    return serializeData({
      ...newVacancy,
      type: Array.isArray(newVacancy.type) ? (newVacancy.type as any)[0] : newVacancy.type,
      benefits: Array.isArray(newVacancy.benefits) ? newVacancy.benefits : []
    });
  } catch (error) {
    console.error('Error creating vacancy:', error)
    throw error
  }
}

export async function updateVacancy(vacancyId: number, data: {
  title?: string,
  salary_start?: string,
  salary_end?: string,
  type?: string,
  description?: string,
  benefits?: string,
}) {
  try {
    const updateData: any = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.salary_start !== undefined) updateData.salary_start = BigInt(data.salary_start)
    if (data.salary_end !== undefined) {
      updateData.salary_end = data.salary_end ? BigInt(data.salary_end) : null
    }
    if (data.type !== undefined) {
      updateData.type = data.type ? [data.type] : []
    }
    if (data.description !== undefined) updateData.description = data.description
    if (data.benefits !== undefined) {
      updateData.benefits = data.benefits ? data.benefits.split(',').map(b => b.trim()).filter(b => b) : []
    }

    updateData.updated_at = new Date();

    const updatedVacancy = await kerjaBerkahPrisma.vacancies.update({
      where: {
        id: BigInt(vacancyId),
      },
      data: updateData,
    })

    return serializeData({
      ...updatedVacancy,
      type: Array.isArray(updatedVacancy.type) ? (updatedVacancy.type as any)[0] : updatedVacancy.type,
      benefits: Array.isArray(updatedVacancy.benefits) ? updatedVacancy.benefits : []
    });
  } catch (error) {
    console.error('Error updating vacancy:', error)
    throw error
  }
}

export async function deleteVacancy(vacancyId: number) {
  try {
    await kerjaBerkahPrisma.vacancies.delete({
      where: {
        id: BigInt(vacancyId),
      },
    })

    return { success: true, message: 'Lowongan berhasil dihapus' }
  } catch (error) {
    console.error('Error deleting vacancy:', error)
    throw error
  }
}