import React, { useEffect, useState } from "react";
import { Eye, X, Search, Filter, Calendar, Edit } from "lucide-react";
import {
  getBookedEstampData,
  updateEstampBookingStatus,
} from "../../../../api/service/axiosService";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const EstampBookingTable = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all");
  const [filterDeliveryType, setFilterDeliveryType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for status update modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusUpdateBooking, setStatusUpdateBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Utility function to safely display values
  const safeDisplay = (value, fallback = "N/A") => {
    return value && value.toString().trim() !== "" ? value : fallback;
  };

  // Utility function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBookedEstampData();

        if (response.data && response.data.data) {
          const formattedBookings = response.data.data.map((booking) => ({
            _id: booking._id,
            id: safeDisplay(booking.bookingId),
            firstPartyName: safeDisplay(booking.firstPartyName),
            secondPartyName: safeDisplay(booking.secondPartyName),
            documentType: safeDisplay(booking.documentType),
            deliveryServiceName: safeDisplay(booking.deliveryServiceName),
            requestorName: safeDisplay(booking.requestorName),
            mobileNumber: safeDisplay(booking.mobileNumber),
            totalAmount: booking.totalAmount || 0,
            orderDate: formatDate(booking.orderDate),
            status: safeDisplay(booking.documentStatus, "Pending"),
            paymentStatus: safeDisplay(booking.paymentStatus, "Pending"),
            paymentId: safeDisplay(booking.razorpayPaymentId),
            deliveryType: safeDisplay(booking.deliveryType),
            // Additional fields preserved for functionality
            selectedDocumentId: booking.selectedDocumentId || "",
            documentCalculationType: booking.documentCalculationType || "",
            documentFixedAmount: booking.documentFixedAmount || 0,
            documentPercentage: booking.documentPercentage || 0,
            documentMinAmount: booking.documentMinAmount || 0,
            documentMaxAmount: booking.documentMaxAmount || 0,
            stampDutyAmount: booking.stampDutyAmount || 0,
            selectedDeliveryServiceId: booking.selectedDeliveryServiceId || "",
            deliveryCharge: booking.deliveryCharge || 0,
            deliveryDescription: booking.deliveryDescription || "",
            paymentMethod: booking.paymentMethod || "",
            currency: booking.currency || "",
            razorpayOrderId: booking.razorpayOrderId || "",
            razorpaySignature: booking.razorpaySignature || "",
            paymentCompletedAt: booking.paymentCompletedAt
              ? new Date(booking.paymentCompletedAt).toLocaleString()
              : "",
            considerationAmount: booking.considerationAmount || 0,
            stampDutyPayer: booking.stampDutyPayer || "",
            description: booking.description || "",
            createdAt: booking.createdAt
              ? new Date(booking.createdAt).toLocaleString()
              : "",
            updatedAt: booking.updatedAt
              ? new Date(booking.updatedAt).toLocaleString()
              : "",
          }));

          setBookings(formattedBookings);
          setFilteredBookings(formattedBookings);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching e-stamp booking data:", err);
        setError("Failed to load e-stamp booking data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = bookings;

    if (filterStatus !== "all") {
      result = result.filter(
        (booking) =>
          (booking.status || "").toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (filterPaymentStatus !== "all") {
      result = result.filter(
        (booking) =>
          (booking.paymentStatus || "").toLowerCase() ===
          filterPaymentStatus.toLowerCase()
      );
    }

    if (filterDeliveryType !== "all") {
      result = result.filter(
        (booking) =>
          (booking.deliveryType || "").toLowerCase() ===
          filterDeliveryType.toLowerCase()
      );
    }

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          (booking.firstPartyName || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.secondPartyName || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.requestorName || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.mobileNumber || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.documentType || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.paymentId || "").toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  }, [
    searchTerm,
    filterStatus,
    filterPaymentStatus,
    filterDeliveryType,
    bookings,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (booking) => {
    navigate(`/admin/estamp-booking-details/${booking._id}`);
  };

  const handleOpenStatusModal = (booking) => {
    setStatusUpdateBooking(booking);
    setNewStatus(booking.status || "");
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setStatusUpdateBooking(null);
    setNewStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!statusUpdateBooking || !newStatus) return;

    try {
      setStatusUpdateLoading(true);

      await updateEstampBookingStatus(statusUpdateBooking._id, newStatus);

      const updatedBookings = bookings.map((booking) => {
        if (booking._id === statusUpdateBooking._id) {
          return { ...booking, status: newStatus };
        }
        return booking;
      });

      setBookings(updatedBookings);
      setStatusUpdateLoading(false);
      handleCloseStatusModal();

      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusUpdateLoading(false);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterPaymentStatus("all");
    setFilterDeliveryType("all");
  };

  const getStatusBadgeColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "processed":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <div className="text-center text-red-600 p-4 border border-red-200 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h2 className="text-2xl font-bold text-red-900">
          E-Stamp Booking Details
        </h2>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search bookings..."
              className="px-4 py-2 pr-10 w-full border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              {searchTerm ? (
                <button
                  onClick={clearSearch}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              ) : (
                <Search size={18} />
              )}
            </span>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Processed">Processed</option>
              <option value="Approved">Approved</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterDeliveryType}
              onChange={(e) => setFilterDeliveryType(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
            >
              <option value="all">All Delivery Types</option>
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center justify-center whitespace-nowrap"
            >
              <X size={16} className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
        <Filter size={16} />
        <span>
          Showing{" "}
          <span className="font-semibold text-red-600">
            {filteredBookings.length}
          </span>{" "}
          of <span className="font-semibold">{bookings.length}</span> e-stamp
          bookings
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-red-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1400px] w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "60px" }}
                >
                  S.No.
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "180px" }}
                >
                  Booking ID & Date
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "300px" }}
                >
                  Party Details
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "200px" }}
                >
                  Document & Service Type
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "120px" }}
                >
                  Document Status
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "120px" }}
                >
                  Payment Status
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "150px" }}
                >
                  Payment ID
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "100px" }}
                >
                  Total Amount
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "180px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {currentItems.length > 0 ? (
                currentItems.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    {/* Serial Number */}
                    <td className="p-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>

                    {/* Booking ID & Date */}
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-red-900 break-all">
                          {safeDisplay(booking.id)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1 flex-shrink-0" />
                          <span>{booking.orderDate}</span>
                        </div>
                      </div>
                    </td>

                    {/* Party Details - Much Wider Column */}
                    <td className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 mr-2 w-14 flex-shrink-0">
                            First:
                          </span>
                          <span
                            className="text-sm font-medium text-gray-900"
                            title={booking.firstPartyName}
                          >
                            {safeDisplay(booking.firstPartyName)}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 mr-2 w-14 flex-shrink-0">
                            Second:
                          </span>
                          <span
                            className="text-sm text-gray-600"
                            title={booking.secondPartyName}
                          >
                            {safeDisplay(booking.secondPartyName)}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 mr-2 w-14 flex-shrink-0">
                            Mobile:
                          </span>
                          <span className="text-sm text-gray-600">
                            {safeDisplay(booking.mobileNumber)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Document & Service Type */}
                    <td className="p-3">
                      <div className="space-y-1">
                        <div
                          className="text-sm font-medium text-gray-900"
                          title={booking.documentType}
                        >
                          {safeDisplay(booking.documentType)}
                        </div>
                        <div
                          className="text-xs text-gray-500"
                          title={booking.deliveryServiceName}
                        >
                          Service: {safeDisplay(booking.deliveryServiceName)}
                        </div>
                        <div
                          className="text-xs text-gray-500"
                          title={booking.deliveryType}
                        >
                          Type: {safeDisplay(booking.deliveryType)}
                        </div>
                      </div>
                    </td>

                    {/* Document Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {safeDisplay(booking.status)}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {safeDisplay(booking.paymentStatus)}
                      </span>
                    </td>

                    {/* Payment ID */}
                    <td className="p-2">
                      <div
                        className="text-xs font-mono text-gray-700 break-all"
                        title={booking.paymentId}
                      >
                        {safeDisplay(booking.paymentId)}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="p-3 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatAmount(booking.totalAmount)}
                    </td>

                    {/* Actions */}
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-xs border border-blue-200"
                          onClick={() => handleViewDetails(booking)}
                          title="View Details"
                        >
                          <Eye size={12} />
                          <span className="font-medium">View</span>
                        </button>

                        <button
                          className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors flex items-center space-x-1 text-xs border border-purple-200"
                          onClick={() => handleOpenStatusModal(booking)}
                          title="Update Status"
                        >
                          <Edit size={12} />
                          <span className="font-medium">Update</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <div className="text-gray-500 text-lg font-medium">
                        No e-stamp bookings found
                      </div>
                      <div className="text-gray-400 text-sm">
                        Try adjusting your search or filter criteria
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="border-t border-red-100 bg-red-50/30">
            <Pagination
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              filteredBookings={filteredBookings}
              paginate={paginate}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>

      {/* Status Update Modal - Optimized */}
      {isStatusModalOpen && statusUpdateBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-red-900">
                Update E-Stamp Status
              </h3>
              <button
                onClick={handleCloseStatusModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Booking ID
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm font-medium">
                    {statusUpdateBooking.id.length > 12
                      ? statusUpdateBooking.id.substring(0, 12) + "..."
                      : statusUpdateBooking.id}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    First Party
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    {statusUpdateBooking.firstPartyName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Document Type
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    {statusUpdateBooking.documentType}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Current Status
                  </label>
                  <div
                    className={`p-2 rounded text-sm font-medium ${getStatusBadgeColor(
                      statusUpdateBooking.status
                    )}`}
                  >
                    {statusUpdateBooking.status}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select new status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Processed">Processed</option>
                  <option value="Approved">Approved</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={handleCloseStatusModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!newStatus || statusUpdateLoading}
                className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center ${
                  !newStatus || statusUpdateLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {statusUpdateLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstampBookingTable;
