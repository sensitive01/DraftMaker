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
import React from "react";
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
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        {success && (
          <SuccessNotification
            successMessage={successMessage}
            setSuccess={setSuccess}
          />
        )}

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-600 overflow-hidden">
          {/* Header */}
          <div className="bg-red-50 p-6 border-b border-red-100">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Upload className="h-8 w-8 mr-3 text-red-600" />
              Document Upload & Payment
            </h1>
            <p className="text-gray-600 mt-2">
              Select document type, upload files, and choose service package
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Step 1: Document Type Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileCheck className="w-6 h-6 mr-2 text-red-600" />
                Step 1: Select Document Type
              </h2>
              <div>
                <select
                  value={selectedDocumentType?._id || ""}
                  onChange={handleDocumentTypeChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-lg"
                >
                  <option value="">-- Select Document Type --</option>
                  {documentTypes?.map((docType) => (
                    <option key={docType._id} value={docType._id}>
                      {docType.documentType} - ₹{docType.draftCharge}
                    </option>
                  ))}
                </select>
                {errors.documentType && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.documentType}
                  </p>
                )}
              </div>

              {/* Show selected document info and stamp duty details */}
              {selectedDocumentType && selectedStampDuty && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    Document Selected: {selectedDocumentType.documentType}
                  </h4>
                  <div className="text-sm text-green-700">
                    <p>
                      <strong>Form ID:</strong> {selectedDocumentType.formId}
                    </p>
                    <p>
                      <strong>Draft Charge:</strong> ₹
                      {selectedDocumentType.draftCharge}
                    </p>
                    <p>
                      <strong>Stamp Duty Type:</strong>{" "}
                      {selectedStampDuty.documentType}
                    </p>
                    <p>
                      <strong>Calculation Method:</strong>{" "}
                      {selectedStampDuty.calculationType === "fixed"
                        ? `Fixed ₹${selectedStampDuty.fixedAmount}`
                        : `${selectedStampDuty.percentage}% of consideration amount`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 1.5: Stamp Duty Details (Show immediately after document selection) */}
            {selectedDocumentType && selectedStampDuty && (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Stamp Duty Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quantity Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Number of documents needed
                    </p>
                  </div>

                  {/* Consideration Amount (only show for percentage-based stamps) */}
                  {selectedStampDuty.calculationType === "percentage" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Consideration Amount (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={considerationAmount || ""}
                        onChange={(e) =>
                          setConsiderationAmount(e.target.value || "")
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                        placeholder="Enter property/document value"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the total value/amount mentioned in your document
                      </p>
                    </div>
                  )}
                </div>

                {/* Stamp Duty Calculation Preview */}
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Stamp Duty Calculation Preview
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Document Type:</span>{" "}
                      {selectedStampDuty.documentType}
                    </p>
                    <p>
                      <span className="text-gray-600">Article No:</span>{" "}
                      {selectedStampDuty.articleNo}
                    </p>
                    <p>
                      <span className="text-gray-600">Calculation:</span>{" "}
                      {selectedStampDuty.calculationType === "fixed"
                        ? `Fixed ₹${selectedStampDuty.fixedAmount} × ${quantity}`
                        : `${selectedStampDuty.percentage}% of ₹${
                            considerationAmount || "0"
                          } × ${quantity}`}
                    </p>
                    <div className="pt-2 border-t border-gray-200 mt-3">
                      <p className="font-bold text-blue-600 text-lg">
                        Stamp Duty Amount: ₹
                        {calculateStampDutyAmount(selectedStampDuty)}
                      </p>
                      <p className="text-xs text-gray-500">
                        (Service charge will be added during payment)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: User Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="w-6 h-6 mr-2 text-red-600" />
                Step 2: Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  />
                  {errors.userName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: File Upload */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-red-600" />
                Step 3: Upload Documents
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload documents
                  </p>
                  <p className="text-sm text-gray-500">
                    Support: JPG, PNG, GIF, WebP, PDF (Max 10MB each)
                  </p>
                </label>
              </div>
              {errors.files && (
                <p className="text-red-600 text-sm">{errors.files}</p>
              )}

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  {files?.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {getFileIcon(fileObj)}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {fileObj.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {fileObj.error && (
                            <p className="text-sm text-red-600">
                              {fileObj.error}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFile(fileObj.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 4: Service Package Selection */}
            {selectedDocumentType && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FileCheck className="w-6 h-6 mr-2 text-red-600" />
                  Step 4: Choose Service Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getServiceOptions().map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`bg-white border-2 ${
                        selectedService?.id === service.id
                          ? "border-red-500 ring-4 ring-red-100 shadow-lg"
                          : "border-gray-200 hover:border-red-300 hover:shadow-md"
                      } rounded-xl p-6 flex flex-col text-left transition-all duration-200 group relative`}
                    >
                      {selectedService?.id === service.id && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}

                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-3 bg-red-50 rounded-xl text-red-500 group-hover:bg-red-100 transition-colors">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {service.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Draft charge:</span>
                          <span className="font-bold text-red-600 text-lg">
                            ₹{service.price}
                          </span>
                        </div>
                        {service.hasNotary && service.notaryCharge > 0 && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">+ Notary:</span>
                            <span className="font-medium text-gray-800">
                              ₹{service.notaryCharge}
                            </span>
                          </div>
                        )}
                        {service.requiresStamp && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">+ e-Stamp:</span>
                            <span className="font-medium text-gray-800">
                              {selectedStampDuty
                                ? `₹${calculateStampDutyAmount(
                                    selectedStampDuty
                                  )}`
                                : "Calculated above"}
                            </span>
                          </div>
                        )}
                        {service.requiresDelivery && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">+ Delivery:</span>
                            <span className="font-medium text-gray-800">
                              Select below
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-600 text-sm">{errors.service}</p>
                )}
              </div>
            )}

            {/* Delivery Options */}
            {selectedService?.requiresDelivery && (
              <div className="p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Select Delivery Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Delivery Option
                    </label>
                    <select
                      value={selectedDeliveryCharge?._id || ""}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const deliveryCharge = deliveryChargeOptions.find(
                          (dc) => dc._id === selectedId
                        );
                        setSelectedDeliveryCharge(deliveryCharge || null);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    >
                      <option value="">-- Select Delivery Service --</option>
                      {deliveryChargeOptions.map((deliveryCharge) => (
                        <option
                          key={deliveryCharge._id}
                          value={deliveryCharge._id}
                        >
                          {deliveryCharge.serviceName} - ₹
                          {deliveryCharge.charge}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDeliveryCharge && (
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Selected Delivery Service
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-600">Service:</span>{" "}
                          {selectedDeliveryCharge.serviceName}
                        </p>
                        <p>
                          <span className="text-gray-600">Description:</span>{" "}
                          {selectedDeliveryCharge.description}
                        </p>
                        <p className="font-bold text-red-600 text-lg">
                          Charge: ₹{selectedDeliveryCharge.charge}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Address */}
                {selectedDeliveryCharge && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-800 mb-4">
                      Delivery Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.addressLine1}
                          onChange={(e) =>
                            handleAddressChange("addressLine1", e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          placeholder="Enter address line 1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.addressLine2}
                          onChange={(e) =>
                            handleAddressChange("addressLine2", e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          placeholder="Enter address line 2 (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.city}
                          onChange={(e) =>
                            handleAddressChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.state}
                          onChange={(e) =>
                            handleAddressChange("state", e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          placeholder="Enter state"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.pincode}
                          onChange={(e) =>
                            handleAddressChange("pincode", e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          maxLength="6"
                          placeholder="Enter 6-digit pincode"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Summary */}
            {selectedService && (
              <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Base Service:</span>
                    <span className="font-semibold">
                      ₹{selectedService.price}
                    </span>
                  </div>
                  {selectedService.hasNotary && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Notary Charges:</span>
                      <span className="font-semibold">
                        ₹{selectedService.notaryCharge}
                      </span>
                    </div>
                  )}
                  {selectedService.requiresStamp && selectedStampDuty && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Stamp Duty:</span>
                        <span className="font-semibold">
                          ₹{calculateStampDutyAmount(selectedStampDuty)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Service Charge:</span>
                        <span className="font-semibold">
                          ₹{SERVICE_CHARGE_PER_DOCUMENT * (quantity || 1)}
                        </span>
                      </div>
                    </>
                  )}
                  {selectedService.requiresDelivery &&
                    selectedDeliveryCharge && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Delivery Charges:</span>
                        <span className="font-semibold">
                          ₹{selectedDeliveryCharge.charge}
                        </span>
                      </div>
                    )}
                  <div className="border-t border-red-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">
                        Total Amount:
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        ₹{calculateTotalAmount()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={!canProceedToPayment() || submitting || uploading}
                className={`px-8 py-4 text-white font-bold text-lg rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  canProceedToPayment() && !submitting && !uploading
                    ? "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting || uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {uploading ? "Uploading Files..." : "Processing Payment..."}
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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

            {/* Help Text */}
            <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
              <p className="mb-2">
                <strong>How it works:</strong>
              </p>
              <p>
                1. Select document type → 2. Enter stamp duty details → 3. Fill
                your details → 4. Upload files → 5. Choose service package → 6.
                Complete payment → 7. We'll process your documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentUi;
