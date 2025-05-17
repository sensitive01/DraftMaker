import React, { useRef, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

export default function AddressAffidavitPreview() {
  const affidavitRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAggrementFormData(bookingId);
        console.log("response", response);
        if (response.status === 200) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching agreement data:", error);
      }
    };
    fetchData();
  }, [bookingId]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format permanent address
  const formatPermanentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.permanentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format present address
  const formatPresentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.presentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format the relationship part of the declaration
  const formatRelationship = () => {
    if (!formData.gender) return "D/o, S/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  // Generate Word document
  const generateWordDocument = async () => {
    setLoading(true);

    try {
      // Create a new document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: formData.documentType || "ADDRESS AFFIDAVIT",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                thematicBreak: true,
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`I, `),
                  new TextRun({
                    text:
                      formData.name || "Mr/Mrs/Ms .........................",
                    bold: true,
                  }),
                  new TextRun(`, ${formatRelationship()}, Aged: `),
                  new TextRun({
                    text: formData.age || "......",
                    bold: true,
                  }),
                  new TextRun(` Years,`),
                ],
              }),

              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun(`Permanent Address: `),
                  new TextRun({
                    text: formatPermanentAddress(),
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun(`Present Address: `),
                  new TextRun({
                    text: formatPresentAddress(),
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`My Aadhaar No: `),
                  new TextRun({
                    text: formData.aadhaarNo || "536709665679",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `Do hereby solemnly affirm and declare as under:`,
                    bold: true,
                  }),
                ],
              }),

              // Numbered list items
              new Paragraph({
                spacing: { after: 100 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `I hereby declare that I am presently residing at above address since ${
                  formData.currentResidenceAddress || "XX/XX/XXXX"
                }.`,
              }),

              new Paragraph({
                spacing: { after: 100 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    `I further declare that I am swearing this affidavit to produce before the concerned `
                  ),
                  new TextRun({
                    text: formData.companyName || "COMPANY NAME",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    `That this affidavit is being made to serve as proof of my`
                  ),
                  new TextRun({
                    text: ` Address `,
                    bold: true,
                  }),
                  new TextRun(`for the purpose of `),
                  new TextRun({
                    text: formData.purposeOfAffidavit || "XXXX",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 500 },
                text: `I do hereby verify and declare that what is stated above are true and correct to the best of my knowledge, information and belief.`,
              }),

              // Signature section
              new Paragraph({
                spacing: { before: 500, after: 100 },
                children: [
                  new TextRun(`Solemnly affirmed at `),
                  new TextRun({
                    text: formData.place || "MANIYUR",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),

              new Paragraph({
                spacing: { after: 500 },
                children: [
                  new TextRun(`Date: `),
                  new TextRun({
                    text: formatDate(formData.date),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),

              new Paragraph({
                spacing: { before: 300 },
                text: "(Signature of the Applicant)",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: "Deponent",
                alignment: AlignmentType.RIGHT,
                bold: true,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Address_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "User"
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
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with download button in the top right */}
        <div className="mb-6 bg-gray-100 rounded-t-lg px-8 py-4 flex justify-end items-center">
          <button
            onClick={generateWordDocument}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center space-x-2 shadow-sm"
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Generating...</span>
              </div>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
          {/* Document Preview */}
          <div
            ref={affidavitRef}
            className="p-8 bg-white border-b border-gray-200"
          >
            <h2 className="text-center text-2xl font-bold mb-10 underline uppercase tracking-wide">
              {formData.documentType || "ADDRESS AFFIDAVIT"}
            </h2>

            {/* Content */}
            <div className="mb-10 leading-relaxed">
              <p className="mb-6 text-justify">
                I,{" "}
                <span className="font-bold">
                  {formData.name || "Mr/Mrs/Ms ........................."}
                </span>
                , <span>{formatRelationship()}</span>, Aged:{" "}
                <span className="font-bold">{formData.age || "......"}</span>{" "}
                Years,
              </p>
              <p className="mb-4">
                Permanent Address:{" "}
                <span className="font-bold">{formatPermanentAddress()}</span>
              </p>
              <p className="mb-4">
                Present Address:{" "}
                <span className="font-bold">{formatPresentAddress()}</span>
              </p>
              <p className="mb-8">
                My Aadhaar No:{" "}
                <span className="font-bold">
                  {formData.aadhaarNo || "536709665679"}
                </span>
                .
              </p>
              <p className="mb-8 font-medium">
                Do hereby solemnly affirm and declare as under:
              </p>
            </div>

            <div className="mb-10 leading-relaxed">
              {/* Numbered list with proper styling */}
              <ol className="list-decimal pl-8 space-y-5">
                <li className="text-justify">
                  I hereby declare that I am presently residing at above address
                  since{" "}
                  <span className="font-bold">
                    {formData.currentResidenceAddress || "XX/XX/XXXX"}.
                  </span>
                </li>
                <li className="text-justify">
                  I further declare that I am swearing this affidavit to produce
                  before the concerned{" "}
                  <span className="font-bold">
                    {formData.companyName || "COMPANY NAME"}
                  </span>
                  .
                </li>
                <li className="text-justify">
                  That this affidavit is being made to serve as proof of my
                  <span className="font-bold"> Address </span> for the purpose
                  of{" "}
                  <span className="font-bold">
                    {formData.purposeOfAffidavit || "XXXX"}
                  </span>
                  .
                </li>
              </ol>

              <p className="mt-10 text-justify">
                I do hereby verify and declare that what is stated above are
                true and correct to the best of my knowledge, information and
                belief.
              </p>
            </div>

            {/* Signature section with left and right alignment */}
            <div className="flex justify-between items-start mt-20">
              {/* Left side - Place and Date */}
              <div className="text-left">
                <p className="mb-4">
                  Solemnly affirmed at{" "}
                  <span className="font-bold">
                    {formData.place || "MANIYUR"}
                  </span>
                </p>
                <p className="mb-4">
                  Date:{" "}
                  <span className="font-bold">{formatDate(formData.date)}</span>
                </p>
              </div>
              
              {/* Right side - Signature */}
              <div className="text-right">
                <div className="mt-8 border-t-2 border-black pt-2 w-48 text-center">
                  <p>(Signature of the Applicant)</p>
                  <p className="font-bold mt-1">Deponent</p>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}