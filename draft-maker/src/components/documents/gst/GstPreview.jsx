import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const GstPreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-100";
  };

  return (
    <div className="bg-red-100 min-h-[700px]">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-4xl font-bold transform rotate-45 select-none font-sans opacity-80">
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
        <div className="p-6 print-container font-serif">
          <div className="mb-8 text-center">
            <h1 className="font-bold underline text-2xl mb-3">
              NO OBJECTION CERTIFICATE
            </h1>
            <p className="text-sm text-gray-500">(For GST Registration)</p>
          </div>

          <p className="mb-4 leading-relaxed">
            I,{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.ownerName
              )} px-1`}
            >
              {formData?.ownerName || "__________________"}
            </span>
            , Aadhaar no.{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.aadhaarNo
              )} px-1`}
            >
              {formData?.aadhaarNo || "__________________"}
            </span>
          </p>

          <p className="mb-4 leading-relaxed">
            Address:{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.ownerAddress
              )} px-1`}
            >
              {formData?.ownerAddress || "__________________"}
            </span>
            , and being legal owner of the premises address{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.premisesAddress
              )} px-1`}
            >
              {formData?.premisesAddress || "__________________"}
            </span>
            , do hereby permit Mr./Ms.{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.tenantName
              )} px-1`}
            >
              {formData?.tenantName || "__________________"}
            </span>{" "}
            and Proprietor of
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.companyName
              )} px-1`}
            >
              {" "}
              {formData?.companyName || "__________________"}
            </span>{" "}
            (Name of the Company/Firm), office address at{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData?.officeAddress
              )} px-1`}
            >
              {formData?.officeAddress || "__________________"}
            </span>
            .
          </p>

          <p className="mb-6 italic leading-relaxed">
            I hereby state that I have no objection with the said company/Firm
            carrying on his Business and profession from the said premises and
            getting registered Under GST.
          </p>

          <p className="mb-10 leading-relaxed">
            Verified at{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData?.place)} px-1`}
            >
              {formData?.place || "________"}
            </span>{" "}
            on this{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData?.day)} px-1`}
            >
              {getDayWithSuffix(formData?.day) || "__"}
            </span>{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData?.month)} px-1`}
            >
              {formData?.month || "_______"}
            </span>
            ,{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData?.year)} px-1`}
            >
              {formData?.year || "____"}
            </span>{" "}
            that the contents of the above said affidavit are true and correct
            to the best of my knowledge and belief.
          </p>

          <div className="text-right mt-16">
            <p className="border-t border-black inline-block pt-1">
              (Signature of the Deponent)
            </p>
            <p className="text-sm text-gray-600 mt-1">Property Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstPreview;
