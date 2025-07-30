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
  const SERVICE_CHARGE_PER_DOCUMENT = 210;

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

  // Auto-select stamp duty based on selected document type
  useEffect(() => {
    if (stampDutyOptions?.length > 0 && selectedDocumentType?.formId) {
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
      console.log("selectedStamp", selectedStamp);
      setSelectedStampDuty(selectedStamp || null);
    }
  }, [stampDutyOptions, selectedDocumentType]);

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
        id: "draft",
        name: "Draft Only",
        description: "Get your document drafted by experts.",
        price: selectedDocumentType.draftCharge || 0,
        hasNotary: (selectedDocumentType.draftNotaryCharge || 0) > 0,
        notaryCharge: selectedDocumentType.draftNotaryCharge || 0,
        requiresStamp: false,
        requiresDelivery: false,
      },
      {
        id: "draft_estamp",
        name: "Draft + e-Stamp",
        description: "Includes e-stamp along with document draft.",
        price: selectedDocumentType.draftCharge || 0,
        hasNotary: (selectedDocumentType.draftNotaryCharge || 0) > 0,
        notaryCharge: selectedDocumentType.draftNotaryCharge || 0,
        requiresStamp: true,
        requiresDelivery: false,
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

    let total = selectedService.price || 0;

    if (selectedService.hasNotary) {
      total += selectedService.notaryCharge || 0;
    }

    if (selectedService.requiresStamp && selectedStampDuty) {
      total += calculateStampDutyAmount(selectedStampDuty);
      total += SERVICE_CHARGE_PER_DOCUMENT * (quantity || 1);
    }

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

    if (selectedService.requiresStamp && !selectedStampDuty) return false;
    if (selectedService.requiresDelivery && !selectedDeliveryCharge)
      return false;

    // Check delivery address
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      const requiredFields = ["addressLine1", "city", "state", "pincode"];
      for (let field of requiredFields) {
        if (!deliveryAddress[field] || deliveryAddress[field].trim() === "") {
          return false;
        }
      }
    }

    // Validate consideration amount for percentage-based stamps ONLY if service requires stamp
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
      return;
    }

    const docType = documentTypes.find((dt) => dt._id === selectedId);
    console.log("Found docType:", docType);
    setSelectedDocumentType(docType || null);
    setSelectedService(null); // Reset service selection

    if (errors.documentType) {
      setErrors((prev) => ({
        ...prev,
        documentType: "",
      }));
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (!service.requiresStamp) {
      setSelectedStampDuty(null);
    }
    if (!service.requiresDelivery) {
      setSelectedDeliveryCharge(null);
    }

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

  // Razorpay integration
  const initializeRazorpay = async (service, totalPrice, uploadedDocuments) => {
    try {
      const bookingId = `DOC-${Date.now()}`;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Draft Maker",
        description: `${selectedDocumentType?.documentType || "Document"} - ${
          service.name
        }`,
        handler: function (response) {
          console.log("razorpay response", response);
          handlePaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId,
            mobileNumber: formData.contactNumber,
            documentType: selectedDocumentType?.documentType,
            fullName: formData.userName,
            serviceType: service.id,
            serviceName: service.name,
            amount: totalPrice,
            includesNotary: service.hasNotary,
            userName: formData.userName,
            uploadedDocuments: uploadedDocuments,
            selectedStampDuty: selectedStampDuty,
            selectedDeliveryCharge: selectedDeliveryCharge,
            serviceDetails: {
              basePrice: service.price,
              notaryCharge: service.hasNotary ? service.notaryCharge : 0,
              stampDutyAmount: selectedStampDuty
                ? calculateStampDutyAmount(selectedStampDuty)
                : 0,
              deliveryCharge: selectedDeliveryCharge
                ? selectedDeliveryCharge.charge
                : 0,
              requiresStamp: service.requiresStamp,
              requiresDelivery: service.requiresDelivery,
              deliveryAddress: selectedService?.requiresDelivery
                ? JSON.stringify(deliveryAddress)
                : null,
              considerationAmount: considerationAmount,
              quantity: quantity,
              serviceCharge: SERVICE_CHARGE_PER_DOCUMENT * (quantity || 1),
            },
          });
        },
        prefill: {
          name: formData.userName || "",
          contact: formData.contactNumber || "",
        },
        notes: {
          bookingId: bookingId,
          serviceType: service.id,
          serviceName: service.name,
          stampDutyId: selectedStampDuty?._id || null,
          deliveryChargeId: selectedDeliveryCharge?._id || null,
          documentType: selectedDocumentType?.documentType,
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(
          `Payment failed: ${response.error.description || "Unknown error"}`
        );
        setSubmitting(false);
      });
    } catch (error) {
      console.error("Error in Razorpay initialization:", error);
      alert("Payment initialization failed. Please try again.");
      setSubmitting(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = async (paymentData) => {
    try {
      const paymentConfirmationData = {
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature,
        bookingId: paymentData.bookingId,
        mobileNumber: paymentData.mobileNumber,
        documentType: selectedDocumentType?.documentType,
        formId: selectedDocumentType?.formId,
        fullName: formData.userName,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        status: "success",
        userName: formData.userName,
        uploadedDocuments: paymentData.uploadedDocuments,
        selectedStampDuty: paymentData.selectedStampDuty,
        selectedDeliveryCharge: paymentData.selectedDeliveryCharge,
        serviceDetails: paymentData.serviceDetails,
        deliveryAddress: selectedService?.requiresDelivery
          ? deliveryAddress
          : null,
        considerationAmount: considerationAmount,
        quantity: quantity,
        documents: paymentData.uploadedDocuments?.map(
          (file) => file.cloudinaryUrl
        ),
        totalDocuments: files.length,
      };


   
        // Fallback to original document submission
        const documentUrls = paymentData?.uploadedDocuments?.map(
          (file) => file.cloudinaryUrl
        );
        const submitData = {
          username: formData.userName,
          userMobile: formData.contactNumber,
          documentType: selectedDocumentType?.documentType,
          formId: selectedDocumentType?.formId,
          documents: documentUrls,
          totalDocuments: files.length,
          selectedService: {
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            basePrice: selectedService.price,
            hasNotary: selectedService.hasNotary,
            notaryCharge: selectedService.notaryCharge,
            requiresStamp: selectedService.requiresStamp,
            requiresDelivery: selectedService.requiresDelivery,
          },
          stampDuty: selectedStampDuty
            ? {
                stampDutyId: selectedStampDuty._id,
                documentType: selectedStampDuty.documentType,
                articleNo: selectedStampDuty.articleNo,
                calculationType: selectedStampDuty.calculationType,
                fixedAmount: selectedStampDuty.fixedAmount,
                percentage: selectedStampDuty.percentage,
                quantity: quantity,
                considerationAmount: parseFloat(considerationAmount) || 0,
                calculatedAmount: calculateStampDutyAmount(selectedStampDuty),
                serviceCharge: SERVICE_CHARGE_PER_DOCUMENT * quantity,
              }
            : null,
          delivery: selectedDeliveryCharge
            ? {
                deliveryChargeId: selectedDeliveryCharge._id,
                serviceName: selectedDeliveryCharge.serviceName,
                charge: selectedDeliveryCharge.charge,
                address: deliveryAddress,
              }
            : null,
          payment: {
            totalAmount: paymentData.amount,
            paymentId: paymentData.razorpay_payment_id,
            orderId: paymentData.razorpay_order_id,
            signature: paymentData.razorpay_signature,
            paymentStatus: "completed",
            paymentDate: new Date(),
          },
          bookingId: paymentData.bookingId,
          submittedAt: new Date().toISOString(),
        };

        const response = await sendDocumentsToBackend(submitData);

        if (response.status === 201 || response.status === 200) {
          setSuccess(true);
          setSuccessMessage("Payment and document submission successful!");

          // Reset form
          setFormData({ userName: "", contactNumber: "" });
          setFiles([]);
          setSelectedDocumentType(null);
          setSelectedService(null);

          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
     
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert(
        "Payment was processed but we couldn't update your booking. Our team will contact you shortly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Main submit handler
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!canProceedToPayment()) {
      alert(
        "Please complete all required selections before proceeding to payment."
      );
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

      // Initialize Razorpay payment
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          initializeRazorpay(selectedService, totalPrice, uploadedFiles);
        };

        script.onerror = () => {
          console.error("Razorpay SDK failed to load");
          alert("Payment gateway failed to load. Please try again later.");
          setSubmitting(false);
        };

        document.body.appendChild(script);
      } else {
        initializeRazorpay(selectedService, totalPrice, uploadedFiles);
      }
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
      deliveryChargeOptions={deliveryChargeOptions}
      deliveryAddress={deliveryAddress}
      handleAddressChange={handleAddressChange}
      SERVICE_CHARGE_PER_DOCUMENT={SERVICE_CHARGE_PER_DOCUMENT}
      calculateTotalAmount={calculateTotalAmount}
      canProceedToPayment={canProceedToPayment}
      submitting={submitting}
      uploading={uploading}
      handleSubmit={handleSubmit}
    />
  );
};

export default DocumentUpload;
