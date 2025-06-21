// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getStampAndDeliveryCharges } from "../../api/service/axiosService";

// const DocumentPaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log("Location", location);
//   const { bookingId, documentDetails, mobileNumber } = location.state || {};
//   console.log(bookingId, documentDetails, mobileNumber);

//   const [selectedService, setSelectedService] = useState(null);
//   const [stampDutyOptions, setStampDutyOptions] = useState([]);
//   const [deliveryChargeOptions, setDeliveryChargeOptions] = useState([]);
//   const [selectedStampDuty, setSelectedStampDuty] = useState(null);
//   const [selectedDeliveryCharge, setSelectedDeliveryCharge] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getStampAndDeliveryCharges();
//         console.log("response", response);
//         setStampDutyOptions(response.data.stampDuty || []);
//         setDeliveryChargeOptions(response.data.deliveryCharges || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Dynamic service options based on documentDetails
//   const getServiceOptions = () => [
//     {
//       id: "draft",
//       name: "Draft Only",
//       description: "Get your document drafted by experts.",
//       price: documentDetails?.draftCharge || 0,
//       hasNotary: documentDetails?.draftNotaryCharge > 0,
//       notaryCharge: documentDetails?.draftNotaryCharge || 0,
//       requiresStamp: false,
//       requiresDelivery: false,
//     },
//     {
//       id: "draft_estamp",
//       name: "Draft + e-Stamp",
//       description: "Includes e-stamp along with document draft.",
//       price: documentDetails?.draftCharge || 0,
//       hasNotary: documentDetails?.draftNotaryCharge > 0,
//       notaryCharge: documentDetails?.draftNotaryCharge || 0,
//       requiresStamp: true,
//       requiresDelivery: false,
//     },
//     {
//       id: "draft_estamp_delivery",
//       name: "Draft + e-Stamp + Delivery",
//       description: "Complete service including document delivery.",
//       price: documentDetails?.draftCharge || 0,
//       hasNotary: documentDetails?.draftNotaryCharge > 0,
//       notaryCharge: documentDetails?.draftNotaryCharge || 0,
//       requiresStamp: true,
//       requiresDelivery: true,
//     },
//   ];

//   const handlePackageSelect = (service) => {
//     setSelectedService(service);
//     // Reset selections when changing package
//     if (!service.requiresStamp) {
//       setSelectedStampDuty(null);
//     }
//     if (!service.requiresDelivery) {
//       setSelectedDeliveryCharge(null);
//     }
//   };

//   const handleStampDutySelect = (stampDuty) => {
//     setSelectedStampDuty(stampDuty);
//   };

//   const handleDeliveryChargeSelect = (deliveryCharge) => {
//     setSelectedDeliveryCharge(deliveryCharge);
//   };

//   const calculateStampDutyAmount = (stampDuty, baseAmount = 1000) => {
//     if (stampDuty.calculationType === "fixed") {
//       return stampDuty.fixedAmount;
//     } else if (stampDuty.calculationType === "percentage") {
//       let amount = (baseAmount * stampDuty.percentage) / 100;
//       if (stampDuty.minAmount > 0) {
//         amount = Math.max(amount, stampDuty.minAmount);
//       }
//       if (stampDuty.maxAmount > 0) {
//         amount = Math.min(amount, stampDuty.maxAmount);
//       }
//       return amount;
//     }
//     return 0;
//   };

//   const calculateTotalAmount = () => {
//     if (!selectedService) return 0;

//     let total = selectedService.price;

//     if (selectedService.hasNotary) {
//       total += selectedService.notaryCharge;
//     }

//     if (selectedService.requiresStamp && selectedStampDuty) {
//       total += calculateStampDutyAmount(selectedStampDuty);
//     }

//     if (selectedService.requiresDelivery && selectedDeliveryCharge) {
//       total += selectedDeliveryCharge.charge;
//     }

//     return total;
//   };

