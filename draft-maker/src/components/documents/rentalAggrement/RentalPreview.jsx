import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const RentalPreview = ({ formData }) => {
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

  // Function to generate PDF
  const generatePDF = async () => {
    const input = previewRef.current;
    if (!input) return;

    try {
      // Show loading indicator
      const loadingElement = document.createElement("div");
      loadingElement.innerText = "Generating PDF...";
      loadingElement.style.position = "fixed";
      loadingElement.style.top = "50%";
      loadingElement.style.left = "50%";
      loadingElement.style.transform = "translate(-50%, -50%)";
      loadingElement.style.padding = "20px";
      loadingElement.style.background = "rgba(0,0,0,0.7)";
      loadingElement.style.color = "white";
      loadingElement.style.borderRadius = "8px";
      loadingElement.style.zIndex = "9999";
      document.body.appendChild(loadingElement);

      // Get all pages
      const pages = input.querySelectorAll(".page");
      const pdf = new jsPDF("p", "mm", "a4");

      // Add custom font if needed
      // pdf.addFont('Times-Roman', 'Times', 'normal');
      // pdf.setFont('Times');

      // For each page
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const canvas = await html2canvas(page, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          allowTaint: true,
        });

        // A4 size in mm: 210 x 297
        const imgData = canvas.toDataURL("image/png");

        // Add new page if not first page
        if (i > 0) {
          pdf.addPage();
        }

        // Add image to PDF (fit to A4)
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      }

      // Remove loading indicator
      document.body.removeChild(loadingElement);

      // Save PDF
      pdf.save("Rental_Agreement.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Function to print
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto py-4">
        <div ref={previewRef} className="print-container">
          {/* Page 1 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

            {/* Content with proper legal document padding */}
            <div className="p-8 md:p-10 lg:p-12">
              <div className="text-center font-bold text-xl mb-8 underline tracking-wide">
                RENTAL AGREEMENT
              </div>

              <p className="mb-5 text-justify leading-relaxed">
                This Tenancy Agreement is made and executed at Bangalore, on
                this{" "}
                <span className="font-semibold px-1">
                  {formatDate(formData.agreementDate)}
                </span>
                , by & between:
              </p>

              <p className="mb-5 text-justify leading-relaxed">
                <span className="font-semibold">
                  {formData.lessorName || "LESSOR NAME"}
                </span>
                ,
                <br />
                Address:{" "}
                <span>
                  {formData.lessorAddressLine1 || "LESSOR Address Line 1"}
                  {formData.lessorAddressLine2
                    ? ", " + formData.lessorAddressLine2
                    : ""}
                  {formData.lessorCity ? ", " + formData.lessorCity : ""}
                  {formData.lessorState ? ", " + formData.lessorState : ""}
                  {formData.lessorPinCode ? " - " + formData.lessorPinCode : ""}
                </span>
              </p>

              <p className="mb-5 text-justify leading-relaxed">
                Hereinafter referred to as the{" "}
                <span className="font-semibold">"LESSOR"</span> of ONE PART.
              </p>

              <p className="mb-5 font-bold text-center">AND</p>

              <p className="mb-5 text-justify leading-relaxed">
                <span className="font-semibold">
                  {formData.lesseeName || "LESSEE NAME"}
                </span>
                ,
                <br />
                Aadhaar No:{" "}
                <span>{formData.lesseeAadhaar || "0000 0000 0000"}</span>
                <br />
                Permanent Address:{" "}
                <span>
                  {formData.lesseePermanentAddressLine1 ||
                    "LESSEE Address Line 1"}
                  {formData.lesseePermanentAddressLine2
                    ? ", " + formData.lesseePermanentAddressLine2
                    : ""}
                  {formData.lesseePermanentCity
                    ? ", " + formData.lesseePermanentCity
                    : ""}
                  {formData.lesseePermanentState
                    ? ", " + formData.lesseePermanentState
                    : ""}
                  {formData.lesseePermanentPinCode
                    ? " - " + formData.lesseePermanentPinCode
                    : ""}
                </span>
              </p>

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

              <ol className="list-decimal pl-8 mb-5 space-y-4">
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Rent:</span> The LESSEE shall
                  pay a monthly rent of Rs.{" "}
                  <span className="font-semibold">
                    {formData.rentAmount || "00,000"}
                  </span>{" "}
                  /- (Rupees{" "}
                  <span className="font-semibold">
                    {formData.rentAmountWords || "In Words Only"}
                  </span>
                  ) Including Maintenance Charges on or before 5<sup>th</sup> of
                  every month of English calendar.
                </li>
                <li className="text-justify leading-relaxed">
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
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Duration:</span> The Tenancy
                  shall be in force for a period of 11 (Eleven) months
                  commencing from{" "}
                  <span className="font-semibold">
                    {formatDate(formData.agreementStartDate)}
                  </span>{" "}
                  and the month of tenancy being the English calendar month.
                  After the expiry of 11 months the LESSEE shall pay an increase
                  of{" "}
                  <span className="font-semibold">
                    {formData.rentIncreasePercentage || "00"}%
                  </span>{" "}
                  in the existing rent.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Sub-letting:</span> The LESSEE
                  shall not use the premises for any offensive or objectionable
                  purpose and shall not have consent of the LESSOR hereby to
                  sublet, under let or part with the possession to whomsoever or
                  make any alteration.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">
                    Delivery back of possession:
                  </span>{" "}
                  On termination of the tenancy period to any renewal thereof,
                  the LESSEE shall deliver back vacant possession of the
                </li>
              </ol>

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 1 of 3
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

            <div className="p-8 md:p-10 lg:p-12">
              <p className="mb-5 text-justify leading-relaxed">
                schedule premises to the LESSOR in the same condition in which
                it was handed over at the time of joining.
              </p>

              <ol className="list-decimal pl-8 mb-5 space-y-4" start="6">
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Notice:</span> If the LESSOR
                  or the LESSEE wishes to terminate the Rental Agreement period
                  each party should issue{" "}
                  <span className="font-semibold">
                    {formData.noticePeriod || "..."}
                  </span>{" "}
                  month notice in writing to each other.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">
                    Additions and alterations:
                  </span>{" "}
                  The LESSEE shall not cause any damages to the fixed fixtures
                  on the above said property. Any damages caused shall be
                  repaired at the cost of the LESSEE.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Terminate:</span> The LESSOR
                  shall have the right to terminate the tenancy if the LESSEEs
                  fails to pay the rents regularly for a consecutive period of{" "}
                  <span className="font-semibold">
                    {formData.defaultPeriod || "2"}
                  </span>{" "}
                  Months or commits breach of any of the terms herein mentioned
                  and take possession of the premises.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">
                    Painting and Cleaning Charges:
                  </span>{" "}
                  At the time of vacating the premises the LESSEE shall pay{" "}
                  <span className="font-semibold">
                    Rs. {formData.paintingCharges || "..."}
                  </span>{" "}
                  as a painting and cleaning charges or such amount will be
                  deducted from the deposit amount.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">
                    Electricity and other Taxes:
                  </span>{" "}
                  The LESSEE shall bear and pay the Electrical charges consumed
                  as per the meter provided to concerned authorities and the
                  LESSOR shall pay the property taxes.
                </li>
                <li className="text-justify leading-relaxed">
                  <span className="font-semibold">Inspection:</span> The LESSOR
                  or his representatives shall be entitled to enter the premises
                  with prior appointment to inspect the same to satisfy himself
                  that the premises if being and used in accordance with the
                  terms of Agreement.
                </li>
                <li className="text-justify leading-relaxed">
                  The LESSEE shall use the premises for{" "}
                  <span className="font-semibold">"RESIDENTIAL PURPOSE"</span>{" "}
                  only.
                </li>
              </ol>

              <div className="mt-10 mb-6">
                <div className="text-center font-bold mb-5 text-lg underline">
                  SCHEDULE
                </div>
                <p className="text-justify leading-relaxed">
                  All the piece and parcel of the premises at{" "}
                  <span className="font-semibold">
                    {formData.propertyAddress || "Complete Property Address"}
                  </span>{" "}
                  and consisting of{" "}
                  <span className="font-semibold">
                    {formData.bhkConfig || "XBHK"},{" "}
                    {formData.bedroomCount || "X"} bedroom,{" "}
                    {formData.hallCount || "X"} Hall,{" "}
                    {formData.kitchenCount || "X"} Kitchen with{" "}
                    {formData.toiletCount || "X"} Toilets
                  </span>
                  , provided with electricity and water facilities.
                </p>
              </div>

              <p className="mb-6 text-justify leading-relaxed">
                IN WITNESS WHEREOF the parties have set their respective hands
                unto this agreement the day, month and year first above written.
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-2">WITNESSES:</div>
                  <div className="mb-2">1. ________________________</div>
                  <div className="mt-16">
                    <div className="font-bold mb-1">LESSOR</div>
                    <div className="font-semibold mb-1">
                      {formData.lessorName || "LESSOR NAME"}
                    </div>
                    <div>(Signature)</div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">2. ________________________</div>
                  <div className="mt-16">
                    <div className="font-bold mb-1">LESSEE</div>
                    <div className="font-semibold mb-1">
                      {formData.lesseeName || "LESSEE NAME"}
                    </div>
                    <div>(Signature)</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 2 of 3
              </div>
            </div>
          </div>

          {/* Page 3 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

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

      {/* Action buttons - responsive */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-6 px-4">
        <button
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded transition-colors"
          onClick={handlePrint}
        >
          Print Agreement
        </button>
        <button
          className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded transition-colors"
          onClick={generatePDF}
        >
          Download PDF
        </button>
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

export default RentalPreview;
