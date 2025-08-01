import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  User,
  FileText,
  CreditCard,
  Truck,
  Phone,
  IndianRupee,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Hash,
  Building,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getEstampBookingData } from "../../../../api/service/axiosService";

const EstampDetails = () => {
  const { estampId } = useParams();
  const [estampData, setEstampData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEstampBookingData(estampId);
        if (response.status === 200) {
          setEstampData(response.data.data);
        } else {
          setError(response.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching e-stamp data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (estampId) {
      fetchData();
    }
  }, [estampId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  if (!estampData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No e-stamp data found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">E-Stamp Details</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-green-600 font-semibold capitalize">
                {estampData.paymentStatus}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-semibold capitalize">
                {estampData.documentStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
      </div>

      {/* Booking ID Banner */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2">
          <Hash className="h-5 w-5 text-blue-600" />
          <span className="text-blue-600 font-medium">Booking ID:</span>
          <span className="text-blue-800 font-bold text-lg">
            {estampData.bookingId}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Party Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-red-600" />
            Party Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">
                First Party
              </label>
              <p className="text-gray-900 font-medium">
                {estampData.firstPartyName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Second Party
              </label>
              <p className="text-gray-900 font-medium">
                {estampData.secondPartyName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Stamp Duty Payer
              </label>
              <p className="text-gray-900 font-medium capitalize">
                {estampData.stampDutyPayer.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>

        {/* Document Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-red-600" />
            Document Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Document Type
              </label>
              <p className="text-gray-900 font-medium text-sm">
                {estampData.documentType}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Document ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {estampData.selectedDocumentId}
              </p>
            </div>
            {estampData.considerationAmount && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Consideration Amount
                </label>
                <p className="text-gray-900 font-medium">
                  {formatCurrency(estampData.considerationAmount)}
                </p>
              </div>
            )}
            {estampData.description && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <p className="text-gray-900">{estampData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-red-600" />
            Contact Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Requestor Name
              </label>
              <p className="text-gray-900 font-medium">
                {estampData.requestorName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Mobile Number
              </label>
              <p className="text-gray-900 font-medium">
                {estampData.mobileNumber}
              </p>
            </div>
            {estampData.deliveryAddress?.email && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <p className="text-gray-900 font-medium">
                  {estampData.deliveryAddress.email}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Truck className="h-5 w-5 mr-2 text-red-600" />
            Delivery Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Delivery Type
              </label>
              <p className="text-gray-900 font-medium capitalize">
                {estampData.deliveryType}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Service Name
              </label>
              <p className="text-gray-900 font-medium">
                {estampData.deliveryServiceName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Service ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {estampData.selectedDeliveryServiceId}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <p className="text-gray-900 text-sm">
                {estampData.deliveryDescription}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Delivery Charge
              </label>
              <p className="text-gray-900 font-medium">
                {formatCurrency(estampData.deliveryCharge)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      {estampData.deliveryAddress && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Delivery Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address Line 1
              </label>
              <p className="text-gray-900">
                {estampData.deliveryAddress.addressLine1}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address Line 2
              </label>
              <p className="text-gray-900">
                {estampData.deliveryAddress.addressLine2}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">City</label>
              <p className="text-gray-900">{estampData.deliveryAddress.city}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">State</label>
              <p className="text-gray-900">
                {estampData.deliveryAddress.state}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Pincode
              </label>
              <p className="text-gray-900">
                {estampData.deliveryAddress.pincode}
              </p>
            </div>
            {estampData.deliveryAddress.landmark && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Landmark
                </label>
                <p className="text-gray-900">
                  {estampData.deliveryAddress.landmark}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Information */}
      <div className="mt-8 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-red-600" />
          Payment Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Stamp Duty Amount
            </label>
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(estampData.stampDutyAmount)}
            </p>
          </div>
           <div>
            <label className="text-sm font-medium text-gray-600">
              Quantity
            </label>
            <p className="text-lg font-bold text-red-600">
              {estampData.quantity}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Total Amount
            </label>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(estampData.totalAmount)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Payment Method
            </label>
            <p className="text-gray-900 font-medium capitalize">
              {estampData.paymentMethod}
            </p>
          </div>
          {estampData.razorpayPaymentId && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Razorpay Payment ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {estampData.razorpayPaymentId}
              </p>
            </div>
          )}
          {estampData.razorpayOrderId && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Razorpay Order ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {estampData.razorpayOrderId}
              </p>
            </div>
          )}
          {estampData.razorpaySignature && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Razorpay Signature
              </label>
              <p className="text-gray-900 font-mono text-sm break-all">
                {estampData.razorpaySignature}
              </p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Currency
            </label>
            <p className="text-gray-900 font-medium">{estampData.currency}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-red-600" />
          Timeline
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600">Booking Date</span>
            <span className="text-gray-900 font-medium">
              {formatDate(estampData.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Order ID */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Order ID:{" "}
          <span className="font-mono text-gray-700">{estampData._id}</span>
        </p>
      </div>
    </div>
  );
};

export default EstampDetails;
