'use server'

import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'

export async function getUserProfile(userId: number) {
  try {
    if (!userId) {
      throw new Error('User ID tidak ditemukan')
    }

    // Ambil user profile dari users table
    const user = await kerjaBerkahPrisma.users.findUnique({
      where: { id: BigInt(userId) },
    })

    if (!user) {
      throw new Error('User tidak ditemukan')
    }

    // Berdasarkan tipe user (Employee atau Company), ambil data tambahan
    if (user.type === 'Employee') {
      const worker = await kerjaBerkahPrisma.workers.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (!worker) {
        throw new Error('Data pekerja tidak ditemukan')
      }

      return {
        ...user,
        ...worker,
      }
    } else if (user.type === 'Company') {
      const company = await kerjaBerkahPrisma.companies.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (!company) {
        throw new Error('Data perusahaan tidak ditemukan')
      }

      return {
        ...user,
        ...company,
      }
    } else if (user.type === 'Admin') {
    } else {
      throw new Error('Tipe user tidak valid')
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw error
  }
}

interface UserProfileData {
  name: string
  email: string
  [key: string]: any // Untuk field tambahan berdasarkan tipe user
}

export async function updateUserProfile(userId: number, data: UserProfileData) {
  try {
    if (!userId) {
      throw new Error('User ID tidak ditemukan')
    }

    // Ambil user untuk mengetahui tipe
    const user = await kerjaBerkahPrisma.users.findUnique({
      where: { id: BigInt(userId) },
    })

    if (!user) {
      throw new Error('User tidak ditemukan')
    }

    // Berdasarkan tipe user, update tabel yang sesuai
    if (user.type === 'Employee') {
      // Update users table
      await kerjaBerkahPrisma.users.update({
        where: { id: BigInt(userId) },
        data: {
          name: data.name,
          // email: data.email,
        },
      })

      // Cari ID worker terlebih dahulu berdasarkan user_id
      const worker = await kerjaBerkahPrisma.workers.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (worker) {
        // Update workers table menggunakan ID unik
        await kerjaBerkahPrisma.workers.update({
          where: { id: worker.id },
          data: {
            name: data.name,
            skills: data.skills ? JSON.parse(data.skills) : [],
            skill: data.skill,
            // email: data.email,
            phone: data.phone,
            birth_date: data.birth_date,
            experience: data.experience,
            city: data.city,
            address: data.address,
            education: data.education,
            languages: data.languages ? JSON.parse(data.languages) : [],
            description: data.description,
            certifications: data.certifications ? JSON.parse(data.certifications) : [],
          },
        })
      }
    } else if (user.type === 'Company') {
      // Update users table
      await kerjaBerkahPrisma.users.update({
        where: { id: BigInt(userId) },
        data: {
          name: data.name,
          // email: data.email,
        },
      })

      // Cari ID company terlebih dahulu berdasarkan user_id
      const company = await kerjaBerkahPrisma.companies.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (company) {
        // Update companies table menggunakan ID unik
        await kerjaBerkahPrisma.companies.update({
          where: { id: company.id },
          data: {
            name: data.name,
            business_registration_number: data.business_registration_number,
            // email: data.email,
            phone: data.phone,
            website: data.website,
            address: data.address,
            city: data.city,
            industrial_sector: data.industrial_sector,
            number_of_employees: data.number_of_employees,
            description: data.description,
            hr_name: data.hr_name,
            hr_position: data.hr_position,
            hr_phone: data.hr_phone,
            hr_email: data.hr_email,
          },
        })
      }
    }

    return { success: true, message: 'Profil berhasil diperbarui' }
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}