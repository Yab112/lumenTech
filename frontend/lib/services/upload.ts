const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export interface PresignedUrlRequest {
  filename: string;
  contentType: string;
  fileType: 'resume' | 'image' | 'document' | 'portfolio';
  expiresIn?: number;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
  key: string;
}

/**
 * Get a presigned URL from the backend
 */
export async function getPresignedUrl(
  request: PresignedUrlRequest,
): Promise<PresignedUrlResponse> {
  const response = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to get presigned URL' }));
    throw new Error(error.message || 'Failed to get presigned URL');
  }

  return response.json();
}

/**
 * Upload a file directly to S3 using a presigned URL
 */
export async function uploadToS3(
  file: File,
  presignedUrl: string,
  contentType: string,
): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to S3');
  }
}

/**
 * Complete upload flow: get presigned URL and upload file
 * @returns The final S3 URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  fileType: 'resume' | 'image' | 'document' | 'portfolio',
): Promise<string> {
  // Get presigned URL from backend
  const { presignedUrl, fileUrl } = await getPresignedUrl({
    filename: file.name,
    contentType: file.type,
    fileType,
  });

  // Upload file directly to S3
  await uploadToS3(file, presignedUrl, file.type);

  // Return the final S3 URL
  return fileUrl;
}



