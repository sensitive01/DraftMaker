import React, { useRef } from "react";

const CommercialPreview = ({ formData }) => {
  const previewRef = useRef(null);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date, Month, Year";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderLessors = () => {
    const lessors = formData.lessors || [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
      },
    ];

    return lessors.map((lessor, index) => (
      <div key={index} className="mb-5 text-justify leading-relaxed">
        <span className="font-semibold">
          {lessor.name || `LESSOR ${index + 1} NAME`}
        </span>
        {index < lessors.length - 1 ? "," : ""}
        <br />
        Address:{" "}
        <span>
          {lessor.addressLine1 || `LESSOR ${index + 1} Address Line 1`}
          {lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}
          {lessor.city ? ", " + lessor.city : ""}
          {lessor.state ? ", " + lessor.state : ""}
          {lessor.pinCode ? " - " + lessor.pinCode : ""}
        </span>
      </div>
    ));
  };

  const renderLessees = () => {
    const lessees = formData.lessees || [
      {
        name: "",
        aadhaar: "",
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCity: "",
        permanentState: "",
        permanentPinCode: "",
      },
    ];

    return lessees.map((lessee, index) => (
      <div key={index} className="mb-5 text-justify leading-relaxed">
        <span className="font-semibold">
          {lessee.name || `LESSEE ${index + 1} NAME`}
        </span>
        {index < lessees.length - 1 ? "," : ""}
        <br />
        Aadhaar No: <span>{lessee.aadhaar || "0000 0000 0000"}</span>
        <br />
        Permanent Address:{" "}
        <span>
          {lessee.permanentAddressLine1 || `LESSEE ${index + 1} Address Line 1`}
          {lessee.permanentAddressLine2
            ? ", " + lessee.permanentAddressLine2
            : ""}
          {lessee.permanentCity ? ", " + lessee.permanentCity : ""}
          {lessee.permanentState ? ", " + lessee.permanentState : ""}
          {lessee.permanentPinCode ? " - " + lessee.permanentPinCode : ""}
        </span>
      </div>
    ));
  };

  const getPropertyAddress = () => {
    const lessor = formData.lessors?.[0] || {};
    return (
      <>
        {lessor.addressLine1 || "LESSOR Address Line 1"}
        {lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}
        {lessor.city ? ", " + lessor.city : ""}
        {lessor.state ? ", " + lessor.state : ""}
        {lessor.pinCode ? " - " + lessor.pinCode : ""}
      </>
    );
  };

  const renderWitnessSections = () => {
    const lessors = formData.lessors || [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
      },
    ];

    const lessees = formData.lessees || [
      {
        name: "",
        aadhaar: "",
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCity: "",
        permanentState: "",
        permanentPinCode: "",
      },
    ];

    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="font-semibold mb-2">WITNESSES:</div>
          <div className="mb-2">1. ________________________</div>
          <div className="mt-16">
            <div className="font-bold mb-1">LESSOR</div>
            {lessors.map((lessor, index) => (
              <div key={index} className="font-semibold mb-1">
                {lessor.name || `LESSOR ${index + 1} NAME`}
              </div>
            ))}
            <div>(Signature)</div>
          </div>
        </div>
        <div>
          <div className="mb-2">2. ________________________</div>
          <div className="mt-16">
            <div className="font-bold mb-1">LESSEE</div>
            {lessees.map((lessee, index) => (
              <div key={index} className="font-semibold mb-1">
                {lessee.name || `LESSEE ${index + 1} NAME`}
              </div>
            ))}
            <div>(Signature)</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-full  py-4">
        <div ref={previewRef} className="print-container">
          {/* Page 1 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="watermark">INTERNAL PURPOSE ONLY</div>

 

            {/* Content with proper legal document padding */}
            <div className="p-8 md:p-10 lg:p-12">
              <div className="text-center font-bold text-xl mb-8 underline tracking-wide">
                COMMERCIAL AGREEMENT
              </div>

              <p className="mb-5 text-justify leading-relaxed">
                This Tenancy Agreement is made and executed at Bangalore, on
                this{" "}
                <span className="font-semibold px-1">
                  {formatDate(formData.agreementDate)}
                </span>
                , by & between:
              </p>

              {renderLessors()}

              <p className="mb-5 text-justify leading-relaxed">
                Hereinafter referred to as the{" "}
                <span className="font-semibold">"LESSOR"</span> of ONE PART.
              </p>

              <p className="mb-5 font-bold text-center">AND</p>
              {renderLessees()}

              <p className="mb-5 text-justify leading-relaxed">
                In consideration of the rent hereinafter called as{" "}
                <span className="font-semibold">"LESSEE"</span>.
              </p>

              <p className="mb-5 text-justify leading-relaxed">
                WHEREAS the Owner is the sole and absolute owner of the Premises
                situated at{" "}
                <span className="font-semibold">
                  {formData.propertyAddress || "Complete Property Address"}
                </span>{" "}
                more fully described in Schedule. The tenant for want of
                accommodation requested the owner to let out premises and Owner
                has also agreed to let out under the following terms and
                conditions:
              </p>

              <p className="mb-5 font-bold text-center">
                NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
              </p>

              <div className="pl-8 mb-5 space-y-4">
                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">1.</span>
                  <div>
                    <span className="font-semibold">Rent:</span> The LESSEE
                    shall pay a monthly rent of Rs.{" "}
                    <span className="font-semibold">
                      {formData.rentAmount || "00,000"}
                    </span>{" "}
                    /- (Rupees{" "}
                    <span className="font-semibold">
                      {formData.rentAmountWords || "In Words Only"}
                    </span>
                    ) Including Maintenance Charges on or before 5<sup>th</sup>{" "}
                    of every month of English calendar.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">2.</span>
                  <div>
                    <span className="font-semibold">Deposit:</span> The LESSEE
                    have paid a total sum of Rs.{" "}
                    <span className="font-semibold">
                      {formData.depositAmount || "00,000"}
                    </span>
                    /- (Rupees{" "}
                    <span className="font-semibold">
                      {formData.depositAmountWords || "In Words Only"}
                    </span>
                    ) Paid Rs{" "}
                    <span className="font-semibold">
                      {formData.depositAmount || "00,000"}
                    </span>{" "}
                    by way of cash/online as security deposit and advance which
                    the LESSOR hereby acknowledges the said sum shall carry no
                    interest but refundable to the LESSEE on the termination of
                    the tenancy.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">3.</span>
                  <div>
                    <span className="font-semibold">Duration:</span> The Tenancy
                    shall be in force for a period of 11 (Eleven) months
                    commencing from{" "}
                    <span className="font-semibold">
                      {formatDate(formData.agreementStartDate)}
                    </span>{" "}
                    and the month of tenancy being the English calendar month.
                    After the expiry of 11 months the LESSEE shall pay an
                    increase of{" "}
                    <span className="font-semibold">
                      {formData.rentIncreasePercentage || "00"}%
                    </span>{" "}
                    in the existing rent.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">4.</span>
                  <div>
                    <span className="font-semibold">Sub-letting:</span> The
                    LESSEE shall not use the premises for any offensive or
                    objectionable purpose and shall not have consent of the
                    LESSOR hereby to sublet, under let or part with the
                    possession to whomsoever or make any alteration.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">5.</span>
                  <div>
                    <span className="font-semibold">
                      Delivery back of possession:
                    </span>{" "}
                    On termination of the tenancy period to any renewal thereof,
                    the LESSEE shall deliver back vacant possession of the
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 1 of 3
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="watermark">INTERNAL PURPOSE ONLY</div>


            <div className="p-8 md:p-10 lg:p-12">
              <p className="mb-5 text-justify leading-relaxed">
                schedule premises to the LESSOR in the same condition in which
                it was handed over at the time of joining.
              </p>

              <div className="pl-8 mb-5 space-y-4">
                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">6.</span>
                  <div>
                    <span className="font-semibold">Notice:</span> If the LESSOR
                    or the LESSEE wishes to terminate the Commercial Agreement
                    period each party should issue{" "}
                    <span className="font-semibold">
                      {formData.noticePeriod || "..."}
                    </span>{" "}
                    month notice in writing to each other.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">7.</span>
                  <div>
                    <span className="font-semibold">
                      Additions and alterations:
                    </span>{" "}
                    The LESSEE shall not cause any damages to the fixed fixtures
                    on the above said property. Any damages caused shall be
                    repaired at the cost of the LESSEE.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">8.</span>
                  <div>
                    <span className="font-semibold">Terminate:</span> The LESSOR
                    shall have the right to terminate the tenancy if the LESSEEs
                    fails to pay the rents regularly for a consecutive period of{" "}
                    <span className="font-semibold">
                      {formData.defaultPeriod || "2"}
                    </span>{" "}
                    Months or commits breach of any of the terms herein
                    mentioned and take possession of the premises.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">9.</span>
                  <div>
                    <span className="font-semibold">
                      Painting and Cleaning Charges:
                    </span>{" "}
                    At the time of vacating the premises the LESSEE shall pay{" "}
                    <span className="font-semibold">
                      Rs. {formData.paintingCharges || "..."}
                    </span>{" "}
                    as a painting and cleaning charges or such amount will be
                    deducted from the deposit amount.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">10.</span>
                  <div>
                    <span className="font-semibold">
                      Electricity and other Taxes:
                    </span>{" "}
                    The LESSEE shall bear and pay the Electrical charges
                    consumed as per the meter provided to concerned authorities
                    and the LESSOR shall pay the property taxes.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">11.</span>
                  <div>
                    <span className="font-semibold">Inspection:</span> The
                    LESSOR or his representatives shall be entitled to enter the
                    premises with prior appointment to inspect the same to
                    satisfy himself that the premises if being and used in
                    accordance with the terms of Agreement.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">12.</span>
                  <div>
                    The LESSEE shall use the premises for{" "}
                    <span className="font-semibold">"COMMERCIAL PURPOSE"</span>{" "}
                    only.
                  </div>
                </div>
                {formData.additionaldetails && (
                  <div className="text-justify leading-relaxed flex">
                    <span className="font-semibold mr-3 flex-shrink-0">
                      13.
                    </span>
                    <div className="font-semibold">
                      {formData.additionaldetails}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 mb-6">
                <div className="text-center font-bold mb-5 text-lg underline">
                  SCHEDULE
                </div>
                <p className="text-justify leading-relaxed">
                  All the piece and parcel of the premises at{" "}
                  <span>{getPropertyAddress()}</span>
                  and consisting of{" "}
                  <span className="font-semibold">
                    {formData.commercialType
                      ? formData.commercialType.toUpperCase()
                      : "SHOP/OFFICE"}{" "}
                    SPACE WITH {formData.squareFeet || "XX"} SQ.FT
                  </span>
                  , provided with electricity and water facilities.
                </p>
              </div>

              <p className="mb-6 text-justify leading-relaxed">
                IN WITNESS WHEREOF the parties have set their respective hands
                unto this agreement the day, month and year first above written.
              </p>

              {renderWitnessSections()}

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 2 of 3
              </div>
            </div>
          </div>

          {/* Page 3 */}
          <div className="page relative bg-white  mx-auto mb-8">
            <div className="watermark">INTERNAL PURPOSE ONLY</div>



            <div className="p-8 md:p-10 lg:p-12">
              <div className="text-center mt-6 mb-8">
                <div className="font-bold mb-2 text-lg underline">
                  ANNEXURE I
                </div>
                <div>List of fixtures and fittings provided</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-black p-3 bg-gray-100 text-center w-1/12 font-semibold">
                        SL
                      </th>
                      <th className="border border-black p-3 bg-gray-100 text-center w-7/12 font-semibold">
                        ITEMS
                      </th>
                      <th className="border border-black p-3 bg-gray-100 text-center w-1/4 font-semibold">
                        QUANTITY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.fixtures && formData.fixtures.length > 0
                      ? formData.fixtures
                      : Array(15).fill({ item: "", quantity: "" })
                    )
                      .slice(0, 15)
                      .map((fixture, index) => (
                        <tr key={index}>
                          <td className="border border-black p-3 text-center h-10">
                            {index + 1}
                          </td>
                          <td className="border border-black p-3 h-10">
                            {fixture.item}
                          </td>
                          <td className="border border-black p-3 text-center h-10">
                            {fixture.quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 3 of 3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for printing and responsive display */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");

        .page {
          font-family: "Libre Baskerville", "Times New Roman", Times, serif;
          line-height: 1.6;
          color: #111827;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: 210mm;
            height: 297mm;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
            padding: 0;
          }
          .page > div {
            padding: 25mm 20mm;
          }
        }

        /* A4 styling for screen */
        @media screen {
          .page {
            background: white;
            width: 100%;
            max-width: 210mm;
            min-height: 297mm;
            margin-bottom: 2rem;
          }
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 3rem;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          letter-spacing: 0.2em;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          user-select: none;
        }

        @media print {
          .watermark {
            font-size: 4rem;
            color: rgba(0, 0, 0, 0.08);
          }
        }

        /* Make sure content doesn't overflow on small screens */
        @media screen and (max-width: 640px) {
          .page {
            min-height: auto;
          }
        }

        /* Legal document styling */
        .text-justify {
          text-align: justify;
          hyphens: auto;
        }

        ol li {
          margin-bottom: 0.75rem;
        }

        table {
          border-spacing: 0;
        }

        th,
        td {
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};

export default CommercialPreview;
