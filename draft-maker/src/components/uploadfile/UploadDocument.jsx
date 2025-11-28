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
import UploadDocumentUi from "./UploadDocumentUi";

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
  });

  // Document and pricing related states
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [stampDutyOptions, setStampDutyOptions] = useState([]);
  const [deliveryChargeOptions, setDeliveryChargeOptions] = useState([]);
  const [selectedStampDuty, setSelectedStampDuty] = useState(null);
  const [selectedDeliveryCharge, setSelectedDeliveryCharge] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [includeNotary, setIncludeNotary] = useState(false);

  // E-stamp logic states
  const [considerationAmount, setConsiderationAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // File upload states
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

  // Get dynamic service charge based on selected document type
  const getServiceChargePerDocument = () => {
    return selectedDocumentType?.serviceCharge || 0;
  };

  // NEW: Get filtered delivery options based on selected service
  const getFilteredDeliveryOptions = () => {
    if (!selectedService || !deliveryChargeOptions.length) return [];

    if (selectedService.id === "draft_estamp") {
      // For "Draft + e-Stamp", only show Scan Copy services
      return deliveryChargeOptions.filter(
        (option) => option.serviceType === "scan_delivery"
      );
    } else if (selectedService.id === "draft_estamp_delivery") {
      // For "Draft + e-Stamp + Delivery", show Scan & Courier and Courier Only
      return deliveryChargeOptions.filter(
        (option) =>
          option.serviceType === "scan_courier" ||
          option.serviceType === "courier_only"
      );
    }

    return deliveryChargeOptions;
  };

  // Fetch document types and pricing data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const docTypesResponse = await getDocumentsNames();
        const pricingResponse = await getStampAndDeliveryCharges();

        console.log("docTypesResponse", docTypesResponse);
        console.log("pricingResponse", pricingResponse);

        if (docTypesResponse.status === 200) {
          setDocumentTypes(docTypesResponse.data.data);
        }

        if (pricingResponse.status === 200) {
          setStampDutyOptions(pricingResponse.data.stampDuty || []);
          setDeliveryChargeOptions(pricingResponse.data.deliveryCharges || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to load document types and pricing. Please refresh the page."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-select stamp duty based on selected document type AND selected service
  useEffect(() => {
    console.log("Stamp duty effect triggered", {
      stampDutyOptionsLength: stampDutyOptions?.length,
      formId: selectedDocumentType?.formId,
      selectedServiceRequiresStamp: selectedService?.requiresStamp,
      currentSelectedStampDuty: selectedStampDuty,
    });

    if (
      stampDutyOptions?.length > 0 &&
      selectedDocumentType?.formId &&
      selectedService?.requiresStamp
    ) {
      let stampDutyId;

      switch (selectedDocumentType?.formId) {
        case "DM-CFD-17":
          stampDutyId = "684145ffb333b68bfef00580";
          break;
        case "DM-RFD-18":
          stampDutyId = "6841457bb333b68bfef0057c";
          break;
        default:
          stampDutyId = "68414437b333b68bfef00576";
          break;
      }

      const selectedStamp = stampDutyOptions.find(
        (sd) => sd._id === stampDutyId
      );
      console.log("Auto-selecting stamp duty:", selectedStamp);
      setSelectedStampDuty(selectedStamp || null);
    } else if (selectedService && !selectedService.requiresStamp) {
      console.log("Clearing stamp duty - service doesn't require it");
      setSelectedStampDuty(null);
    }
  }, [stampDutyOptions, selectedDocumentType, selectedService]);

  // NEW: Clear delivery selection when service changes to maintain consistency
  useEffect(() => {
    if (selectedService) {
      const filteredOptions = getFilteredDeliveryOptions();

      // If current selection is not in filtered options, clear it
      if (
        selectedDeliveryCharge &&
        !filteredOptions.find(
          (option) => option._id === selectedDeliveryCharge._id
        )
      ) {
        setSelectedDeliveryCharge(null);
      }
    }
  }, [selectedService, deliveryChargeOptions]);

  const ALLOWED_TYPES = {
    "image/jpeg": ".jpg, .jpeg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Get service options based on selected document type
  const getServiceOptions = () => {
    if (!selectedDocumentType) return [];

    return [
      {
        id: "draft_estamp",
        name: "Draft + e-Stamp",
        description: "Includes e-stamp along with document draft.",
        price: selectedDocumentType.draftCharge || 0,
        hasNotary: (selectedDocumentType.draftNotaryCharge || 0) > 0,
        notaryCharge: selectedDocumentType.draftNotaryCharge || 0,
        requiresStamp: true,
        requiresDelivery: true,
        requiresEmail: true,
      },
      {
        id: "draft_estamp_delivery",
        name: "Draft + e-Stamp + Delivery",
        description: "Complete service including document delivery.",
        price: selectedDocumentType.draftCharge || 0,
        hasNotary: (selectedDocumentType.draftNotaryCharge || 0) > 0,
        notaryCharge: selectedDocumentType.draftNotaryCharge || 0,
        requiresStamp: true,
        requiresDelivery: true,
        requiresEmail: true,
      },
    ];
  };

  // Calculate stamp duty amount
  const calculateStampDutyAmount = (stampDuty, baseAmount = 1000) => {
    if (!stampDuty) return 0;

    if (stampDuty.calculationType === "fixed") {
      return (stampDuty.fixedAmount || 0) * (quantity || 1);
    } else if (stampDuty.calculationType === "percentage") {
      const amount = considerationAmount
        ? parseFloat(considerationAmount) || 0
        : baseAmount;
      let calculatedAmount = (amount * (stampDuty.percentage || 0)) / 100;

      if (stampDuty.minAmount && stampDuty.minAmount > 0) {
        calculatedAmount = Math.max(calculatedAmount, stampDuty.minAmount);
      }
      if (stampDuty.maxAmount && stampDuty.maxAmount > 0) {
        calculatedAmount = Math.min(calculatedAmount, stampDuty.maxAmount);
      }

      return calculatedAmount * (quantity || 1);
    }
    return 0;
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    if (!selectedService) return 0;

    const qty = parseInt(quantity) || 1;
    let total = 0;

    // Base service price multiplied by quantity
    total += (selectedService.price || 0) * qty;

    // Add notary charge multiplied by quantity (only if checkbox is checked AND service has notary)
    if (selectedService.hasNotary && includeNotary) {
      total += (selectedService.notaryCharge || 0) * qty;
    }

    // Add stamp duty and service charge multiplied by quantity
    if (selectedService.requiresStamp && selectedStampDuty) {
      total += calculateStampDutyAmount(selectedStampDuty);
    }

    // Delivery charge is NOT multiplied by quantity
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      total += selectedDeliveryCharge.charge || 0;
    }

    return total;
  };

  // Check if can proceed to payment
  const canProceedToPayment = () => {
    if (!selectedDocumentType || !selectedService) return false;
    if (files.length === 0) return false;
    if (!formData.userName.trim() || !formData.contactNumber.trim())
      return false;

    // Check email requirement
    if (
      selectedService.requiresEmail &&
      (!emailAddress || !isValidEmail(emailAddress))
    ) {
      return false;
    }

    if (selectedService.requiresStamp && !selectedStampDuty) return false;
    if (selectedService.requiresDelivery && !selectedDeliveryCharge)
      return false;

    // Check delivery address
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      if (
        selectedDeliveryCharge.serviceType === "scan_courier" ||
        selectedDeliveryCharge.serviceType === "courier_only"
      ) {
        const requiredFields = ["addressLine1", "city", "state", "pincode"];
        for (let field of requiredFields) {
          if (!deliveryAddress[field] || deliveryAddress[field].trim() === "") {
            return false;
          }
        }
      }
    }

    // Validate consideration amount for percentage-based stamps
    if (
      selectedService.requiresStamp &&
      selectedStampDuty?.calculationType === "percentage" &&
      (!considerationAmount || isNaN(parseFloat(considerationAmount)))
    ) {
      return false;
    }

    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDocumentType) {
      newErrors.documentType = "Please select a document type";
    }

    if (!selectedService) {
      newErrors.service = "Please select a service package";
    }

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

    if (
      selectedService?.requiresEmail &&
      (!emailAddress || !isValidEmail(emailAddress))
    ) {
      newErrors.email = "Please enter a valid email address";
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

  const handleDocumentTypeChange = (e) => {
    console.log("Document type change triggered");
    const selectedId = e.target.value;
    console.log("selectedId", selectedId);

    if (!selectedId) {
      setSelectedDocumentType(null);
      setSelectedStampDuty(null);
      setSelectedService(null);
      setIncludeNotary(false);
      setSelectedDeliveryCharge(null);
      return;
    }

    const docType = documentTypes.find((dt) => dt._id === selectedId);
    console.log("Found docType:", docType);
    setSelectedDocumentType(docType || null);
    setSelectedService(null);
    setSelectedStampDuty(null);
    setIncludeNotary(false);
    setSelectedDeliveryCharge(null);

    if (errors.documentType) {
      setErrors((prev) => ({
        ...prev,
        documentType: "",
      }));
    }
  };

  const handleServiceSelect = (service) => {
    console.log("Service selected:", service);
    setSelectedService(service);
    setIncludeNotary(false);
    setSelectedDeliveryCharge(null);

    if (errors.service) {
      setErrors((prev) => ({
        ...prev,
        service: "",
      }));
    }
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // File handling functions
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
        ?.map((f) => `${f.name}: ${f.reason}`)
        .join("\n");
      alert(`Some files were rejected:\n\n${rejectionMessage}`);
    }

    const newFiles = validFiles?.map((file) => ({
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

  // Cloudinary upload function
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

      if (!data.secure_url) {
        throw new Error("No URL returned from Cloudinary");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  // Upload all files to Cloudinary
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

  // ✅✅✅ CCAvenue Integration - REPLACES RAZORPAY ✅✅✅
  const initiateCCAvenuePayment = async (service, totalPrice, uploadedDocuments) => {
    try {
      const bookingId = `UPLOAD-${bookingId}_${Date.now()}`;

      console.log('\n🔵 Initiating CCAvenue payment for document upload...');
      console.log('   Booking ID:', bookingId);
      console.log('   Total Amount:', totalPrice);
      console.log('   Service:', service.name);

      // Prepare payment data for CCAvenue
      const paymentData = {
        bookingId: bookingId,
        mobileNumber: formData.contactNumber,
        documentType: selectedDocumentType?.documentType || 'Document Upload',
        formId: 'UPLOAD', // Special formId for uploaded documents
        fullName: formData.userName,
        userName: formData.userName,
        serviceType: service.id,
        serviceName: service.name,
        basePrice: service.price,
        includesNotary: service.hasNotary && includeNotary,
        notaryCharge: service.hasNotary && includeNotary ? service.notaryCharge : 0,
        emailAddress: emailAddress,

        // Stamp duty details
        selectedStampDutyId: selectedStampDuty?._id || null,
        stampDutyDocumentType: selectedStampDuty?.documentType || null,
        stampDutyCalculationType: selectedStampDuty?.calculationType || null,
        stampDutyAmount: selectedStampDuty ? calculateStampDutyAmount(selectedStampDuty) : 0,
        considerationAmount: parseFloat(considerationAmount) || 0,
        quantity: quantity,
        serviceCharge: getServiceChargePerDocument() * quantity,

        // Delivery details
        selectedDeliveryServiceId: selectedDeliveryCharge?._id || null,
        deliveryServiceName: selectedDeliveryCharge?.serviceName || null,
        deliveryCharge: selectedDeliveryCharge?.charge || 0,
        deliveryDescription: selectedDeliveryCharge?.description || null,
        deliveryAddress: selectedService?.requiresDelivery ? deliveryAddress : null,

        // Total amount
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
        paymentMethod: 'ccavenue',
        currency: 'INR',

        // Store uploaded documents info
        uploadedDocuments: uploadedDocuments?.map(file => ({
          url: file.cloudinaryUrl,
          fileName: file.file.name,
          fileType: file.file.type,
          fileSize: file.file.size
        }))
      };

      console.log('📦 Payment Data:', paymentData);

      // Show loading overlay
      const loadingOverlay = document.createElement('div');
      loadingOverlay.id = 'ccavenue-loading';
      loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                    background: rgba(0,0,0,0.7); display: flex; align-items: center; 
                    justify-content: center; z-index: 9999;">
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; 
                        border-top: 3px solid #dc2626; border-radius: 50%; 
                        animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #374151; font-size: 1rem;">Redirecting to payment gateway...</p>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(loadingOverlay);

      // Call backend to initiate CCAvenue payment
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payment/initiate-upload-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();

      console.log('🔐 CCAvenue Response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Failed to initiate payment');
      }

      // Remove loading overlay
      document.body.removeChild(loadingOverlay);

      // Create and submit CCAvenue form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

      const encRequestInput = document.createElement('input');
      encRequestInput.type = 'hidden';
      encRequestInput.name = 'encRequest';
      encRequestInput.value = data.encRequest;
      form.appendChild(encRequestInput);

      const accessCodeInput = document.createElement('input');
      accessCodeInput.type = 'hidden';
      accessCodeInput.name = 'access_code';
      accessCodeInput.value = data.accessCode;
      form.appendChild(accessCodeInput);

      document.body.appendChild(form);
      console.log('✅ Submitting to CCAvenue...');
      form.submit();

    } catch (error) {
      console.error('❌ Error in CCAvenue initialization:', error);

      // Remove loading overlay if present
      const loadingOverlay = document.getElementById('ccavenue-loading');
      if (loadingOverlay) {
        document.body.removeChild(loadingOverlay);
      }

      alert('Payment initialization failed: ' + error.message);
      setSubmitting(false);
    }
  };

  // Main submit handler - UPDATED for CCAvenue
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!canProceedToPayment()) {
      let errorMessage =
        "Please complete all required selections before proceeding to payment.";

      if (
        selectedService?.requiresEmail &&
        (!emailAddress || !isValidEmail(emailAddress))
      ) {
        errorMessage = "Please enter a valid email address to continue.";
      }

      alert(errorMessage);
      return;
    }

    setSubmitting(true);

    try {
      // Upload files first
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

      // Calculate total price
      const totalPrice = calculateTotalAmount();

      // ✅ Initiate CCAvenue payment (replaces Razorpay)
      await initiateCCAvenuePayment(selectedService, totalPrice, uploadedFiles);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Error processing your request. Please try again.");
      setSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document types...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <div className="text-red-600 mb-4">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <UploadDocumentUi
      success={success}
      successMessage={successMessage}
      setSuccess={setSuccess}
      selectedDocumentType={selectedDocumentType}
      handleDocumentTypeChange={handleDocumentTypeChange}
      documentTypes={documentTypes}
      errors={errors}
      selectedStampDuty={selectedStampDuty}
      quantity={quantity}
      setQuantity={setQuantity}
      considerationAmount={considerationAmount}
      setConsiderationAmount={setConsiderationAmount}
      calculateStampDutyAmount={calculateStampDutyAmount}
      formData={formData}
      handleInputChange={handleInputChange}
      handleFileSelect={handleFileSelect}
      files={files}
      getFileIcon={getFileIcon}
      removeFile={removeFile}
      getServiceOptions={getServiceOptions}
      handleServiceSelect={handleServiceSelect}
      selectedService={selectedService}
      selectedDeliveryCharge={selectedDeliveryCharge}
      setSelectedDeliveryCharge={setSelectedDeliveryCharge}
      deliveryChargeOptions={getFilteredDeliveryOptions()}
      deliveryAddress={deliveryAddress}
      handleAddressChange={handleAddressChange}
      getServiceChargePerDocument={getServiceChargePerDocument}
      calculateTotalAmount={calculateTotalAmount}
      canProceedToPayment={canProceedToPayment}
      submitting={submitting}
      uploading={uploading}
      handleSubmit={handleSubmit}
      emailAddress={emailAddress}
      setEmailAddress={setEmailAddress}
      isValidEmail={isValidEmail}
      includeNotary={includeNotary}
      setIncludeNotary={setIncludeNotary}
    />
  );
};

export default DocumentUpload;