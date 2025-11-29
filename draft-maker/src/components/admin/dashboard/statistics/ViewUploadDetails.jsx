import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  FileText,
  ExternalLink,
  Download,
  MapPin,
  CreditCard,
  Package,
  FileImage,
  File,
  Smartphone,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Edit,
  X,
  Mail,
} from "lucide-react";
import {
  getUploadBookingDetails,
  updateUploadDocumentStatus,
} from "../../../../api/service/axiosService";

const ViewUploadDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for status update modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "In Progress",
      label: "In Progress",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "Completed",
      label: "Completed",
      color: "bg-green-100 text-green-800",
    },
    { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUploadBookingDetails(bookingId);

        if (response.status === 200) {
          setBooking(response.data.data);
        } else {
          setError("Failed to fetch booking details");
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchData();
    }
  }, [bookingId]);

  const handleUpdateStatus = () => {
    setNewStatus(booking.documentStatus);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setNewStatus("");
  };

  const handleStatusSubmit = async () => {
    if (!newStatus) return;

    try {
      setUpdatingStatus(true);
      const response = await updateUploadDocumentStatus(booking._id, newStatus);

      if (response.status === 200) {
        setBooking({ ...booking, documentStatus: newStatus });
        handleCloseStatusModal();
        alert(`Status updated successfully to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const statusOption = statusOptions.find(
      (option) => option.value.toLowerCase() === status.toLowerCase()
    );
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={16} className="mr-2" />;
      case "in progress":
        return <AlertCircle size={16} className="mr-2" />;
      case "completed":
        return <CheckCircle size={16} className="mr-2" />;
      case "rejected":
        return <XCircle size={16} className="mr-2" />;
      default:
        return <Clock size={16} className="mr-2" />;
    }
  };

  const getFileIcon = (url) => {
    if (!url) return <File size={16} />;

    const extension = url.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <File size={16} className="text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <FileImage size={16} className="text-blue-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename || "document";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, "_blank");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center text-red-600 p-4 border border-red-200 rounded-lg">
              {error}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center text-gray-600">
              No booking details found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-red-900 flex items-center">
                  <FileText size={24} className="mr-2" />
                  Booking Details
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Booking ID: {booking.bookingId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center ${getStatusBadgeColor(
                  booking.documentStatus
                )}`}
              >
                {getStatusIcon(booking.documentStatus)}
                {booking.documentStatus}
              </span>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Update Status
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText size={20} className="mr-2" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking ID
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-medium">
                    {booking.bookingId}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {booking.documentType || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form ID
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {booking.formId || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted Date & Time
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {formatDateTime(booking.submittedAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2" />
                User Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Name
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {booking.userName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm flex items-center">
                    <Smartphone size={14} className="mr-2" />
                    {booking.userMobile}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm flex items-center">
                    <Mail size={14} className="mr-2" />
                    {booking.emailAddress || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            {booking.selectedService && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package size={20} className="mr-2" />
                  Service Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      {booking.selectedService.serviceName || "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      {formatCurrency(booking.selectedService.basePrice || 0)}
                    </div>
                  </div>

                  {booking.selectedService.serviceType && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Type
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedService.serviceType}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stamp Duty Information */}
            {booking.stampDuty && Object.keys(booking.stampDuty).length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText size={20} className="mr-2" />
                  Stamp Duty Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {booking.stampDuty.stampDutyId && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stamp Duty ID
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                        {booking.stampDuty.stampDutyId}
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document Type
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      {booking.stampDuty.documentType || "N/A"}
                    </div>
                  </div>

                  {booking.stampDuty.amount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stamp Duty Amount
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-semibold text-green-600">
                        {formatCurrency(booking.stampDuty.amount)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Information */}
            {booking.delivery && Object.keys(booking.delivery).length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {booking.delivery.deliveryServiceId && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Service ID
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                        {booking.delivery.deliveryServiceId}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      {booking.delivery.serviceName || "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Charge
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-semibold text-green-600">
                      {formatCurrency(booking.delivery.charge || 0)}
                    </div>
                  </div>

                  {booking.delivery.description && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.delivery.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Information */}
            {booking.payment && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order ID
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                      {booking.payment.orderId || "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment ID
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                      {booking.payment.paymentId || "N/A"}
                    </div>
                  </div>

                  {booking.payment.ccavenueResponse?.trackingId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tracking ID
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                        {booking.payment.ccavenueResponse.trackingId}
                      </div>
                    </div>
                  )}

                  {booking.payment.ccavenueResponse?.bankRefNo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Reference No
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-mono text-xs">
                        {booking.payment.ccavenueResponse.bankRefNo}
                      </div>
                    </div>
                  )}

                  {booking.payment.ccavenueResponse?.paymentMode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Mode
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.payment.ccavenueResponse.paymentMode}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${booking.payment.paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : booking.payment.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {booking.payment.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-lg font-bold text-green-600">
                      {formatCurrency(booking.payment.totalAmount || 0)}
                    </div>
                  </div>

                  {booking.payment.paymentDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Date
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {formatDateTime(booking.payment.paymentDate)}
                      </div>
                    </div>
                  )}

                  {booking.payment.ccavenueResponse?.transDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction Date
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.payment.ccavenueResponse.transDate}
                      </div>
                    </div>
                  )}

                  {booking.payment.ccavenueResponse?.statusMessage && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status Message
                      </label>
                      <div className="bg-green-50 p-3 rounded border border-green-200 text-sm text-green-800">
                        {booking.payment.ccavenueResponse.statusMessage}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText size={20} className="mr-2" />
                Documents ({booking.totalDocuments})
              </h2>

              <div className="space-y-4">
                {booking.documents && booking.documents.length > 0 ? (
                  booking.documents.map((doc, index) => {
                    const fileName = doc.fileName || `Document_${index + 1}_${booking.bookingId}`;
                    const fileExtension = doc.fileType?.split('/').pop() || doc.url.split(".").pop().toLowerCase();

                    return (
                      <div
                        key={doc._id || index}
                        className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center flex-1 min-w-0">
                            {getFileIcon(doc.url)}
                            <div className="ml-2 min-w-0">
                              <span className="text-sm font-medium text-gray-700 block truncate">
                                {fileName}
                              </span>
                              {doc.fileSize && (
                                <span className="text-xs text-gray-500">
                                  {(doc.fileSize / 1024).toFixed(2)} KB
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                              title="View Document"
                            >
                              <ExternalLink size={16} />
                            </a>
                            <button
                              onClick={() =>
                                handleDownload(doc.url, fileName)
                              }
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                              title="Download Document"
                            >
                              <Download size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Document Preview */}
                        {
                          fileExtension === "pdf" || doc.fileType === "application/pdf" ? (
                            <div className="flex items-center justify-center h-20 bg-red-50 rounded border-2 border-dashed border-red-200">
                              <div className="text-center">
                                <File
                                  size={24}
                                  className="text-red-500 mx-auto mb-1"
                                />
                                <span className="text-xs text-red-600">
                                  PDF Document
                                </span>
                              </div>
                            </div>
                          ) : ["jpg", "jpeg", "png", "gif", "webp"].includes(
                            fileExtension
                          ) ? (
                            <div className="relative">
                              <img
                                src={doc.url}
                                alt={fileName}
                                className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(doc.url, "_blank")}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                              <div className="hidden items-center justify-center h-20 bg-gray-100 rounded border-2 border-dashed border-gray-300">
                                <div className="text-center">
                                  <FileImage
                                    size={24}
                                    className="text-gray-400 mx-auto mb-1"
                                  />
                                  <span className="text-xs text-gray-500">
                                    Image not available
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-20 bg-gray-100 rounded border-2 border-dashed border-gray-200">
                              <div className="text-center">
                                <File
                                  size={24}
                                  className="text-gray-400 mx-auto mb-1"
                                />
                                <span className="text-xs text-gray-500">
                                  Document File
                                </span>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No documents uploaded
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Update Modal */}
        {isStatusModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-red-900 flex items-center">
                    <Edit size={20} className="mr-2" />
                    Update Status
                  </h3>
                  <button
                    onClick={handleCloseStatusModal}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking ID
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-medium">
                      {booking.bookingId}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Status
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusBadgeColor(
                          booking.documentStatus
                        )}`}
                      >
                        {getStatusIcon(booking.documentStatus)}
                        {booking.documentStatus}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end space-y-reverse space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleCloseStatusModal}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    disabled={updatingStatus}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusSubmit}
                    disabled={
                      updatingStatus || newStatus === booking.documentStatus
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {updatingStatus ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default ViewUploadDetails;