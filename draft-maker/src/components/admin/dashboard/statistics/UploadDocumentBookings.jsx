import React, { useEffect, useState } from "react";
import {
  Eye,
  X,
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  FileText,
  ExternalLink,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  MapPin,
  CreditCard,
  Package,
  FileImage,
  File,
  Smartphone,
} from "lucide-react";
import {
  getUploadedDocumentBookings,
  updateUploadDocumentStatus,
} from "../../../../api/service/axiosService";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const UploadDocumentBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for preview modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State for status update modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusUpdateBooking, setStatusUpdateBooking] = useState(null);
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
        const response = await getUploadedDocumentBookings();

        if (response.status === 200) {
          const formattedBookings = response.data.data.map((booking) => ({
            ...booking, // Keep all original data
            username: booking.username || "Unknown",
            userMobile: booking.userMobile || "",
            documents: booking.documents || [],
            totalDocuments: booking.totalDocuments || 0,
            documentStatus: booking.documentStatus || "Pending",
            bookingId: booking.bookingId || "",
            submittedAt:
              new Date(booking.submittedAt).toLocaleDateString() || "",
            submittedTime:
              new Date(booking.submittedAt).toLocaleTimeString() || "",
            documentType: booking.documentType || "N/A",
            formId: booking.formId || "N/A",
          }));

          setBookings(formattedBookings);
          setFilteredBookings(formattedBookings);
        }
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

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter(
        (booking) =>
          booking.documentStatus.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          (booking.username || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.userMobile || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.bookingId || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.documentType || "")
            .toLowerCase()
            .includes(lowercasedSearch) ||
          (booking.formId || "").toLowerCase().includes(lowercasedSearch) ||
          (booking.documentStatus || "")
            .toLowerCase()
            .includes(lowercasedSearch)
      );
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, bookings]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviewBooking = (booking) => {
    navigate(`/admin/upload-document-bookings/preview/${booking.bookingId}`);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedBooking(null);
  };

  const handleUpdateStatus = (booking) => {
    setStatusUpdateBooking(booking);
    setNewStatus(booking.documentStatus);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setStatusUpdateBooking(null);
    setNewStatus("");
  };

  const handleStatusSubmit = async () => {
    if (!statusUpdateBooking || !newStatus) return;

    try {
      setUpdatingStatus(true);

      const response = await updateUploadDocumentStatus(
        statusUpdateBooking._id,
        newStatus
      );

      if (response.status === 200) {
        const updatedBookings = bookings.map((booking) => {
          if (booking._id === statusUpdateBooking._id) {
            return { ...booking, documentStatus: newStatus };
          }
          return booking;
        });

        setBookings(updatedBookings);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
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
        return <Clock size={12} className="mr-1" />;
      case "in progress":
        return <AlertCircle size={12} className="mr-1" />;
      case "completed":
        return <CheckCircle size={12} className="mr-1" />;
      case "rejected":
        return <XCircle size={12} className="mr-1" />;
      default:
        return <Clock size={12} className="mr-1" />;
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
      // Fallback: open in new tab
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg">
        <div className="text-center text-red-600 p-4 border border-red-200 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Upload Document Bookings
        </h2>

        {/* Search and Filter Section */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search bookings..."
              className="px-4 py-2 pr-10 w-full border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              {searchTerm ? (
                <button onClick={clearSearch}>
                  <X size={16} className="text-red-500" />
                </button>
              ) : (
                <Search size={16} />
              )}
            </span>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value.toLowerCase()}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center whitespace-nowrap"
            >
              <X size={14} className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Filter size={16} />
        <span>
          Showing {filteredBookings.length} of {bookings.length} bookings
        </span>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-red-100 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-sm font-medium text-blue-600">
                  <FileText size={14} className="mr-1" />
                  {booking.bookingId}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeColor(
                    booking.documentStatus
                  )}`}
                >
                  {getStatusIcon(booking.documentStatus)}
                  {booking.documentStatus}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <User size={12} className="mr-2 text-gray-400" />
                  <span className="font-medium">{booking.username}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={12} className="mr-2 text-gray-400" />
                  {booking.userMobile}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={12} className="mr-2 text-gray-400" />
                  {booking.submittedAt} at {booking.submittedTime}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText size={12} className="mr-2 text-gray-400" />
                  {booking.totalDocuments} document
                  {booking.totalDocuments !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1 text-sm"
                  onClick={() => handlePreviewBooking(booking)}
                >
                  <Eye size={14} />
                  <span>View</span>
                </button>
                <button
                  className="flex-1 px-3 py-2 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors flex items-center justify-center space-x-1 text-sm"
                  onClick={() => handleUpdateStatus(booking)}
                >
                  <Edit size={14} />
                  <span>Status</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No bookings found matching your criteria
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-red-100 shadow-md overflow-hidden">
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
                  Date & Time
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  User Details
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Documents
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
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
                    key={booking._id}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    <td className="p-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-blue-600">
                        <FileText size={14} className="mr-1" />
                        {booking.bookingId}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar size={12} className="mr-1" />
                          {booking.submittedAt}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.submittedTime}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <User size={12} className="mr-1" />
                          {booking.username}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone size={10} className="mr-1" />
                          {booking.userMobile}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FileText size={12} className="mr-1" />
                        {booking.totalDocuments} document
                        {booking.totalDocuments !== 1 ? "s" : ""}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusBadgeColor(
                          booking.documentStatus
                        )}`}
                      >
                        {getStatusIcon(booking.documentStatus)}
                        {booking.documentStatus}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-1"
                          onClick={() => handlePreviewBooking(booking)}
                          title="Preview Details"
                        >
                          <Eye size={14} />
                          <span className="text-xs font-medium">View</span>
                        </button>
                        <button
                          className="px-2 py-1 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors flex items-center space-x-1"
                          onClick={() => handleUpdateStatus(booking)}
                          title="Update Status"
                        >
                          <Edit size={14} />
                          <span className="text-xs font-medium">Status</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No bookings found matching your criteria
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

      {/* Mobile Pagination */}
      {filteredBookings.length > 0 && (
        <div className="block lg:hidden">
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

      {/* Status Update Modal */}
      {isStatusModalOpen && statusUpdateBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 sm:p-6">
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
                    {statusUpdateBooking.bookingId}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Status
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusBadgeColor(
                        statusUpdateBooking.documentStatus
                      )}`}
                    >
                      {getStatusIcon(statusUpdateBooking.documentStatus)}
                      {statusUpdateBooking.documentStatus}
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
                    updatingStatus ||
                    newStatus === statusUpdateBooking.documentStatus
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
  );
};

export default UploadDocumentBookings;