//   const canProceedToPayment = () => {
//     if (!selectedService) return false;

//     if (selectedService.requiresStamp && !selectedStampDuty) return false;
//     if (selectedService.requiresDelivery && !selectedDeliveryCharge)
//       return false;

//     return true;
//   };

//   const handlePayment = () => {
//     if (!canProceedToPayment()) {
//       alert(
//         "Please complete all required selections before proceeding to payment."
//       );
//       return;
//     }

//     const totalAmount = calculateTotalAmount();
//     alert(`Proceeding to pay ₹${totalAmount} for ${selectedService.name}`);
//     // Redirect or trigger payment logic
//   };

//   const goBack = () => {
//     navigate(-1); // Go back
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Page Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 onClick={goBack}
//                 className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
//                 aria-label="Go back"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>
//               <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 mr-3 text-red-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//                 Select Service Package
//               </h1>
//             </div>
//           </div>
//           <p className="text-gray-600 mt-2 ml-12">
//             Choose the right service package for your document needs
//           </p>
//         </div>

//         {/* Main Content Card */}
//         <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-600 overflow-hidden">
//           {/* Booking Info */}
//           <div className="bg-red-50 p-6 border-b border-red-100">
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div className="flex items-center">
//                 <p className="font-medium text-red-800 text-sm uppercase tracking-wider mr-3">
//                   Booking Details
//                 </p>
//                 <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
//                   #{bookingId}
//                 </span>
//               </div>
//               <div className="flex space-x-6 text-sm">
//                 <div className="flex items-center">
//                   <span className="text-gray-600 mr-2">Document Type:</span>
//                   <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
//                     {documentDetails?.documentType}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-gray-600 mr-2">Mobile:</span>
//                   <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
//                     +91{mobileNumber}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <p className="text-gray-600 text-lg mb-8">
//               Choose from our service packages below:
//             </p>

//             {/* Service Options */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               {getServiceOptions().map((service) => (
//                 <button
//                   key={service.id}
//                   onClick={() => handlePackageSelect(service)}
//                   className={`bg-white border-2 ${
//                     selectedService?.id === service.id
//                       ? "border-red-500 ring-4 ring-red-100 shadow-lg"
//                       : "border-gray-200 hover:border-red-300 hover:shadow-md"
//                   } rounded-xl p-6 flex flex-col text-left transition-all duration-200 group relative`}
//                 >
//                   {selectedService?.id === service.id && (
//                     <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </div>
//                   )}

//                   <div className="flex items-center mb-4">
//                     <div className="mr-4 p-3 bg-red-50 rounded-xl text-red-500 group-hover:bg-red-100 transition-colors">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="font-bold text-lg text-gray-800 mb-1">
//                         {service.name}
//                       </h3>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 mb-4 text-sm leading-relaxed">
//                     {service.description}
//                   </p>

