import React from "react";

const CommercialPreview = ({ data }) => {
  const {
    agreementDate,
    lessorName,
    lessorAddress,
    lesseeName,
    lesseeAadhaar,
    lesseeAddress,
    rentAmount,
    rentInWords,
    securityDeposit,
    securityInWords,
    paidAmount,
    paymentMode,
    tenancyStartDate,
    rentIncrease,
    noticePeriod,
    defaultPeriod,
    paintingCharge,
    electricityDetails,
    inspectionClause,
    usageType,
    premisesAddress,
    premisesSqFt,
    witness1,
    witness2,
    fixtureItems = [],
  } = data;

  return (
    <div className="bg-white p-8 text-black w-full max-w-[794px] min-h-[1123px] mx-auto border shadow-md text-justify">
      <p>This Tenancy Agreement is made and executed at Bangalore, on this {agreementDate}, by & between:</p>
      <p className="mt-4 font-bold">{lessorName},</p>
      <p>Address: {lessorAddress}</p>
      <p>Hereinafter referred to as the “LESSOR” of ONE PART.</p>

      <p className="mt-4">AND</p>

      <p className="mt-4 font-bold">{lesseeName},</p>
      <p>Aadhaar No: {lesseeAadhaar}</p>
      <p>Permanent Address: {lesseeAddress}</p>
      <p>In consideration of the rent hereinafter called as “LESSEE”.</p>

      <p className="mt-4">WHEREAS the Owner is the sole and absolute owner of the Premises situated at {premisesAddress} more fully described in Schedule. The tenant for want of accommodation requested the owner to let out premises and Owner has also agreed to let out under the following terms and conditions:</p>

      <h2 className="font-bold mt-6">NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:</h2>
      <ol className="list-decimal list-inside mt-4 space-y-2">
        <li>Rent: The LESSEE shall pay a monthly rent of Rs. {rentAmount}/- ({rentInWords}) Including Maintenance Charges on or before 5th of every month of English calendar.</li>
        <li>Deposit: The LESSEE have paid a total sum of Rs. {securityDeposit}/- ({securityInWords}) Paid Rs {paidAmount} by way of {paymentMode} as security deposit and advance which the LESSOR hereby acknowledges. The said sum shall carry no interest but refundable to the LESSEE on the termination of the tenancy.</li>
        <li>Duration: The Tenancy shall be in force for a period of 11 (Eleven) months commencing from {tenancyStartDate} and the month of tenancy being the English calendar month. After the expiry of 11 months, the LESSEE shall pay an increase of {rentIncrease}% in the existing rent.</li>
        <li>Sub-letting: The LESSEE shall not use the premises for any offensive or objectionable purpose and shall not have consent of the LESSOR hereby to sublet, under let or part with the possession to whomsoever or make any alteration.</li>
        <li>Delivery back of possession: On termination of the tenancy period to any renewal thereof, the LESSEE shall deliver back vacant possession of the schedule premises to the LESSOR in the same condition in which it was handed over at the time of joining.</li>
        <li>Notice: If the LESSOR or the LESSEE wishes to terminate the Rental Agreement period each party should issue {noticePeriod} month(s) notice in writing to each other.</li>
        <li>Additions and alterations: The LESSEE shall not cause any damages to the fixed fixtures on the above said property. Any damages caused shall be repaired at the cost of the LESSEE.</li>
        <li>Terminate: The LESSOR shall have the right to terminate the tenancy if the LESSEE fails to pay the rents regularly for a consecutive period of {defaultPeriod} Month(s) or commits breach of any of the terms herein mentioned and take possession of the premises.</li>
        <li>Painting and Cleaning Charges: At the time of vacating the premises the LESSEE shall pay Rs. {paintingCharge} as a painting and cleaning charge or such amount will be deducted from the deposit amount.</li>
        <li>Electricity and other Taxes: {electricityDetails}</li>
        <li>Inspection: {inspectionClause}</li>
        <li>The LESSEE shall use the premises for “{usageType}” only.</li>
      </ol>

      <h2 className="font-bold mt-6">SCHEDULE</h2>
      <p>All the piece and parcel of the premises at {premisesAddress} and consisting of SHOP/OFFICE SPACE WITH {premisesSqFt} SQ.FT provided with electricity and water facilities</p>

      <p className="mt-6">IN WITNESS WHEREOF the parties have set their respective hands unto this agreement the day, month and year first above written.</p>

      <div className="mt-6">
        <p className="mb-2">WITNESSES:</p>
        <p>1. {witness1}</p>
        <p className="mt-2">LESSOR<br />{lessorName}</p>
        <p className="mt-4">2. {witness2}</p>
        <p className="mt-2">LESSEE<br />{lesseeName}</p>
      </div>

      <h2 className="font-bold mt-6">ANNEXURE I</h2>
      <p>List of fixtures and fittings provided</p>
      <table className="w-full table-auto mt-4 border border-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-4 py-2">SL</th>
            <th className="border border-black px-4 py-2">ITEMS</th>
            <th className="border border-black px-4 py-2">QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          {fixtureItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-black px-4 py-2">{index + 1}</td>
              <td className="border border-black px-4 py-2">{item.item}</td>
              <td className="border border-black px-4 py-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommercialPreview;
