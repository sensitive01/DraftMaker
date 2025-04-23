import React from 'react'

const GasAffadavitPreview = ({formData}) => {
  return (
    <div className="bg-white p-6 border border-gray-300 rounded shadow">
    <h1 className="text-xl font-bold text-center underline mb-6">
      AFFIDAVIT
    </h1>

    <p className="mb-4">
      I, {formData.fullName} {formData.relation}, Aged: {formData.age} Years,
    </p>

    <p className="mb-4">Permanent Address {formData.permanentAddress}</p>

    <p className="mb-4">My Aadhaar No: {formData.aadhaarNo}</p>

    <p className="mb-4">Do hereby solemnly affirm and declare as under:</p>

    <ol className="list-decimal pl-6 space-y-4">
      <li>
        That I am / was a consumer of{" "}
        <strong>{formData.gasCompanyName}</strong> for domestic use at the
        following address {formData.serviceAddress} since{" "}
        {new Date(formData.connectionDate).toLocaleDateString()}
        <p className="mt-2">
          My consumer number is / was{" "}
          <strong>{formData.consumerNumber}</strong> I was issued with
          Subscription Voucher No{" "}
          <strong>{formData.subscriptionVoucher}</strong> by{" "}
          <strong>M/s {formData.gasCompanyName}</strong> towards{" "}
          {formData.cylinderCount} Gas cylinder and {formData.regulatorCount}{" "}
          regulator on loan for my use against the refundable deposit of Rs{" "}
          {formData.depositAmount}
        </p>
      </li>

      <li>
        That I was given the gas cylinder and a regulator when I was residing
        in {formData.previousAddress} Thereafter, I shifted to my above
        mentioned residence.
      </li>

      <li>
        {formData.reason === "shifting" ? (
          <p>
            That I want to return the Subscription Voucher along with the
            cylinder(s) and regulator as I am shifting my residence from this
            town and want to terminate the agreement with the above mentioned
            Corporation.
          </p>
        ) : (
          <p>
            That I want to terminate the agreement with the above mentioned
            distributor.
          </p>
        )}
      </li>

      <li>
        {formData.lostItem === "subscription" ? (
          <p>
            That I am not able to produce the Subscription Voucher along with
            the cylinder and regulator to obtain the refundable deposit as it
            is misplaced / lost.
          </p>
        ) : (
          <p>
            That I am not able to produce the Termination Voucher as it
            misplaced / lost.
          </p>
        )}
      </li>

      <li>
        That I have not assigned or transferred the Subscription Voucher /
        Termination Voucher to any person whomsoever.
      </li>

      <li>
        That I undertake to return forthwith the above referred Subscription
        Voucher / Termination Voucher to M/s. Hindustan Petroleum Corporation
        Ltd. if found at any time in the future.
      </li>

      <li>
        That I shall be liable to M/s. Hindustan Petroleum Corporation Ltd.
        for any loss or expense incurred by them if any one produces the above
        referred Subscription Voucher / Termination Voucher to claim any
        amount from the Corporation.
      </li>
    </ol>

    <p className="mt-6">
      Verified at <strong>{formData.place}</strong> on this {formData.day} day
      of {formData.month}, {formData.year} that the contents of the above said
      affidavit are true and correct to the best of my knowledge and belief.
    </p>

    <div className="mt-10 text-right">
      <p>(Signature of the Deponent)</p>
      <p className="mt-1">{formData.fullName}</p>
    </div>
  </div>
  )
}

export default GasAffadavitPreview