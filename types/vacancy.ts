// types/vacancy.ts

export interface VacancyWithCompany {
  id: bigint;
  title: string;
  salary_start: bigint;
  salary_end?: bigint | null;
  type: unknown;  // JSON type from Prisma
  description?: string | null;
  benefits?: unknown | null; // JSON type from Prisma
  created_at?: Date | null;
  
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