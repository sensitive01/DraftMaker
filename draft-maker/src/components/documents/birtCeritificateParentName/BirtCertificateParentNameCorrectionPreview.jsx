import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const BirthCertificateParentNameCorrectionPreview = ({ formData }) => {
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
        <div className="p-6 print-container font-serif space-y-6">
          <h2 className="text-2xl font-bold text-center underline mb-8">
            AFFIDAVIT
          </h2>

          <p className="mb-4 leading-relaxed text-justify">
            We, {formData.fatherTitle}{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData.fatherName
              )} px-1`}
            >
              {formData.fatherName || "___________________"}
            </span>{" "}
            H/O {formData.motherTitle}{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData.motherName
              )} px-1`}
            >
              {formData.motherName || "___________________"}
            </span>
            , Permanent Address{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData.address
              )} px-1`}
            >
              {formData.address ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p className="mb-4 leading-relaxed text-justify">
            Our Aadhaar No: Aadhaar No:{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData.fatherAadhaar
              )} px-1`}
            >
              {formData.fatherAadhaar || "0000 0000 0000"}
            </span>
            , Aadhaar No:{" "}
            <span
              className={`font-serif ${highlightIfEmpty(
                formData.motherAadhaar
              )} px-1`}
            >
              {formData.motherAadhaar || "0000 0000 0000"}
            </span>
          </p>

          <p className="mb-6 leading-relaxed text-justify">
            Do hereby solemnly affirm and declare as under:
          </p>

          <div className="space-y-4 mb-6">
            {/* Point 1 */}
            <div className="flex items-start gap-2">
              <span className="font-bold w-6">1.</span>
              <p className="text-justify leading-relaxed">
                That Birth Certificate SL No:{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.certificateNumber
                  )} px-1`}
                >
                  {formData.certificateNumber || "______"}
                </span>{" "}
                issued for our {formData.childRelation}{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.childName
                  )} px-1`}
                >
                  {formData.childName || "NAME"}
                </span>{" "}
                from (Chief Registrar of Births and Deaths, Govt of Karnataka),
                the name of parents issued Father name as{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.incorrectFatherName
                  )} px-1`}
                >
                  {formData.incorrectFatherName || "Incorrect Name"}
                </span>{" "}
                and Mother name as{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.incorrectMotherName
                  )} px-1`}
                >
                  {formData.incorrectMotherName || "Incorrect Name"}
                </span>
                .
              </p>
            </div>

            {/* Point 2 */}
            <div className="flex items-start gap-2">
              <span className="font-bold w-6">2.</span>
              <p className="text-justify leading-relaxed">
                That as per our Aadhaar card the given name of Father is{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.correctFatherName
                  )} px-1`}
                >
                  {formData.correctFatherName || "Correct Name"}
                </span>{" "}
                AND Mother as{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.correctMotherName
                  )} px-1`}
                >
                  {formData.correctMotherName || "Correct Name"}
                </span>
                .
              </p>
            </div>

            {/* Point 3 */}
            <div className="flex items-start gap-2">
              <span className="font-bold w-6">3.</span>
              <p className="text-justify leading-relaxed">
                We state that name in our Aadhaar card's and name in our{" "}
                {formData.childRelation} Birth Certificate is the name of one
                and the same persons and that is our self's.
              </p>
            </div>

            {/* Point 4 */}
            <div className="flex items-start gap-2">
              <span className="font-bold w-6">4.</span>
              <p className="text-justify leading-relaxed">
                That we also required this affidavit for RE ISSUE the Birth
                Certificate with parent's name as per Aadhaar card.
              </p>
            </div>
          </div>

          <p className="mb-10 leading-relaxed text-justify">
            Verified at{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData.place)} px-1`}
            >
              {formData.place || "PLACE"}
            </span>{" "}
            on this{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData.day)} px-1`}
            >
              {getDayWithSuffix(formData.day) || "XX"}
            </span>{" "}
            day of{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData.month)} px-1`}
            >
              {formData.month || "XXXX"}
            </span>
            ,{" "}
            <span
              className={`font-serif ${highlightIfEmpty(formData.year)} px-1`}
            >
              {formData.year || "XXXX"}
            </span>{" "}
            that the contents of the above said affidavit are true and correct
            to the best of my knowledge and belief.
          </p>

          <div className="text-right mt-16">
            <p className="border-t border-black inline-block pt-1">
              (Signature of the Deponents)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCertificateParentNameCorrectionPreview;
