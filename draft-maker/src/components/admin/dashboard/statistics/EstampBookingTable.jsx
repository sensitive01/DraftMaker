import React, { useEffect, useState } from "react";
import { Eye, X, Search, Filter, Calendar, Edit } from "lucide-react";
import { getBookedEstampData } from "../../../../api/service/axiosService";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const EstampBookingTable = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all");
  const [filterDeliveryType, setFilterDeliveryType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBookedEstampData();

        if (response.data && response.data.data) {
          const formattedBookings = response.data.data.map((booking) => ({
            _id: booking._id,
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
            paymentStatus: booking.paymentStatus || "",
            paymentCompletedAt: booking.paymentCompletedAt
              ? new Date(booking.paymentCompletedAt).toLocaleString()
              : "",
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
          (booking.razorpayPaymentId || "")
            .toLowerCase()
            .includes(lowercasedSearch)
      );
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  }, [searchTerm, filterPaymentStatus, filterDeliveryType, bookings]);

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
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterPaymentStatus("all");
    setFilterDeliveryType("all");
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
                <th className="px-4 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Party Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Delivery Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Requestor Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {currentItems.length > 0 ? (
                currentItems.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={14} className="mr-2 text-gray-500" />
                        {booking.orderDate}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium text-gray-900">
                          First: {booking.firstPartyName}
                        </span>
                        <span className="text-sm text-gray-600">
                          Second: {booking.secondPartyName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-900 font-medium">
                        {booking.documentType}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-900">
                        {booking.deliveryServiceName}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium text-gray-900">
                          {booking.requestorName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {booking.mobileNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600">
                        {formatAmount(booking.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap">
                      <button
                        className="px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-1 text-sm"
                        onClick={() => handleViewDetails(booking)}
                        title="View Details"
                      >
                        <Eye size={14} />
                        <span className="font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
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

      {/* Preview Modal - Fully Scrollable with Margins */}
      {isPreviewModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl my-8">
              {/* Modal Header */}
              <div className="bg-white border-b border-gray-200 p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-red-900">
                    E-Stamp Booking Details
                  </h3>
                  <button
                    onClick={handleClosePreviewModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Party Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          First Party Name
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.firstPartyName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Second Party Name
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.secondPartyName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Requestor Name
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.requestorName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Mobile Number
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.mobileNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Document Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Document Type
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.documentType}
                        </div>
                      </div>
                      {selectedBooking.selectedDocumentId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Document ID
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm font-mono">
                            {selectedBooking.selectedDocumentId}
                          </div>
                        </div>
                      )}
                      {selectedBooking.documentCalculationType && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Calculation Type
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                            {selectedBooking.documentCalculationType}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount Details */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Amount Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedBooking.documentFixedAmount > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Fixed Amount
                        </label>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm font-semibold text-green-600">
                          {formatAmount(selectedBooking.documentFixedAmount)}
                        </div>
                      </div>
                    )}
                    {selectedBooking.stampDutyAmount > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Stamp Duty Amount
                        </label>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm font-semibold text-blue-600">
                          {formatAmount(selectedBooking.stampDutyAmount)}
                        </div>
                      </div>
                    )}
                    {selectedBooking.deliveryCharge > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Delivery Charge
                        </label>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-sm font-semibold text-orange-600">
                          {formatAmount(selectedBooking.deliveryCharge)}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Total Amount
                      </label>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-sm font-bold text-red-600">
                        {formatAmount(selectedBooking.totalAmount)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Delivery Information
                    </h4>
                    <div className="space-y-4">
                      {selectedBooking.deliveryType && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Delivery Type
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm capitalize">
                            {selectedBooking.deliveryType}
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Delivery Service
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.deliveryServiceName}
                        </div>
                      </div>
                      {selectedBooking.deliveryDescription && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Delivery Description
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                            {selectedBooking.deliveryDescription}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Payment Information
                    </h4>
                    <div className="space-y-4">
                      {selectedBooking.paymentMethod && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Payment Method
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm capitalize">
                            {selectedBooking.paymentMethod}
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Payment Status
                        </label>
                        <div
                          className={`p-3 rounded-lg text-sm font-medium ${getPaymentStatusBadgeColor(
                            selectedBooking.paymentStatus
                          )}`}
                        >
                          {selectedBooking.paymentStatus}
                        </div>
                      </div>
                      {selectedBooking.razorpayPaymentId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Razorpay Payment ID
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm font-mono break-all">
                            {selectedBooking.razorpayPaymentId}
                          </div>
                        </div>
                      )}
                      {selectedBooking.paymentCompletedAt && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Payment Completed At
                          </label>
                          <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                            {selectedBooking.paymentCompletedAt}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Timeline
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Order Date
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                        {selectedBooking.orderDate}
                      </div>
                    </div>
                    {selectedBooking.createdAt && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Created At
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                          {selectedBooking.createdAt}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-6 rounded-b-lg">
                <button
                  onClick={handleClosePreviewModal}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstampBookingTable;
