import React from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

const GasAffadavitPreview = ({ formData }) => {
  return (
    <div className="relative bg-white p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-300 rounded shadow overflow-hidden mx-2 sm:mx-4 lg:mx-0">
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
      <div className="relative z-20 font-serif">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center underline mb-4 sm:mb-6 md:mb-8 tracking-wider">
          AFFIDAVIT
        </h1>

        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed">
          <p className="text-justify">
            I, <strong>{formData.fullName}</strong>{" "}
            <strong>{formData.relation}</strong>,{" "}
            <strong>{formData.fatherName}</strong>, Aged:{" "}
            <strong>{formData.age}</strong> Years,
          </p>

          <p className="text-justify">
            Permanent Address: <strong>{formData.permanentAddress}</strong>
          </p>

          <p className="text-justify">
            My Aadhaar No: <strong>{formData.aadhaarNo}</strong>
          </p>

          <p className="text-justify font-medium">
            Do hereby solemnly affirm and declare as under:
          </p>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-6 sm:mt-8">
            {/* Point 1 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                1.
              </span>
              <div className="text-justify">
                That I am / was a consumer of{" "}
                <strong>{formData.gasCompanyName}</strong> for domestic use at
                the following address <strong>{formData.serviceAddress}</strong>{" "}
                since{" "}
                <strong>
                  {new Date(formData.connectionDate).toLocaleDateString()}
                </strong>
                .
                <p className="mt-2 sm:mt-3">
                  My consumer number is / was{" "}
                  <strong>{formData.consumerNumber}</strong>. I was issued with
                  Subscription Voucher No{" "}
                  <strong>{formData.subscriptionVoucher}</strong> by{" "}
                  <strong>M/s {formData.gasCompanyName}</strong> towards{" "}
                  <strong>{formData.cylinderCount}</strong> Gas cylinder(s) and{" "}
                  <strong>{formData.regulatorCount}</strong> regulator(s) on
                  loan for my use against the refundable deposit of Rs{" "}
                  <strong>{formData.depositAmount}</strong>.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                2.
              </span>
              <div className="text-justify">
                That I was given the gas cylinder and a regulator when I was
                residing in <strong>{formData.serviceAddress}</strong>.
                Thereafter, I shifted to my above-mentioned residence.
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                3.
              </span>
              <div className="text-justify">
                {formData.reason === "shifting" ? (
                  <>
                    That I want to return the Subscription Voucher along with
                    the cylinder(s) and regulator as I am shifting my residence
                    from this town and want to terminate the agreement with the
                    above mentioned Corporation.
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
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                4.
              </span>
              <div className="text-justify">
                {formData.lostItem === "subscription" ? (
                  <>
                    That I am not able to produce the Subscription Voucher along
                    with the cylinder and regulator to obtain the refundable
                    deposit as it is misplaced / lost.
                  </>
                ) : (
                  <>
                    That I am not able to produce the Termination Voucher as it
                    is misplaced / lost.
                  </>
                )}
              </div>
            </div>

            {/* Point 5 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                5.
              </span>
              <div className="text-justify">
                That I have not assigned or transferred the Subscription Voucher
                / Termination Voucher to any person whomsoever.
              </div>
            </div>

            {/* Point 6 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                6.
              </span>
              <div className="text-justify">
                That I undertake to return forthwith the above referred
                Subscription Voucher / Termination Voucher to M/s.{" "}
                <strong>{formData.gasCompanyName}</strong> if found at any time
                in the future.
              </div>
            </div>

            {/* Point 7 */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                7.
              </span>
              <div className="text-justify">
                That I shall be liable to M/s.{" "}
                <strong>{formData.gasCompanyName}</strong> for any loss or
                expense incurred by them if anyone produces the above referred
                Subscription Voucher / Termination Voucher to claim any amount
                from the Corporation.
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-justify">
            <p>
              Verified at <strong>{formData.place}</strong> on this{" "}
              <strong>{getDayWithSuffix(formData.day)}</strong> day of{" "}
              <strong>{formData.month}</strong>,{" "}
              <strong>{formData.year}</strong> that the contents of the above
              said affidavit are true and correct to the best of my knowledge
              and belief.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 text-right">
            <div className="inline-block">
              <p className="text-sm sm:text-base md:text-lg">
                (Signature of the Deponent)
              </p>
              <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base md:text-lg">
                {formData.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasAffadavitPreview;
