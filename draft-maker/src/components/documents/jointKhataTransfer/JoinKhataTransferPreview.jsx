import React from "react";

const JoinKhataTransferPreview = ({ formData }) => {
    // Function to highlight empty fields with a light yellow background
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
          <div className="border-b-2 border-black w-32 mx-auto"></div>
        </div>
  
        {/* Official Note */}
        <div className="text-sm text-gray-500 mb-8 text-center italic">
          [To be printed on a stamp paper of appropriate value as per State
          stamp duty laws]
        </div>
  
        <div className="space-y-4 text-gray-800 leading-relaxed">
          {/* First Applicant */}
          <p>
            I, 1.{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.name1)}`}>
              {formData.name1 || "________________________"}
            </span>{" "}
            {formData.relation1 ? (
              formData.relation1
            ) : (
              <span className={highlightIfEmpty(formData.relation1)}>
                D/o, S/o, H/o, W/o ________________
              </span>
            )}
            , Aged:{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.age1)}`}>
              {formData.age1 || "____"}
            </span>{" "}
            Years,
          </p>
  
          <p>
            Permanent Address:{" "}
            <span className={highlightIfEmpty(formData.address1)}>
              {formData.address1 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>
  
          <p className="mb-6">
            Aadhaar No:{" "}
            <span
              className={`font-medium ${highlightIfEmpty(formData.aadhaar1)}`}
            >
              {formData.aadhaar1 || "0000 0000 0000"}
            </span>
          </p>
  
          {/* Second Applicant */}
          <p>
            2.{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.name2)}`}>
              {formData.name2 || "________________________"}
            </span>{" "}
            {formData.relation2 ? (
              formData.relation2
            ) : (
              <span className={highlightIfEmpty(formData.relation2)}>
                D/o, S/o, H/o, W/o ________________
              </span>
            )}
            , Aged:{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.age2)}`}>
              {formData.age2 || "____"}
            </span>{" "}
            Years,
          </p>
  
          <p>
            Permanent Address:{" "}
            <span className={highlightIfEmpty(formData.address2)}>
              {formData.address2 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>
  
          <p className="mb-6">
            Aadhaar No:{" "}
            <span
              className={`font-medium ${highlightIfEmpty(formData.aadhaar2)}`}
            >
              {formData.aadhaar2 || "0000 0000 0000"}
            </span>
          </p>
  
          <p className="font-medium text-xl my-6 text-center">
            Do hereby solemnly affirm and declare as under:
          </p>
  
          <p>
            Are applying for the joint Khatha transfer for property, which is
            situated at{" "}
            <span
              className={`font-medium ${highlightIfEmpty(
                formData.propertyAddress
              )}`}
            >
              {formData.propertyAddress ||
                "...................................................................................."}
            </span>{" "}
            in the ward number{" "}
            <span
              className={`font-medium ${highlightIfEmpty(formData.wardNumber)}`}
            >
              {formData.wardNumber || "XXX"}
            </span>{" "}
            and zone{" "}
            <span className={`font-medium ${highlightIfEmpty(formData.zone)}`}>
              {formData.zone || "XXX"}
            </span>{" "}
            of{" "}
            <span className="font-medium">{formData.authority || "BBMP"}</span>,
            Khata No is{" "}
            <span
              className={`font-medium ${highlightIfEmpty(formData.khataNo)}`}
            >
              {formData.khataNo || "XXXX"}
            </span>
            , SAS Base Application number is{" "}
            <span
              className={`font-medium ${highlightIfEmpty(formData.sasNumber)}`}
            >
              {formData.sasNumber || "XXXXX"}
            </span>
          </p>
  
          <div className="bg-gray-50 p-6 border-l-4 border-indigo-600 my-8">
            <p>
              We all are the joint applicants for Khatha transfer, and we
              authorize
            </p>
            <p className="font-medium mt-2 mb-2 text-center text-indigo-700">
              {formData.authorizedPerson ? (
                formData.authorizedPerson
              ) : (
                <span className={highlightIfEmpty(formData.authorizedPerson)}>
                  NAME
                </span>
              )}
            </p>
            <p>
              for e-signing the application for Khata transfer on our behalf.
            </p>
            <p className="mt-4">
              We swear that the above mentioned is true to the best of our
              knowledge and belief.
            </p>
          </div>
  
          <div className="mt-8 pt-4">
            <p>
              Verified at{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.place)}`}
              >
                {formData.place || "PLACE"}
              </span>{" "}
              on this{" "}
              <span className={`font-medium ${highlightIfEmpty(formData.day)}`}>
                {formData.day || "XX"}
              </span>{" "}
              day of{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.month)}`}
              >
                {formData.month || "XXXX"}
              </span>
              ,{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.year)}`}
              >
                {formData.year || "XXXX"}
              </span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>
          </div>
  
          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 mt-16 mb-8">
            <div className="text-right col-span-2">
              <div className="h-24 border-b-2 border-black mb-3"></div>
              <p className="font-medium">Signature of the Deponents</p>
              <div className="text-sm text-gray-600 mt-1">
                <p>{formData.name1 ? formData.name1 : ""}</p>
                <p>{formData.name2 ? formData.name2 : ""}</p>
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

export default JoinKhataTransferPreview;
