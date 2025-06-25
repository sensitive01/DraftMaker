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
    if (!status) return "pending";
    const statusLower = status.toLowerCase();
    if (statusLower === "pending") return "pending";
    if (statusLower === "processing") return "processing";
    if (statusLower === "processed") return "processed";
    if (statusLower === "approved") return "approved";
    if (statusLower === "delivered") return "delivered";
    if (statusLower === "completed" || statusLower === "success")
      return "completed";
    if (
      statusLower === "cancelled" ||
      statusLower === "rejected" ||
      statusLower === "failed"
    )
      return "cancelled";
    return "pending";
  };

  const getStatusConfig = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const configs = {
      completed: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        dot: "bg-green-500",
        icon: CheckCircle,
        cardBg: "bg-green-50",
        cardBorder: "border-green-200",
      },
      delivered: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        icon: Truck,
        cardBg: "bg-emerald-50",
        cardBorder: "border-emerald-200",
      },
      approved: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
        dot: "bg-teal-500",
        icon: FileCheck,
        cardBg: "bg-teal-50",
        cardBorder: "border-teal-200",
      },
      processed: {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        dot: "bg-cyan-500",
        icon: Package,
        cardBg: "bg-cyan-50",
        cardBorder: "border-cyan-200",
      },
      processing: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
        icon: Clock,
        cardBg: "bg-blue-50",
        cardBorder: "border-blue-200",
      },
      pending: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        dot: "bg-orange-500",
        icon: AlertCircle,
        cardBg: "bg-orange-50",
        cardBorder: "border-orange-200",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
        dot: "bg-red-600",
        icon: XCircle,
        cardBg: "bg-red-100",
        cardBorder: "border-red-300",
      },
    };
    return configs[normalizedStatus] || configs.pending;
  };

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status);
    const statusText =
      normalizeStatus(status).charAt(0).toUpperCase() +
      normalizeStatus(status).slice(1);
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${config.bg} ${config.text} ${config.border} border-2 shadow-sm`}
      >
        <IconComponent className="w-4 h-4" />
        {statusText}
      </span>
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const normalizedDocStatus = normalizeStatus(doc.doumentStatus);
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
    // Handle the format "21-06-2025 03:06:18 PM"
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
      completed: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "completed"
      ).length,
      delivered: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "delivered"
      ).length,
      approved: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "approved"
      ).length,
      processed: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "processed"
      ).length,
      processing: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "processing"
      ).length,
      pending: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "pending"
      ).length,
      cancelled: documents.filter(
        (doc) => normalizeStatus(doc.doumentStatus) === "cancelled"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl mb-8 shadow-xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-red-700 mb-4 bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent">
            Legal Document Tracking
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your legal document stamp applications with real-time status
            updates
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-10 mb-12 backdrop-blur-sm bg-opacity-90">
          <div className="max-w-md mx-auto">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-bold text-red-800 mb-6"
            >
              Enter Mobile Number
            </label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(formatMobileNumber(e.target.value))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-4 pl-15 border-2 border-red-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all text-lg font-medium"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
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
          <div className="space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-red-100 hover:shadow-2xl transition-all hover:border-red-200 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-red-700 mb-1">
                  {counts.total}
                </div>
                <div className="text-xs text-red-600 font-semibold">Total</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all hover:border-green-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-green-700 mb-1">
                  {counts.completed}
                </div>
                <div className="text-xs text-green-600 font-semibold">
                  Completed
                </div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition-all hover:border-emerald-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-emerald-700 mb-1">
                  {counts.delivered}
                </div>
                <div className="text-xs text-emerald-600 font-semibold">
                  Delivered
                </div>
              </div>
              <div className="bg-teal-50 rounded-2xl p-4 shadow-xl border-2 border-teal-200 hover:shadow-2xl transition-all hover:border-teal-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-teal-700 mb-1">
                  {counts.approved}
                </div>
                <div className="text-xs text-teal-600 font-semibold">
                  Approved
                </div>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-4 shadow-xl border-2 border-cyan-200 hover:shadow-2xl transition-all hover:border-cyan-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-cyan-700 mb-1">
                  {counts.processed}
                </div>
                <div className="text-xs text-cyan-600 font-semibold">
                  Processed
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all hover:border-blue-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  {counts.processing}
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  Processing
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-4 shadow-xl border-2 border-orange-200 hover:shadow-2xl transition-all hover:border-orange-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-orange-700 mb-1">
                  {counts.pending}
                </div>
                <div className="text-xs text-orange-600 font-semibold">
                  Pending
                </div>
              </div>
              <div className="bg-red-100 rounded-2xl p-4 shadow-xl border-2 border-red-300 hover:shadow-2xl transition-all hover:border-red-400 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-red-800 mb-1">
                  {counts.cancelled}
                </div>
                <div className="text-xs text-red-700 font-semibold">
                  Cancelled
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 backdrop-blur-sm bg-opacity-90">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by document name, booking ID, or applicant name..."
                      className="w-full px-4 py-4 pl-12 border-2 border-red-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="lg:w-64">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-4 pl-12 pr-12 border-2 border-red-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all appearance-none bg-white font-medium"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="processed">Processed</option>
                      <option value="approved">Approved</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              {filteredDocuments.length !== documents.length && (
                <div className="mt-6 text-sm text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-xl border-2 border-red-200">
                  Showing {filteredDocuments.length} of {documents.length}{" "}
                  documents
                </div>
              )}
            </div>

            {/* Documents Grid */}
            <div className="space-y-8">
              {filteredDocuments.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-16 text-center backdrop-blur-sm bg-opacity-90">
                  <div className="text-red-300 mb-6">
                    <FileText className="w-20 h-20 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 mb-4">
                    No documents found
                  </h3>
                  <p className="text-red-600 text-lg">
                    {documents.length === 0
                      ? "No documents found for this mobile number."
                      : "Try adjusting your search criteria or filters."}
                  </p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-white rounded-3xl shadow-2xl border border-red-100 p-10 hover:shadow-3xl hover:border-red-200 transition-all transform hover:-translate-y-1 backdrop-blur-sm bg-opacity-90"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                      {/* Document Info */}
                      <div className="flex-1 space-y-8">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-red-800 mb-3">
                              {doc.documentType || "Document"}
                            </h3>
                            <p className="text-sm text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-full inline-block border border-red-200">
                              {doc.paymentDetails?.serviceName ||
                                "Legal Document"}
                            </p>
                          </div>
                          {getStatusBadge(doc.doumentStatus)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
                              <Hash className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                                Booking ID
                              </p>
                              <p className="text-sm font-bold text-red-800">
                                {doc.bookingId || "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
                              <User className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                                Applicant
                              </p>
                              <p className="text-sm font-bold text-red-800">
                                {doc.userName ||doc.requestorName || "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
                              <Calendar className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                                Submitted
                              </p>
                              <p className="text-sm font-bold text-red-800">
                                {formatDate(doc.createdAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
                              <IndianRupee className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">
                                Amount Paid
                              </p>
                              <p className="text-lg font-bold text-red-800">
                                ₹{doc.paymentDetails?.paidAmount ||doc.totalAmount ||"0"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Action */}
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleWhatsAppMessage(
                              doc.bookingId,
                              doc.mobileNumber
                            )
                          }
                          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-200"
                        >
                          <MessageCircle className="w-5 h-5" />
                          WhatsApp
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
