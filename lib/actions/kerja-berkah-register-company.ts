'use server'

import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'
import bcrypt from 'bcrypt'
import { randomInt } from 'crypto'

interface CompanyRegistrationData {
  name: string
  business_registration_number: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  industrial_sector: string
  number_of_employees: string
  description: string
  hr_name: string
  hr_position: string
  hr_phone: string
  hr_email: string
}

export async function registerCompany(data: CompanyRegistrationData) {
  try {
    // Validasi apakah email sudah ada di tabel users
    const existingUser = await kerjaBerkahPrisma.users.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) {
      throw new Error('Email sudah terdaftar. Silakan gunakan email lain.')
    }

    // Generate password acak 6 angka
    // const randomPassword = String(randomInt(100000, 1000000))
    // const hashedPassword = await bcrypt.hash(randomPassword, 10)
    const randomPassword = 'password'
    const hashedPassword = '$2y$12$WKDcVUyO6ROv8mFKEXF5huzN3zsD3LodJ5.DnzZwIwdyV7r/Pt90y'
    // Buat user baru di tabel users
    const newUser = await kerjaBerkahPrisma.users.create({
      data: {
        type: 'Company', // Tipe untuk perusahaan
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    // Simpan data ke tabel companies
    const newCompany = await kerjaBerkahPrisma.companies.create({
      data: {
        user_id: newUser.id,
        name: data.name,
        business_registration_number: data.business_registration_number,
        email: data.email,
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

    // Simpan data ke hexa_role_user dengan role_id = 2
    await kerjaBerkahPrisma.$executeRaw`
      INSERT INTO hexa_role_user (role_id, user_id) 
      VALUES (2, ${newUser.id})
    `

    return {
      success: true,
      userId: Number(newUser.id), // Konversi BigInt ke Number
      companyId: Number(newCompany.id), // Konversi BigInt ke Number
      temporaryPassword: randomPassword,
      message: 'Pendaftaran perusahaan berhasil. Silakan gunakan password sementara untuk login pertama kali.',
    }
  } catch (error) {
    console.error('Error registering company:', error)
    throw error
  }
}