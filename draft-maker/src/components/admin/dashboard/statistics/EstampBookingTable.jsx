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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBookedEstampData();

        if (response.data && response.data.data) {
          const formattedBookings = response.data.data.map((booking) => ({
            _id: booking._id,
            id: booking._id, // Using _id as the booking ID
            firstPartyName: booking.firstPartyName || "N/A",
            secondPartyName: booking.secondPartyName || "N/A",
            documentType: booking.documentType || "N/A",
            deliveryServiceName: booking.deliveryServiceName || "N/A",
            requestorName: booking.requestorName || "N/A",
            mobileNumber: booking.mobileNumber || "N/A",
            totalAmount: booking.totalAmount || 0,
            orderDate: booking.orderDate
              ? new Date(booking.orderDate).toLocaleDateString()
              : "N/A",
            status: booking.documentStatus || "Pending", // Using payment status as default status
            paymentStatus: booking.paymentStatus || "Pending",
            paymentId: booking.razorpayPaymentId || "N/A",
            // Additional fields for preview
            selectedDocumentId: booking.selectedDocumentId || "",
            documentCalculationType: booking.documentCalculationType || "",
            documentFixedAmount: booking.documentFixedAmount || 0,
            documentPercentage: booking.documentPercentage || 0,
            documentMinAmount: booking.documentMinAmount || 0,
            documentMaxAmount: booking.documentMaxAmount || 0,
            stampDutyAmount: booking.stampDutyAmount || 0,
            deliveryType: booking.deliveryType || "",
            selectedDeliveryServiceId: booking.selectedDeliveryServiceId || "",
            deliveryCharge: booking.deliveryCharge || 0,
            deliveryDescription: booking.deliveryDescription || "",
            paymentMethod: booking.paymentMethod || "",
            currency: booking.currency || "",
            razorpayPaymentId: booking.razorpayPaymentId || "",
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

  // Updated handleViewDetails function to navigate to details page
  const handleViewDetails = (booking) => {
    // Navigate to the details page with the booking _id
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

      // Call API to update the status
      await updateEstampBookingStatus(statusUpdateBooking._id, newStatus);

      // Update local state
      const updatedBookings = bookings.map((booking) => {
        if (booking._id === statusUpdateBooking._id) {
          return { ...booking, status: newStatus };
        }
        return booking;
      });

      setBookings(updatedBookings);
      setStatusUpdateLoading(false);
      handleCloseStatusModal();

      // Show success message
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
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-900 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "Processed":
        return "bg-indigo-200 text-indigo-800";

      case "Delivered":
        return "bg-emerald-900 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-red-900">
          E-Stamp Booking Details
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search bookings..."
              className="px-4 py-2 pr-10 w-full border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              {searchTerm ? (
                <button onClick={clearSearch}>
                  <X size={18} className="text-red-500" />
                </button>
              ) : (
                <Search size={18} />
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
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
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
              >
                <option value="all">All Payments</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={filterDeliveryType}
                onChange={(e) => setFilterDeliveryType(e.target.value)}
                className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
              >
                <option value="all">All Delivery Types</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center"
            >
              <X size={16} className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Filter size={16} />
        <span>
          Showing {filteredBookings.length} of {bookings.length} e-stamp
          bookings
        </span>
      </div>

      <div className="bg-white rounded-lg border border-red-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Booking ID & Date
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Party Details
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Document & Service Type
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Document Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Actions
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Update Status
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
                    <td className="p-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-red-900">
                          {booking.id.substring(0, 8)}...
                        </span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar size={12} className="mr-1" />
                          {booking.orderDate}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          First: {booking.firstPartyName}
                        </span>
                        <span className="text-sm text-gray-600">
                          Second: {booking.secondPartyName}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {booking.documentType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {booking.deliveryServiceName || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {booking.status || "N/A"}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-mono text-gray-700">
                      {booking.paymentId.substring(0, 8)}...
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatAmount(booking.totalAmount)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-1"
                        onClick={() => handleViewDetails(booking)}
                        title="View Details"
                      >
                        <Eye size={14} />
                        <span className="text-xs font-medium">View</span>
                      </button>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors flex items-center space-x-1"
                        onClick={() => handleOpenStatusModal(booking)}
                        title="Update Status"
                      >
                        <Edit size={14} />
                        <span className="text-xs font-medium">Update</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-6 text-center text-gray-500">
                    No e-stamp bookings found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredBookings.length > 0 && (
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
        )}
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && statusUpdateBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-900">
                Update E-Stamp Booking Status
              </h3>
              <button
                onClick={handleCloseStatusModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm font-medium">
                  {statusUpdateBooking.id.substring(0, 8)}...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm">
                  {statusUpdateBooking.documentType || "N/A"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <div
                  className={`p-2 rounded text-sm font-medium ${getStatusBadgeColor(
                    statusUpdateBooking.status
                  )}`}
                >
                  {statusUpdateBooking.status || "N/A"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCloseStatusModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!newStatus || statusUpdateLoading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center ${
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
                  "Update Status"
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
