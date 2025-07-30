import React, { useEffect, useState } from "react";
import { Eye, X, Search, Filter, Calendar, Edit, File } from "lucide-react";
import {
  getAllBookingData,
  updateBookingStatus,
} from "../../../../api/service/axiosService";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const BookingTable = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedBooking, setSelectedBooking] = useState(null);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusUpdateBooking, setStatusUpdateBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Utility function to format date in human-readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Handle different date formats
      let date;

      // Check if it's in DD-MM-YYYY format like "28-07-2025 09:50:01 PM"
      if (dateString.includes("-") && dateString.split("-").length === 3) {
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("-");
        // Create ISO format string for proper parsing
        const isoString = `${year}-${month}-${day}`;
        date = new Date(isoString);
      } else {
        // Handle other formats
        date = new Date(dateString);
      }

      // Format to human-readable date
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.log("Date parsing error:", error);
      return dateString;
    }
  };

  // Utility function to format time in human-readable format
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Handle different date formats
      let date;

      // Check if it's in DD-MM-YYYY format like "28-07-2025 09:50:01 PM"
      if (dateString.includes("-") && dateString.split("-").length === 3) {
        const parts = dateString.split(" ");
        const [day, month, year] = parts[0].split("-");
        const time = parts.slice(1).join(" "); // Handle "09:50:01 PM"

        // Create a proper date string
        const dateStr = `${month}/${day}/${year} ${time}`;
        date = new Date(dateStr);
      } else {
        date = new Date(dateString);
      }

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.log("Time parsing error:", error);
      return dateString;
    }
  };

  // Utility function to safely display values
  const safeDisplay = (value, fallback = "N/A") => {
    return value && value.toString().trim() !== "" ? value : fallback;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllBookingData();

        const formattedBookings = response.data.data.map((booking) => ({
          _id: booking._id,
          id: safeDisplay(booking.bookingId),
          name: safeDisplay(booking.userName, "Unknown"),
          phoneNumber: safeDisplay(booking.mobileNumber),
          status: safeDisplay(booking.doumentStatus),
          paymentId: safeDisplay(booking.paymentDetails?.paymentId),
          paymentStatus: safeDisplay(booking.paymentStatus),
          amount: safeDisplay(booking.paymentDetails?.paidAmount),
          serviceType: safeDisplay(booking.paymentDetails?.serviceType),
          serviceName: safeDisplay(booking.paymentDetails?.serviceName),
          createdAt: formatDate(booking.createdAt),
          createdTime: formatTime(booking.createdAt),
          includesNotary: booking.paymentDetails?.includesNotary || false,
          documentType: safeDisplay(booking.documentType),
          formId: safeDisplay(booking.formId),
        }));

        setBookings(formattedBookings);
        setFilteredBookings(formattedBookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to load booking data");
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

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          (booking.id || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.name || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.phoneNumber || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.paymentId || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.documentType || "").toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterPaymentStatus, bookings]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    navigate(`/admin/document-preview/${booking.formId}/${booking.id}`);
  };

  const handleOpenStatusModal = (booking) => {
    setStatusUpdateBooking(booking);
    setNewStatus(booking.status || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatusUpdateBooking(null);
    setNewStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!statusUpdateBooking || !newStatus) return;

    try {
      setStatusUpdateLoading(true);

      // Call your API to update the status
      await updateBookingStatus(statusUpdateBooking._id, newStatus);

      // Update the local state
      const updatedBookings = bookings.map((booking) => {
        if (booking._id === statusUpdateBooking._id) {
          return { ...booking, status: newStatus };
        }
        return booking;
      });

      setBookings(updatedBookings);
      setStatusUpdateLoading(false);
      handleCloseModal();

      // Optional: Show success message
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
  };

  const getStatusBadgeColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "processed":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "approved":
        return "bg-teal-100 text-teal-800 border border-teal-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
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
        <h2 className="text-2xl font-bold text-red-900">Booking Details</h2>

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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="processed">Processed</option>
              <option value="approved">Approved</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
            >
              <option value="all">All Payments</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
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
          of <span className="font-semibold">{bookings.length}</span> bookings
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-red-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "60px" }}
                >
                  Sl. No.
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "180px" }}
                >
                  Booking ID & Date
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "160px" }}
                >
                  Customer Details
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "220px" }}
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
                  style={{ minWidth: "200px" }}
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

                    {/* Booking Details */}
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-red-900">
                          {safeDisplay(booking.id)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1 flex-shrink-0" />
                          <div className="flex flex-col">
                            <span>{booking.createdAt}</span>
                            <span className="text-xs text-gray-400">
                              at {booking.createdTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {safeDisplay(booking.name)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {safeDisplay(booking.phoneNumber)}
                        </span>
                      </div>
                    </td>

                    {/* Service Details */}
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {safeDisplay(booking.documentType)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {safeDisplay(booking.serviceName)}
                        </span>
                        {booking.amount !== "N/A" && (
                          <span className="text-xs font-medium text-green-600">
                            ₹{booking.amount}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Document Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {safeDisplay(booking.status)}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {safeDisplay(booking.paymentStatus)}
                      </span>
                    </td>

                    {/* Payment ID */}
                    <td className="p-3 whitespace-nowrap text-sm font-mono text-gray-700">
                      {safeDisplay(booking.paymentId)}
                    </td>

                    {/* Actions */}
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-1"
                          onClick={() =>
                            navigate(
                              `/admin/-document-bookings-table/preview/${booking.id}`
                            )
                          }
                          title="View Details"
                        >
                          <Eye size={14} />
                          <span className="text-xs font-medium">Details</span>
                        </button>

                        <button
                          className="px-2 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors flex items-center space-x-1"
                          onClick={() => handleViewDetails(booking)}
                          title="View Document"
                        >
                          <File size={14} />
                          <span className="text-xs font-medium">Document</span>
                        </button>

                        <button
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors flex items-center space-x-1"
                          onClick={() => handleOpenStatusModal(booking)}
                          title="Update Status"
                        >
                          <Edit size={14} />
                          <span className="text-xs font-medium">Update</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No bookings found matching your criteria
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

      {/* Status Update Modal */}
      {isModalOpen && statusUpdateBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-red-900">Update Status</h3>
              <button
                onClick={handleCloseModal}
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
                    {statusUpdateBooking.id}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Customer
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    {statusUpdateBooking.name}
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
                onClick={handleCloseModal}
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

export default BookingTable;
