import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

const MinorNameCorrectionPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response?.data?.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="border p-6 bg-white shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center underline">AFFIDAVIT</h2>

      <p className="text-justify">
        We, {formData.parentTitle}{" "}
        {formData.parentName || "___________________"} H/O{" "}
        {formData.spouseTitle} {formData.spouseName || "___________________"},
        Permanent Address{" "}
        {formData.address ||
          "[Address Line 1, Address Line 2, City, State, Pin Code]"}
      </p>

      <p className="text-justify">
        Our Aadhaar No: Aadhaar No: {formData.parentAadhaar || "0000 0000 0000"}
        , Aadhaar No: {formData.spouseAadhaar || "0000 0000 0000"}
      </p>

      <p className="text-justify">
        Do hereby solemnly affirm and declare as under:
      </p>

      <ol className="list-decimal pl-6">
        <li className="mb-3">
          That Birth Certificate No: {formData.certificateNumber || "_______"}{" "}
          issued for our {formData.childRelation}{" "}
          {formData.childName || "_______"} from (Chief Register of Births and
          Deaths, Govt of Karnataka), the name of our {formData.childRelation}{" "}
          mentioned as {formData.incorrectName || "Incorrect Name"}.
        </li>

        <li className="mb-3">
          That as per our {formData.childRelation}'s Aadhaar card the given name
          is {formData.correctName || "Correct Name"}.
        </li>

        <li className="mb-3">
          We state that we wanted to change our {formData.childRelation}'s name
          in {formData.childRelation === "Daughter" ? "her" : "his"} Birth
          Certificate as per{" "}
          {formData.childRelation === "Daughter" ? "her" : "his"}
          Aadhaar Card that is {formData.correctName || "Correct Name"} which is
          correct name.
        </li>

        <li className="mb-3">
          That we also required this affidavit for RE ISSUE the Birth
          Certificate with correct name.
        </li>
      </ol>

      <p className="text-justify">
        Verified at {formData.place || "PLACE"} on this {formData.day || "XX"}{" "}
        day of {formData.month || "XXXX"}, {formData.year || "XXXX"}, that the
        contents of the above said affidavit are true and correct to the best of
        my knowledge and belief.
      </p>

      <div className="mt-16 text-right">
        <p>(Signature of the Deponent)</p>
      </div>
    </div>
  );
};

export default MinorNameCorrectionPreview;
