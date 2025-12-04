import React, { useState } from "react";
import {
  Search,
  Filter,
  MessageCircle,
  FileText,
  Calendar,
  User,
  Hash,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ChevronDown,
  Package,
  FileCheck,
  Truck,
  PauseCircle,
} from "lucide-react";
import { trackMyDocumentStatus } from "../../api/service/axiosService";

const TrackMyDocuments = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleSubmit = async () => {
    if (!mobileNumber) {
      alert("Please enter your mobile number");
      return;
    }

    setLoading(true);
    try {
      const response = await trackMyDocumentStatus(mobileNumber);
      console.log(response.data);

      if (response.data && response.data.data) {
        setDocuments(response.data.data);
        setShowResults(true);
      } else {
        setDocuments([]);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Error fetching documents. Please try again.");
      setDocuments([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  const formatMobileNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length > 10 ? cleaned.slice(0, 10) : cleaned;
  };

  const normalizeStatus = (status) => {
    console.log(status)
    if (!status) return "processing";
    const statusLower = status.toLowerCase();
    
    // Map various status values to the 4 main categories
    if (statusLower === "processing" || statusLower === "pending" || statusLower === "processed" || statusLower === "approved") 
      return "processing";
    
    if (statusLower === "delivered" || statusLower === "completed" || statusLower === "deliver/completed" || statusLower === "success")
      return "delivered-completed";
    
    if (statusLower === "put on hold" || statusLower === "putonhold" || statusLower === "hold" || statusLower === "on hold")
      return "put-on-hold";
    
    if (statusLower === "cancelled" || statusLower === "rejected" || statusLower === "failed")
      return "cancelled";
    
    return "processing";
  };

  const getStatusConfig = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const configs = {
      "delivered-completed": {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        dot: "bg-green-500",
        icon: CheckCircle,
        cardBg: "bg-green-50",
        cardBorder: "border-green-200",
        label: "Deliver/Completed",
      },
      processing: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
        icon: Clock,
        cardBg: "bg-blue-50",
        cardBorder: "border-blue-200",
        label: "Processing",
      },
      "put-on-hold": {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        dot: "bg-orange-500",
        icon: PauseCircle,
        cardBg: "bg-orange-50",
        cardBorder: "border-orange-200",
        label: "Put on Hold",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
        dot: "bg-red-600",
        icon: XCircle,
        cardBg: "bg-red-100",
        cardBorder: "border-red-300",
        label: "Cancelled",
      },
    };
    return configs[normalizedStatus] || configs.processing;
  };

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${config.bg} ${config.text} ${config.border} border-2 shadow-sm`}
      >
        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">{config.label}</span>
        <span className="sm:hidden">{config.label.split("/")[0]}</span>
      </span>
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const normalizedDocStatus = normalizeStatus(doc.documentStatus);
    const matchesStatus =
      statusFilter === "all" || normalizedDocStatus === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      (doc.documentType &&
        doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.bookingId &&
        doc.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.userName &&
        doc.userName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const datePart = dateString.split(" ")[0];
    const [day, month, year] = datePart.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusCounts = () => {
    return {
      total: documents.length,
      "delivered-completed": documents.filter(
        (doc) => normalizeStatus(doc.documentStatus) === "delivered-completed"
      ).length,
      processing: documents.filter(
        (doc) => normalizeStatus(doc.documentStatus) === "processing"
      ).length,
      "put-on-hold": documents.filter(
        (doc) => normalizeStatus(doc.documentStatus) === "put-on-hold"
      ).length,
      cancelled: documents.filter(
        (doc) => normalizeStatus(doc.documentStatus) === "cancelled"
      ).length,
    };
  };

  const handleWhatsAppMessage = (bookingId, mobileNumber) => {
    const message = `Hi, I need assistance with my document booking. Booking ID: ${bookingId}, Mobile: ${mobileNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl sm:rounded-3xl mb-4 sm:mb-8 shadow-xl">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-red-700 mb-2 sm:mb-4 bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent px-4">
            Legal Document Tracking
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Track your legal document stamp applications with real-time status
            updates
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-4 sm:p-10 mb-8 sm:mb-12 backdrop-blur-sm bg-opacity-90">
          <div className="max-w-md mx-auto">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-bold text-red-800 mb-3 sm:mb-6"
            >
              Enter Mobile Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(formatMobileNumber(e.target.value))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all text-base sm:text-lg font-medium"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl sm:rounded-2xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Searching...</span>
                    <span className="sm:hidden">Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 sm:space-y-10">
            {/* Summary Cards - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-red-100 hover:shadow-2xl transition-all hover:border-red-200 transform hover:-translate-y-1">
                <div className="text-lg sm:text-2xl font-bold text-red-700 mb-1">
                  {counts.total}
                </div>
                <div className="text-xs text-red-600 font-semibold">Total</div>
              </div>
              <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all hover:border-blue-300 transform hover:-translate-y-1">
                <div className="text-lg sm:text-2xl font-bold text-blue-700 mb-1">
                  {counts.processing}
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  <span className="hidden sm:inline">Processing</span>
                  <span className="sm:hidden">Proc</span>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all hover:border-green-300 transform hover:-translate-y-1">
                <div className="text-lg sm:text-2xl font-bold text-green-700 mb-1">
                  {counts["delivered-completed"]}
                </div>
                <div className="text-xs text-green-600 font-semibold">
                  <span className="hidden sm:inline">Deliver/Completed</span>
                  <span className="sm:hidden">Done</span>
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-orange-200 hover:shadow-2xl transition-all hover:border-orange-300 transform hover:-translate-y-1">
                <div className="text-lg sm:text-2xl font-bold text-orange-700 mb-1">
                  {counts["put-on-hold"]}
                </div>
                <div className="text-xs text-orange-600 font-semibold">
                  <span className="hidden sm:inline">Put on Hold</span>
                  <span className="sm:hidden">Hold</span>
                </div>
              </div>
              <div className="bg-red-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-red-300 hover:shadow-2xl transition-all hover:border-red-400 transform hover:-translate-y-1">
                <div className="text-lg sm:text-2xl font-bold text-red-800 mb-1">
                  {counts.cancelled}
                </div>
                <div className="text-xs text-red-700 font-semibold">
                  <span className="hidden sm:inline">Cancelled</span>
                  <span className="sm:hidden">Canc</span>
                </div>
              </div>
            </div>

            {/* Filters - Mobile Optimized */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-4 sm:p-8 backdrop-blur-sm bg-opacity-90">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search documents..."
                      className="w-full px-4 py-3 sm:py-4 pl-10 sm:pl-12 border-2 border-red-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all font-medium text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-3 sm:py-4 pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 border-red-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all appearance-none bg-white font-medium text-sm sm:text-base"
                    >
                      <option value="all">Select new status</option>
                      <option value="processing">Processing</option>
                      <option value="delivered-completed">Deliver/Completed</option>
                      <option value="put-on-hold">Put on Hold</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              {filteredDocuments.length !== documents.length && (
                <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-red-600 font-semibold bg-red-50 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-red-200">
                  Showing {filteredDocuments.length} of {documents.length}{" "}
                  documents
                </div>
              )}
            </div>

            {/* Documents Grid - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-8">
              {filteredDocuments.length === 0 ? (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-8 sm:p-16 text-center backdrop-blur-sm bg-opacity-90">
                  <div className="text-red-300 mb-4 sm:mb-6">
                    <FileText className="w-12 h-12 sm:w-20 sm:h-20 mx-auto" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-red-800 mb-2 sm:mb-4">
                    No documents found
                  </h3>
                  <p className="text-red-600 text-sm sm:text-lg">
                    {documents.length === 0
                      ? "No documents found for this mobile number."
                      : "Try adjusting your search criteria or filters."}
                  </p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-4 sm:p-10 hover:shadow-3xl hover:border-red-200 transition-all transform hover:-translate-y-1 backdrop-blur-sm bg-opacity-90"
                  >
                    <div className="space-y-4 sm:space-y-6">
                      {/* Document Header - Mobile Optimized */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-2xl font-bold text-red-800 mb-2 sm:mb-3">
                            {doc.documentType || "Document"}
                          </h3>
                          <p className="text-xs sm:text-sm text-red-600 font-semibold bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full inline-block border border-red-200">
                            {doc.paymentDetails?.serviceName ||
                              "Legal Document"}
                          </p>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          {getStatusBadge(doc.documentStatus)}
                        </div>
                      </div>

                      {/* Document Details - Mobile Optimized */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-red-200 flex-shrink-0">
                            <Hash className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                              Booking ID
                            </p>
                            <p className="text-sm font-bold text-red-800 truncate">
                              {doc.bookingId || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-red-200 flex-shrink-0">
                            <User className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                              Applicant
                            </p>
                            <p className="text-sm font-bold text-red-800 truncate">
                              {doc.userName || doc.requestorName || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-red-200 flex-shrink-0">
                            <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                              Submitted
                            </p>
                            <p className="text-sm font-bold text-red-800">
                              {formatDate(doc.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-red-200 flex-shrink-0">
                            <IndianRupee className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                              Amount Paid
                            </p>
                            <p className="text-base sm:text-lg font-bold text-red-800">
                              ₹
                              {doc.paymentDetails?.paidAmount ||
                                doc.totalAmount ||
                                "0"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Action - Mobile Optimized */}
                      <div className="flex justify-center sm:justify-end pt-2 sm:pt-0">
                        <button
                          onClick={() =>
                            handleWhatsAppMessage(
                              doc.bookingId,
                              doc.mobileNumber
                            )
                          }
                          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-200 text-sm sm:text-base w-full sm:w-auto justify-center"
                        >
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          WhatsApp Support
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackMyDocuments;