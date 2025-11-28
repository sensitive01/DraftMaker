import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadCloudinary = async (file, fileType = 'documents') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  console.log("Cloudinary Config:", {
    cloudName,
    uploadPreset,
    fileType: file.type,
    fileSize: (file.size / 1024 / 1024).toFixed(2) + 'MB'
  });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', `draft-documents/${new Date().toISOString().split('T')[0]}/${fileType}`);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Cloudinary Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.error?.message || 'Upload failed');
  }
};