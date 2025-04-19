import React from "react";

const CommercialPreview = ({ formData }) => {
  return (
    <div>
      <div className="bg-white shadow-md mx-auto relative p-20 font-serif text-base leading-relaxed">
        {/* Page 1 */}
        <div className="relative min-h-screen">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

          <div className="text-center font-bold text-xl mb-6 underline">COMMERCIAL AGREEMENT</div>

          <p className="mb-4">
            This Tenancy Agreement is made and executed at Bangalore, on this{" "}
            <span className="bg-yellow-200 px-1">
              {formData.agreementDate
                ? new Date(formData.agreementDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date, Month, Year"}
            </span>
            , by & between:
          </p>

          <p className="mb-4">
            <span className="bg-yellow-200 px-1">
              {formData.lessorName || "LESSOR NAME"}
            </span>
            ,
            <br />
            Address{" "}
            <span className="bg-yellow-200 px-1">
              [{formData.lessorAddressLine1 || "LESSOR Address Line 1"},{" "}
              {formData.lessorAddressLine2 || "Address Line 2"},{" "}
              {formData.lessorCity || "City"}, {formData.lessorState || "State"}
              , {formData.lessorPinCode || "Pin Code"}]
            </span>
          </p>

          <p className="mb-4">
            Hereinafter referred to as the "LESSOR" of ONE PART.
          </p>

          <p className="mb-4 font-bold">
            AND
          </p>

          <p className="mb-4">
            <span className="bg-yellow-200 px-1">
              {formData.lesseeName || "LESSOR NAME"}
            </span>
            ,
            <br />
            Aadhaar No:{" "}
            <span className="bg-yellow-200 px-1">
              {formData.lesseeAadhaar || "0000 0000 0000"}
            </span>
            <br />
            Permanent Address{" "}
            <span className="bg-yellow-200 px-1">
              [{formData.lesseePermanentAddressLine1 || "LESSOR Address Line 1"}
              , {formData.lesseePermanentAddressLine2 || "Address Line 2"},{" "}
              {formData.lesseePermanentCity || "City"},{" "}
              {formData.lesseePermanentState || "State"},{" "}
              {formData.lesseePermanentPinCode || "Pin Code"}]
            </span>
          </p>

          <p className="mb-4">
            In consideration of the rent hereinafter called as "LESSEE".
          </p>

          <p className="mb-4">
            WHEREAS the Owner is the sole and absolute owner of the Premises
            situated at{" "}
            <span className="bg-yellow-200 px-1">
              [{formData.propertyAddressLine1 || "LESSOR Address Line 1"},{" "}
              {formData.propertyAddressLine2 || "Address Line 2"},{" "}
              {formData.propertyCity || "City"},{" "}
              {formData.propertyState || "State"},{" "}
              {formData.propertyPinCode || "Pin Code"}]
            </span>{" "}
            more fully described in Schedule. The tenant for want of
            accommodation requested the owner to let out premises and Owner has
            also agreed to let out under the following terms and conditions:
          </p>

          <p className="mb-4 font-bold">
            NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
          </p>

          <ol className="list-decimal pl-6 mb-5">
            <li className="mb-3">
              <span className="font-bold">Rent:</span> The LESSEE shall pay a
              monthly rent of Rs.{" "}
              <span className="bg-yellow-200 px-1">
                {formData.rentAmount || "00,000"}
              </span>{" "}
              /- (Rupees{" "}
              <span className="bg-yellow-200 px-1">
                {formData.rentAmountWords || "in words Only"}
              </span>
              ) Including Maintenance Charges on or before 5<sup>th</sup> of
              every month of English calendar.
            </li>
            <li className="mb-3">
              <span className="font-bold">Deposit:</span> The LESSEE have
              paid a total sum of Rs.{" "}
              <span className="bg-yellow-200 px-1">
                {formData.depositAmount || "00,000"}
              </span>
              /- (Rupees{" "}
              <span className="bg-yellow-200 px-1">
                {formData.depositAmountWords || "in words Only"}
              </span>
              ) Paid Rs{" "}
              <span className="bg-yellow-200 px-1">
                {formData.depositAmount || "00,000"}
              </span>{" "}
              by way of cash/online as security deposit and advance which the
              LESSOR hereby acknowledges the said sum shall carry no interest
              but refundable to the LESSEE on the termination of the tenancy.
            </li>
            <li className="mb-3">
              <span className="font-bold">Duration:</span> The Tenancy shall
              be in force for a period of 11 (Eleven) months commencing from{" "}
              <span className="bg-yellow-200 px-1">
                {formData.agreementStartDate
                  ? new Date(formData.agreementStartDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Date, Month, Year"}
              </span>{" "}
              and the month of tenancy being the English calendar month. After
              the expiry of 11 months the LESSEE shall pay an increase of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.rentIncreasePercentage || "00"}%
              </span>{" "}
              in the existing rent.
            </li>
            <li className="mb-3">
              <span className="font-bold">Sub-letting:</span> The LESSEE
              shall not use the premises for any offensive or objectionable
              purpose and shall not have consent of the LESSOR hereby to sublet,
              under let or part with the possession to whomsoever or make any
              alteration.
            </li>
            <li className="mb-3">
              <span className="font-bold">Delivery back of possession:</span>{" "}
              On termination of the tenancy period to any renewal thereof, the
              LESSEE shall deliver back vacant possession of the
            </li>
          </ol>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">Page 1 of 3</div>
        </div>

        <div className="page-break"></div>

        {/* Page 2 */}
        <div className="relative min-h-screen">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

          <p className="mb-4">
            schedule premises to the LESSOR in the same condition in which it
            was handed over at the time of joining.
          </p>

          <ol className="list-decimal pl-6 mb-5" start="6">
            <li className="mb-3">
              <span className="font-bold">Notice:</span> If the LESSOR or the
              LESSEE wishes to terminate the Rental Agreement period each party
              should issue{" "}
              <span className="bg-yellow-200 px-1">
                {formData.noticePeriod || "......"}
              </span>{" "}
              month notice in writing to each other.
            </li>
            <li className="mb-3">
              <span className="font-bold">Additions and alterations:</span>{" "}
              The LESSEE shall not cause any damages to the fixed fixtures on
              the above said property. Any damages caused shall be repaired at
              the cost of the LESSEE.
            </li>
            <li className="mb-3">
              <span className="font-bold">Terminate:</span> The LESSOR shall
              have the right to terminate the tenancy if the LESSEEs fails to
              pay the rents regularly for a consecutive period of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.defaultPeriod || "......"}
              </span>{" "}
              Months or commits breach of any of the terms herein mentioned and
              take possession of the premises.
            </li>
            <li className="mb-3">
              <span className="font-bold">
                Painting and Cleaning Charges:
              </span>{" "}
              At the time of vacating the premises the LESSEE shall pay{" "}
              <span className="bg-yellow-200 px-1">
                {formData.paintingCharges || "............"}
              </span>{" "}
              as a painting and cleaning charges or such amount will be deducted
              from the deposit amount.
            </li>
            <li className="mb-3">
              <span className="font-bold">Electricity and other Taxes:</span>{" "}
              The LESSEE shall bear and pay the Electrical charges consumed as
              per the meter provided to concerned authorities and the LESSOR
              shall pay the property taxes.
            </li>
            <li className="mb-3">
              <span className="font-bold">Inspection:</span> The LESSOR or
              his representatives shall be entitled to enter the premises with
              prior appointment to inspect the same to satisfy himself that the
              premises if being and used in accordance with the terms of
              Agreement.
            </li>
            <li className="mb-3">
              The LESSEE shall use the premises for{" "}
              <span className="bg-yellow-200 px-1">"RESIDENTIAL PURPOSE"</span> only.
            </li>
          </ol>

          <div className="mt-8 mb-5">
            <div className="text-center font-bold mb-4">SCHEDULE</div>
            <p>
              All the piece and parcel of the premises at{" "}
              <span className="bg-yellow-200 px-1">
                [{formData.propertyAddressLine1 || "LESSOR Address Line 1"},{" "}
                {formData.propertyAddressLine2 || "Address Line 2"},{" "}
                {formData.propertyCity || "City"},{" "}
                {formData.propertyState || "State"},{" "}
                {formData.propertyPinCode || "Pin Code"}]
              </span>{" "}
              and consisting of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.bhkConfig || "XBHK"}, {formData.bedroomCount || "X"}{" "}
                bedroom, {formData.hallCount || "X"} Hall,{" "}
                {formData.kitchenCount || "X"} Kitchen with{" "}
                {formData.toiletCount || "X"}Toilets
              </span>
              , provided with electricity and water facilities
            </p>
          </div>

          <p className="mb-4">
            IN WITNESS WHEREOF the parties have set their respective hands unto
            this agreement the day, month and year first above written.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            <div>
              <div>WITNESSES:</div>
              <div>1.</div>
              <div className="mt-10">
                <div className="font-bold">LESSOR</div>
                <div className="bg-yellow-200 px-1">
                  {formData.lessorName || "LESSOR NAME"}
                </div>
              </div>
            </div>
            <div>
              <div>2.</div>
              <div className="mt-10">
                <div className="font-bold">LESSEE</div>
                <div className="bg-yellow-200 px-1">
                  {formData.lesseeName || "LESSOR NAME"}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">Page 2 of 3</div>
        </div>

        <div className="page-break"></div>

        {/* Page 3 */}
        <div className="relative min-h-screen">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

          <div className="text-center mt-8 mb-4">
            <div className="font-bold mb-1">ANNEXURE I</div>
            <div>List of fixtures and fittings provided</div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-gray-100 text-center w-1/12">SL</th>
                <th className="border border-black p-2 bg-gray-100 text-center w-7/12">ITEMS</th>
                <th className="border border-black p-2 bg-gray-100 text-center w-1/4">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {(formData.fixtures && formData.fixtures.length > 0
                ? formData.fixtures
                : [
                    { item: "", quantity: "" },
                    { item: "", quantity: "" },
                    { item: "", quantity: "" },
                  ]
              ).map((fixture, index) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center h-8">{index + 1}</td>
                  <td className="border border-black p-2 h-8">{fixture.item}</td>
                  <td className="border border-black p-2 text-center h-8">{fixture.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">Page 3 of 3</div>
        </div>
      </div>

      <button
        className="block w-36 mx-auto my-5 py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded"
        onClick={() => window.print()}
      >
        Print Agreement
      </button>
    </div>
  );
};

export default CommercialPreview;