import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'
import { prisma } from '@/lib/prisma'


export async function getUserProfile(userId: number) {
  try {
    if (!userId) {
      throw new Error('User ID tidak ditemukan')
    }

    // Ambil user profile dari users table (DB Utama)
    const user = await prisma.users.findUnique({
      where: { id: BigInt(userId) },
    })

    if (!user) {
      throw new Error('User tidak ditemukan')
    }

    const userType = user.type?.toLowerCase();
    let profileData: any = {};

    if (userType === 'pegawai' || userType === 'employee') {
      const worker = await kerjaBerkahPrisma.workers.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (!worker) {
        throw new Error('Data pekerja tidak ditemukan')
      }
      profileData = { ...user, ...worker };
    } else if (userType === 'perusahaan' || userType === 'company') {
      const company = await kerjaBerkahPrisma.companies.findFirst({
        where: { user_id: BigInt(userId) },
      })

      if (!company) {
        throw new Error('Data perusahaan tidak ditemukan')
      }
      profileData = { ...user, ...company };
    } else if (userType === 'admin') {
      profileData = { ...user };
    } else {
      throw new Error(`Tipe user tidak valid: ${user.type}`)
    }

    // Pastikan ID tetap menggunakan User ID, bukan ID dari tabel worker/company
    profileData.id = Number(user.id);
    profileData.type = userType;
    profileData.email = user.email;

    // Konversi semua BigInt ke Number untuk serialisasi ke client (menghindari 13n)
    const serializedProfile = JSON.parse(JSON.stringify(profileData, (key, value) =>
      typeof value === 'bigint' ? Number(value) : value
    ));

    return serializedProfile;
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

    // Ambil user untuk mengetahui tipe (DB Utama)
    const user = await prisma.users.findUnique({
      where: { id: BigInt(userId) },
    })

    if (!user) {
      throw new Error('User tidak ditemukan')
    }

    // Berdasarkan tipe user, update tabel yang sesuai
    const userType = user.type?.toLowerCase();

    if (userType === 'pegawai' || userType === 'employee') {
      // Update users table (DB Utama)
      await prisma.users.update({
        where: { id: BigInt(userId) },
        data: {
          name: data.name,
          // email: data.email,
        },
      })

      // Cari ID worker terlebih dahulu berdasarkan user_id (KerjaBerkah DB)
      const worker = await kerjaBerkahPrisma.workers.findFirst({
        where: { user_id: BigInt(userId) },
      })

      const workerData = {
        name: data.name,
        skills: data.skills ? JSON.parse(data.skills) : [],
        skill: data.skill,
        email: user.email, // Use user email as default
        phone: data.phone,
        birth_date: data.birth_date,
        experience: data.experience,
        city: data.city,
        address: data.address,
        education: data.education,
        languages: data.languages ? JSON.parse(data.languages) : [],
        description: data.description,
        certifications: data.certifications ? JSON.parse(data.certifications) : [],
        updated_at: new Date(),
      };

      if (worker) {
        // Update workers table menggunakan ID unik
        await kerjaBerkahPrisma.workers.update({
          where: { id: worker.id },
          data: workerData,
        })
      } else {
        // Create new worker record
        await kerjaBerkahPrisma.workers.create({
          data: {
            user_id: BigInt(userId),
            ...workerData,
            created_at: new Date(),
          },
        })
      }
    } else if (userType === 'perusahaan' || userType === 'company') {
      // Update users table (DB Utama)
      await prisma.users.update({
        where: { id: BigInt(userId) },
        data: {
          name: data.name,
          // email: data.email,
        },
      })

      // Cari ID company terlebih dahulu berdasarkan user_id (KerjaBerkah DB)
      const company = await kerjaBerkahPrisma.companies.findFirst({
        where: { user_id: BigInt(userId) },
      })

      const companyData = {
        name: data.name,
        business_registration_number: data.business_registration_number,
        email: user.email, // Use user email
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
        updated_at: new Date(),
      };

      if (company) {
        // Update companies table menggunakan ID unik
        await kerjaBerkahPrisma.companies.update({
          where: { id: company.id },
          data: companyData,
        })
      } else {
        // Create new company record
        await kerjaBerkahPrisma.companies.create({
          data: {
            user_id: BigInt(userId),
            ...companyData,
            created_at: new Date(),
          },
        })
      }
    } else {
    }

    return { success: true, message: 'Profil berhasil diperbarui' }
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}