import React, { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  User,
  Phone,
  X,
  CheckCircle,
  AlertCircle,
  Cloud,
  Image,
  FileCheck,
  ExternalLink,
  Copy,
  Eye,
  Download,
  Link,
} from "lucide-react";
import {
  getDocumentsNames,
  getStampAndDeliveryCharges,
  sendDocumentsToBackend,
} from "../../api/service/axiosService";
import SuccessNotification from "../documents/serviceNotification/SuccessNotification";

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
  });
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    file: null,
  });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const ALLOWED_TYPES = {
    "image/jpeg": ".jpg, .jpeg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid 10-digit mobile number";
    }

    if (files.length === 0) {
      newErrors.files = "Please upload at least one document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatContactNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length > 10 ? cleaned.slice(0, 10) : cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contactNumber" ? formatContactNumber(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const getFileIcon = (fileObj) => {
    if (fileObj.file.type.startsWith("image/")) {
      return <Image className="w-6 h-6 text-blue-600" />;
    }
    return <FileText className="w-6 h-6 text-red-600" />;
  };

  const isValidFileType = (file) => {
    return Object.keys(ALLOWED_TYPES).includes(file.type);
  };

  const getFileExtension = (filename) => {
    return filename.toLowerCase().split(".").pop();
  };

  const isValidFileExtension = (filename) => {
    const ext = getFileExtension(filename);
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];
    return allowedExtensions.includes(ext);
  };

  const createFilePreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const rejectedFiles = [];

    selectedFiles.forEach((file) => {
      let isValid = true;
      let reason = "";

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        isValid = false;
        reason = `File too large (${(file.size / 1024 / 1024).toFixed(
          2
        )}MB > 10MB)`;
      } else if (!isValidFileType(file) && !isValidFileExtension(file.name)) {
        isValid = false;
        reason = "Invalid file type. Only images and PDF files are allowed.";
      }

      if (isValid) {
        validFiles.push(file);
      } else {
        rejectedFiles.push({ name: file.name, reason });
      }
    });

    if (rejectedFiles.length > 0) {
      const rejectionMessage = rejectedFiles
        .map((f) => `${f.name}: ${f.reason}`)
        .join("\n");
      alert(`Some files were rejected:\n\n${rejectionMessage}`);
    }

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      status: "pending",
      cloudinaryUrl: null,
      previewUrl: createFilePreviewUrl(file),
      progress: 0,
      error: null,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    if (errors.files) {
      setErrors((prev) => ({
        ...prev,
        files: "",
      }));
    }

    e.target.value = "";
  };

  const removeFile = (fileId) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (fileToRemove && fileToRemove.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const openPreview = (fileObj) => {
    setPreviewModal({ isOpen: true, file: fileObj });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, file: null });
  };

  const uploadToCloudinary = async (fileObj) => {
    const formData = new FormData();
    formData.append("file", fileObj.file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    if (fileObj.file.type === "application/pdf") {
      formData.append("resource_type", "raw");
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (!data.secure_url) {
        throw new Error("No URL returned from Cloudinary");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const uploadFiles = async () => {
    setUploading(true);
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "pending") {
        try {
          updatedFiles[i].status = "uploading";
          updatedFiles[i].error = null;
          setFiles([...updatedFiles]);

          const cloudinaryUrl = await uploadToCloudinary(updatedFiles[i]);

          updatedFiles[i].status = "uploaded";
          updatedFiles[i].cloudinaryUrl = cloudinaryUrl;
          updatedFiles[i].progress = 100;

          setFiles([...updatedFiles]);
        } catch (error) {
          updatedFiles[i].status = "error";
          updatedFiles[i].error = error.message;
          updatedFiles[i].progress = 0;
          setFiles([...updatedFiles]);
        }
      }
    }

    setUploading(false);
    return updatedFiles;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const uploadedFiles = await uploadFiles();

      const failedUploads = uploadedFiles.filter(
        (file) => file.status === "error"
      );
      if (failedUploads.length > 0) {
        alert(
          `${failedUploads.length} file(s) failed to upload. Please check the errors and try again.`
        );
        setSubmitting(false);
        return;
      }

      // Prepare data for backend
      const documentUrls = uploadedFiles.map((file) => file.cloudinaryUrl);

      const submitData = {
        userName: formData.userName,
        contactNumber: formData.contactNumber,
        documentUrls: documentUrls,
        totalDocuments: files.length,
        submittedAt: new Date().toISOString(),
      };

      console.log("Data to be sent to backend:", submitData);

      // Replace with your actual backend API call
      const response = await sendDocumentsToBackend(submitData);
      console.log(response);
      if (response.status === 201) {
        setSuccess(true);
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      }

      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
      setFormData({ userName: "", contactNumber: "" });
      setFiles([]);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting documents. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "uploading":
        return (
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        );
      case "uploaded":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Cloud className="w-4 h-4 text-gray-400" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  const allFilesUploaded =
    files.length > 0 && files.every((file) => file.status === "uploaded");
  const hasFailedUploads = files.some((file) => file.status === "error");

  const PreviewModal = () => {
    if (!previewModal.isOpen || !previewModal.file) return null;

    const file = previewModal.file;
    const isImage = file.file.type.startsWith("image/");
    const isPDF = file.file.type === "application/pdf";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl max-h-[95vh] w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              {getFileIcon(file)}
              <div>
                <h3 className="font-semibold text-gray-900 truncate max-w-xs">
                  {file.file.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {(file.file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                  {file.file.type}
                </p>
              </div>
            </div>
            <button
              onClick={closePreview}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            {isImage ? (
              <div className="flex justify-center items-center min-h-full">
                <img
                  src={file.previewUrl}
                  alt={file.file.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg bg-white"
                  style={{ maxHeight: "70vh" }}
                />
              </div>
            ) : isPDF ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-600 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <FileText className="w-20 h-20 mb-4 text-red-500" />
                <p className="text-xl font-medium mb-2">PDF Document</p>
                <p className="text-sm text-center mb-6 max-w-md">
                  PDF preview is not available in this browser. You can download
                  the file to view it or view it after uploading to Cloudinary.
                </p>
                <div className="flex gap-3">
                  <a
                    href={file.previewUrl}
                    download={file.file.name}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </a>
                  {file.cloudinaryUrl && (
                    <a
                      href={file.cloudinaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Online
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <FileText className="w-20 h-20 mb-4" />
                <p className="text-xl font-medium mb-2">File Preview</p>
                <p className="text-sm text-center mb-4">
                  Preview not available for this file type.
                </p>
                <a
                  href={file.previewUrl}
                  download={file.file.name}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        {success && (
          <SuccessNotification
            successMessage={successMessage}
            setSuccess={setSuccess}
          />
        )}
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl sm:rounded-3xl mb-4 sm:mb-8 shadow-xl">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-red-700 mb-2 sm:mb-4 bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent px-4">
            Upload Legal Documents
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Submit your legal documents for stamp application processing
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-4 sm:p-10 mb-8 backdrop-blur-sm bg-opacity-90">
          <div className="space-y-6 sm:space-y-8">
            {/* User Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-bold text-red-800 mb-3"
                >
                  Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 sm:py-4 pl-12 border-2 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 transition-all text-base font-medium ${
                      errors.userName
                        ? "border-red-500 focus:border-red-500"
                        : "border-red-200 focus:border-red-500"
                    }`}
                  />
                </div>
                {errors.userName && (
                  <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-bold text-red-800 mb-3"
                >
                  Contact Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 sm:py-4 pl-12 border-2 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 transition-all text-base font-medium ${
                      errors.contactNumber
                        ? "border-red-500 focus:border-red-500"
                        : "border-red-200 focus:border-red-500"
                    }`}
                  />
                </div>
                {errors.contactNumber && (
                  <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contactNumber}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-bold text-red-800 mb-3">
                Upload Documents * (Images: JPG, PNG, GIF, WebP | PDF files
                only, max 10MB each)
              </label>

              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,image/*,application/pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center transition-all hover:border-red-400 hover:bg-red-25 ${
                    errors.files
                      ? "border-red-500 bg-red-50"
                      : "border-red-300 bg-red-25"
                  }`}
                >
                  <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-base sm:text-lg font-bold text-red-700 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-red-500">
                    Support for images (JPG, PNG, GIF, WebP) and PDF files only
                  </p>
                </div>
              </div>

              {errors.files && (
                <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.files}
                </p>
              )}
            </div>

            {/* Selected Files with Enhanced Links and Preview */}
            {files.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-4">
                  Selected Files ({files.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="bg-red-25 border border-red-200 rounded-xl p-4 space-y-3"
                    >
                      {/* File Preview Thumbnail */}
                      <div className="relative">
                        {fileObj.file.type.startsWith("image/") ? (
                          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                            <img
                              src={fileObj.previewUrl}
                              alt={fileObj.file.name}
                              className="w-full h-full object-cover"
                              onClick={() => openPreview(fileObj)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                              <button
                                onClick={() => openPreview(fileObj)}
                                className="bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full p-3 transition-all transform scale-0 group-hover:scale-100"
                              >
                                <Eye className="w-6 h-6 text-gray-700" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors group"
                            onClick={() => openPreview(fileObj)}
                          >
                            <FileText className="w-12 h-12 mb-2 text-red-500" />
                            <span className="text-sm font-medium">PDF</span>
                            <div className="mt-2 text-xs text-blue-600 flex items-center gap-1 group-hover:text-blue-800">
                              <Eye className="w-3 h-3" />
                              Click to Preview
                            </div>
                          </div>
                        )}
                      </div>

                      {/* File Info with Clickable Name */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          {getFileIcon(fileObj)}
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => openPreview(fileObj)}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline truncate block w-full text-left transition-colors"
                              title="Click to preview file"
                            >
                              {fileObj.file.name}
                            </button>
                            <p className="text-xs text-red-500">
                              {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(fileObj.status)}
                            <span className="text-xs font-medium text-red-600 capitalize">
                              {fileObj.status}
                            </span>
                          </div>

                          {fileObj.status !== "uploading" && (
                            <button
                              onClick={() => removeFile(fileObj.id)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Error Message */}
                        {fileObj.error && (
                          <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                            Error: {fileObj.error}
                          </p>
                        )}

                        {/* Enhanced File Links Section */}
                        <div className="space-y-2 pt-2 border-t border-red-200">
                          {/* Local Preview Link */}
                          <div className="flex items-center gap-2">
                            <Link className="w-3 h-3 text-gray-500" />
                            <button
                              onClick={() => openPreview(fileObj)}
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                              Preview File
                            </button>
                          </div>

                          {/* Cloudinary URL Actions */}
                          {fileObj.cloudinaryUrl && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3 text-green-600" />
                                <a
                                  href={fileObj.cloudinaryUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-green-600 hover:text-green-800 hover:underline transition-colors"
                                >
                                  View Online (Cloudinary)
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Copy className="w-3 h-3 text-gray-500" />
                                <button
                                  onClick={() =>
                                    copyToClipboard(fileObj.cloudinaryUrl)
                                  }
                                  className="text-xs text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                                >
                                  Copy Cloudinary URL
                                </button>
                              </div>
                              {/* Display the actual URL (truncated) */}
                              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 break-all border">
                                <span className="font-mono">
                                  {fileObj.cloudinaryUrl.length > 50
                                    ? `${fileObj.cloudinaryUrl.substring(
                                        0,
                                        50
                                      )}...`
                                    : fileObj.cloudinaryUrl}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Download Local File Link */}
                          <div className="flex items-center gap-2">
                            <Download className="w-3 h-3 text-purple-600" />
                            <a
                              href={fileObj.previewUrl}
                              download={fileObj.file.name}
                              className="text-xs text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                            >
                              Download Original File
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={submitting || uploading}
                className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl sm:rounded-2xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 min-w-[200px]"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileCheck className="w-5 h-5" />
                    Submit Documents
                  </>
                )}
              </button>
            </div>

            {/* Upload Status Messages */}
            {hasFailedUploads && (
              <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                Some files failed to upload. Please check the errors above and
                try again.
              </div>
            )}

            {allFilesUploaded && files.length > 0 && (
              <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-xl border border-green-200 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                All files uploaded successfully! URLs are available above. Ready
                to submit.
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-red-100 p-6 sm:p-8 backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Important Instructions
          </h3>
          <ul className="space-y-2 text-sm text-red-600">
            <li>• Ensure all documents are clear and readable</li>
            <li>• Only upload images (JPG, PNG, GIF, WebP) and PDF files</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• All fields marked with * are mandatory</li>
            <li>• You will receive a booking ID after successful submission</li>
            <li>• File URLs will be displayed after successful upload</li>
            <li>
              • Click on file thumbnails or file names to preview before
              uploading
            </li>
            <li>
              • Use the provided links to navigate to file previews and download
              options
            </li>
          </ul>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
};

export default DocumentUpload;
