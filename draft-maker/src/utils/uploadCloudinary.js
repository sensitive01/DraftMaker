import axios from "axios";

export const uploadCloudinary = async (file, fileType = 'documents') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const safeFolder = fileType.replace(/\s+/g, "_");  // FIX SPACES

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append(
    "folder",
    `draft-documents/${new Date().toISOString().split("T")[0]}/${safeFolder}`
  );

  const uploadType = "auto"; // FIX RAW upload issue

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${uploadType}/upload`,
      formData
    );

    return {
      ...response.data,
      view_url: response.data.secure_url, // PDF & image view
    };
  } catch (error) {
    console.error("Cloudinary Error:", error.response?.data || error);
    throw new Error(error.response?.data?.error?.message || "Upload failed");
  }
};
