import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const GstPreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-100";
  };

  return (
    <div className="bg-white min-h-screen px-2 sm:px-4 lg:px-6 py-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative max-w-4xl mx-auto">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform rotate-45 select-none font-sans opacity-80">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Print-specific styles */}
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
              font-family: "Times New Roman", Times, serif;
            }
            .no-print {
              display: none;
            }
            .print-container {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .bg-yellow-100 {
              background-color: transparent !important;
              border-bottom: 1px dotted #000;
            }
          }
        `}</style>

        {/* Document content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 print-container font-serif">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="font-bold underline text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
              NO OBJECTION CERTIFICATE
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              (For GST Registration)
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed">
            <p className="break-words">
              I,{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.ownerName
                )} px-1 inline-block min-w-0`}
              >
                {formData?.ownerName || "__________________"}
              </span>
              , Aadhaar no.{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.aadhaarNo
                )} px-1 inline-block min-w-0`}
              >
                {formData?.aadhaarNo || "__________________"}
              </span>
            </p>

            <p className="break-words">
              Address:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.ownerAddress
                )} px-1 inline-block min-w-0`}
              >
                {formData?.ownerAddress || "__________________"}
              </span>
              , and being legal owner of the premises address{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.premisesAddress
                )} px-1 inline-block min-w-0`}
              >
                {formData?.premisesAddress || "__________________"}
              </span>
              , do hereby permit Mr./Ms.{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.tenantName
                )} px-1 inline-block min-w-0`}
              >
                {formData?.tenantName || "__________________"}
              </span>{" "}
              and Proprietor of
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.companyName
                )} px-1 inline-block min-w-0`}
              >
                {" "}
                {formData?.companyName || "__________________"}
              </span>{" "}
              (Name of the Company/Firm), office address at{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData?.officeAddress
                )} px-1 inline-block min-w-0`}
              >
                {formData?.officeAddress || "__________________"}
              </span>
              .
            </p>

            <p className="italic break-words">
              I hereby state that I have no objection with the said company/Firm
              carrying on his Business and profession from the said premises and
              getting registered Under GST.
            </p>

            <div className="pt-2 sm:pt-4">
              <p className="break-words">
                Verified at{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData?.place
                  )} px-1 inline-block min-w-0`}
                >
                  {formData?.place || "________"}
                </span>{" "}
                on this{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData?.day
                  )} px-1 inline-block min-w-0`}
                >
                  {getDayWithSuffix(formData?.day) || "__"}
                </span>{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData?.month
                  )} px-1 inline-block min-w-0`}
                >
                  {formData?.month || "_______"}
                </span>
                ,{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData?.year
                  )} px-1 inline-block min-w-0`}
                >
                  {formData?.year || "____"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>
          </div>

          <div className="text-right mt-8 sm:mt-12 md:mt-16">
            <div className="inline-block">
              <p className="border-t border-black pt-1 text-sm sm:text-base">
                (Signature of the Deponent)
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Property Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstPreview;
