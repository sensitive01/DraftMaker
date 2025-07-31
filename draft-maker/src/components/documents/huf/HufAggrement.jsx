import { useState } from "react";
import HufForm from "./HufForm";
import HufPreview from "./HufPreview";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification"; // Import the error notification component
import {
  createHufPaymentData,
  sendHufData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

export default function HufAgreement() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-HUF-12",
    title: "Mr",
    name: "",
    relationTo: "",
    relationName: "",
    age: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    aadhaarNo: "",
    hufName: "",
    hufExistenceDate: "",
    place: "",
    day: "1",
    month: "April",
    year: "2025",
    coparceners: [{ name: "", relationship: "", address: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState(""); // Add validation error state
  const [showErrorNotification, setShowErrorNotification] = useState(false); // Add error notification state
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showServiceOptionsModal, setShowServiceOptionsModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [userName, setUserName] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCoparcenerChange = (index, field, value) => {
    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedCoparceners = [...formData.coparceners];
    updatedCoparceners[index] = {
      ...updatedCoparceners[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      coparceners: updatedCoparceners,
    });
  };

  // Function to add new coparcener
  const addCoparcener = () => {
    setFormData({
      ...formData,
      coparceners: [
        ...formData.coparceners,
        { name: "", relationship: "", address: "" },
      ],
    });
  };

  // Function to remove a coparcener
  const removeCoparcener = (index) => {
    if (formData.coparceners.length > 1) {
      const updatedCoparceners = formData.coparceners.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        coparceners: updatedCoparceners,
      });
    }
  };

  // Add form validation function
  const validateForm = () => {
    // Validate karta details
    if (!formData.name.trim()) {
      setValidationError("Please enter the Karta's name");
      return false;
    }

    if (!formData.relationTo.trim()) {
      setValidationError("Please select the relation type");
      return false;
    }

    if (!formData.relationName.trim()) {
      setValidationError("Please enter the relation name");
      return false;
    }

    if (!formData.age.trim()) {
      setValidationError("Please enter the age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }

    // Validate address
    if (!formData.address.line1.trim()) {
      setValidationError("Please enter the address line 1");
      return false;
    }

    if (!formData.address.city.trim()) {
      setValidationError("Please enter the city");
      return false;
    }

    if (!formData.address.state.trim()) {
      setValidationError("Please enter the state");
      return false;
    }

    if (!formData.address.pinCode.trim()) {
      setValidationError("Please enter the PIN code");
      return false;
    } else if (!/^\d{6}$/.test(formData.address.pinCode)) {
      setValidationError("PIN code must be 6 digits");
      return false;
    }

    // Validate Aadhaar number
    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }

    // Validate HUF name
    if (!formData.hufName.trim()) {
      setValidationError("Please enter the HUF name");
      return false;
    }

    // Validate HUF existence date
    if (!formData.hufExistenceDate.trim()) {
      setValidationError("Please enter the HUF existence date");
      return false;
    }

    // Validate at least one coparcener
    let hasValidCoparcener = false;
    for (let i = 0; i < formData.coparceners.length; i++) {
      const coparcener = formData.coparceners[i];
      if (
        coparcener.name.trim() &&
        coparcener.relationship.trim() &&
        coparcener.address.trim()
      ) {
        hasValidCoparcener = true;
        break;
      }
    }

    if (!hasValidCoparcener) {
      setValidationError(
        "Please add at least one coparcener with complete details"
      );
      return false;
    }

    // Validate date and place
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    if (!formData.day.trim()) {
      setValidationError("Please enter the day");
      return false;
    } else if (
      isNaN(formData.day) ||
      parseInt(formData.day) <= 0 ||
      parseInt(formData.day) > 31
    ) {
      setValidationError("Please enter a valid day (1-31)");
      return false;
    }

    if (!formData.month.trim()) {
      setValidationError("Please select a month");
      return false;
    }

    if (!formData.year.trim()) {
      setValidationError("Please enter the year");
      return false;
    }

    return true;
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    // Validate form before showing mobile modal
    if (validateForm()) {
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
      // Auto-hide the error notification after 5 seconds
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 5000);
    }
  };

  const handleMobileSubmit = async () => {
    if (!mobileNumber.trim()) {
      setMobileError("Mobile number is required");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    setMobileError("");
    setShowMobileModal(false);
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const dataWithMobile = {
        ...formData,
        mobileNumber,
        userName,
      };

      const response = await sendHufData(dataWithMobile);
      console.log("responsein", response);

      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);
      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-HUF-12",
        },
      });

      // setShowServiceOptionsModal(true);
      // setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(
        error.message || "An error occurred while submitting your form"
      );
      setIsSubmitting(false);
    }
  };

  const getServiceOptions = () => {
    if (!documentDetails) return [];

    const options = [];

    options.push({
      id: "draft",
      name: "Draft Only",
      price: documentDetails.draftCharge || 0,
      hasNotary: documentDetails.hasDraftNotaryCharge,
      notaryCharge: documentDetails.draftNotaryCharge || 0,
      description: "Digital document sent to your email",
    });

    options.push({
      id: "draft_estamp",
      name: "Draft + E-stamp",
      price: documentDetails.pdfCharge || 0,
      hasNotary: documentDetails.hasPdfNotaryCharge,
      notaryCharge: documentDetails.pdfNotaryCharge || 0,
      description: "Digital document with legal e-stamp",
    });

    options.push({
      id: "draft_estamp_delivery",
      name: "Draft + E-stamp + Delivery",
      price: documentDetails.homeDropCharge || 0,

      hasNotary: documentDetails.hasHomeDropNotaryCharge,
      notaryCharge: documentDetails.homeDropNotaryCharge || 0,
      description: "Physical copy delivered to your address",
    });

    return options;
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    handlePayment(service);
  };

  const handlePayment = async (service) => {
    try {
      const totalPrice = service.hasNotary
        ? service.price + service.notaryCharge
        : service.price;

      setShowServiceOptionsModal(false);

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          initializeRazorpay(service, totalPrice);
        };

        script.onerror = () => {
          console.error("Razorpay SDK failed to load");
          alert("Payment gateway failed to load. Please try again later.");
        };

        document.body.appendChild(script);
      } else {
        initializeRazorpay(service, totalPrice);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const initializeRazorpay = async (service, totalPrice) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Draft Maker",
        description: `${documentDetails.documentType} - ${service.name}`,
        handler: function (response) {
          console.log("razorpay response", response);
          handlePaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            documentType: documentDetails.documentType,
            fullName: formData.name,
            serviceType: service.id,
            serviceName: service.name,
            amount: totalPrice,
            includesNotary: service.hasNotary,
            userName: userName,
          });
        },
        prefill: {
          name: userName,
          contact: mobileNumber,
        },
        notes: {
          bookingId: bookingId,
          serviceType: service.id,
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        fetch("/api/payment-failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: response.error,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            serviceType: service.id,
            status: "failed",
            userName,
          }),
        }).catch((error) => {
          console.error("Error logging payment failure:", error);
        });

        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error("Error in Razorpay initialization:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      setPaymentSuccess(true);
      setPaymentDetails(paymentData);

      const paymentConfirmationData = {
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature,
        bookingId: paymentData.bookingId,
        mobileNumber: paymentData.mobileNumber,
        documentType: documentDetails.documentType,
        fullName: formData.name,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        status: "success",
        userName: userName,
      };

      const confirmationResponse = await createHufPaymentData(
        paymentConfirmationData
      );
      if (confirmationResponse.status === 200) {
        const confirmationData = confirmationResponse.data.data;
        console.log("Payment confirmation successful:", confirmationData);

        setTimeout(() => {
          window.location.href = `/documents/name/name-correction`;
        }, 3000);
      } else {
        const errorData = confirmationResponse.data.data;
        throw new Error(errorData.message || "Failed to confirm payment");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert(
        "Payment was processed but we couldn't update your booking. Our team will contact you shortly."
      );
    }
  };

  return (
    <div className="container-fluid mx-auto max-w-8xl py-2 sm:py-4 md:py-6 lg:py-8 px-1 sm:px-2 md:px-4 lg:px-6">
      {/* Add Error Notification Component */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 md:gap-6">
        <div className="w-full ml-8">
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 mb-4 lg:mb-0">
            <HufForm
              formData={formData}
              handleChange={handleChange}
              handleCoparcenerChange={handleCoparcenerChange}
              addCoparcener={addCoparcener}
              removeCoparcener={removeCoparcener}
            />
            {submissionError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
                {submissionError}
              </div>
            )}
            <div className="text-black font-bold text-center mt-4">
              <p>
                🔒 Preview and editing options will be available after
                successful payment.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-1/2">
          <div className="lg:sticky lg:top-4">
            <div className="bg-gray-50 rounded-lg p-1 sm:p-2 md:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-center text-gray-800 lg:hidden">
                Preview
              </h3>
              <div className="transform scale-90 sm:scale-95 md:scale-100 origin-top -mx-2 sm:mx-0">
                <HufPreview formData={formData} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-6 sm:mt-8 flex flex-col items-center px-2 sm:px-4">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg text-sm sm:text-base md:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>

      <MobileNumberInput
        mobileNumber={mobileNumber}
        showMobileModal={showMobileModal}
        setShowMobileModal={setShowMobileModal}
        setMobileNumber={setMobileNumber}
        mobileError={mobileError}
        handleMobileSubmit={handleMobileSubmit}
        username={userName}
        setUsername={setUserName}
      />
      {showServiceOptionsModal && (
        <ServicePackageNotification
          setShowServiceOptionsModal={setShowServiceOptionsModal}
          bookingId={bookingId}
          mobileNumber={mobileNumber}
          documentName={documentDetails.documentType}
          getServiceOptions={getServiceOptions}
          handleServiceSelection={handleServiceSelection}
        />
      )}
      {paymentSuccess && paymentDetails && (
        <PaymentConfirmation
          paymentSuccess={paymentSuccess}
          paymentDetails={paymentDetails}
          bookingId={bookingId}
        />
      )}
    </div>
  );
}
