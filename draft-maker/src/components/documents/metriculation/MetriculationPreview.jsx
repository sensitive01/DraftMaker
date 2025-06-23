import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const MetriculationPreview = ({ formData }) => {
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

        {/* Affidavit content */}
        <div className="p-6 print-container font-serif">
          {/* Official Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-3">
              AFFIDAVIT
            </h1>
            <div className="border-b-2 border-black w-48 mx-auto mb-2"></div>
          </div>

          <div className="space-y-4 text-gray-800 leading-relaxed">
            {/* Personal Details */}
            <p className="mb-4 leading-relaxed">
              I,{" "}
              <span
                className={`font-serif ${highlightIfEmpty(formData.name)} px-1`}
              >
                {formData.name || "Mr/Mrs/Ms ................................"}
              </span>{" "}
              {formData.relation ? (
                formData.relation
              ) : (
                <span
                  className={`${highlightIfEmpty(
                    formData.relation
                  )} px-1 font-serif`}
                >
                  D/o, S/o, H/o, W/o ........................
                </span>
              )}
              , Aged:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(formData.age)} px-1`}
              >
                {formData.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4 leading-relaxed">
              Permanent Address:{" "}
              <span
                className={`${highlightIfEmpty(
                  formData.address
                )} px-1 font-serif`}
              >
                {formData.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-6 leading-relaxed">
              My Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.aadhaar
                )} px-1`}
              >
                {formData.aadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="font-medium text-xl my-6 leading-relaxed">
              Do hereby solemnly affirm and declare as under:
            </p>

            <p className="mb-4 leading-relaxed">
              Hereby affirm and declare that I have irrecoverable Lost my{" "}
              <span
                className={`font-serif ${highlightIfEmpty(formData.year)} px-1`}
              >
                {formData.year || "X"}
              </span>{" "}
              year,{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.semester
                )} px-1`}
              >
                {formData.semester || "X"}
              </span>{" "}
              Semester, marks card of{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.program
                )} px-1`}
              >
                {formData.program || "..........................,"}
              </span>{" "}
              issued to me by{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.authority
                )} px-1`}
              >
                {formData.authority ||
                  "........................................................"}
              </span>
            </p>

            <p className="mb-4 leading-relaxed">
              Name of the college/Institution:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.collegeName
                )} px-1`}
              >
                {formData.collegeName || "XXXX"}
              </span>
            </p>

            <p className="mb-4 leading-relaxed">
              Batch: In the year{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.batch
                )} px-1`}
              >
                {formData.batch || "XXXX"}
              </span>
              .
            </p>

            <p className="mb-4 leading-relaxed">
              Registration Number:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.regNumber
                )} px-1`}
              >
                {formData.regNumber || "..........................,"}
              </span>
            </p>

            <div className="my-6">
              <p className="mb-4 leading-relaxed">
                In the event of the above mentioned Statement of{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.documentName
                  )} px-1`}
                >
                  {formData.documentName || "DOCUMENT NAME"}
                </span>{" "}
                being found subsequently, I hereby undertake to return the
                duplicate issued. It is at my own risk the Statement of{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.documentName
                  )} px-1`}
                >
                  {formData.documentName || "DOCUMENT NAME"}
                </span>{" "}
                may be sent the address given by me.
              </p>
            </div>

            <div className="mt-8 pt-4">
              <p className="mb-10 leading-relaxed">
                Verified at{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.place
                  )} px-1`}
                >
                  {formData.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.day
                  )} px-1`}
                >
                  {getDayWithSuffix(formData.day) || "XX"}
                </span>{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.month
                  )} px-1`}
                >
                  {formData.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.year_verification
                  )} px-1`}
                >
                  {formData.year_verification || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            {/* Signature Block */}
            <div className="text-right mt-16">
              <p className="border-t border-black inline-block pt-1">
                (Signature of the Deponent)
              </p>
              <div className="text-sm text-gray-600 mt-1">
                <p>{formData.name ? formData.name : ""}</p>
              </div>
            </div>

            {/* Stamp/Seal Placeholder */}
            <div className="mt-12 mb-4 text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-full h-32 w-32 mx-auto flex items-center justify-center text-gray-400">
                <p className="text-sm">Notary Seal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetriculationPreview;
