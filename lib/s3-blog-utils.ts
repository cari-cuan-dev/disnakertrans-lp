import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client with environment variables
const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_ENDPOINT, 
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.AWS_BUCKET;

/**
 * Upload a blog cover image to S3
 * @param fileBuffer - The image buffer to upload
 * @param fileName - The desired filename in S3
 * @param contentType - The MIME type of the file
 * @returns The S3 URL of the uploaded file or null if upload failed
 */
export async function uploadBlogCoverToS3(
  fileBuffer: Buffer, 
  fileName: string, 
  contentType: string
): Promise<string | null> {
  try {
    // Generate a unique filename to prevent conflicts
    const timestamp = Date.now();
    const uniqueFileName = `blog-covers/${timestamp}-${fileName}`;
    
    // Prepare the S3 object command
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: contentType,
      ACL: 'public-read', // Make the file publicly readable
    });
    
    // Upload to S3
    await s3Client.send(command);
    
    // Return the public URL for the uploaded file
    return `${process.env.AWS_ENDPOINT}/${bucketName}/${uniqueFileName}`;
  } catch (error) {
    console.error('Error uploading blog cover to S3:', error);
    return null;
  }
}

/**
 * Delete a blog cover image from S3
 * @param s3Url - The S3 URL of the file to delete (in format https://{endpoint}/{bucket}/{key})
 * @returns True if deletion was successful, false otherwise
 */
export async function deleteBlogCoverFromS3(s3Url: string): Promise<boolean> {
  try {
    // Extract the key from the S3 URL
    const urlParts = s3Url.split('/');
    const key = urlParts.slice(4).join('/'); // Adjust index based on URL format
    
    if (!key) {
      console.error('Could not extract file key from S3 URL:', s3Url);
      return false;
    }
    
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    await s3Client.send(command);
    
    return true;
  } catch (error) {
    console.error('Error deleting blog cover from S3:', error);
    return false;
  }
}

/**
 * Extract S3 key from full S3 URL
 * @param s3Url - The S3 URL (in format https://{endpoint}/{bucket}/{key})
 * @returns S3 key or null if extraction failed
 */
export function extractKeyFromS3Url(s3Url: string): string | null {
  try {
    // Extract the key from the S3 URL
    const urlParts = s3Url.split('/');
    const key = urlParts.slice(4).join('/'); // Adjust index based on URL format

    return key || null;
  } catch (error) {
    console.error('Error extracting key from S3 URL:', error);
    return null;
  }
}