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
    <div>
      <div ref={previewRef} className="print-container">
        {/* Page 1 */}
        <div className="page relative bg-white p-10 w-[210mm] h-[297mm] mx-auto my-4 shadow-md font-serif text-base leading-relaxed overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

          <div className="text-center font-bold text-xl mb-6 underline">
            RENTAL AGREEMENT
          </div>

          <p className="mb-4">
            This Tenancy Agreement is made and executed at Bangalore, on this{" "}
            <span className="bg-yellow-200 px-1">
              {formatDate(formData.agreementDate)}
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
              {formData.lessorAddressLine1 || "LESSOR Address Line 1"}
              {formData.lessorAddressLine2
                ? ", " + formData.lessorAddressLine2
                : ""}
              {formData.lessorCity ? ", " + formData.lessorCity : ""}
              {formData.lessorState ? ", " + formData.lessorState : ""}
              {formData.lessorPinCode ? " - " + formData.lessorPinCode : ""}
            </span>
          </p>

          <p className="mb-4">
            Hereinafter referred to as the "LESSOR" of ONE PART.
          </p>

          <p className="mb-4 font-bold text-center">AND</p>

          <p className="mb-4">
            <span className="bg-yellow-200 px-1">
              {formData.lesseeName || "LESSEE NAME"}
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
              {formData.lesseePermanentAddressLine1 || "LESSEE Address Line 1"}
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

          <p className="mb-4">
            In consideration of the rent hereinafter called as "LESSEE".
          </p>

          <p className="mb-4">
            WHEREAS the Owner is the sole and absolute owner of the Premises
            situated at{" "}
            <span className="bg-yellow-200 px-1">
              {formData.propertyAddress || "Complete Property Address"}
            </span>{" "}
            more fully described in Schedule. The tenant for want of
            accommodation requested the owner to let out premises and Owner has
            also agreed to let out under the following terms and conditions:
          </p>

          <p className="mb-4 font-bold text-center">
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
                {formData.rentAmountWords || "In Words Only"}
              </span>
              ) Including Maintenance Charges on or before 5<sup>th</sup> of
              every month of English calendar.
            </li>
            <li className="mb-3">
              <span className="font-bold">Deposit:</span> The LESSEE have paid a
              total sum of Rs.{" "}
              <span className="bg-yellow-200 px-1">
                {formData.depositAmount || "00,000"}
              </span>
              /- (Rupees{" "}
              <span className="bg-yellow-200 px-1">
                {formData.depositAmountWords || "In Words Only"}
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
              <span className="font-bold">Duration:</span> The Tenancy shall be
              in force for a period of 11 (Eleven) months commencing from{" "}
              <span className="bg-yellow-200 px-1">
                {formatDate(formData.agreementStartDate)}
              </span>{" "}
              and the month of tenancy being the English calendar month. After
              the expiry of 11 months the LESSEE shall pay an increase of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.rentIncreasePercentage || "00"}%
              </span>{" "}
              in the existing rent.
            </li>
            <li className="mb-3">
              <span className="font-bold">Sub-letting:</span> The LESSEE shall
              not use the premises for any offensive or objectionable purpose
              and shall not have consent of the LESSOR hereby to sublet, under
              let or part with the possession to whomsoever or make any
              alteration.
            </li>
            <li className="mb-3">
              <span className="font-bold">Delivery back of possession:</span> On
              termination of the tenancy period to any renewal thereof, the
              LESSEE shall deliver back vacant possession of the
            </li>
          </ol>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            Page 1 of 3
          </div>
        </div>

        {/* Page 2 */}
        <div className="page relative bg-white p-10 w-[210mm] h-[297mm] mx-auto my-4 shadow-md font-serif text-base leading-relaxed overflow-hidden">
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
                {formData.noticePeriod || "..."}
              </span>{" "}
              month notice in writing to each other.
            </li>
            <li className="mb-3">
              <span className="font-bold">Additions and alterations:</span> The
              LESSEE shall not cause any damages to the fixed fixtures on the
              above said property. Any damages caused shall be repaired at the
              cost of the LESSEE.
            </li>
            <li className="mb-3">
              <span className="font-bold">Terminate:</span> The LESSOR shall
              have the right to terminate the tenancy if the LESSEEs fails to
              pay the rents regularly for a consecutive period of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.defaultPeriod || "2"}
              </span>{" "}
              Months or commits breach of any of the terms herein mentioned and
              take possession of the premises.
            </li>
            <li className="mb-3">
              <span className="font-bold">Painting and Cleaning Charges:</span>{" "}
              At the time of vacating the premises the LESSEE shall pay{" "}
              <span className="bg-yellow-200 px-1">
                Rs. {formData.paintingCharges || "..."}
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
              <span className="font-bold">Inspection:</span> The LESSOR or his
              representatives shall be entitled to enter the premises with prior
              appointment to inspect the same to satisfy himself that the
              premises if being and used in accordance with the terms of
              Agreement.
            </li>
            <li className="mb-3">
              The LESSEE shall use the premises for{" "}
              <span className="bg-yellow-200 px-1">"RESIDENTIAL PURPOSE"</span>{" "}
              only.
            </li>
          </ol>

          <div className="mt-8 mb-5">
            <div className="text-center font-bold mb-4">SCHEDULE</div>
            <p>
              All the piece and parcel of the premises at{" "}
              <span className="bg-yellow-200 px-1">
                {formData.propertyAddress || "Complete Property Address"}
              </span>{" "}
              and consisting of{" "}
              <span className="bg-yellow-200 px-1">
                {formData.bhkConfig || "XBHK"}, {formData.bedroomCount || "X"}{" "}
                bedroom, {formData.hallCount || "X"} Hall,{" "}
                {formData.kitchenCount || "X"} Kitchen with{" "}
                {formData.toiletCount || "X"} Toilets
              </span>
              , provided with electricity and water facilities.
            </p>
          </div>

          <p className="mb-4">
            IN WITNESS WHEREOF the parties have set their respective hands unto
            this agreement the day, month and year first above written.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            <div>
              <div>WITNESSES:</div>
              <div>1. ________________________</div>
              <div className="mt-10">
                <div className="font-bold">LESSOR</div>
                <div className="bg-yellow-200 px-1 mb-1">
                  {formData.lessorName || "LESSOR NAME"}
                </div>
                <div>(Signature)</div>
              </div>
            </div>
            <div>
              <div>2. ________________________</div>
              <div className="mt-10">
                <div className="font-bold">LESSEE</div>
                <div className="bg-yellow-200 px-1 mb-1">
                  {formData.lesseeName || "LESSEE NAME"}
                </div>
                <div>(Signature)</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            Page 2 of 3
          </div>
        </div>

        {/* Page 3 */}
        <div className="page relative bg-white p-10 w-[210mm] h-[297mm] mx-auto my-4 shadow-md font-serif text-base leading-relaxed overflow-hidden">
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
                <th className="border border-black p-2 bg-gray-100 text-center w-1/12">
                  SL
                </th>
                <th className="border border-black p-2 bg-gray-100 text-center w-7/12">
                  ITEMS
                </th>
                <th className="border border-black p-2 bg-gray-100 text-center w-1/4">
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
                    <td className="border border-black p-2 text-center h-8">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 h-8">
                      {fixture.item}
                    </td>
                    <td className="border border-black p-2 text-center h-8">
                      {fixture.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            Page 3 of 3
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-4 my-6">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
          onClick={handlePrint}
        >
          Print Agreement
        </button>
        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>

      {/* CSS for printing */}
      <style jsx global>{`
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
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
          }
        }

        /* A4 styling */
        .page {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default RentalPreview;
