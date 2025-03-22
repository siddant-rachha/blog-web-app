import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'df8byxnyr',
  api_key: '732621848874533',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImgFromCloudinary = async (imageUrl: string) => {
  try {
    await cloudinary.uploader.destroy(imageUrl);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
