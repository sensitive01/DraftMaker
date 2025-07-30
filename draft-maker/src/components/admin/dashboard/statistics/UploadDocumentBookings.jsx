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

  // Utility function to format date in human-readable format
  const formatHumanDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Utility function to format time in 12-hour format
  const formatHumanTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
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
        const response = await getUploadedDocumentBookings();

        if (response.status === 200) {
          const formattedBookings = response.data.data.map((booking) => ({
            ...booking, // Keep all original data
            username: safeDisplay(booking.username, "Unknown"),
            userMobile: safeDisplay(booking.userMobile),
            documents: booking.documents || [],
            totalDocuments: booking.totalDocuments || 0,
            documentStatus: safeDisplay(booking.documentStatus, "Pending"),
            bookingId: safeDisplay(booking.bookingId),
            submittedAt: formatHumanDate(booking.submittedAt),
            submittedTime: formatHumanTime(booking.submittedAt),
            documentType: safeDisplay(booking.documentType),
            formId: safeDisplay(booking.formId),
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
    navigate(`/admin/upload-document-bookings/preview/${booking._id}`);
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
    return statusOption
      ? statusOption.color + " border border-current border-opacity-20"
      : "bg-gray-100 text-gray-800 border border-gray-200";
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
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Upload Document Bookings
        </h2>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search bookings..."
              className="px-4 py-2 pr-10 w-full border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              {searchTerm ? (
                <button
                  onClick={clearSearch}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              ) : (
                <Search size={16} />
              )}
            </span>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
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
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center whitespace-nowrap"
            >
              <X size={14} className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
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

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-red-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-sm font-medium text-blue-600">
                  <FileText size={14} className="mr-1" />
                  {safeDisplay(booking.bookingId)}
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
                  <User
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  <span className="font-medium">{booking.username}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  {booking.userMobile}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <Calendar
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col">
                    <span>{booking.submittedAt}</span>
                    <span className="text-xs text-gray-500">
                      at {booking.submittedTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  {booking.totalDocuments} document
                  {booking.totalDocuments !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1 text-sm border border-blue-200"
                  onClick={() => handlePreviewBooking(booking)}
                >
                  <Eye size={14} />
                  <span>View</span>
                </button>
                <button
                  className="flex-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors flex items-center justify-center space-x-1 text-sm border border-orange-200"
                  onClick={() => handleUpdateStatus(booking)}
                >
                  <Edit size={14} />
                  <span>Status</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search size={24} className="text-gray-400" />
              </div>
              <div className="text-gray-500 text-lg font-medium">
                No bookings found
              </div>
              <div className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-red-100 shadow-sm overflow-hidden">
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
                  style={{ minWidth: "150px" }}
                >
                  Booking ID
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "200px" }}
                >
                  Date & Time
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "180px" }}
                >
                  User Details
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "120px" }}
                >
                  Documents
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "120px" }}
                >
                  Status
                </th>
                <th
                  className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider"
                  style={{ minWidth: "160px" }}
                >
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
                    <td className="p-3">
                      <div className="flex items-center text-sm font-medium text-blue-600">
                        <FileText size={14} className="mr-1 flex-shrink-0" />
                        <span className="truncate" title={booking.bookingId}>
                          {safeDisplay(booking.bookingId)}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar size={12} className="mr-1 flex-shrink-0" />
                          <span>{booking.submittedAt}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {booking.submittedTime}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <User size={12} className="mr-1 flex-shrink-0" />
                          <span className="truncate" title={booking.username}>
                            {booking.username}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone size={10} className="mr-1 flex-shrink-0" />
                          <span>{booking.userMobile}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FileText size={12} className="mr-1 flex-shrink-0" />
                        {booking.totalDocuments} document
                        {booking.totalDocuments !== 1 ? "s" : ""}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium items-center ${getStatusBadgeColor(
                          booking.documentStatus
                        )}`}
                      >
                        {getStatusIcon(booking.documentStatus)}
                        {booking.documentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center space-x-1 text-xs border border-blue-200"
                          onClick={() => handlePreviewBooking(booking)}
                          title="Preview Details"
                        >
                          <Eye size={12} />
                          <span className="font-medium">View</span>
                        </button>
                        <button
                          className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors flex items-center space-x-1 text-xs border border-orange-200"
                          onClick={() => handleUpdateStatus(booking)}
                          title="Update Status"
                        >
                          <Edit size={12} />
                          <span className="font-medium">Status</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <div className="text-gray-500 text-lg font-medium">
                        No bookings found
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

      {/* Status Update Modal - Compact Design */}
      {isStatusModalOpen && statusUpdateBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-red-900 flex items-center">
                <Edit size={18} className="mr-2" />
                Update Status
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
                    {statusUpdateBooking.bookingId}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    User
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    {statusUpdateBooking.username}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Documents
                  </label>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    {statusUpdateBooking.totalDocuments} document
                    {statusUpdateBooking.totalDocuments !== 1 ? "s" : ""}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Current Status
                  </label>
                  <div className="bg-gray-50 p-2 rounded">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium items-center ${getStatusBadgeColor(
                        statusUpdateBooking.documentStatus
                      )}`}
                    >
                      {getStatusIcon(statusUpdateBooking.documentStatus)}
                      {statusUpdateBooking.documentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={handleCloseStatusModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {updatingStatus ? (
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

export default UploadDocumentBookings;
