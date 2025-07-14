import React from "react";

const DocumentLostPreview = ({ formData }) => {
  return (
    <div className="relative border p-3 sm:p-4 md:p-6 bg-white shadow-md space-y-4 sm:space-y-6 overflow-hidden max-w-4xl mx-auto">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transform select-none opacity-80"
          style={{
            transform: "rotate(45deg)",
            fontWeight: "700",
            letterSpacing: "0.1em",
          }}
        >
          INTERNAL PURPOSE ONLY
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center underline mb-4 sm:mb-6">
          AFFIDAVIT
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-justify leading-relaxed">
            I, {formData.personTitle || "Mr/Mrs/Ms"}{" "}
            <span className="break-words">
              {formData.personName || "................................"}
            </span>{" "}
            {formData.relationType || "D/o"}{" "}
            <span className="break-words">
              {formData.relationName || "........................"}
            </span>
            , Aged: {formData.age || "......"} Years,
          </p>

          <p className="text-sm sm:text-base text-justify leading-relaxed">
            Permanent Address{" "}
            <span className="break-words">
              {formData.address ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p className="text-sm sm:text-base text-justify leading-relaxed">
            My Aadhaar No: Aadhaar No:{" "}
            <span className="break-words font-mono">
              {formData.aadhaarNumber || "0000 0000 0000"}
            </span>
          </p>

          <p className="text-sm sm:text-base text-justify leading-relaxed">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal pl-4 sm:pl-6 space-y-2 sm:space-y-3">
            <li className="text-sm sm:text-base text-justify leading-relaxed">
              That I have inadvertently misplaced the original{" "}
              <span className="break-words">
                {formData.documentType || "DOCUMENT NAME"}
              </span>
              ,{" "}
              <span className="break-words">
                {formData.documentType || "DOCUMENT"}
              </span>{" "}
              SERIAL NO:{" "}
              <span className="break-words font-mono">
                {formData.documentNumber || "..........."}
              </span>
              , which I am unable to trace even after extensive search.
            </li>

            <li className="text-sm sm:text-base text-justify leading-relaxed">
              That an FIR has been lodged bearing No{" "}
              <span className="break-words">
                {formData.firNumber || "XXXX"}
              </span>{" "}
              on DATE: {formData.firDay || "XX"}/{formData.firMonth || "XX"}/
              {formData.firYear || "XXXX"} reporting about the loss of{" "}
              <span className="break-words">
                {formData.documentType || "DOCUMENT"}
              </span>
              , The copy of the same is enclosed herewith.
            </li>

            <li className="text-sm sm:text-base text-justify leading-relaxed">
              That I hereby request the Company/ Developer to provide me with
              the duplicate copy of{" "}
              <span className="break-words">
                {formData.documentType || "DOCUMENT"}
              </span>{" "}
              for the purpose of my records and fulfillment of any requirement
              which may arise in future.
            </li>

            <li className="text-sm sm:text-base text-justify leading-relaxed">
              That I undertake to inform your good office if the original
              document is found in future.
            </li>
          </ol>

          <p className="text-sm sm:text-base text-justify leading-relaxed">
            Verified at{" "}
            <span className="break-words">{formData.place || "PLACE"}</span> on
            this {formData.day || "XX"} day of {formData.month || "XXXX"},{" "}
            {formData.year || "XXXX"} that the contents of the above said
            affidavit are true and correct to the best of my knowledge and
            belief.
          </p>

          <div className="mt-8 sm:mt-12 md:mt-16 text-right">
            <p className="text-sm sm:text-base">(Signature of the Deponent)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLostPreview;
