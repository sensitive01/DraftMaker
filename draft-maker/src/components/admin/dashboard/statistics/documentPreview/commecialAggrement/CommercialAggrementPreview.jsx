import React, { useEffect, useRef, useState } from "react";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { useParams } from "react-router-dom";
// Add missing imports for document generation
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

const CommercialAggrementPreview = () => {
  const previewRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  // Add loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
    };
    fetchData();
  }, [bookingId]); // Added bookingId dependency

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date, Month, Year";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generateWordDocument = async () => {
    setLoading(true);

    try {
      // Create document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Page 1
              new Paragraph({
                text: `${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                thematicBreak: true,
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(
                    `This Tenancy Agreement is made and executed at Bangalore, on this `
                  ),
                  new TextRun({
                    text: formatDate(formData.agreementDate),
                    bold: true,
                  }),
                  new TextRun(`, by & between:`),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: formData.lessorName || "LESSOR NAME",
                    bold: true,
                  }),
                  new TextRun(",\nAddress: "),
                  new TextRun({
                    text: [
                      formData.lessorAddressLine1 || "LESSOR Address Line 1",
                      formData.lessorAddressLine2,
                      formData.lessorCity,
                      formData.lessorState,
                      formData.lessorPinCode
                        ? `- ${formData.lessorPinCode}`
                        : "",
                    ]
                      .filter(Boolean)
                      .join(", "),
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(`Hereinafter referred to as the `),
                  new TextRun({
                    text: '"LESSOR"',
                    bold: true,
                  }),
                  new TextRun(` of ONE PART.`),
                ],
              }),

              new Paragraph({
                text: "AND",
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 },
                bold: true,
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: formData.lesseeName || "LESSEE NAME",
                    bold: true,
                  }),
                  new TextRun(",\nAadhaar No: "),
                  new TextRun(formData.lesseeAadhaar || "0000 0000 0000"),
                  new TextRun("\nPermanent Address: "),
                  new TextRun(
                    [
                      formData.lesseePermanentAddressLine1 ||
                        "LESSEE Address Line 1",
                      formData.lesseePermanentAddressLine2,
                      formData.lesseePermanentCity,
                      formData.lesseePermanentState,
                      formData.lesseePermanentPinCode
                        ? `- ${formData.lesseePermanentPinCode}`
                        : "",
                    ]
                      .filter(Boolean)
                      .join(", ")
                  ),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(
                    `In consideration of the rent hereinafter called as `
                  ),
                  new TextRun({
                    text: '"LESSEE"',
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(
                    `WHEREAS the Owner is the sole and absolute owner of the Premises situated at `
                  ),
                  new TextRun({
                    text:
                      formData.propertyAddress || "Complete Property Address",
                    bold: true,
                  }),
                  new TextRun(
                    ` more fully described in Schedule. The tenant for want of accommodation requested the owner to let out premises and Owner has also agreed to let out under the following terms and conditions:`
                  ),
                ],
              }),

              new Paragraph({
                text: "NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:",
                alignment: AlignmentType.CENTER,
                spacing: { before: 300, after: 300 },
                bold: true,
              }),

              // Terms and conditions (numbered list)
              // 1. Rent
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Rent: ",
                    bold: true,
                  }),
                  new TextRun(`The LESSEE shall pay a monthly rent of Rs. `),
                  new TextRun({
                    text: formData.rentAmount || "00,000",
                    bold: true,
                  }),
                  new TextRun(` /- (Rupees `),
                  new TextRun({
                    text: formData.rentAmountWords || "In Words Only",
                    bold: true,
                  }),
                  new TextRun(
                    `) Including Maintenance Charges on or before 5th of every month of English calendar.`
                  ),
                ],
              }),

              // 2. Deposit
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Deposit: ",
                    bold: true,
                  }),
                  new TextRun(`The LESSEE have paid a total sum of Rs. `),
                  new TextRun({
                    text: formData.depositAmount || "00,000",
                    bold: true,
                  }),
                  new TextRun(`/- (Rupees `),
                  new TextRun({
                    text: formData.depositAmountWords || "In Words Only",
                    bold: true,
                  }),
                  new TextRun(`) Paid Rs `),
                  new TextRun({
                    text: formData.depositAmount || "00,000",
                    bold: true,
                  }),
                  new TextRun(
                    ` by way of cash/online as security deposit and advance which the LESSOR hereby acknowledges the said sum shall carry no interest but refundable to the LESSEE on the termination of the tenancy.`
                  ),
                ],
              }),

              // 3. Duration
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Duration: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The Tenancy shall be in force for a period of 11 (Eleven) months commencing from `
                  ),
                  new TextRun({
                    text: formatDate(formData.agreementStartDate),
                    bold: true,
                  }),
                  new TextRun(
                    ` and the month of tenancy being the English calendar month. After the expiry of 11 months the LESSEE shall pay an increase of `
                  ),
                  new TextRun({
                    text: `${formData.rentIncreasePercentage || "00"}%`,
                    bold: true,
                  }),
                  new TextRun(` in the existing rent.`),
                ],
              }),

              // 4. Sub-letting
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Sub-letting: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The LESSEE shall not use the premises for any offensive or objectionable purpose and shall not have consent of the LESSOR hereby to sublet, under let or part with the possession to whomsoever or make any alteration.`
                  ),
                ],
              }),

              // 5. Delivery back of possession
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Delivery back of possession: ",
                    bold: true,
                  }),
                  new TextRun(
                    `On termination of the tenancy period to any renewal thereof, the LESSEE shall deliver back vacant possession of the schedule premises to the LESSOR in the same condition in which it was handed over at the time of joining.`
                  ),
                ],
              }),

              // 6. Notice
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Notice: ",
                    bold: true,
                  }),
                  new TextRun(
                    `If the LESSOR or the LESSEE wishes to terminate the Commercial Agreement period each party should issue `
                  ),
                  new TextRun({
                    text: formData.noticePeriod || "...",
                    bold: true,
                  }),
                  new TextRun(` month notice in writing to each other.`),
                ],
              }),

              // 7. Additions and alterations
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Additions and alterations: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The LESSEE shall not cause any damages to the fixed fixtures on the above said property. Any damages caused shall be repaired at the cost of the LESSEE.`
                  ),
                ],
              }),

              // 8. Terminate
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Terminate: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The LESSOR shall have the right to terminate the tenancy if the LESSEEs fails to pay the rents regularly for a consecutive period of `
                  ),
                  new TextRun({
                    text: formData.defaultPeriod || "2",
                    bold: true,
                  }),
                  new TextRun(
                    ` Months or commits breach of any of the terms herein mentioned and take possession of the premises.`
                  ),
                ],
              }),

              // 9. Painting and Cleaning Charges
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Painting and Cleaning Charges: ",
                    bold: true,
                  }),
                  new TextRun(
                    `At the time of vacating the premises the LESSEE shall pay `
                  ),
                  new TextRun({
                    text: `Rs. ${formData.paintingCharges || "..."}`,
                    bold: true,
                  }),
                  new TextRun(
                    ` as a painting and cleaning charges or such amount will be deducted from the deposit amount.`
                  ),
                ],
              }),

              // 10. Electricity and other Taxes
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Electricity and other Taxes: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The LESSEE shall bear and pay the Electrical charges consumed as per the meter provided to concerned authorities and the LESSOR shall pay the property taxes.`
                  ),
                ],
              }),

              // 11. Inspection
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "Inspection: ",
                    bold: true,
                  }),
                  new TextRun(
                    `The LESSOR or his representatives shall be entitled to enter the premises with prior appointment to inspect the same to satisfy himself that the premises if being and used in accordance with the terms of Agreement.`
                  ),
                ],
              }),

              // 12. Purpose
              new Paragraph({
                numbering: { reference: "agreement-terms", level: 0 },
                spacing: { after: 400 },
                children: [
                  new TextRun(`The LESSEE shall use the premises for `),
                  new TextRun({
                    text: '"RESIDENTIAL PURPOSE"',
                    bold: true,
                  }),
                  new TextRun(` only.`),
                ],
              }),

              // Schedule
              new Paragraph({
                text: "SCHEDULE",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                spacing: { before: 400, after: 300 },
                thematicBreak: true,
              }),

              new Paragraph({
                spacing: { after: 400 },
                children: [
                  new TextRun(`All the piece and parcel of the premises at `),
                  new TextRun({
                    text:
                      formData.propertyAddress || "Complete Property Address",
                    bold: true,
                  }),
                  new TextRun(` and consisting of `),
                  new TextRun({
                    text: `${formData.bhkConfig || "XBHK"}, ${
                      formData.bedroomCount || "X"
                    } bedroom, ${formData.hallCount || "X"} Hall, ${
                      formData.kitchenCount || "X"
                    } Kitchen with ${formData.toiletCount || "X"} Toilets`,
                    bold: true,
                  }),
                  new TextRun(
                    `, provided with electricity and water facilities.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { after: 800 },
                children: [
                  new TextRun(
                    `IN WITNESS WHEREOF the parties have set their respective hands unto this agreement the day, month and year first above written.`
                  ),
                ],
              }),

              // Signature section
              new Paragraph({
                text: "WITNESSES:",
                spacing: { before: 400 },
              }),

              new Paragraph({
                text: "1. ________________________",
                spacing: { after: 300 },
              }),

              new Paragraph({
                text: "2. ________________________",
                spacing: { after: 800 },
              }),

              // Create two columns for signatures
              new Paragraph({
                tabStops: [
                  {
                    type: AlignmentType.LEFT,
                    position: 0,
                  },
                  {
                    type: AlignmentType.RIGHT,
                    position: 9000,
                  },
                ],
                children: [
                  new TextRun({
                    text: "LESSOR",
                    bold: true,
                  }),
                  new TextRun("\t"),
                  new TextRun({
                    text: "LESSEE",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                tabStops: [
                  {
                    type: AlignmentType.LEFT,
                    position: 0,
                  },
                  {
                    type: AlignmentType.RIGHT,
                    position: 9000,
                  },
                ],
                children: [
                  new TextRun({
                    text: formData.lessorName || "LESSOR NAME",
                    bold: true,
                  }),
                  new TextRun("\t"),
                  new TextRun({
                    text: formData.lesseeName || "LESSEE NAME",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                tabStops: [
                  {
                    type: AlignmentType.LEFT,
                    position: 0,
                  },
                  {
                    type: AlignmentType.RIGHT,
                    position: 9000,
                  },
                ],
                children: [
                  new TextRun("(Signature)"),
                  new TextRun("\t"),
                  new TextRun("(Signature)"),
                ],
              }),

              // Page break before Annexure
              new Paragraph({
                pageBreakBefore: true,
                text: "ANNEXURE I",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                thematicBreak: true,
              }),

              new Paragraph({
                text: "List of fixtures and fittings provided",
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
            ],
          },
        ],
        numbering: {
          config: [
            {
              reference: "agreement-terms",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: AlignmentType.LEFT,
                },
              ],
            },
          ],
        },
      });

      // Create fixtures table
      const fixturesTable = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          // Header row
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                width: {
                  size: 10,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    text: "SL",
                    bold: true,
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 65,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    text: "ITEMS",
                    bold: true,
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    text: "QUANTITY",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      });

      // Add fixture rows
      const fixtureRows = (
        formData.fixtures && formData.fixtures.length > 0
          ? formData.fixtures
          : Array(15).fill({ item: "", quantity: "" })
      ).slice(0, 15);

      fixtureRows.forEach((fixture, index) => {
        fixturesTable.root.push(
          new TableRow({
            children: [
              new TableCell({
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    text: `${index + 1}`,
                  }),
                ],
              }),
              new TableCell({
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    text: fixture.item || "",
                  }),
                ],
              }),
              new TableCell({
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                },
                verticalAlign: AlignmentType.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    text: fixture.quantity || "",
                  }),
                ],
              }),
            ],
          })
        );
      });

      // Add the fixtures table to the document
      doc.addSection({
        children: [fixturesTable],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Commercial_Agreement_${
        formData.lesseeName ? formData.lesseeName.replace(/\s+/g, "_") : "User"
      }.docx`;
      saveAs(buffer, fileName);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

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
                  <span>
                    {formData.lessorAddressLine1 ||
                      "LESSOR Address Line 1, Address Line 2, City, State, Pin Code"}
                    {formData.lessorAddressLine2
                      ? ", " + formData.lessorAddressLine2
                      : ""}
                    {formData.lessorCity ? ", " + formData.lessorCity : ""}
                    {formData.lessorState ? ", " + formData.lessorState : ""}
                    {formData.lessorPinCode
                      ? " - " + formData.lessorPinCode
                      : ""}
                  </span>{" "}
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

export default CommercialAggrementPreview;
