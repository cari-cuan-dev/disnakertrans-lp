'use server';

import { prisma } from '@/lib/prisma';

export interface SocialMediaItem {
  id: bigint;
  icon: string;
  color: string;
  name: string;
  url: string | null;
  status: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export async function getActiveSocialMedia(): Promise<SocialMediaItem[]> {
  try {
    const socialMedia = await prisma.social_media.findMany({
      where: {
        status: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        icon: true,
        color: true,
        name: true,
        url: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return socialMedia;
  } catch (error) {
    console.error('Error fetching social media:', error);
    throw new Error('Failed to fetch social media');
  }
}