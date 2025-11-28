import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadCloudinary = async (file, fileType = 'documents') => {
  console.log("Starting Cloudinary upload...", {
    fileName: file.name,
    fileType: file.type,
    fileSize: (file.size / 1024 / 1024).toFixed(2) + 'MB',
    cloudName: cloudName
  });

  // Validate environment variables
  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not configured");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'e-drafter');
  formData.append('folder', `draft-documents/${new Date().toISOString().split('T')[0]}/${fileType}`);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${progress}%`);
        },
      }
    );

    console.log('✅ Cloudinary upload successful:', {
      url: response.data.secure_url,
      public_id: response.data.public_id
    });

    return {
      url: response.data.secure_url,
      public_id: response.data.public_id,
      format: response.data.format
    };

  } catch (error) {
    console.error('❌ Cloudinary upload failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });

    let errorMessage = 'Failed to upload file';
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};