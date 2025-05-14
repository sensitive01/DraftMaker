import React from "react";

const ServicePackageNotification = ({
  showServiceOptionsModal,
  setShowServiceOptionsModal,
  bookingId,
  mobileNumber,
  getServiceOptions,
  handleServiceSelection,
}) => {
  return (
    <div>
      {" "}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all border-t-4 border-red-600 overflow-hidden">
          {/* Modal Header with Close Button - Compressed padding */}
          <div className="sticky top-0 bg-white z-10 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Select Service Package
            </h2>
            <button
              onClick={() => setShowServiceOptionsModal(false)}
              className="text-gray-400 hover:text-red-600 focus:outline-none transition duration-200 p-1"
              aria-label="Close modal"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            {/* Booking Information - Horizontal layout to save vertical space */}
            <div className="bg-red-50 p-3 rounded-lg mb-3 border border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="font-medium text-red-800 text-sm uppercase tracking-wider mr-2">
                    Booking Details
                  </p>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    #{bookingId}
                  </span>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex">
                    <span className="text-gray-600 mr-1">Document Type:</span>
                    <span className="font-semibold text-gray-800">
                      Dual Name Change
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 mr-1">Mobile:</span>
                    <span className="font-semibold text-gray-800">
                      +91 {mobileNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              Choose from our service packages below:
            </p>

            {/* Service Options - Horizontal Layout with reduced height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {getServiceOptions().map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelection(service)}
                  className="bg-white border border-gray-200 hover:border-red-500 rounded-lg p-3 flex flex-col text-left transition-all hover:shadow-md group"
                >
                  <div className="flex items-center mb-2">
                    {/* Service Icon based on type */}
                    <div className="mr-3 p-2 bg-red-50 rounded-full text-red-500 group-hover:bg-red-100 transition-colors">
                      {service.id === "draft" && (
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                      {service.id === "draft_estamp" && (
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
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      )}
                      {service.id === "draft_estamp_delivery" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <span className="font-medium text-gray-800">
                        {service.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <span className="text-xs text-gray-500">
                      {service.description}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col">
                    <div className="font-medium text-gray-800">
                      Base price:{" "}
                      <span className="text-red-600">₹{service.price}</span>
                    </div>

                    {service.hasNotary && (
                      <div className="text-sm text-gray-600">
                        + Notary:{" "}
                        <span className="font-medium">
                          ₹{service.notaryCharge}
                        </span>
                      </div>
                    )}

                    {service.hasNotary && (
                      <div className="font-bold text-red-600 text-lg mt-1">
                        Total: ₹{service.price + service.notaryCharge}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowServiceOptionsModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition mr-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePackageNotification;