//                   <div className="mt-auto">
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-700">Draft charge:</span>
//                         <span className="font-bold text-red-600 text-lg">
//                           ₹{service.price}
//                         </span>
//                       </div>
//                       {service.hasNotary && service.notaryCharge > 0 && (
//                         <div className="flex justify-between items-center text-sm">
//                           <span className="text-gray-600">+ Notary:</span>
//                           <span className="font-medium text-gray-800">
//                             ₹{service.notaryCharge}
//                           </span>
//                         </div>
//                       )}
//                       {service.requiresStamp && (
//                         <div className="flex justify-between items-center text-sm">
//                           <span className="text-gray-600">+ e-Stamp:</span>
//                           <span className="font-medium text-gray-800">
//                             {selectedStampDuty
//                               ? `₹${calculateStampDutyAmount(
//                                   selectedStampDuty
//                                 )}`
//                               : "Select below"}
//                           </span>
//                         </div>
//                       )}
//                       {service.requiresDelivery && (
//                         <div className="flex justify-between items-center text-sm">
//                           <span className="text-gray-600">+ Delivery:</span>
//                           <span className="font-medium text-gray-800">
//                             {selectedDeliveryCharge
//                               ? `₹${selectedDeliveryCharge.charge}`
//                               : "Select below"}
//                           </span>
//                         </div>
//                       )}
//                       <div className="border-t pt-2 flex justify-between items-center">
//                         <span className="font-bold text-gray-800">Total:</span>
//                         <span className="font-bold text-red-600 text-xl">
//                           ₹
//                           {selectedService?.id === service.id
//                             ? calculateTotalAmount()
//                             : service.price +
//                               (service.hasNotary ? service.notaryCharge : 0)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Stamp Duty Selection */}
//             {selectedService?.requiresStamp && (
//               <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2 text-red-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   Select Stamp Duty Type
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {stampDutyOptions.map((stampDuty) => (
//                     <button
//                       key={stampDuty._id}
//                       onClick={() => handleStampDutySelect(stampDuty)}
//                       className={`p-4 border-2 rounded-lg text-left transition-all ${
//                         selectedStampDuty?._id === stampDuty._id
//                           ? "border-red-500 bg-red-50 ring-2 ring-red-200"
//                           : "border-gray-200 hover:border-red-300 bg-white hover:bg-red-50"
//                       }`}
//                     >
//                       <div className="font-medium text-gray-800 text-sm mb-2">
//                         {stampDuty.documentType}
//                       </div>
//                       <div className="text-xs text-gray-600 mb-2">
//                         Article: {stampDuty.articleNo}
//                       </div>
//                       <div className="font-bold text-red-600">
//                         {stampDuty.calculationType === "fixed"
//                           ? `₹${stampDuty.fixedAmount}`
//                           : `${stampDuty.percentage}% (Min: ₹${
//                               stampDuty.minAmount
//                             }${
//                               stampDuty.maxAmount > 0
//                                 ? `, Max: ₹${stampDuty.maxAmount}`
//                                 : ""
//                             })`}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Delivery Charge Selection */}
//             {selectedService?.requiresDelivery && (
//               <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2 text-red-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                     />
//                   </svg>
//                   Select Delivery Service
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {deliveryChargeOptions.map((deliveryCharge) => (
//                     <button
//                       key={deliveryCharge._id}
//                       onClick={() => handleDeliveryChargeSelect(deliveryCharge)}
//                       className={`p-4 border-2 rounded-lg text-left transition-all ${
//                         selectedDeliveryCharge?._id === deliveryCharge._id
//                           ? "border-red-500 bg-red-50 ring-2 ring-red-200"
//                           : "border-gray-200 hover:border-red-300 bg-white hover:bg-red-50"
//                       }`}
//                     >
//                       <div className="font-medium text-gray-800 text-sm mb-2">
//                         {deliveryCharge.serviceName}
//                       </div>
//                       <div className="text-xs text-gray-600 mb-2">
//                         {deliveryCharge.description}
//                       </div>
//                       <div className="font-bold text-red-600">
//                         ₹{deliveryCharge.charge}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//               <button
//                 onClick={goBack}
//                 className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center font-medium"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-2"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//                 Go Back
//               </button>

//               {canProceedToPayment() ? (
//                 <button
//                   onClick={handlePayment}
//                   className="px-8 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center font-medium text-lg shadow-lg hover:shadow-xl"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   Pay ₹{calculateTotalAmount()}
//                 </button>
//               ) : (
//                 <div className="text-gray-500 text-sm bg-gray-100 px-6 py-3 rounded-lg">
//                   {!selectedService
//                     ? "Please select a service package to continue"
//                     : "Please complete all required selections"}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentPaymentPage;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getStampAndDeliveryCharges,
  createAddressAffadavitPaymentData,
  createDualNameChangePaymentData,
  createNameChangePaymentData,
  createDobParentNameCorrectionPaymentData,
  birthCerticateNameCorrectionPaymentData,
  createCommercialPaymentData,
  createDobCorrectionPaymentData,
  createDocumentLostPaymentData,
  createGapPeriodPaymentData,
  gstPaymentData,
  createHufPaymentData,
  updateKhataCorrectionPaymentData,
  createMetriculationLostPaymentData,
  createPasswordAnnaxurePaymentData,
  createPassportnameChangePaymentData,
  createRecidentailPaymentData,
  createGassAffadavitPaymentData,
  createVehicleInsurencePaymentData,
} from "../../api/service/axiosService";

const DocumentPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    bookingId,
    documentDetails,
    mobileNumber,
    userName,
    formData,
    formId,
  } = location.state || {};

  const [selectedService, setSelectedService] = useState(null);
  const [stampDutyOptions, setStampDutyOptions] = useState([]);
  const [deliveryChargeOptions, setDeliveryChargeOptions] = useState([]);
  const [selectedStampDuty, setSelectedStampDuty] = useState(null);
  const [selectedDeliveryCharge, setSelectedDeliveryCharge] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isConsideration, setIsConsideration] = useState(false);
  const [considerationAmount, setConsiderationAmount] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    email: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStampAndDeliveryCharges();
        setStampDutyOptions(response.data.stampDuty || []);
        setDeliveryChargeOptions(response.data.deliveryCharges || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getServiceOptions = () => [
    {
      id: "draft",
      name: "Draft Only",
      description: "Get your document drafted by experts.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: false,
      requiresDelivery: false,
    },
    {
      id: "draft_estamp",
      name: "Draft + e-Stamp",
      description: "Includes e-stamp along with document draft.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: true,
      requiresDelivery: false,
    },
    {
      id: "draft_estamp_delivery",
      name: "Draft + e-Stamp + Delivery",
      description: "Complete service including document delivery.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: true,
      requiresDelivery: true,
    },
  ];

  const handlePackageSelect = (service) => {
    setSelectedService(service);
    if (!service.requiresStamp) {
      setSelectedStampDuty(null);
    }
    if (!service.requiresDelivery) {
      setSelectedDeliveryCharge(null);
    }
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStampDutySelect = (e) => {
    const selectedId = e.target.value;
    const stampDuty = stampDutyOptions.find((sd) => sd._id === selectedId);
    setSelectedStampDuty(stampDuty || null);
  };

  const handleDeliveryChargeSelect = (e) => {
    const selectedId = e.target.value;
    const deliveryCharge = deliveryChargeOptions.find(
      (dc) => dc._id === selectedId
    );
    setSelectedDeliveryCharge(deliveryCharge || null);
  };

  const calculateStampDutyAmount = (stampDuty, baseAmount = 1000) => {
    if (stampDuty.calculationType === "fixed") {
      return stampDuty.fixedAmount;
    } else if (stampDuty.calculationType === "percentage") {
      let amount = (baseAmount * stampDuty.percentage) / 100;
      if (stampDuty.minAmount > 0) {
        amount = Math.max(amount, stampDuty.minAmount);
      }
      if (stampDuty.maxAmount > 0) {
        amount = Math.min(amount, stampDuty.maxAmount);
      }
      return amount;
    }
    return 0;
  };

  const calculateTotalAmount = () => {
    if (!selectedService) return 0;

    let total = selectedService.price;

    if (selectedService.hasNotary) {
      total += selectedService.notaryCharge;
    }

    if (selectedService.requiresStamp && selectedStampDuty) {
      total += calculateStampDutyAmount(selectedStampDuty);
    }

    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      total += selectedDeliveryCharge.charge;
    }

    if (isConsideration && considerationAmount) {
      total += parseFloat(considerationAmount);
    }

    return total;
  };

  const canProceedToPayment = () => {
    if (!selectedService) return false;

    if (selectedService.requiresStamp && !selectedStampDuty) return false;
    if (selectedService.requiresDelivery && !selectedDeliveryCharge)
      return false;

    // Check if delivery address is complete when delivery is required
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      const requiredFields = ["addressLine1", "city", "state", "pincode"];
      for (let field of requiredFields) {
        if (!deliveryAddress[field] || deliveryAddress[field].trim() === "") {
          return false;
        }
      }
    }

    return true;
  };

  // Razorpay Integration Functions
  const initializeRazorpay = async (service, totalPrice) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Draft Maker",
        description: `${documentDetails.documentType} - ${service.name}`,
        handler: function (response) {
          handlePaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            documentType: documentDetails.documentType,
            fullName: formData?.fullName || userName,
            serviceType: service.id,
            serviceName: service.name,
            amount: totalPrice,
            includesNotary: service.hasNotary,
            userName: userName,
            selectedStampDuty: selectedStampDuty,
            selectedDeliveryCharge: selectedDeliveryCharge,
            serviceDetails: {
              basePrice: service.price,
              notaryCharge: service.hasNotary ? service.notaryCharge : 0,
              stampDutyAmount: selectedStampDuty
                ? calculateStampDutyAmount(selectedStampDuty)
                : 0,
              deliveryCharge: selectedDeliveryCharge
                ? selectedDeliveryCharge.charge
                : 0,
              requiresStamp: service.requiresStamp,
              requiresDelivery: service.requiresDelivery,
              deliveryAddress: selectedService?.requiresDelivery
                ? JSON.stringify(deliveryAddress)
                : null,
              considerationAmount: isConsideration ? considerationAmount : null,
            },
          });
        },
        prefill: {
          name: userName,
          contact: mobileNumber,
        },
        notes: {
          bookingId: bookingId,
          serviceType: service.id,
          serviceName: service.name,
          stampDutyId: selectedStampDuty?._id || null,
          deliveryChargeId: selectedDeliveryCharge?._id || null,
          documentType: documentDetails.documentType,
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
            serviceName: service.name,
            userName: userName,
            status: "failed",
            selectedStampDuty: selectedStampDuty,
            selectedDeliveryCharge: selectedDeliveryCharge,
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
        fullName: formData?.fullName || userName,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        status: "success",
        userName: userName,
        selectedStampDuty: paymentData.selectedStampDuty,
        selectedDeliveryCharge: paymentData.selectedDeliveryCharge,
        serviceDetails: paymentData.serviceDetails,
        deliveryAddress: selectedService?.requiresDelivery
          ? deliveryAddress
          : null,
        considerationAmount: isConsideration ? considerationAmount : null,
      };

      let confirmationResponse;

      // Payment confirmation logic based on formId
      switch (formId) {
        case "DM-DNC-1":
          confirmationResponse = await createDualNameChangePaymentData(paymentConfirmationData);
          break;
        case "DM-NC-2":
          confirmationResponse = await createNameChangePaymentData(paymentConfirmationData);
          break;
        case "DM-DOBC-3":
          confirmationResponse = await createDobCorrectionPaymentData(paymentConfirmationData);
          break;
        case "DM-GAS-5":
          confirmationResponse = await createGassAffadavitPaymentData(paymentConfirmationData);
          break;
        case "DM-DOC-LOST-5":
          confirmationResponse = await createDocumentLostPaymentData(paymentConfirmationData);
          break;
        case "DM-BCNCP-6":
          confirmationResponse = await createDobParentNameCorrectionPaymentData(paymentConfirmationData);
          break;
        case "DM-BC-MNC-7":
          confirmationResponse = await birthCerticateNameCorrectionPaymentData(paymentConfirmationData);
          break;
        case "DM-GST-8":
          confirmationResponse = await gstPaymentData(paymentConfirmationData);
          break;
        case "DM-MAL-9":
          confirmationResponse = await createMetriculationLostPaymentData(paymentConfirmationData);
          break;
        case "DM-KH-10":
          confirmationResponse = await updateKhataCorrectionPaymentData(paymentConfirmationData);
          break;
        case "DM-VIC-11":
          confirmationResponse = await createVehicleInsurencePaymentData(paymentConfirmationData);
          break;
        case "DM-HUF-12":
          confirmationResponse = await createHufPaymentData(paymentConfirmationData);
          break;
        case "DM-GP-13":
          confirmationResponse = await createGapPeriodPaymentData(paymentConfirmationData);
          break;
        case "DM-PAF-14":
          confirmationResponse = await createPasswordAnnaxurePaymentData(paymentConfirmationData);
          break;
        case "DM-PNC-15":
          confirmationResponse = await createPassportnameChangePaymentData(paymentConfirmationData);
          break;
        case "DM-AAF-16":
          confirmationResponse = await createAddressAffadavitPaymentData(paymentConfirmationData);
          break;
        case "DM-CFD-17":
          confirmationResponse = await createCommercialPaymentData(paymentConfirmationData);
          break;
        case "DM-RFD-18":
          confirmationResponse = await createRecidentailPaymentData(paymentConfirmationData);
          break;
        default:
          throw new Error("Invalid form ID");
      }

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
      alert("Payment was processed but we couldn't update your booking. Our team will contact you shortly.");
    }
  };

  const handlePayment = async () => {
    if (!canProceedToPayment()) {
      alert("Please complete all required selections before proceeding to payment.");
      return;
    }

    try {
      const totalPrice = calculateTotalAmount();

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          initializeRazorpay(selectedService, totalPrice);
        };

        script.onerror = () => {
          console.error("Razorpay SDK failed to load");
          alert("Payment gateway failed to load. Please try again later.");
        };

        document.body.appendChild(script);
      } else {
        initializeRazorpay(selectedService, totalPrice);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={goBack}
                className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-3 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Select Service Package
              </h1>
            </div>
          </div>
          <p className="text-gray-600 mt-2 ml-12">
            Choose the right service package for your document needs
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-600 overflow-hidden">
          {/* Booking Info */}
          <div className="bg-red-50 p-6 border-b border-red-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <p className="font-medium text-red-800 text-sm uppercase tracking-wider mr-3">
                  Booking Details
                </p>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  #{bookingId}
                </span>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Document Type:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    {documentDetails?.documentType}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Mobile:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    +91{mobileNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-lg mb-8">
              Choose from our service packages below:
            </p>

            {/* Service Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb -8">
              {getServiceOptions().map((service) => (
                <button
                  key={service.id}
                  onClick={() => handlePackageSelect(service)}
                  className={`bg-white border-2 ${
                    selectedService?.id === service.id
                      ? "border-red-500 ring-4 ring-red-100 shadow-lg"
                      : "border-gray-200 hover:border-red-300 hover:shadow-md"
                  } rounded-xl p-6 flex flex-col text-left transition-all duration-200 group relative`}
                >
                  {selectedService?.id === service.id && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 bg-red-50 rounded-xl text-red-500 group-hover:bg-red-100 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Draft charge:</span>
                        <span className="font-bold text-red-600 text-lg">
                          ₹{service.price}
                        </span>
                      </div>
                      {service.hasNotary && service.notaryCharge > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ Notary:</span>
                          <span className="font-medium text-gray-800">
                            ₹{service.notaryCharge}
                          </span>
                        </div>
                      )}
                      {service.requiresStamp && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ e-Stamp:</span>
                          <span className="font-medium text-gray-800">
                            {selectedStampDuty
                              ? `₹${calculateStampDutyAmount(selectedStampDuty)}`
                              : "Select below"}
                          </span>
                        </div>
                      )}
                      {service.requiresDelivery && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ Delivery:</span>
                          <span className="font-medium text-gray-800">
                            {selectedDeliveryCharge
                              ? `₹${selectedDeliveryCharge.charge}`
                              : "Select below"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Stamp Duty Selection - Dropdown */}
            {selectedService?.requiresStamp && (
              <div className="mb-6 p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Select Stamp Duty Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Stamp Duty Option
                    </label>
                    <select
                      value={selectedStampDuty?._id || ""}
                      onChange={handleStampDutySelect}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-md"
                    >
                      <option value="">-- Select Stamp Duty --</option>
                      {stampDutyOptions.map((stampDuty) => (
                        <option key={stampDuty._id} value={stampDuty._id}>
                          {stampDuty.documentType}
                          {stampDuty.calculationType === "fixed"
                            ? ` (₹${stampDuty.fixedAmount})`
                            : ` (${stampDuty.percentage}% - Min: ₹${
                                stampDuty.minAmount
                              }${
                                stampDuty.maxAmount > 0
                                  ? `, Max: ₹${stampDuty.maxAmount}`
                                  : ""
                              })`}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedStampDuty && (
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-large text-gray-800 mb-2">
                        Selected Stamp Duty
                      </h4>
                      <div className="space-y-1 text-lg">
                        <p>
                          <span className="text-gray-600">Document Type:</span>{" "}
                          {selectedStampDuty.documentType}
                        </p>
                        <p>
                          <span className="text-gray-600">Article No:</span>{" "}
                          {selectedStampDuty.articleNo}
                        </p>
                        <p className="font-bold text-red-600 text-lg">
                          Amount: ₹{calculateStampDutyAmount(selectedStampDuty)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Charge Selection - Dropdown */}
            {selectedService?.requiresDelivery && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Select Delivery Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Choose Delivery Option
                    </label>
                    <select
                      value={selectedDeliveryCharge?._id || ""}
                      onChange={handleDeliveryChargeSelect}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-lg"
                    >
                      <option value="">-- Select Delivery Service --</option>
                      {deliveryChargeOptions.map((deliveryCharge) => (
                        <option
                          key={deliveryCharge._id}
                          value={deliveryCharge._id}
                        >
                          {deliveryCharge.serviceName} - ₹
                          {deliveryCharge.charge}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDeliveryCharge && (
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Selected Delivery Service
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-600">Service:</span>{" "}
                          {selectedDeliveryCharge.serviceName}
                        </p>
                        <p>
                          <span className="text-gray-600">Description:</span>{" "}
                          {selectedDeliveryCharge.description}
                        </p>
                        <p className="font-bold text-red-600 text-lg">
                          Charge: ₹{selectedDeliveryCharge.charge}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedService?.requiresDelivery && selectedDeliveryCharge && (
              <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Enter Delivery Address
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.fullName}
                      onChange={(e) =>
                        handleAddressChange("fullName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) =>
                        handleAddressChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={deliveryAddress.email}
                      onChange={(e) =>
                        handleAddressChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.addressLine1}
                      onChange={(e) =>
                        handleAddressChange("addressLine1", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="House/Flat No, Street Name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.addressLine2}
                      onChange={(e) =>
                        handleAddressChange("addressLine2", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Area, Landmark (Optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.state}
                      onChange={(e) =>
                        handleAddressChange("state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter state"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.pincode}
                      onChange={(e) =>
                        handleAddressChange("pincode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Enter pincode"
                      maxLength="6"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Consideration Amount Checkbox */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isConsideration}
                  onChange={() => setIsConsideration(!isConsideration)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Add Consideration Amount
                </span>
              </label>
              {isConsideration && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consideration Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={considerationAmount}
                    onChange={(e) => setConsiderationAmount(e.target.value)}
                    placeholder="Enter consideration amount"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={goBack}
                className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go Back
              </button>

              {canProceedToPayment() ? (
                <button
                  onClick={handlePayment}
                  className="px-8 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Pay ₹{calculateTotalAmount()}
                </button>
              ) : (
                <div className="text-gray-500 text-sm bg-gray-100 px-6 py-3 rounded-lg">
                  {!selectedService
                    ? "Please select a service package to continue"
                    : "Please complete all required selections"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPaymentPage;
