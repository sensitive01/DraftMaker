import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

const PassportNameChangePreview = () => {
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
    if (!formData.gender) return "D/o, S/o, H/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
      "H/O": "H/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-6 text-center underline">
          AFFIDAVIT
        </h2>

        {/* Content */}
        <div className="mb-6">
          <p className="mb-4 text-justify leading-relaxed">
            I, <strong>{formData.name || "Mr/Mrs/Ms …………………………."}</strong>,{" "}
            {formatRelationship()}, Aged:{" "}
            <strong>{formData.age || "……"}</strong> Years,
          </p>
          <p className="mb-2">
            Permanent Address: <strong>{formatPermanentAddress()}</strong>
          </p>
          <p className="mb-2">
            Present Address: <strong>{formatPresentAddress()}</strong>
          </p>
          <p className="mb-2">
            My Aadhaar No:{" "}
            <strong>{formData.aadhaarNo || "0000 0000 0000"}</strong>
          </p>
          <p className="mb-4">
            My Passport No: <strong>{formData.passportNo || "0000"}</strong>
          </p>
        </div>

        <div className="mb-6">
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-justify">
              That as per My Aadhaar card my given name is{" "}
              <strong>{formData.currentGivenName || "NAME"}</strong> and in my
              Expired Passport, my given name is{" "}
              <strong>{formData.currentGivenName || "NAME"}</strong>, surname is{" "}
              <strong>{formData.currentSurname || "NAME"}</strong>.
            </li>
            <li className="text-justify">
              That I wanted to change my given name as{" "}
              <strong>{formData.newGivenName || "NAME"}</strong> and surname as{" "}
              <strong>{formData.newSurname || "NAME"}</strong> from given name{" "}
              <strong>{formData.currentGivenName || "NAME"}</strong> and surname{" "}
              <strong>{formData.currentSurname || "NAME"}</strong>, for getting
              reissue of PASSPORT.
            </li>
            <li className="text-justify">
              That I also required this affidavit for Publishing News Paper
              Advertisement for The Name Change.
            </li>
          </ol>

          <p className="mt-6 text-justify">
            I hereby state that whatever is stated herein above is true to the
            best of my knowledge.
          </p>
        </div>

        {/* Space for photo and signature */}
        <div className="flex justify-between mt-12">
          <div className="flex flex-col items-center">
            <div className="border-2 border-dashed border-gray-300 w-32 h-40 flex items-center justify-center text-gray-400 text-sm text-center p-2">
              (Photo)
            </div>
          </div>

          <div className="text-right">
            <p className="mb-6">
              Solemnly affirmed at{" "}
              <strong>{formData.place || "Bangalore"}</strong>
            </p>
            <p className="mb-8">
              Date: <strong>{formatDate(formData.date)}</strong>
            </p>

            <div className="mt-12 border-t border-black pt-2 w-48 text-center ml-auto">
              <p>(Signature of the Applicant)</p>
              <p className="font-bold">Deponent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportNameChangePreview;
