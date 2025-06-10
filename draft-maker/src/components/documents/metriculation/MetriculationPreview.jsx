import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const MetriculationPreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-50";
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-lg overflow-auto h-full">
      {/* Official Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-3">
          AFFIDAVIT
        </h1>
        <div className="border-b-2 border-black w-48 mx-auto mb-2"></div>
      </div>

      <div className="space-y-4 text-gray-800 leading-relaxed">
        {/* Personal Details */}
        <p>
          I,{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.name)}`}>
            {formData.name || "Mr/Mrs/Ms ................................"}
          </span>{" "}
          {formData.relation ? (
            formData.relation
          ) : (
            <span className={highlightIfEmpty(formData.relation)}>
              D/o, S/o, H/o, W/o ........................
            </span>
          )}
          , Aged:{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.age)}`}>
            {formData.age || "......"}
          </span>{" "}
          Years,
        </p>

        <p>
          Permanent Address:{" "}
          <span className={highlightIfEmpty(formData.address)}>
            {formData.address ||
              "[Address Line 1, Address Line 2, City, State, Pin Code]"}
          </span>
        </p>

        <p className="mb-6">
          My Aadhaar No:{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.aadhaar)}`}>
            {formData.aadhaar || "0000 0000 0000"}
          </span>
        </p>

        <p className="font-medium text-xl my-6">
          Do hereby solemnly affirm and declare as under:
        </p>

        <p>
          Hereby affirm and declare that I have irrecoverable Lost my{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.year)}`}>
            {formData.year || "X"}
          </span>{" "}
          year,{" "}
          <span
            className={`font-medium ${highlightIfEmpty(formData.semester)}`}
          >
            {formData.semester || "X"}
          </span>{" "}
          Semester, marks card of{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.program)}`}>
            {formData.program || "..........................,"}
          </span>{" "}
          issued to me by{" "}
          <span
            className={`font-medium ${highlightIfEmpty(formData.authority)}`}
          >
            {formData.authority ||
              "........................................................"}
          </span>
        </p>

        <p>
          Name of the college/Institution:{" "}
          <span
            className={`font-medium ${highlightIfEmpty(formData.collegeName)}`}
          >
            {formData.collegeName || "XXXX"}
          </span>
        </p>

        <p>
          Batch: In the year{" "}
          <span className={`font-medium ${highlightIfEmpty(formData.batch)}`}>
            {formData.batch || "XXXX"}
          </span>
          .
        </p>

        <p>
          Registration Number:{" "}
          <span
            className={`font-medium ${highlightIfEmpty(formData.regNumber)}`}
          >
            {formData.regNumber || "..........................,"}
          </span>
        </p>

        <div className="my-6">
          <p>
            In the event of the above mentioned Statement of{" "}
            <span
              className={`font-medium ${highlightIfEmpty(
                formData.documentName
              )}`}
            >
              {formData.documentName || "DOCUMENT NAME"}
            </span>{" "}
            being found subsequently, I hereby undertake to return the duplicate
            issued. It is at my own risk the Statement of{" "}
            <span
              className={`font-medium ${highlightIfEmpty(
                formData.documentName
              )}`}
            >
              {formData.documentName || "DOCUMENT NAME"}
            </span>{" "}
            may be sent the address given by me.
          </p>
        </div>

        <div className="mt-8 pt-4">
          <p>
            Verified at{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.place)}`}>
              {formData.place || "PLACE"}
            </span>{" "}
            on this{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.day)}`}>
              {getDayWithSuffix(formData.day) || "XX"}
            </span>{" "}
            {" "}
            <span className={`font-medium ${highlightIfEmpty(formData.month)}`}>
              {formData.month || "XXXX"}
            </span>
            ,{" "}
            <span
              className={`font-medium ${highlightIfEmpty(
                formData.year_verification
              )}`}
            >
              {formData.year_verification || "XXXX"}
            </span>{" "}
            that the contents of the above said affidavit are true and correct
            to the best of my knowledge and belief.
          </p>
        </div>

        {/* Signature Block */}
        <div className="grid grid-cols-1 mt-24 mb-8">
          <div className="text-right">
            <p className="font-medium">Signature of the Deponent</p>
            <div className="text-sm text-gray-600 mt-1">
              <p>{formData.name ? formData.name : ""}</p>
            </div>
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
  );
};

export default MetriculationPreview;
