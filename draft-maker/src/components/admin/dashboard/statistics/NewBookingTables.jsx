import React, { useEffect, useState } from "react";
import { Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getAllBookingData } from "../../../../api/service/axiosService";

const BookingTable = () => {
  // State for bookings data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Modal state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllBookingData();
        
        // Transform the API response data to match our table structure
        const formattedBookings = response.data.data.map(booking => ({
          id: booking.bookingId,
          name: booking.fullName,
          phoneNumber: booking.mobileNumber,
          status: booking.doumentStatus,
          paymentId: booking.paymentDetails.paymentId,
          paymentStatus: booking.paymentStatus,
          amount: booking.paymentDetails.paidAmount,
          serviceType: booking.paymentDetails.serviceType,
          serviceName: booking.paymentDetails.serviceName,
          createdAt: booking.createdAt,
          includesNotary: booking.paymentDetails.includesNotary
        }));
        
        setBookings(formattedBookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to load booking data");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  // Status badge color mapping
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="space-y-6 p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-red-900">Booking Details</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="px-4 py-2 pr-8 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-red-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
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
                    <td className="p-3 whitespace-nowrap text-sm text-red-500">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-medium text-red-900">
                      {booking.id}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      {booking.name}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      {booking.phoneNumber}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.paymentStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      {booking.paymentId}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors flex items-center space-x-1"
                        onClick={() => handleViewDetails(booking)}
                        title="View Details"
                      >
                        <Eye size={16} />
                        <span className="text-sm">View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 text-center text-red-500">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {bookings.length > 0 && (
          <div className="px-5 py-3 flex items-center justify-between border-t border-red-100">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, bookings.length)}
                  </span>{" "}
                  of <span className="font-medium">{bookings.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-red-300 bg-white text-sm font-medium text-red-500 ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-50"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === number + 1
                          ? "bg-red-50 border-red-500 text-red-600 z-10"
                          : "border-red-300 bg-white text-red-500 hover:bg-red-50"
                      } text-sm font-medium`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-red-300 bg-white text-sm font-medium text-red-500 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-50"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-xl font-bold text-red-900">
                Booking Details
              </h3>
              <button
                onClick={closeDetailsModal}
                className="text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      Booking ID
                    </p>
                    <p className="text-sm font-bold">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      Payment ID
                    </p>
                    <p className="text-sm font-bold">
                      {selectedBooking.paymentId}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    Customer Name
                  </p>
                  <p className="text-sm">{selectedBooking.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    Phone Number
                  </p>
                  <p className="text-sm">{selectedBooking.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">Document Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-red-600">Payment Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedBooking.paymentStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedBooking.paymentStatus}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    Booking Date
                  </p>
                  <p className="text-sm">{selectedBooking.createdAt}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    Service Type
                  </p>
                  <p className="text-sm">{selectedBooking.serviceName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    Includes Notary
                  </p>
                  <p className="text-sm">{selectedBooking.includesNotary ? "Yes" : "No"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">Amount</p>
                  <p className="text-sm font-bold">₹{selectedBooking.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeDetailsModal}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
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

export default BookingTable;