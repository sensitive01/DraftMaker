import React from "react";

const AddressLineSection = ({requestorName,setRequestorName,paymentErrors,mobileNumber,setMobileNumber,formErrors,deliveryAddress,setDeliveryAddress}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        Delivery Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            placeholder="Enter full name"
            className={`w-full px-4 py-2.5 border ${
              requestorName ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {paymentErrors.requestorName && (
            <p className="mt-1 text-sm text-red-600">
              {paymentErrors.requestorName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm font-medium">+91</span>
            </div>
            <input
              type="tel"
              id="paymentMobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
              className={`w-full pl-12 pr-4 py-2.5 border ${
                formErrors.deliveryPhoneNumber
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
            />
          </div>
        </div>
        {paymentErrors.mobileNumber && (
          <p className="mt-1 text-sm text-red-600">
            {paymentErrors.mobileNumber}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Id *
          </label>
          <div className="relative">
            <input
              type="text"
              id="emailId"
              value={deliveryAddress.email}
              onChange={(e) =>
                setDeliveryAddress((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter Your Email Id"
              className={`w-full pl-3  py-2.5 border ${
                formErrors.emailId ? "border-red-300" : "border-gray-300"
              } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
            />
          </div>
        </div>
        {paymentErrors.email && (
          <p className="mt-1 text-sm text-red-600">{paymentErrors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1 *
          </label>
          <input
            type="text"
            value={deliveryAddress.addressLine1}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                addressLine1: e.target.value,
              }))
            }
            placeholder="House/Flat number, Building name, Street"
            className={`w-full px-4 py-2.5 border ${
              formErrors.deliveryAddressLine1
                ? "border-red-300"
                : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {formErrors.deliveryAddressLine1 && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.deliveryAddressLine1}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            value={deliveryAddress.addressLine2}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                addressLine2: e.target.value,
              }))
            }
            placeholder="Area, Colony, Sector (Optional)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={deliveryAddress.city}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            placeholder="Enter city"
            className={`w-full px-4 py-2.5 border ${
              formErrors.deliveryCity ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {formErrors.deliveryCity && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.deliveryCity}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={deliveryAddress.state}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
            placeholder="Enter state"
            className={`w-full px-4 py-2.5 border ${
              formErrors.deliveryState ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {formErrors.deliveryState && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.deliveryState}
            </p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            value={deliveryAddress.pincode}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                pincode: e.target.value,
              }))
            }
            placeholder="Enter 6-digit pincode"
            maxLength="6"
            className={`w-full px-4 py-2.5 border ${
              formErrors.deliveryPincode ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {formErrors.deliveryPincode && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.deliveryPincode}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {/* Landmark */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Landmark
          </label>
          <input
            type="text"
            value={deliveryAddress.landmark}
            onChange={(e) =>
              setDeliveryAddress((prev) => ({
                ...prev,
                landmark: e.target.value,
              }))
            }
            placeholder="Nearby landmark (Optional)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressLineSection;
