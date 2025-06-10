import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const BirtCertificateParentNameCorrectionPreview = ({ formData }) => {
  return (
    <div className="border p-6 bg-white shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center underline">AFFIDAVIT</h2>

      <p className="text-justify">
        We, {formData.fatherTitle}{" "}
        {formData.fatherName || "___________________"} H/O{" "}
        {formData.motherTitle} {formData.motherName || "___________________"},
        Permanent Address{" "}
        {formData.address ||
          "[Address Line 1, Address Line 2, City, State, Pin Code]"}
      </p>

      <p className="text-justify">
        Our Aadhaar No: Aadhaar No: {formData.fatherAadhaar || "0000 0000 0000"}
        , Aadhaar No: {formData.motherAadhaar || "0000 0000 0000"}
      </p>

      <p className="text-justify">
        Do hereby solemnly affirm and declare as under:
      </p>

      <div className="space-y-4">
        {/* Point 1 */}
        <div className="flex items-start gap-2">
          <span className="font-bold w-6">1.</span>
          <p className="text-justify">
            That Birth Certificate SL No:{" "}
            {formData.certificateNumber || "______"} issued for our{" "}
            {formData.childRelation} {formData.childName || "NAME"} from (Chief
            Registrar of Births and Deaths, Govt of Karnataka), the name of
            parents issued Father name as{" "}
            {formData.incorrectFatherName || "Incorrect Name"} and Mother name
            as {formData.incorrectMotherName || "Incorrect Name"}.
          </p>
        </div>

        {/* Point 2 */}
        <div className="flex items-start gap-2">
          <span className="font-bold w-6">2.</span>
          <p className="text-justify">
            That as per our Aadhaar card the given name of Father is{" "}
            {formData.correctFatherName || "Correct Name"} AND Mother as{" "}
            {formData.correctMotherName || "Correct Name"}.
          </p>
        </div>

        {/* Point 3 */}
        <div className="flex items-start gap-2">
          <span className="font-bold w-6">3.</span>
          <p className="text-justify">
            We state that name in our Aadhaar card's and name in our{" "}
            {formData.childRelation} Birth Certificate is the name of one and
            the same persons and that is our self's.
          </p>
        </div>

        {/* Point 4 */}
        <div className="flex items-start gap-2">
          <span className="font-bold w-6">4.</span>
          <p className="text-justify">
            That we also required this affidavit for RE ISSUE the Birth
            Certificate with parent's name as per Aadhaar card.
          </p>
        </div>
      </div>

      <p className="text-justify">
        Verified at {formData.place || "PLACE"} on this {getDayWithSuffix(formData.day) || "XX"}{" "}
        day of {formData.month || "XXXX"}, {formData.year || "XXXX"} that the
        contents of the above said affidavit are true and correct to the best of
        my knowledge and belief.
      </p>

      <div className="mt-16 text-right">
        <p>(Signature of the Deponents)</p>
      </div>
    </div>
  );
};

export default BirtCertificateParentNameCorrectionPreview;
