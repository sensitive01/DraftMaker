import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  FileText,
  MapPin,
  CreditCard,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  X,
  Truck,
  Receipt,
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
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      value: "In Progress",
      label: "In Progress",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      value: "Completed",
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      value: "Rejected",
      label: "Rejected",
      color: "bg-red-100 text-red-800 border-red-200",
    },
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
    return statusOption
      ? statusOption.color
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return <Clock size={14} className="mr-1.5" />;
      case "in progress":
        return <AlertCircle size={14} className="mr-1.5" />;
      case "completed":
        return <CheckCircle size={14} className="mr-1.5" />;
      case "rejected":
        return <XCircle size={14} className="mr-1.5" />;
      default:
        return <Clock size={14} className="mr-1.5" />;
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center text-red-600 p-6 border border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center text-gray-600 text-lg">
              No booking details found
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to check if data exists and is not empty
  const hasData = (data) => {
    if (!data) return false;
    if (typeof data === "object") {
      return Object.keys(data).length > 0;
    }
    return data !== null && data !== undefined && data !== "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Side - Title and Booking Info */}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 mt-1"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center mb-2">
                    <FileText
                      size={28}
                      className="mr-3 text-red-600 flex-shrink-0"
                    />
                    Document Booking
                  </h1>
                  {booking.bookingId && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm font-medium">Booking ID:</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {booking.bookingId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Status and Action */}
              {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {booking.doumentStatus && (
                  <div className="flex items-center">
                    <span
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center border ${getStatusBadgeColor(
                        booking.doumentStatus
                      )}`}
                    >
                      {getStatusIcon(booking.doumentStatus)}
                      {booking.doumentStatus}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleUpdateStatus}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Edit size={16} />
                  Update Status
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Main Information */}
          <div className="xl:col-span-8 space-y-8">
            {/* Customer Information Card */}
            {(booking.userName || booking.mobileNumber) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User size={20} className="mr-3 text-red-600" />
                    Customer Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {booking.userName && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Customer Name
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium">
                          {booking.userName}
                        </div>
                      </div>
                    )}

                    {booking.mobileNumber && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Mobile Number
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium flex items-center">
                          <Phone size={16} className="mr-2 text-gray-500" />
                          {booking.mobileNumber}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Address Card */}
            {hasData(booking.deliveryAddress) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin size={20} className="mr-3 text-red-600" />
                    Delivery Address
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {booking.deliveryAddress.addressLine1 && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 1
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                          {booking.deliveryAddress.addressLine1}
                        </div>
                      </div>
                    )}

                    {booking.deliveryAddress.addressLine2 && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Address Line 2
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                          {booking.deliveryAddress.addressLine2}
                        </div>
                      </div>
                    )}

                    {booking.deliveryAddress.city && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          City
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                          {booking.deliveryAddress.city}
                        </div>
                      </div>
                    )}

                    {booking.deliveryAddress.state && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          State
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                          {booking.deliveryAddress.state}
                        </div>
                      </div>
                    )}

                    {booking.deliveryAddress.pincode && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Pin Code
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-mono">
                          {booking.deliveryAddress.pincode}
                        </div>
                      </div>
                    )}

                    {booking.deliveryAddress.email && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Email Address
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-mono">
                          {booking.deliveryAddress.email}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status & Financial Information */}
          <div className="xl:col-span-4 space-y-6">
            {/* Status Overview Card */}
            {(booking.doumentStatus || booking.paymentStatus) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package size={20} className="mr-2 text-red-600" />
                    Status Overview
                  </h2>
                </div>
                <div className="p-4">
                  {booking.doumentStatus && (
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Document Status
                      </label>
                      <div className="flex">
                        <span
                          className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center border ${getStatusBadgeColor(
                            booking.doumentStatus
                          )}`}
                        >
                          {getStatusIcon(booking.doumentStatus)}
                          {booking.doumentStatus}
                        </span>
                      </div>
                    </div>
                  )}

                  {booking.paymentStatus && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Status
                      </label>
                      <div className="flex">
                        <span
                          className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center border ${getStatusBadgeColor(
                            booking.paymentStatus
                          )}`}
                        >
                          {getStatusIcon(booking.paymentStatus)}
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment Details Card */}
            {hasData(booking.paymentDetails) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CreditCard size={20} className="mr-2 text-red-600" />
                    Payment Details
                  </h2>
                </div>
                <div className="p-4">
                  {booking.paymentDetails.paidAmount !== undefined && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-800">
                          Total Paid
                        </span>
                        <span className="text-xl font-bold text-green-900">
                          ₹{booking.paymentDetails.paidAmount}
                        </span>
                      </div>
                    </div>
                  )}

                  {booking.paymentDetails.serviceName && (
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Service Package
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm">
                        {booking.paymentDetails.serviceName}
                      </div>
                    </div>
                  )}

                  {booking.paymentDetails.paymentId && (
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Payment ID
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-mono text-xs">
                        {booking.paymentDetails.paymentId}
                      </div>
                    </div>
                  )}

                  {booking.paymentDetails.includesNotary !== undefined && (
                    <div className="flex items-center justify-between py-2 border-t border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">
                        Notary Service
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.paymentDetails.includesNotary
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.paymentDetails.includesNotary
                          ? "Included"
                          : "Not Included"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Service Details Card */}
            {hasData(booking.serviceDetails) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Receipt size={20} className="mr-2 text-red-600" />
                    Service Breakdown
                  </h2>
                </div>
                <div className="p-4">
                  {booking.serviceDetails.basePrice !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Base Price
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.basePrice}
                      </span>
                    </div>
                  )}

                  {booking.serviceDetails.stampDutyAmount !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Stamp Duty
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.stampDutyAmount}
                      </span>
                    </div>
                  )}

                  {booking.serviceDetails.deliveryCharge !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Delivery
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.deliveryCharge}
                      </span>
                    </div>
                  )}

                  {booking.serviceDetails.notaryCharge !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Notary
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.notaryCharge}
                      </span>
                    </div>
                  )}
                  {booking.serviceDetails.notaryCharge !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Quantity
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        No.{booking.serviceDetails.quantity}
                      </span>
                    </div>
                  )}
                  {booking.serviceDetails.notaryCharge !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Service Charge
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.serviceCharge}
                      </span>
                    </div>
                  )}
                  {booking.serviceDetails.notaryCharge !== undefined && (
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        Consideration Amount
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.serviceDetails.considerationAmount}
                      </span>
                    </div>
                  )}


                  {(booking.serviceDetails.requiresStamp !== undefined ||
                    booking.serviceDetails.requiresDelivery !== undefined) && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      {booking.serviceDetails.requiresStamp !== undefined && (
                        <div className="flex items-center justify-between py-1">
                          <span className="text-sm font-medium text-gray-700">
                            Stamp Required
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.serviceDetails.requiresStamp
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {booking.serviceDetails.requiresStamp
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      )}

                      {booking.serviceDetails.requiresDelivery !==
                        undefined && (
                        <div className="flex items-center justify-between py-1">
                          <span className="text-sm font-medium text-gray-700">
                            Delivery Required
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.serviceDetails.requiresDelivery
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {booking.serviceDetails.requiresDelivery
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Service Details Card */}
            {hasData(booking.selectedDeliveryCharge) && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Truck size={20} className="mr-2 text-red-600" />
                    Delivery Service
                  </h2>
                </div>
                <div className="p-4">
                  {booking.selectedDeliveryCharge.serviceName && (
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Service Type
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-medium text-sm">
                        {booking.selectedDeliveryCharge.serviceName}
                      </div>
                    </div>
                  )}

                  {booking.selectedDeliveryCharge.description && (
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-xs">
                        {booking.selectedDeliveryCharge.description}
                      </div>
                    </div>
                  )}

                  {booking.selectedDeliveryCharge.charge !== undefined && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-blue-800">
                          Delivery Charge
                        </span>
                        <span className="text-lg font-bold text-blue-900">
                          ₹{booking.selectedDeliveryCharge.charge}
                        </span>
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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Edit size={22} className="mr-3 text-red-600" />
                    Update Status
                  </h3>
                  <button
                    onClick={handleCloseStatusModal}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {booking.bookingId && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Booking ID
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-mono">
                        {booking.bookingId}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Current Status
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center w-fit border ${getStatusBadgeColor(
                          booking.doumentStatus
                        )}`}
                      >
                        {getStatusIcon(booking.doumentStatus)}
                        {booking.doumentStatus || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    onClick={handleCloseStatusModal}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    disabled={updatingStatus}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusSubmit}
                    disabled={
                      updatingStatus || newStatus === booking.doumentStatus
                    }
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
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
