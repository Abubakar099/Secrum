import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImageToCloudinary(fileBuffer: Buffer, fileName: string) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
        folder: 'secrum-products',
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result?.secure_url)
      }
    )

    uploadStream.end(fileBuffer)
  })
}

export function getCloudinaryUrl(publicId: string, options?: Record<string, any>) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  })
}
