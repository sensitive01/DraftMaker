import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

const AddressAffadavitPreview = () => {
  const affidavitRef = useRef(null);

  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
    };
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format permanent address
  const formatPermanentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.permanentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format present address
  const formatPresentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.presentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format the relationship part of the declaration
  const formatRelationship = () => {
    if (!formData.gender) return "D/o, S/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {/* Document Content - This will be captured for PDF */}
      <div ref={affidavitRef} className="p-8 bg-white">
        <h2 className="text-center text-2xl font-bold mb-8 underline uppercase tracking-wide">
          AFFIDAVIT
        </h2>

        {/* Content */}
        <div className="mb-8 leading-relaxed">
          <p className="mb-6 text-justify">
            I,{" "}
            <span className="font-bold">
              {formData.name || "Mr/Mrs/Ms ........................."}
            </span>
            , <span>{formatRelationship()}</span>, Aged:{" "}
            <span className="font-bold">{formData.age || "......"}</span> Years,
          </p>
          <p className="mb-3">
            Permanent Address:{" "}
            <span className="font-bold">{formatPermanentAddress()}</span>
          </p>
          <p className="mb-3">
            Present Address:{" "}
            <span className="font-bold">{formatPresentAddress()}</span>
          </p>
          <p className="mb-6">
            My Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaarNo || "536709665679"}
            </span>
            .
          </p>
          <p className="mb-6 font-medium">
            Do hereby solemnly affirm and declare as under:
          </p>
        </div>

        <div className="mb-8 leading-relaxed">
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-justify">
              I hereby declare that I am presently residing at above address
              since{" "}
              <span className="font-bold">
                {formData.currentResidenceAddress || "XX/XX/XXXX"}.
              </span>
            </li>
            <li className="text-justify">
              I further declare that I am swearing this affidavit to produce
              before the concerned{" "}
              <span className="font-bold">
                {formData.companyName || "COMPANY NAME"}
              </span>
              .
            </li>
            <li className="text-justify">
              That this affidavit is being made to serve as proof of my
              <span className="font-bold"> Address </span> for the purpose of{" "}
              <span className="font-bold">
                {formData.purposeOfAffidavit || "XXXX"}
              </span>
              .
            </li>
          </ol>

          <p className="mt-8 text-justify">
            I do hereby verify and declare that what is stated above are true
            and correct to the best of my knowledge, information and belief.
          </p>
        </div>

        {/* Space for stamp and signature */}
        <div className="flex justify-between items-start mt-16">
          <div>
            <div className="border-2 border-dashed border-gray-400 w-32 h-32 flex items-center justify-center text-gray-500 text-sm text-center p-2">
              Space for
              <br />
              Legal Stamp
            </div>
          </div>

          <div className="text-right">
            <p className="mb-4">
              Solemnly affirmed at{" "}
              <span className="font-bold">{formData.place || "Bangalore"}</span>
            </p>
            <p className="mb-16">
              Date:{" "}
              <span className="font-bold">{formatDate(formData.date)}</span>
            </p>

            <div className="mt-8 border-t border-black pt-2 w-48 text-center ml-auto">
              <p>(Signature of the Applicant)</p>
              <p className="font-bold mt-1">Deponent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAffadavitPreview;
