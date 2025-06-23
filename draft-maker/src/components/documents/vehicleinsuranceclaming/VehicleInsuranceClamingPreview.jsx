import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const VehicleInsuranceClaimingPreview = ({ formData }) => {
  // Format dates properly
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  // Check if all form data exists
  const isFormDataEmpty = !formData;

  if (isFormDataEmpty) {
    return (
      <div className="bg-gray-50 p-10 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[800px] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p className="mt-4 text-lg text-gray-500 font-medium">
            Fill the form to see your affidavit preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[800px]">
      <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden min-h-[700px] font-serif">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-4xl font-bold transform rotate-45 select-none font-sans">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Document Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
            Vehicle Insurance Claim Affidavit
          </h2>

          <div className="mb-12 leading-loose text-base">
            <p className="mb-6">
              I,{" "}
              <span className="font-bold">
                {formData.title || "______"}{" "}
                {formData.name || "_________________"}
              </span>
              , {formData.relation || "______"} of{" "}
              <span className="font-bold">
                {formData.guardianName || "_________________"}
              </span>
              , Aged: <span className="font-bold">{formData.age || "___"}</span>{" "}
              Years,
            </p>

            <p className="mb-6">
              Permanent Address:{" "}
              <span className="font-bold">
                {formData.address ||
                  "__________________________________"}
              </span>
            </p>

            <p className="mb-6">
              My Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaar || "____ ____ ____"}
              </span>
            </p>

            <p className="mb-5 font-semibold text-center">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <div className="mb-8 leading-loose text-base">
            <div className="space-y-8">
              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">1.</span>
                <span>
                  I am the owner of the Vehicle No:{" "}
                  <span className="font-bold">
                    {formData.vehicleNo || "________"}
                  </span>
                  , VEHICLE MODEL:{" "}
                  <span className="font-bold">
                    {formData.vehicleModel || "________"}
                  </span>
                  , Engine No:{" "}
                  <span className="font-bold">
                    {formData.engineNo || "________"}
                  </span>
                  , Chassis No:{" "}
                  <span className="font-bold">
                    {formData.chassisNo || "________"}
                  </span>{" "}
                  Insured with{" "}
                  <span className="font-bold">
                    {formData.insurer || "________"}
                  </span>{" "}
                  Under Policy No:{" "}
                  <span className="font-bold">
                    {formData.policyNo || "________"}
                  </span>{" "}
                  for the period{" "}
                  <span className="font-bold">
                    {formatDate(formData.policyStart) || "________"}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    {formatDate(formData.policyEnd) || "________"}
                  </span>
                  .
                </span>
              </div>

              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">2.</span>
                <span>
                  Vehicle was Driven by{" "}
                  <span className="font-bold">
                    {formData.driverName || "________"}
                  </span>{" "}
                  and the Vehicle met with an accident as follows:
                  <div className="bg-gray-50 p-4 mt-2 rounded">
                    <p className="font-medium mb-2">DETAILS OF INCIDENT:</p>
                    <p>
                      {formData.accidentDetails ||
                        "_______________________________"}
                    </p>
                  </div>
                </span>
              </div>

              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">3.</span>
                <span>
                  The above accident was reported to the Police Station and the
                  respective police acknowledgement has been submitted alongside
                  other claim documents.
                </span>
              </div>

              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">4.</span>
                <span>
                  I hereby confirm that no third-party injury / death / property
                  damage is involved in this accident and there will not be any
                  claim from any third party. In the event of any claim from any
                  third party on account of the above accident, it shall be my
                  responsibility to take such claims and the insurer is fully
                  discharged of the liability under the policy by virtue of
                  settlement of my claim for Damage to the Vehicle.
                </span>
              </div>

              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">5.</span>
                <span>
                  I understand that providing false information in this
                  affidavit may result in rejection of my claim and could have
                  legal consequences under applicable laws.
                </span>
              </div>
            </div>

            <p className="mt-8 text-justify">
              I hereby solemnly declare that the above statement is true to the
              best of my knowledge and belief and that I have not withheld or
              misrepresented any material facts.
            </p>
          </div>

          {/* Verification and Signature */}
          <div className="mt-8">
            <p className="mb-6">
              Verified at{" "}
              <span className="font-bold">{formData.place || "________"}</span>{" "}
              on this{" "}
              <span className="font-bold">
                {getDayWithSuffix(formData.day) || "__"}
              </span>{" "}
              day of{" "}
              <span className="font-bold">{formData.month || "________"}</span>,{" "}
              <span className="font-bold">{formData.year || "____"}</span> that
              the contents of the above said affidavit are true and correct to
              the best of my knowledge and belief.
            </p>

            <div className="flex justify-between mt-8">
              <div></div>

              <div className="text-right">
                <div className="mt-24 border-t-2 border-black pt-2 w-56 text-center ml-auto">
                  <p className="font-medium">(Signature of the Applicant)</p>
                  <p className="font-bold mt-2">Deponent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsuranceClaimingPreview;
