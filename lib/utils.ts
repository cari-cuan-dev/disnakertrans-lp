import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Untuk mengatasi masalah SSL di development
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize S3 key by removing prefixes
 */
function normalizeS3Key(key: string): string {
  if (!key) return key;

  // Hapus leading slash jika ada
  let normalizedKey = key.startsWith('/') ? key.substring(1) : key;

  // Hilangkan bagian folder uploads jika ada (ini umum di sistem upload lokal)
  normalizedKey = normalizedKey.replace(/^uploads\//, '');
  normalizedKey = normalizedKey.replace(/^images\//, '');
  normalizedKey = normalizedKey.replace(/^documents\//, '');
  normalizedKey = normalizedKey.replace(/^sliders\//, '');

  return normalizedKey;
}

/**
 * Mengambil presigned URL untuk file di S3
 */
export async function getUrlPreSign(path: string) {
  const s3ClientForSigning = new S3Client({
    region: process.env.AWS_DEFAULT_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === "true",
  });

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: normalizeS3Key(path), // Gunakan fungsi normalisasi
    });

    const url = await getSignedUrl(s3ClientForSigning, command, { expiresIn: 900 });
    return url;
  } catch (error) {
    console.error(`Error generating presigned URL for path "${path}":`, error);
    throw error;
  }
}

/**
 * Konversi array objek untuk menghasilkan presigned URL untuk kolom image_path
 * Fungsi ini mengubah nilai image_path menjadi presigned URL dan juga mengupdate size jika perlu
 */
export async function convertImagesToPresignedUrls<T extends Record<string, any>>(arr: T[]): Promise<T[]> {
  if (!arr || !Array.isArray(arr)) return arr;

  const promises = arr.map(async (obj) => {
    const convertedObj = { ...obj };

    if (convertedObj.image_path) {
      try {
        // Jika size tidak ada atau 0, ambil dari S3 menggunakan path asli
        if (!convertedObj.size || convertedObj.size === '0 KB' || convertedObj.size === '0 B') {
          try {
            const metadata = await getFileMetadata(convertedObj.image_path); // gunakan path asli sebelum diubah
            convertedObj.size = formatFileSize(metadata.size);
          } catch (metaError) {
            console.error(`Failed to get file size for ${convertedObj.image_path}:`, metaError);
            // Tetap gunakan size yang ada atau gunakan fallback
            if (!convertedObj.size) {
              convertedObj.size = '0 KB';
            }
          }
        }

        // Generate presigned URL
        const signedUrl = await getUrlPreSign(convertedObj.image_path);
        convertedObj.image_path = signedUrl;

      } catch (error) {
        console.error(`Failed to generate presigned URL for image_path: ${convertedObj.image_path}`, error);
      }
    }

    return convertedObj;
  });

  return Promise.all(promises);
}

/**
 * Konversi array objek untuk menghasilkan presigned URL untuk kolom img_cover_path
 * Fungsi ini mengubah nilai img_cover_path menjadi presigned URL dan juga mengupdate size jika perlu
 */
export async function convertCoversToPresignedUrls<T extends Record<string, any>>(arr: T[]): Promise<T[]> {
  if (!arr || !Array.isArray(arr)) return arr;

  const promises = arr.map(async (obj) => {
    const convertedObj = { ...obj };

    if (convertedObj.img_cover_path) {
      try {
        // Jika size tidak ada atau 0, ambil dari S3 menggunakan path asli
        if (!convertedObj.size || convertedObj.size === '0 KB' || convertedObj.size === '0 B') {
          try {
            const metadata = await getFileMetadata(convertedObj.img_cover_path); // gunakan path asli sebelum diubah
            convertedObj.size = formatFileSize(metadata.size);
          } catch (metaError) {
            console.error(`Failed to get file size for ${convertedObj.img_cover_path}:`, metaError);
            // Tetap gunakan size yang ada atau gunakan fallback
            if (!convertedObj.size) {
              convertedObj.size = '0 KB';
            }
          }
        }

        // Generate presigned URL
        const signedUrl = await getUrlPreSign(convertedObj.img_cover_path);
        convertedObj.img_cover_path = signedUrl;

      } catch (error) {
        console.error(`Failed to generate presigned URL for img_cover_path: ${convertedObj.img_cover_path}`, error);
      }
    }

    return convertedObj;
  });

  return Promise.all(promises);
}

/**
 * Mengambil metadata file dari S3
 */
export async function getFileMetadata(path: string) {
  const s3ClientForMetadata = new S3Client({
    region: process.env.AWS_DEFAULT_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === "true",
  });

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: normalizeS3Key(path), // Gunakan fungsi normalisasi
    });

    const response = await s3ClientForMetadata.send(command);
    return {
      size: response.ContentLength,
      lastModified: response.LastModified,
      contentType: response.ContentType
    };
  } catch (error) {
    console.error(`Error getting file metadata for path "${path}":`, error);
    throw error;
  }
}

