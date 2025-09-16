import React from "react";

const NoteryAdditionalPart = ({includeNotary,setIncludeNotary}) => {
  return (
    <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
      <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Notary Service (Optional)
      </h3>
      <div className="flex items-start space-x-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeNotary"
            checked={includeNotary}
            onChange={(e) => setIncludeNotary(e.target.checked)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
          />
          <label
            htmlFor="includeNotary"
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
          >
            Include Notary Service
          </label>
        </div>
        <div className="flex-1">
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  Notary Attestation Service
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Professional notary attestation for your document
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-600 text-base">
                  ₹{selectedService.notaryCharge}
                </p>
                {includeNotary && (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ Included in total
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteryAdditionalPart;
