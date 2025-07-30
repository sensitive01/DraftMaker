import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  FileText,
  MapPin,
  CreditCard,
  Package,
  Building,
  IdCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  X,
  Home,
  Users,
} from "lucide-react";
import {
  getBookingTablePreviewData,
  updateBookingStatus,
} from "../../../../api/service/axiosService";

const DocumentBookingTablePreview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for status update modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

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
        const response = await getBookingTablePreviewData(bookingId);

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
    setNewStatus(booking.doumentStatus || "Pending");
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
      // Assuming you have an update API - adjust the API call as needed
      const response = await updateBookingStatus(booking._id, newStatus);

      if (response.status === 200) {
        setBooking({ ...booking, doumentStatus: newStatus });
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
      (option) => option.value.toLowerCase() === (status || "").toLowerCase()
    );
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toLowerCase()) {
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
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
                  Document Booking Details
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Booking ID: {booking.bookingId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center ${getStatusBadgeColor(
                  booking.doumentStatus
                )}`}
              >
                {getStatusIcon(booking.doumentStatus)}
                {booking.doumentStatus || "Pending"}
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
                    Form ID
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {booking.formId || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Created At
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {booking.createdAt}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {formatDate(booking.date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2" />
                Personal Information
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
                    <Phone size={14} className="mr-2" />
                    {booking.mobileNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Home size={20} className="mr-2" />
                Address Information
              </h2>

              {/* Present Address */}
              {booking.presentAddress && (
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    Present Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.presentAddress.line1}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.presentAddress.line2}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.presentAddress.city}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.presentAddress.state}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pin Code
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.presentAddress.pinCode}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package size={20} className="mr-2" />
                Status Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Status
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusBadgeColor(
                        booking.doumentStatus
                      )}`}
                    >
                      {getStatusIcon(booking.doumentStatus)}
                      {booking.doumentStatus || "Pending"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusBadgeColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {getStatusIcon(booking.paymentStatus)}
                      {booking.paymentStatus || "Pending"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Updated
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {new Date(booking.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {booking.paymentDetails && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Includes Notary
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                      {booking.paymentDetails.includesNotary ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Service Details */}
            {booking.serviceDetails && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package size={20} className="mr-2" />
                  Service Details
                </h2>
                <div className="space-y-3">
                  {booking.serviceDetails.basePrice && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-semibold text-green-600">
                        ₹{booking.serviceDetails.basePrice}
                      </div>
                    </div>
                  )}

                  {booking.serviceDetails.notaryCharge !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notary Charge
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        ₹{booking.serviceDetails.notaryCharge}
                      </div>
                    </div>
                  )}

                  {booking.serviceDetails.stampDutyAmount !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stamp Duty Amount
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-semibold text-green-600">
                        ₹{booking.serviceDetails.stampDutyAmount}
                      </div>
                    </div>
                  )}

                  {booking.serviceDetails.deliveryCharge !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Charge
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        ₹{booking.serviceDetails.deliveryCharge}
                      </div>
                    </div>
                  )}

                  {booking.serviceDetails.requiresStamp !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requires Stamp
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.serviceDetails.requiresStamp ? "Yes" : "No"}
                      </div>
                    </div>
                  )}

                  {booking.serviceDetails.requiresDelivery !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requires Delivery
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.serviceDetails.requiresDelivery ? "Yes" : "No"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stamp Duty Details */}
            {booking.selectedStampDuty && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText size={20} className="mr-2" />
                  Stamp Duty Details
                </h2>
                <div className="space-y-3">
                  {booking.selectedStampDuty.documentType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Document Type
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedStampDuty.documentType}
                      </div>
                    </div>
                  )}

                  {booking.selectedStampDuty.articleNo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Article No.
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedStampDuty.articleNo}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Charge */}
            {booking.selectedDeliveryCharge && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Delivery Details
                </h2>
                <div className="space-y-3">
                  {booking.selectedDeliveryCharge.serviceName && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedDeliveryCharge.serviceName}
                      </div>
                    </div>
                  )}

                  {booking.selectedDeliveryCharge.charge !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Charge
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-semibold text-green-600">
                        ₹{booking.selectedDeliveryCharge.charge}
                      </div>
                    </div>
                  )}

                  {booking.selectedDeliveryCharge.deliveryTime && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Time
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedDeliveryCharge.deliveryTime}
                      </div>
                    </div>
                  )}

                  {booking.selectedDeliveryCharge.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {booking.selectedDeliveryCharge.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
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
                          booking.doumentStatus
                        )}`}
                      >
                        {getStatusIcon(booking.doumentStatus)}
                        {booking.doumentStatus || "Pending"}
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
                      updatingStatus || newStatus === booking.doumentStatus
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
    </div>
  );
};

export default DocumentBookingTablePreview;
