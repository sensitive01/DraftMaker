import React from "react";

const DocumentLostPreview = ({ formData }) => {
  return (
    <div className="relative border p-3 sm:p-4 lg:p-6 bg-white shadow-md space-y-4 sm:space-y-6 overflow-hidden mx-2 sm:mx-4 lg:mx-0">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="text-gray-300 font-bold transform select-none opacity-80"
          style={{
            transform: "rotate(45deg)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: "700",
            letterSpacing: "0.1em",
          }}
        >
          INTERNAL PURPOSE ONLY
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center underline mb-4 sm:mb-6">
          AFFIDAVIT
        </h2>

        <p className="text-justify text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
          I, {formData.personTitle || "Mr/Mrs/Ms"}{" "}
          {formData.personName || "................................"}{" "}
          {formData.relationType || "D/o"}{" "}
          {formData.relationName || "........................"}, Aged:{" "}
          {formData.age || "......"} Years,
        </p>

        <p className="text-justify text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
          Permanent Address{" "}
          {formData.address ||
            "[Address Line 1, Address Line 2, City, State, Pin Code]"}
        </p>

        <p className="text-justify text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
          My Aadhaar No: Aadhaar No:{" "}
          {formData.aadhaarNumber || "0000 0000 0000"}
        </p>

        <p className="text-justify text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
          Do hereby solemnly affirm and declare as under:
        </p>

        <ol className="list-decimal pl-4 sm:pl-6 space-y-2 sm:space-y-3">
          <li className="text-justify text-sm sm:text-base leading-relaxed">
            That I have inadvertently misplaced the original{" "}
            {formData.documentType || "DOCUMENT NAME"},{" "}
            {formData.documentType || "DOCUMENT"} SERIAL NO:{" "}
            {formData.documentNumber || "..........."}, which I am unable to
            trace even after extensive search.
          </li>

          <li className="text-justify text-sm sm:text-base leading-relaxed">
            That an FIR has been lodged bearing No{" "}
            {formData.firNumber || "XXXX"} on DATE: {formData.firDay || "XX"}/
            {formData.firMonth || "XX"}/{formData.firYear || "XXXX"} reporting
            about the loss of {formData.documentType || "DOCUMENT"}, The copy of
            the same is enclosed herewith.
          </li>

          <li className="text-justify text-sm sm:text-base leading-relaxed">
            That I hereby request the Company/ Developer to provide me with the
            duplicate copy of {formData.documentType || "DOCUMENT"} for the
            purpose of my records and fulfillment of any requirement which may
            arise in future.
          </li>

          <li className="text-justify text-sm sm:text-base leading-relaxed">
            That I undertake to inform your good office if the original document
            is found in future.
          </li>
        </ol>

        <p className="text-justify text-sm sm:text-base mt-4 sm:mt-6 leading-relaxed">
          Verified at {formData.place || "PLACE"} on this {formData.day || "XX"}{" "}
          day of {formData.month || "XXXX"}, {formData.year || "XXXX"} that the
          contents of the above said affidavit are true and correct to the best
          of my knowledge and belief.
        </p>

        <div className="mt-12 sm:mt-16 text-right">
          <p className="text-sm sm:text-base">(Signature of the Deponent)</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentLostPreview;
