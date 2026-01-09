'use server'

import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'

export async function getCompanyVacancies(companyId: number) {
  try {
    const vacancies = await kerjaBerkahPrisma.vacancies.findMany({
      where: {
        company_id: BigInt(companyId),
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return vacancies.map(vacancy => {
      let parsedType = vacancy.type;
      let parsedBenefits = vacancy.benefits;

      // type sekarang adalah string tunggal, bukan array
      parsedType = vacancy.type;

      if (typeof vacancy.benefits === 'string') {
        try {
          parsedBenefits = JSON.parse(vacancy.benefits);
        } catch (e) {
          // Jika parsing gagal, biarkan sebagai string atau ubah ke array kosong
          parsedBenefits = vacancy.benefits.split(',').map(b => b.trim()).filter(b => b);
        }
      }

      return {
        ...vacancy,
        salary_start: Number(vacancy.salary_start),
        salary_end: vacancy.salary_end ? Number(vacancy.salary_end) : null,
        type: parsedType,
        benefits: parsedBenefits,
      };
    })
  } catch (error) {
    console.error('Error getting company vacancies:', error)
    throw error
  }
}

export async function createVacancy(data: {
  company_id: number,
  title: string,
  salary_start: string,
  salary_end?: string,
  type: string,
  description?: string,
  benefits?: string,
}) {
  try {
    // Konversi hanya benefits dari string dipisahkan koma ke format JSON array, sedangkan type adalah string tunggal
    const parsedBenefits = data.benefits ? JSON.stringify(data.benefits.split(',').map(b => b.trim()).filter(b => b)) : []

    const newVacancy = await kerjaBerkahPrisma.vacancies.create({
      data: {
        company_id: BigInt(data.company_id),
        title: data.title,
        salary_start: BigInt(data.salary_start),
        salary_end: data.salary_end ? BigInt(data.salary_end) : null,
        type: data.type || '',  // type sekarang hanya string tunggal
        description: data.description,
        benefits: parsedBenefits,
        created_at: new Date(), // Isi created_at saat membuat data baru
      },
    })

    let parsedNewBenefits = newVacancy.benefits;

    // type adalah string tunggal, tidak perlu diparsing
    const parsedNewType = newVacancy.type;

    if (typeof newVacancy.benefits === 'string') {
      try {
        parsedNewBenefits = JSON.parse(newVacancy.benefits);
      } catch (e) {
        parsedNewBenefits = newVacancy.benefits.split(',').map(b => b.trim()).filter(b => b);
      }
    }

    return {
      ...newVacancy,
      salary_start: Number(newVacancy.salary_start),
      salary_end: newVacancy.salary_end ? Number(newVacancy.salary_end) : null,
      type: parsedNewType,
      benefits: parsedNewBenefits,
    }
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
    // Parse type dan benefits ke format JSON array jika tersedia
    const updateData: any = {}
    
    if (data.title !== undefined) updateData.title = data.title
    if (data.salary_start !== undefined) updateData.salary_start = BigInt(data.salary_start)
    if (data.salary_end !== undefined) {
      updateData.salary_end = data.salary_end ? BigInt(data.salary_end) : null
    }
    if (data.type !== undefined) {
      updateData.type = data.type || ''  // type sekarang hanya string tunggal
    }
    if (data.description !== undefined) updateData.description = data.description
    if (data.benefits !== undefined) {
      updateData.benefits = data.benefits ? JSON.stringify(data.benefits.split(',').map(b => b.trim()).filter(b => b)) : []
    }
    
    // Tambahkan updated_at ke dalam data yang akan diupdate
    updateData.updated_at = new Date();

    const updatedVacancy = await kerjaBerkahPrisma.vacancies.update({
      where: {
        id: BigInt(vacancyId),
      },
      data: updateData,
    })

    let parsedUpdatedBenefits = updatedVacancy.benefits;

    // type adalah string tunggal, tidak perlu diparsing
    const parsedUpdatedType = updatedVacancy.type;

    if (typeof updatedVacancy.benefits === 'string') {
      try {
        parsedUpdatedBenefits = JSON.parse(updatedVacancy.benefits);
      } catch (e) {
        parsedUpdatedBenefits = updatedVacancy.benefits.split(',').map(b => b.trim()).filter(b => b);
      }
    }

    return {
      ...updatedVacancy,
      salary_start: Number(updatedVacancy.salary_start),
      salary_end: updatedVacancy.salary_end ? Number(updatedVacancy.salary_end) : null,
      type: parsedUpdatedType,
      benefits: parsedUpdatedBenefits,
    }
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