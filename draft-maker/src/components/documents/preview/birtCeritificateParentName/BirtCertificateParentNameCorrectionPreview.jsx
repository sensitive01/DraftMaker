import React from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

const BirthCertificateParentNameCorrectionPreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-100";
  };

  return (
    <div className="bg-white min-h-screen px-2 sm:px-4 lg:px-6 py-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative max-w-4xl mx-auto">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold transform rotate-45 select-none font-sans opacity-80">
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
        <div className="p-2 sm:p-4 md:p-6 lg:p-8 print-container font-serif">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-xs sm:text-sm md:text-base">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center underline mb-4 sm:mb-6 md:mb-8">
              AFFIDAVIT
            </h2>
            {formData.firstParty && (
              <>
                <div className="mb-5 text-justify leading-relaxed">
                  <span className="font-lg">
                    First Party (Stamp Duty):{" "}
                    <span className="font-bold">{formData.firstParty}</span>
                  </span>

                  <br />
                  <span className="text-sm italic">
                    (Responsible for payment of stamp duty charges as per
                    applicable state regulations)
                  </span>
                </div>
                <div className="mb-5 text-justify leading-relaxed">
                  <span className="font-lg">
                    Second Party :{" "}
                    <span className="font-bold">{formData.secondParty}</span>
                  </span>
                </div>
              </>
            )}

            <p className="leading-relaxed text-justify break-words">
              We, {formData.fatherTitle}{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.fatherName
                )} px-1 inline-block min-w-0 break-all`}
              >
                {formData.fatherName || "___________________"}
              </span>{" "}
              H/O {formData.motherTitle}{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.motherName
                )} px-1 inline-block min-w-0 break-all`}
              >
                {formData.motherName || "___________________"}
              </span>
              , Permanent Address{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.address
                )} px-1 inline-block min-w-0 break-words`}
              >
                {formData.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="leading-relaxed text-justify break-words">
              Our Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.fatherAadhaar
                )} px-1 inline-block min-w-0 break-all`}
              >
                {formData.fatherAadhaar || "0000 0000 0000"}
              </span>
              , Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.motherAadhaar
                )} px-1 inline-block min-w-0 break-all`}
              >
                {formData.motherAadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="leading-relaxed text-justify">
              Do hereby solemnly affirm and declare as under:
            </p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Point 1 */}
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="font-bold w-3 sm:w-4 md:w-6 flex-shrink-0 pt-0.5">
                  1.
                </span>
                <p className="text-justify leading-relaxed break-words flex-1">
                  That Birth Certificate SL No:{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.certificateNumber
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.certificateNumber || "______"}
                  </span>{" "}
                  issued for our {formData.childRelation}{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.childName
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.childName || "NAME"}
                  </span>{" "}
                  from (Chief Registrar of Births and Deaths, Govt of
                  Karnataka), the name of parents issued Father name as{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.incorrectFatherName
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.incorrectFatherName || "Incorrect Name"}
                  </span>{" "}
                  and Mother name as{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.incorrectMotherName
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.incorrectMotherName || "Incorrect Name"}
                  </span>
                  .
                </p>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="font-bold w-3 sm:w-4 md:w-6 flex-shrink-0 pt-0.5">
                  2.
                </span>
                <p className="text-justify leading-relaxed break-words flex-1">
                  That as per our Aadhaar card the given name of Father is{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.correctFatherName
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.correctFatherName || "Correct Name"}
                  </span>{" "}
                  AND Mother as{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.correctMotherName
                    )} px-1 inline-block min-w-0 break-all`}
                  >
                    {formData.correctMotherName || "Correct Name"}
                  </span>
                  .
                </p>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="font-bold w-3 sm:w-4 md:w-6 flex-shrink-0 pt-0.5">
                  3.
                </span>
                <p className="text-justify leading-relaxed break-words flex-1">
                  We state that name in our Aadhaar card's and name in our{" "}
                  {formData.childRelation} Birth Certificate is the name of one
                  and the same persons and that is our self's.
                </p>
              </div>

              {/* Point 4 */}
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="font-bold w-3 sm:w-4 md:w-6 flex-shrink-0 pt-0.5">
                  4.
                </span>
                <p className="text-justify leading-relaxed break-words flex-1">
                  That we also required this affidavit for RE ISSUE the Birth
                  Certificate with parent's name as per Aadhaar card.
                </p>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 md:pt-6">
              <p className="leading-relaxed text-justify break-words">
                Verified at{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.place
                  )} px-1 inline-block min-w-0 break-all`}
                >
                  {formData.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.day
                  )} px-1 inline-block min-w-0 break-all`}
                >
                  {getDayWithSuffix(formData.day) || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.month
                  )} px-1 inline-block min-w-0 break-all`}
                >
                  {formData.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.year
                  )} px-1 inline-block min-w-0 break-all`}
                >
                  {formData.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="text-right mt-6 sm:mt-8 md:mt-12 lg:mt-16">
              <div className="inline-block">
                <p className="border-t border-black pt-1 text-xs sm:text-sm md:text-base">
                  (Signature of the Deponents)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCertificateParentNameCorrectionPreview;
