'use server'

import { kerjaBerkahPrisma } from '@/lib/kerjaberkah-prisma'
import bcrypt from 'bcrypt'
import { randomInt } from 'crypto'

interface WorkerRegistrationData {
  name: string
  skills: string
  skill: string
  email: string
  phone: string
  birth_date: string
  experience: string
  city: string
  address: string
  education: string
  languages: string
  description: string
  certifications: string
}

export async function registerWorker(data: WorkerRegistrationData) {
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
    // const hashedPassword = await bcrypt.hash(randomPassword, 12)
    const randomPassword = 'password'
    const hashedPassword = '$2y$12$WKDcVUyO6ROv8mFKEXF5huzN3zsD3LodJ5.DnzZwIwdyV7r/Pt90y'

    // Buat user baru di tabel users
    const newUser = await kerjaBerkahPrisma.users.create({
      data: {
        type: 'Employee', // Sesuai dengan default di schema
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    // Simpan data ke tabel workers
    const newWorker = await kerjaBerkahPrisma.workers.create({
      data: {
        user_id: newUser.id,
        name: data.name,
        skills: data.skills ? JSON.parse(data.skills) : [],
        skill: data.skill,
        email: data.email,
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

    // Simpan data ke hexa_role_user dengan role_id = 3 menggunakan raw query karena model di-ignore
    await kerjaBerkahPrisma.$executeRaw`
      INSERT INTO hexa_role_user (role_id, user_id)
      VALUES (3, ${newUser.id})
    `

    return {
      success: true,
      userId: Number(newUser.id), // Konversi BigInt ke Number
      workerId: Number(newWorker.id), // Konversi BigInt ke Number
      temporaryPassword: randomPassword,
      message: 'Pendaftaran berhasil. Silakan gunakan password sementara untuk login pertama kali.',
    }
  } catch (error) {
    console.error('Error registering worker:', error)
    throw error
  }
}