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
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";
import SuccessNotification from "../documents/serviceNotification/SuccessNotification";

const UploadDocumentUi = ({
  success,
  successMessage,
  setSuccess,
  selectedDocumentType,
  handleDocumentTypeChange,
  documentTypes,
  errors,
  selectedStampDuty,
  quantity,
  setQuantity,
  considerationAmount,
  setConsiderationAmount,
  calculateStampDutyAmount,
  formData,
  handleInputChange,
  handleFileSelect,
  files,
  getFileIcon,
  removeFile,
  getServiceOptions,
  handleServiceSelect,
  selectedService,
  selectedDeliveryCharge,
  setSelectedDeliveryCharge,
  deliveryChargeOptions,
  deliveryAddress,
  handleAddressChange,
  getServiceChargePerDocument,
  calculateTotalAmount,
  canProceedToPayment,
  submitting,
  uploading,
  handleSubmit,
  emailAddress,
  setEmailAddress,
  isValidEmail,
  includeNotary,
  setIncludeNotary,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeliveryDropdownOpen, setIsDeliveryDropdownOpen] = useState(false);
  const [isImportantNoticeAccepted, setIsImportantNoticeAccepted] =
    useState(false);
  const [showImportantNoticePopup, setShowImportantNoticePopup] =
    useState(false);

  const handleDocumentSelect = (docType) => {
    const event = {
      target: { value: docType._id },
    };
    handleDocumentTypeChange(event);
    setIsDropdownOpen(false);
  };

  const handleDeliverySelect = (deliveryId) => {
    const deliveryCharge = deliveryChargeOptions.find(
      (dc) => dc._id === deliveryId
    );
    setSelectedDeliveryCharge(deliveryCharge || null);
    setIsDeliveryDropdownOpen(false);
  };

  // NEW: Check if selected delivery service requires address
  const requiresDeliveryAddress = () => {
    if (!selectedDeliveryCharge) return false;
    return (
      selectedDeliveryCharge.serviceType === "scan_courier" ||
      selectedDeliveryCharge.serviceType === "courier_only"
    );
  };

  // NEW: Get delivery section title based on selected service
  const getDeliverySectionTitle = () => {
    if (!selectedService) return "Delivery Service";

    if (selectedService.id === "draft_estamp") {
      return "Scan & Delivery Service";
    } else if (selectedService.id === "draft_estamp_delivery") {
      return "Delivery Service";
    }

    return "Delivery Service";
  };

  const getConsiderationLabelText = (selectedDocumentType) => {
    if (!selectedDocumentType || !selectedDocumentType.formId) {
      return "Consideration Amount (₹) *";
    }

    const formid = selectedDocumentType.formId;

    if (formid === "DM-RFD-18") {
      return "Consideration Amount (₹) * (0.5% on average annual rent fine premium subject to maximum of Rs.500)";
    } else if (formid === "DM-CFD-17") {
      return "Consideration Amount (₹) * (0.5% on AAR, Fine, Premium, Advance)";
    }

    return "Consideration Amount (₹) *";
  };

  // NEW: Get delivery section description
  const getDeliverySectionDescription = () => {
    if (!selectedService) return "";

    if (selectedService.id === "draft_estamp") {
      return "Select how you want to receive your scanned documents";
    } else if (selectedService.id === "draft_estamp_delivery") {
      return "Select your preferred delivery method";
    }

    return "";
  };

  const ImportantNoticePopup = () => {
    if (!showImportantNoticePopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Important Notice
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Printed documents will be discarded after 30 days. We suggest
                  adding "doorstep delivery" to retain a physical copy.
                </span>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium">
                    Cut-off time: 3:30 PM (everyday)
                  </span>
                  <div className="ml-6 mt-1">
                    <div className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>
                        Payment received for orders after the cut-off time will
                        be processed on the next business day.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Sunday and other state/central government
                  holidays/strikes/bandhs/riots are non-business days.
                </span>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Delivery of stamp paper is done by third party (courier
                  company), on best effort basis ONLY and can be delayed (though
                  very rarely) due to situations beyond our control.
                </span>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Shipment can be returned back to shipper if address is
                  incorrect/incomplete, consignee not available at the shipping
                  address/door locked/no one to receive the shipment/building
                  security not ready to receive the shipment.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 p-6 bg-gray-50 rounded-b-lg">
            <button
              onClick={() => {
                setShowImportantNoticePopup(false);
                setIsImportantNoticeAccepted(false);
              }}
              className="flex-1 px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowImportantNoticePopup(false);
                setIsImportantNoticeAccepted(true);
              }}
              className="flex-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              I Agree & Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      onClick={() => {
        setIsDropdownOpen(false);
        setIsDeliveryDropdownOpen(false);
      }}
    >
      <ImportantNoticePopup />
      <div className="max-w-4xl mx-auto px-4 py-3">
        {success && (
          <SuccessNotification
            successMessage={successMessage}
            setSuccess={setSuccess}
          />
        )}

        {/* Main Card */}
        <div
          className="bg-white rounded-lg shadow-lg border-t-4 border-red-500"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-red-50 px-4 py-3 border-b">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-red-500" />
              Document Upload & Payment
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Complete the form below to upload documents and make payment
            </p>
          </div>

          <div className="p-4 space-y-4">
            {/* Step 1: Document Type */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-gray-800 flex items-center">
                <FileCheck className="w-4 h-4 mr-2 text-red-500" />
                Step 1: Document Type
              </h2>
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200 bg-white text-left flex justify-between items-center"
                >
                  <span
                    className={
                      selectedDocumentType ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {selectedDocumentType
                      ? `${selectedDocumentType.documentType}`
                      : "-- Select Document Type --"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    <div
                      className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        handleDocumentSelect({ _id: "" });
                      }}
                    >
                      -- Select Document Type --
                    </div>
                    {documentTypes?.map((docType) => (
                      <div
                        key={docType._id}
                        className="px-3 py-2 text-sm text-gray-900 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleDocumentSelect(docType)}
                      >
                        <div className="font-medium">
                          {docType.documentType}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.documentType && (
                <p className="text-red-500 text-sm">{errors.documentType}</p>
              )}
            </div>

            {/* Step 2: User Info */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-gray-800 flex items-center">
                <User className="w-4 h-4 mr-2 text-red-500" />
                Step 2: Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: File Upload */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-gray-800 flex items-center">
                <Upload className="w-4 h-4 mr-2 text-red-500" />
                Step 3: Upload Documents
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, PDF (Max 10MB)
                  </p>
                </label>
              </div>
              {errors.files && (
                <p className="text-red-500 text-sm">{errors.files}</p>
              )}

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files?.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getFileIcon(fileObj)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {fileObj.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 4: Service Package */}
            {selectedDocumentType && (
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-gray-800 flex items-center">
                  <FileCheck className="w-4 h-4 mr-2 text-red-500" />
                  Step 4: Service Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getServiceOptions().map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`border-2 ${
                        selectedService?.id === service.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      } rounded-md p-3 text-left transition-all relative`}
                    >
                      {selectedService?.id === service.id && (
                        <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-500" />
                      )}
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-red-500 mr-2" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {service.name}
                          </h3>
                          {service.requiresEmail && (
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
                              Email Required
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {service.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Service Charge:</span>
                          <span className="font-bold text-red-600">
                            ₹{service.price}
                          </span>
                        </div>
                        {service.hasNotary && service.notaryCharge > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Notary (opt):</span>
                            <span>₹{service.notaryCharge}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-500 text-sm">{errors.service}</p>
                )}
              </div>
            )}
            {/* Stamp Duty Details */}
            {selectedDocumentType && selectedStampDuty && (
              <div className="p-3 bg-blue-50 rounded-md border">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Stamp Duty Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200"
                    />
                  </div>
                  {selectedStampDuty.calculationType === "percentage" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getConsiderationLabelText(selectedDocumentType)}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={considerationAmount || ""}
                        onChange={(e) => setConsiderationAmount(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200"
                        placeholder="Enter document value"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3 p-2 bg-white rounded-md border">
                  <p className="text-sm text-gray-600">
                    Calculation:{" "}
                    {selectedStampDuty.calculationType === "fixed"
                      ? `₹${selectedStampDuty.fixedAmount} × ${quantity}`
                      : `${selectedStampDuty.percentage}% of ₹${
                          considerationAmount || "0"
                        } × ${quantity}`}
                  </p>
                  <p className="font-bold text-blue-600 text-sm mt-1">
                    Stamp Duty: ₹{calculateStampDutyAmount(selectedStampDuty)}
                  </p>
                </div>
              </div>
            )}

            {/* Notary Checkbox Section */}
            {selectedService?.hasNotary && selectedService.notaryCharge > 0 && (
              <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Notary Service (Optional)
                </h3>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeNotary"
                      checked={includeNotary}
                      onChange={(e) => setIncludeNotary(e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-1"
                    />
                    <label
                      htmlFor="includeNotary"
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Include Notary Service
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-2 rounded-md border border-amber-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            Notary Attestation Service
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Professional notary attestation for your document
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600 text-base">
                            ₹{selectedService.notaryCharge}
                          </p>
                          {includeNotary && (
                            <p className="text-sm text-green-600 font-medium">
                              ✓ Included in total
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Address Input - Show when service requires email */}
            {selectedService?.requiresEmail && (
              <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter your email address to receive the document
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className={`w-full px-3 py-2 text-sm border-2 ${
                      emailAddress && !isValidEmail(emailAddress)
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    } rounded-md focus:ring-1 transition-all`}
                    placeholder="your.email@example.com"
                    required
                  />
                  {emailAddress && !isValidEmail(emailAddress) && (
                    <p className="text-red-600 text-sm mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                  {emailAddress && isValidEmail(emailAddress) && (
                    <p className="text-green-600 text-sm mt-1 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Valid email address
                    </p>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Options - UPDATED with filtering logic */}
            {selectedService?.requiresDelivery && (
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-base font-semibold mb-2">
                  {getDeliverySectionTitle()}
                </h3>
                {getDeliverySectionDescription() && (
                  <p className="text-sm text-gray-600 mb-3">
                    {getDeliverySectionDescription()}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Custom Delivery Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsDeliveryDropdownOpen(!isDeliveryDropdownOpen)
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 bg-white text-left flex justify-between items-center"
                    >
                      <span
                        className={
                          selectedDeliveryCharge
                            ? "text-gray-900"
                            : "text-gray-500"
                        }
                      >
                        {selectedDeliveryCharge
                          ? `${selectedDeliveryCharge.serviceName} - ₹${selectedDeliveryCharge.charge}`
                          : "Select Delivery Service"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isDeliveryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDeliveryDropdownOpen && (
                      <div className="absolute z-40 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-32 overflow-y-auto">
                        <div
                          className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedDeliveryCharge(null);
                            setIsDeliveryDropdownOpen(false);
                          }}
                        >
                          Select Delivery Service
                        </div>
                        {deliveryChargeOptions.map((dc) => (
                          <div
                            key={dc._id}
                            className="px-3 py-2 text-sm text-gray-900 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleDeliverySelect(dc._id)}
                          >
                            <div className="font-medium">{dc.serviceName}</div>
                            <div className="text-sm text-gray-600">
                              ₹{dc.charge} - {dc.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address - Only show for courier services */}
                {selectedDeliveryCharge && requiresDeliveryAddress() && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={deliveryAddress.addressLine1}
                          onChange={(e) =>
                            handleAddressChange("addressLine1", e.target.value)
                          }
                          placeholder="Address Line 1 *"
                          className="w-full px-3 py-2 text-sm border rounded-md focus:border-red-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={deliveryAddress.addressLine2}
                          onChange={(e) =>
                            handleAddressChange("addressLine2", e.target.value)
                          }
                          placeholder="Address Line 2 (Optional)"
                          className="w-full px-3 py-2 text-sm border rounded-md focus:border-red-500"
                        />
                      </div>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        placeholder="City *"
                        className="px-3 py-2 text-sm border rounded-md focus:border-red-500"
                      />
                      <input
                        type="text"
                        value={deliveryAddress.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        placeholder="State *"
                        className="px-3 py-2 text-sm border rounded-md focus:border-red-500"
                      />
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={deliveryAddress.pincode}
                          onChange={(e) =>
                            handleAddressChange("pincode", e.target.value)
                          }
                          placeholder="Pincode *"
                          maxLength="6"
                          className="w-full px-3 py-2 text-sm border rounded-md focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Info message for scan-only services */}
                {selectedDeliveryCharge && !requiresDeliveryAddress() && (
                  <div className="mt-2 p-2 bg-blue-100 rounded-md border border-blue-200">
                    <p className="text-sm text-blue-800">
                      Your scanned documents will be delivered to your email
                      address.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Payment Summary - UPDATED to use dynamic service charge */}
            {selectedService && (
              <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-md border">
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-1 text-sm">
                  {/* Base Draft/Service Charge with quantity */}
                  <div className="flex justify-between">
                    <span>Service Charge ({quantity || 1}x):</span>
                    <span>
                      ₹{selectedService.price} × {quantity || 1} = ₹
                      {selectedService.price * (parseInt(quantity) || 1)}
                    </span>
                  </div>

                  {/* Notary charge with quantity if selected */}
                  {selectedService.hasNotary && includeNotary && (
                    <div className="flex justify-between">
                      <span>Notary ({quantity || 1}x):</span>
                      <span>
                        ₹{selectedService.notaryCharge} × {quantity || 1} = ₹
                        {selectedService.notaryCharge *
                          (parseInt(quantity) || 1)}
                      </span>
                    </div>
                  )}

                  {/* Stamp duty with quantity if applicable */}
                  {selectedService.requiresStamp && selectedStampDuty && (
                    <div className="flex justify-between">
                      <span>Stamp Duty ({quantity || 1}x):</span>
                      <span>
                        ₹{calculateStampDutyAmount(selectedStampDuty)}
                      </span>
                    </div>
                  )}

                  {/* Delivery charge - NOT multiplied by quantity */}
                  {selectedService.requiresDelivery &&
                    selectedDeliveryCharge && (
                      <div className="flex justify-between">
                        <span>{selectedDeliveryCharge.serviceName}:</span>
                        <span>₹{selectedDeliveryCharge.charge}</span>
                      </div>
                    )}

                  {/* Total */}
                  <div className="border-t pt-1 font-bold text-base">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="text-red-600">
                        ₹{calculateTotalAmount()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Important Notice Checkbox */}
            <div className="bg-white mt-4 rounded-lg overflow-hidden border border-gray-200">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="importantNoticeCheckbox"
                    checked={isImportantNoticeAccepted}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setShowImportantNoticePopup(true);
                      } else {
                        setIsImportantNoticeAccepted(false);
                      }
                    }}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="importantNoticeCheckbox"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowImportantNoticePopup(true)}
                        className="text-red-600 hover:text-red-700 underline font-medium"
                      >
                        Important Notice
                      </button>
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Please read the important notice before proceeding with
                      payment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleSubmit}
                disabled={
                  !canProceedToPayment() ||
                  !isImportantNoticeAccepted ||
                  submitting ||
                  uploading
                }
                className={`px-6 py-3 text-white font-bold rounded-md transition-all flex items-center gap-2 mx-auto ${
                  canProceedToPayment() &&
                  isImportantNoticeAccepted &&
                  !submitting &&
                  !uploading
                    ? "bg-red-600 hover:bg-red-700 shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting || uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {uploading ? "Uploading..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Upload & Pay ₹{calculateTotalAmount()}
                  </>
                )}
              </button>
            </div>

            {/* Help */}
            <div className="text-center bg-blue-50 p-2 rounded-md text-sm text-gray-600">
              <p>
                <strong>Process:</strong> Select document → Enter details →
                Upload files → Choose service → Pay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentUi;