/**
 * Mengonversi ukuran bytes ke format yang lebih mudah dibaca
 */
export function formatFileSize(bytes: number | undefined | null): string {
  if (!bytes) return '0 KB';

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Konversi array objek untuk menghasilkan presigned URL untuk kolom file_path
 * Fungsi ini mengubah nilai file_path menjadi presigned URL dan juga mengupdate size jika perlu
 */
export async function convertFilesToPresignedUrls<T extends Record<string, any>>(arr: T[]): Promise<T[]> {
  if (!arr || !Array.isArray(arr)) return arr;

  const promises = arr.map(async (obj) => {
    const convertedObj = { ...obj };

    if (convertedObj.file_path) {
      try {
        // Jika size tidak ada atau 0, ambil dari S3 menggunakan path asli
        if (!convertedObj.size || convertedObj.size === '0 KB' || convertedObj.size === '0 B') {
          try {
            const metadata = await getFileMetadata(convertedObj.file_path); // gunakan path asli sebelum diubah
            convertedObj.size = formatFileSize(metadata.size);
          } catch (metaError) {
            console.error(`Failed to get file size for ${convertedObj.file_path}:`, metaError);
            // Tetap gunakan size yang ada atau gunakan fallback
            if (!convertedObj.size) {
              convertedObj.size = '0 KB';
            }
          }
        }

        // Generate presigned URL
        const signedUrl = await getUrlPreSign(convertedObj.file_path);
        convertedObj.file_path = signedUrl;

      } catch (error) {
        console.error(`Failed to generate presigned URL for file_path: ${convertedObj.file_path}`, error);
      }
    }

    return convertedObj;
  });

  return Promise.all(promises);
}

/**
 * Konversi objek tunggal untuk menghasilkan presigned URL untuk kolom img_cover_path
 */
export async function convertCoverToPresignedUrl<T extends Record<string, any>>(obj: T): Promise<T> {
  if (!obj) return obj;

  const convertedObj = { ...obj };

  if (convertedObj.img_cover_path) {
    try {
      // Generate presigned URL
      const signedUrl = await getUrlPreSign(convertedObj.img_cover_path);
      convertedObj.img_cover_path = signedUrl;

      // Jika size tidak ada atau 0, ambil dari S3
      if (!convertedObj.size || convertedObj.size === '0 KB' || convertedObj.size === '0 B') {
        try {
          const metadata = await getFileMetadata(convertedObj.img_cover_path);
          convertedObj.size = formatFileSize(metadata.size);
        } catch (metaError) {
          console.error(`Failed to get file size for ${convertedObj.img_cover_path}:`, metaError);
          // Tetap gunakan size yang ada atau gunakan fallback
          if (!convertedObj.size) {
            convertedObj.size = '0 KB';
          }
        }
      }
    } catch (error) {
      console.error(`Failed to generate presigned URL for img_cover_path: ${convertedObj.img_cover_path}`, error);
    }
  }

  return convertedObj;
}

/**
 * Konversi objek tunggal untuk menghasilkan presigned URL untuk kolom image_path
 */
export async function convertImageToPresignedUrl<T extends Record<string, any>>(obj: T): Promise<T> {
  if (!obj) return obj;

  const convertedObj = { ...obj };

  if (convertedObj.image_path) {
    try {
      // Generate presigned URL
      const signedUrl = await getUrlPreSign(convertedObj.image_path);
      convertedObj.image_path = signedUrl;

      // Jika size tidak ada atau 0, ambil dari S3
      if (!convertedObj.size || convertedObj.size === '0 KB' || convertedObj.size === '0 B') {
        try {
          const metadata = await getFileMetadata(convertedObj.image_path);
          convertedObj.size = formatFileSize(metadata.size);
        } catch (metaError) {
          console.error(`Failed to get file size for ${convertedObj.image_path}:`, metaError);
          // Tetap gunakan size yang ada atau gunakan fallback
          if (!convertedObj.size) {
            convertedObj.size = '0 KB';
          }
        }
      }
    } catch (error) {
      console.error(`Failed to generate presigned URL for image_path: ${convertedObj.image_path}`, error);
    }
  }

  return convertedObj;
}
