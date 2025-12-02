import axios from "axios";

export const uploadCloudinary = async (file, fileType = 'documents') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const isPDF = file.type === "application/pdf";

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append(
    'folder',
    `draft-documents/${new Date().toISOString().split('T')[0]}/${fileType}`
  );

  // keep raw for pdf upload
  const uploadType = isPDF ? "raw" : "auto";

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${uploadType}/upload`,
      formData
    );

    // ⭐ THIS IS THE IMPORTANT FIX ⭐
    return {
      ...response.data,
      view_url: `https://res.cloudinary.com/${cloudName}/image/upload/${response.data.public_id}`
    };

  } catch (error) {
    console.error('Cloudinary Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.error?.message || 'Upload failed');
  }
};
