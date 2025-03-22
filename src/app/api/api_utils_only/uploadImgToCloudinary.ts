import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'df8byxnyr',
  api_key: '732621848874533',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImgToCloudinary = async (imageFile: File) => {
  let imageUrl = '';
  // Convert file to buffer
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary with optimizations
  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'posts_images',
          resource_type: 'image',
          transformation: [
            { width: 1000, crop: 'limit' }, // Resize max width to 1000px
            { fetch_format: 'auto' }, // Auto-select best format (WebP, AVIF, etc.)
            { quality: 'auto:best' }, // Auto-optimize quality
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as { secure_url: string });
        }
      );
      uploadStream.end(buffer);
    }
  );

  imageUrl = uploadResult.secure_url;
  return imageUrl;
};
