import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const GasAffadavitPreview = ({ formData }) => {
  return (
    <div className="relative bg-white p-6 border border-gray-300 rounded shadow overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="text-gray-300 text-5xl font-bold transform -rotate-45 select-none opacity-80"
          style={{
            transform: "rotate(45deg)",
            fontSize: "3rem",
            fontWeight: "700",
            letterSpacing: "0.1em",
          }}
        >
          INTERNAL PURPOSE ONLY
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        <h1 className="text-xl font-bold text-center underline mb-6">
          AFFIDAVIT
        </h1>

        <p className="mb-4">
          I, {formData.fullName} {formData.relation}, {formData.fatherName},
          Aged: {formData.age} Years,
        </p>

        <p className="mb-4">Permanent Address: {formData.permanentAddress}</p>
        <p className="mb-4">My Aadhaar No: {formData.aadhaarNo}</p>
        <p className="mb-4">Do hereby solemnly affirm and declare as under:</p>

        <div className="space-y-4">
          {/* Point 1 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">1</span>
            <div>
              That I am / was a consumer of{" "}
              <strong>{formData.gasCompanyName}</strong> for domestic use at the
              following address {formData.serviceAddress} since{" "}
              {new Date(formData.connectionDate).toLocaleDateString()}.
              <p className="mt-2">
                My consumer number is / was{" "}
                <strong>{formData.consumerNumber}</strong>. I was issued with
                Subscription Voucher No{" "}
                <strong>{formData.subscriptionVoucher}</strong> by{" "}
                <strong>M/s {formData.gasCompanyName}</strong> towards{" "}
                {formData.cylinderCount} Gas cylinder(s) and{" "}
                {formData.regulatorCount} regulator(s) on loan for my use
                against the refundable deposit of Rs {formData.depositAmount}.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">2</span>
            <div>
              That I was given the gas cylinder and a regulator when I was
              residing in {formData.previousAddress}. Thereafter, I shifted to
              my above-mentioned residence.
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">3</span>
            <div>
              {formData.reason === "shifting" ? (
                <>
                  That I want to return the Subscription Voucher along with the
                  cylinder(s) and regulator as I am shifting my residence from
                  this town and want to terminate the agreement with the above
                  mentioned Corporation.
                </>
              ) : (
                <>
                  That I want to terminate the agreement with the above
                  mentioned distributor.
                </>
              )}
            </div>
          </div>

          {/* Point 4 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">4</span>
            <div>
              {formData.lostItem === "subscription" ? (
                <>
                  That I am not able to produce the Subscription Voucher along
                  with the cylinder and regulator to obtain the refundable
                  deposit as it is misplaced / lost.
                </>
              ) : (
                <>
                  That I am not able to produce the Termination Voucher as it is
                  misplaced / lost.
                </>
              )}
            </div>
          </div>

          {/* Point 5 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">5</span>
            <div>
              That I have not assigned or transferred the Subscription Voucher /
              Termination Voucher to any person whomsoever.
            </div>
          </div>

          {/* Point 6 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">6</span>
            <div>
              That I undertake to return forthwith the above referred
              Subscription Voucher / Termination Voucher to M/s.{" "}
              {formData.gasCompanyName} if found at any time in the future.
            </div>
          </div>

          {/* Point 7 */}
          <div className="flex items-start gap-2">
            <span className="font-bold w-6">7</span>
            <div>
              That I shall be liable to M/s. {formData.gasCompanyName} for any
              loss or expense incurred by them if anyone produces the above
              referred Subscription Voucher / Termination Voucher to claim any
              amount from the Corporation.
            </div>
          </div>
        </div>

        <p className="mt-6">
          Verified at <strong>{formData.place}</strong> on this{" "}
          {getDayWithSuffix(formData.day)} {""}
          {formData.month}, {formData.year} that the contents of the above said
          affidavit are true and correct to the best of my knowledge and belief.
        </p>

        <div className="mt-10 text-right">
          <p>(Signature of the Deponent)</p>
          <p className="mt-1">{formData.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default GasAffadavitPreview;
