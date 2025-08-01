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
  SERVICE_CHARGE_PER_DOCUMENT,
  calculateTotalAmount,
  canProceedToPayment,
  submitting,
  uploading,
  handleSubmit,
  emailAddress,
  setEmailAddress,
  isValidEmail,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeliveryDropdownOpen, setIsDeliveryDropdownOpen] = useState(false);

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

  return (
    <div
      className="min-h-screen bg-gray-50"
      onClick={() => {
        setIsDropdownOpen(false);
        setIsDeliveryDropdownOpen(false);
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        {success && (
          <SuccessNotification
            successMessage={successMessage}
            setSuccess={setSuccess}
          />
        )}

        {/* Main Card */}
        <div
          className="bg-white rounded-lg shadow-md border-t-4 border-red-500"
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

          <div className="p-4 space-y-5">
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
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200 bg-white text-left flex justify-between items-center"
                >
                  <span
                    className={
                      selectedDocumentType ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {selectedDocumentType
                      ? `${selectedDocumentType.documentType} - ₹${selectedDocumentType.draftCharge}`
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
                        {docType.documentType} - ₹{docType.draftCharge}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.documentType && (
                <p className="text-red-500 text-xs">{errors.documentType}</p>
              )}

              {/* Document Info */}
              {selectedDocumentType && selectedStampDuty && (
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <p>
                      <strong>Document:</strong>{" "}
                      {selectedDocumentType.documentType}
                    </p>
                    <p>
                      <strong>Form ID:</strong> {selectedDocumentType.formId}
                    </p>
                    <p>
                      <strong>Draft Charge:</strong> ₹
                      {selectedDocumentType.draftCharge}
                    </p>
                    <p>
                      <strong>Stamp Type:</strong>{" "}
                      {selectedStampDuty.documentType}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stamp Duty Details */}
            {selectedDocumentType && selectedStampDuty && (
              <div className="p-3 bg-blue-50 rounded-md border">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Stamp Duty Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                    />
                  </div>
                  {selectedStampDuty.calculationType === "percentage" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Consideration Amount (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={considerationAmount || ""}
                        onChange={(e) => setConsiderationAmount(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                        placeholder="Enter document value"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 p-2 bg-white rounded border">
                  <p className="text-xs text-gray-600">
                    Calculation:{" "}
                    {selectedStampDuty.calculationType === "fixed"
                      ? `₹${selectedStampDuty.fixedAmount} × ${quantity}`
                      : `${selectedStampDuty.percentage}% of ₹${
                          considerationAmount || "0"
                        } × ${quantity}`}
                  </p>
                  <p className="font-bold text-blue-600 text-sm">
                    Stamp Duty: ₹{calculateStampDutyAmount(selectedStampDuty)}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: User Info */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-gray-800 flex items-center">
                <User className="w-4 h-4 mr-2 text-red-500" />
                Step 2: Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit number"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400">
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
                  <p className="text-xs text-gray-500">
                    JPG, PNG, PDF (Max 10MB)
                  </p>
                </label>
              </div>
              {errors.files && (
                <p className="text-red-500 text-xs">{errors.files}</p>
              )}

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-1">
                  {files?.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="flex items-center justify-between p-2 border rounded bg-gray-50"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getFileIcon(fileObj)}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {fileObj.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <X className="w-3 h-3" />
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getServiceOptions().map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`border-2 ${
                        selectedService?.id === service.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      } rounded-lg p-3 text-left transition-all relative`}
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
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
                              Email Required
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {service.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Base:</span>
                          <span className="font-bold text-red-600">
                            ₹{service.price}
                          </span>
                        </div>
                        {service.hasNotary && service.notaryCharge > 0 && (
                          <div className="flex justify-between text-xs">
                            <span>Notary:</span>
                            <span>₹{service.notaryCharge}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-500 text-xs">{errors.service}</p>
                )}
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Enter your email address to receive the document
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className={`w-full px-2 py-1.5 text-sm border-2 ${
                      emailAddress && !isValidEmail(emailAddress)
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    } rounded focus:ring-1 transition-all`}
                    placeholder="your.email@example.com"
                    required
                  />
                  {emailAddress && !isValidEmail(emailAddress) && (
                    <p className="text-red-600 text-xs mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                  {emailAddress && isValidEmail(emailAddress) && (
                    <p className="text-green-600 text-xs mt-1 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
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
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Options */}
            {selectedService?.requiresDelivery && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="text-base font-semibold mb-2">
                  Delivery Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Custom Delivery Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsDeliveryDropdownOpen(!isDeliveryDropdownOpen)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 bg-white text-left flex justify-between items-center"
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
                          : "Select Delivery"}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isDeliveryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDeliveryDropdownOpen && (
                      <div className="absolute z-40 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-32 overflow-y-auto">
                        <div
                          className="px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedDeliveryCharge(null);
                            setIsDeliveryDropdownOpen(false);
                          }}
                        >
                          Select Delivery
                        </div>
                        {deliveryChargeOptions.map((dc) => (
                          <div
                            key={dc._id}
                            className="px-2 py-1.5 text-sm text-gray-900 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleDeliverySelect(dc._id)}
                          >
                            {dc.serviceName} - ₹{dc.charge}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedDeliveryCharge && (
                    <div className="text-xs bg-white p-2 rounded border">
                      <p>
                        <strong>{selectedDeliveryCharge.serviceName}</strong>
                      </p>
                      <p className="text-red-600 font-bold">
                        ₹{selectedDeliveryCharge.charge}
                      </p>
                    </div>
                  )}
                </div>

                {/* Address */}
                {selectedDeliveryCharge && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Delivery Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={deliveryAddress.addressLine1}
                          onChange={(e) =>
                            handleAddressChange("addressLine1", e.target.value)
                          }
                          placeholder="Address Line 1"
                          className="w-full px-2 py-1.5 text-sm border rounded focus:border-red-500"
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
                          className="w-full px-2 py-1.5 text-sm border rounded focus:border-red-500"
                        />
                      </div>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        placeholder="City"
                        className="px-2 py-1.5 text-sm border rounded focus:border-red-500"
                      />
                      <input
                        type="text"
                        value={deliveryAddress.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        placeholder="State"
                        className="px-2 py-1.5 text-sm border rounded focus:border-red-500"
                      />
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={deliveryAddress.pincode}
                          onChange={(e) =>
                            handleAddressChange("pincode", e.target.value)
                          }
                          placeholder="Pincode"
                          maxLength="6"
                          className="w-full px-2 py-1.5 text-sm border rounded focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Summary */}
            {selectedService && (
              <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border">
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base Service:</span>
                    <span>₹{selectedService.price}</span>
                  </div>
                  {selectedService.hasNotary && (
                    <div className="flex justify-between">
                      <span>Notary:</span>
                      <span>₹{selectedService.notaryCharge}</span>
                    </div>
                  )}
                  {selectedService.requiresStamp && selectedStampDuty && (
                    <>
                      <div className="flex justify-between">
                        <span>Stamp Duty:</span>
                        <span>
                          ₹{calculateStampDutyAmount(selectedStampDuty)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Charge:</span>
                        <span>
                          ₹{SERVICE_CHARGE_PER_DOCUMENT * (quantity || 1)}
                        </span>
                      </div>
                    </>
                  )}
                  {selectedService.requiresDelivery &&
                    selectedDeliveryCharge && (
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span>₹{selectedDeliveryCharge.charge}</span>
                      </div>
                    )}
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

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleSubmit}
                disabled={!canProceedToPayment() || submitting || uploading}
                className={`px-6 py-2.5 text-white font-bold rounded-lg transition-all flex items-center gap-2 mx-auto ${
                  canProceedToPayment() && !submitting && !uploading
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
            <div className="text-center bg-blue-50 p-2 rounded text-xs text-gray-600">
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
