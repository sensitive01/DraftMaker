import { useState } from "react";
import RentalForm from "./RentalForm";
import RentalPreview from "./RentalPreview";
import { useNavigate, useParams } from "react-router-dom";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification"; // Import the error notification component
import {
  createRecidentailPaymentData,
  sendRecidentailData,
} from "../../../api/service/axiosService";

export default function RentalAgreementForm() {
  const navigate = useNavigate();
  const { type } = useParams();
  console.log("Type", type);
  const [formData, setFormData] = useState({
    formId: "DM-RFD-18",
    agreementDate: "",
    lessors: [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
      },
    ],
    lessees: [
      {
        name: "",
        aadhaar: "",
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCity: "",
        permanentState: "",
        permanentPinCode: "",
      },
    ],
    lessorAddressLine1: "",
    lessorAddressLine2: "",
    lessorCity: "",
    lessorState: "",
    lessorPinCode: "",
    lesseeAadhaar: "",
    lesseePermanentAddressLine1: "",
    lesseePermanentAddressLine2: "",
    lesseePermanentCity: "",
    lesseePermanentState: "",
    lesseePermanentPinCode: "",
    rentAmount: "",
    rentAmountWords: "",
    rentDueDate: "5",
    depositAmount: "",
    depositAmountWords: "",
    agreementStartDate: "",
    agreementEndDate: "",
    rentIncreasePercentage: "",
    noticePeriod: "",
    terminationPeriod: "",
    paintingCharges: "",
    usePurpose: "RESIDENTIAL PURPOSE",
    bhkConfig: "",
    bedroomCount: "",
    hallCount: "",
    kitchenCount: "",
    toiletCount: "",
    additionaldetails: "",
    fixtures: [{ item: "", quantity: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
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
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addLessor = () => {
    setFormData((prev) => ({
      ...prev,
      lessors: [
        ...prev.lessors,
        {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pinCode: "",
        },
      ],
    }));
  };

  const removeLessor = (index) => {
    setFormData((prev) => ({
      ...prev,
      lessors: prev.lessors.filter((_, i) => i !== index),
    }));
  };

  const addLessee = () => {
    setFormData((prev) => ({
      ...prev,
      lessees: [
        ...prev.lessees,
        {
          name: "",
          aadhaar: "",
          permanentAddressLine1: "",
          permanentAddressLine2: "",
          permanentCity: "",
          permanentState: "",
          permanentPinCode: "",
        },
      ],
    }));
  };

  const removeLessee = (index) => {
    setFormData((prev) => ({
      ...prev,
      lessees: prev.lessees.filter((_, i) => i !== index),
    }));
  };

  const handleLessorChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      lessors: prev.lessors.map((lessor, i) =>
        i === index ? { ...lessor, [name]: value } : lessor
      ),
    }));
  };

  const handleLesseeChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      lessees: prev.lessees.map((lessee, i) =>
        i === index ? { ...lessee, [name]: value } : lessee
      ),
    }));
  };

  const handleFixtureChange = (index, field, value) => {
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedFixtures = [...formData.fixtures];
    updatedFixtures[index] = { ...updatedFixtures[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      fixtures: updatedFixtures,
    }));
  };

  const addFixture = () => {
    setFormData((prev) => ({
      ...prev,
      fixtures: [...prev.fixtures, { item: "", quantity: "" }],
    }));
  };

  const removeFixture = (index) => {
    const updatedFixtures = formData.fixtures.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      fixtures: updatedFixtures,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    if (!formData.agreementDate.trim()) {
      setValidationError("Please enter the agreement date");
      return false;
    }

    // if (!formData.lessorAddressLine1.trim()) {
    //   setValidationError("Please enter lessor's address line 1");
    //   return false;
    // }

    // if (!formData.lessorCity.trim()) {
    //   setValidationError("Please enter lessor's city");
    //   return false;
    // }

    // if (!formData.lessorState.trim()) {
    //   setValidationError("Please enter lessor's state");
    //   return false;
    // }

    // if (!formData.lessorPinCode.trim()) {
    //   setValidationError("Please enter lessor's PIN code");
    //   return false;
    // } else if (!/^\d{6}$/.test(formData.lessorPinCode)) {
    //   setValidationError("Lessor's PIN code must be 6 digits");
    //   return false;
    // }

    // if (!formData.lesseeAadhaar.trim()) {
    //   setValidationError("Please enter lessee's Aadhaar number");
    //   return false;
    // } else if (!/^\d{12}$/.test(formData.lesseeAadhaar)) {
    //   setValidationError("Aadhaar number must be 12 digits");
    //   return false;
    // }

    // if (!formData.lesseePermanentAddressLine1.trim()) {
    //   setValidationError("Please enter lessee's permanent address line 1");
    //   return false;
    // }

    // if (!formData.lesseePermanentCity.trim()) {
    //   setValidationError("Please enter lessee's permanent city");
    //   return false;
    // }

    // if (!formData.lesseePermanentState.trim()) {
    //   setValidationError("Please enter lessee's permanent state");
    //   return false;
    // }

    // if (!formData.lesseePermanentPinCode.trim()) {
    //   setValidationError("Please enter lessee's permanent PIN code");
    //   return false;
    // } else if (!/^\d{6}$/.test(formData.lesseePermanentPinCode)) {
    //   setValidationError("Lessee's permanent PIN code must be 6 digits");
    //   return false;
    // }

    if (!formData.rentAmount.trim()) {
      setValidationError("Please enter rent amount");
      return false;
    } else if (
      isNaN(formData.rentAmount) ||
      parseFloat(formData.rentAmount) <= 0
    ) {
      setValidationError("Please enter a valid rent amount");
      return false;
    }

    if (!formData.rentAmountWords.trim()) {
      setValidationError("Please enter rent amount in words");
      return false;
    }

    if (!formData.depositAmount.trim()) {
      setValidationError("Please enter deposit amount");
      return false;
    } else if (
      isNaN(formData.depositAmount) ||
      parseFloat(formData.depositAmount) <= 0
    ) {
      setValidationError("Please enter a valid deposit amount");
      return false;
    }

    if (!formData.depositAmountWords.trim()) {
      setValidationError("Please enter deposit amount in words");
      return false;
    }

    if (!formData.noticePeriod.trim()) {
      setValidationError("Please enter notice period");
      return false;
    }

    if (!formData.bhkConfig.trim()) {
      setValidationError("Please enter BHK configuration");
      return false;
    }

    if (!formData.bedroomCount.trim()) {
      setValidationError("Please enter bedroom count");
      return false;
    } else if (
      isNaN(formData.bedroomCount) ||
      parseInt(formData.bedroomCount) < 0
    ) {
      setValidationError("Please enter a valid bedroom count");
      return false;
    }

    if (!formData.hallCount.trim()) {
      setValidationError("Please enter hall count");
      return false;
    } else if (isNaN(formData.hallCount) || parseInt(formData.hallCount) < 0) {
      setValidationError("Please enter a valid hall count");
      return false;
    }

    if (!formData.toiletCount.trim()) {
      setValidationError("Please enter toilet count");
      return false;
    } else if (
      isNaN(formData.toiletCount) ||
      parseInt(formData.toiletCount) < 0
    ) {
      setValidationError("Please enter a valid toilet count");
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

      const response = await sendRecidentailData(dataWithMobile);
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
          formId: "DM-RFD-18",
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
            fullName: formData.fullName,
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
            userName: userName,
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
        fullName: formData.fullName,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        status: "success",
        userName: userName,
      };

      const confirmationResponse = await createRecidentailPaymentData(
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
    <div className="container-fluid mx-auto p-4">
      {/* Add Error Notification Component */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="w-full">
          <RentalForm
            formData={formData}
            handleChange={handleChange}
            handleFixtureChange={handleFixtureChange}
            addFixture={addFixture}
            removeFixture={removeFixture}
            addLessor={addLessor}
            removeLessor={removeLessor}
            addLessee={addLessee}
            removeLessee={removeLessee}
            handleLessorChange={handleLessorChange}
            handleLesseeChange={handleLesseeChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
          <div className="text-black font-bold text-center mt-4">
            <p>
              🔒 Preview and editing options will be available after successful
              payment.
            </p>
          </div>
        </div>
        {/* <div
          className="w-full md:w-1/2 bg-white shadow-lg rounded-lg"
          style={{ height: "2300px", overflowY: "scroll" }}
        >
          <RentalPreview formData={formData} />
        </div> */}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg w-full md:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
