import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const DualNameChangePreview = () => {
  const pdfTemplateRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response?.data?.data || {});
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching form data:", err);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  // Fixed isFilled function to safely check if a field has content
  const isFilled = (value) => {
    // Check if value exists and is a string with content
    return typeof value === "string" && value.trim() !== "";
  };

  // Format name with prefix if available
  const formatFullName = () => {
    let name = "";
    if (formData?.namePrefix) {
      name += formData.namePrefix + " ";
    }
    name += formData?.fullName || "Mr/Mrs/Ms ...........................";
    return name;
  };

  // Format relation details
  const formatRelationship = () => {
    let relation = formData?.relation || "D/o, S/o, H/o, W/o";
    relation += " " + (formData?.relationName || "...................");
    return relation;
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
                text: formData.documentType || "AFFIDAVIT",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`I, `),
                  new TextRun({
                    text: formatFullName(),
                    bold: true,
                  }),
                  new TextRun(` ${formatRelationship()}, Aged: `),
                  new TextRun({
                    text: formData?.age?.toString() || "......",
                    bold: true,
                  }),
                  new TextRun(` Years,`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`Permanent Address `),
                  new TextRun({
                    text: formData?.permanentAddress || "Address Line 1, Address Line 2, City, State, Pin Code",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`My Aadhaar No: `),
                  new TextRun({
                    text: formData?.aadhaarNo || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Do hereby solemnly affirm and declare as under:`,
                    bold: true,
                  }),
                ],
              }),

              // Numbered list items
              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I am the citizen of India.`,
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That my name has been recorded as `),
                  new TextRun({
                    text: formData?.name1 || "NAME",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.document1 || "NAME OF DOCUMENT",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.documentNo1 || "DOCUMENT SERIAL NO",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That my name has been recorded as `),
                  new TextRun({
                    text: formData?.name2 || "NAME",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.document2 || "NAME OF DOCUMENT",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.documentNo2 || "DOCUMENT SERIAL NO",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I further declare that both the names mentioned hereinabove belongs to one and the same person i.e. "myself".`,
              }),

              new Paragraph({
                spacing: { after: 300 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That my statement is true and correct.`,
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun(`Verified at `),
                  new TextRun({
                    text: formData?.place || "PLACE",
                    bold: true,
                  }),
                  new TextRun(` on this `),
                  new TextRun({
                    text: formData?.day || "XX",
                    bold: true,
                  }),
                  new TextRun(` day of `),
                  new TextRun({
                    text: formData?.month || "XXXX",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.year || "XXXX",
                    bold: true,
                  }),
                  new TextRun(` that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                text: "(Signature of the Deponent)",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
        numbering: {
          config: [
            {
              reference: "my-numbering",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: AlignmentType.START,
                  style: {
                    paragraph: {
                      indent: { left: 720, hanging: 260 },
                    },
                  },
                },
              ],
            },
          ],
        },
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Dual_Name_Change_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"
      }.docx`;
      saveAs(buffer, fileName);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading preview...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Download button */}
      <div className="w-full max-w-2xl mb-4 flex justify-end">
        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          {loading ? (
            <span>Generating...</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </>
          )}
        </button>
      </div>

      {/* Single page preview with continuous content */}
      <div className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl">
        <div className="relative p-8">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          {/* Page 1 Content */}
          <div className="mb-12">
            <h1 className="text-center font-bold text-xl mb-6">{formData.documentType || "AFFIDAVIT"}</h1>

            <p className="mb-4">
              I,{" "}
              <span
                className={
                  isFilled(formData?.fullName) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.namePrefix ? formData.namePrefix + " " : ""}
                {formData?.fullName || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relation) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relationName) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                className={
                  isFilled(formData?.age?.toString())
                    ? ""
                    : "bg-yellow-200 px-1"
                }
              >
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span
                className={
                  isFilled(formData?.permanentAddress)
                    ? ""
                    : "bg-yellow-200 px-1"
                }
              >
                {formData?.permanentAddress ||
                  "Address Line 1, Address Line 2, City, State, Pin Code"}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.aadhaarNo) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          {/* Page 2 Content */}
          <div className="pl-6">
            <ol
              className="list-decimal space-y-6"
              style={{ counterReset: "item" }}
            >
              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {1}.
                </span>{" "}
                That I am the citizen of India.
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {2}.
                </span>{" "}
                That my name has been recorded as{" "}
                <span
                  className={
                    isFilled(formData?.name1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.name1 || "NAME"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.document1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.document1 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.documentNo1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {3}.
                </span>{" "}
                That my name has been recorded as{" "}
                <span
                  className={
                    isFilled(formData?.name2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.name2 || "NAME"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.document2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.document2 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.documentNo2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.documentNo2 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {4}.
                </span>{" "}
                That I further declare that both the names mentioned hereinabove belongs to one and the same person i.e. "myself".
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {5}.
                </span>{" "}
                That my statement is true and correct.
              </li>
            </ol>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span
                  className={
                    isFilled(formData?.place) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(formData?.day) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(formData?.month) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.year) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right pr-4">
              <p>(Signature of the Deponent)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualNameChangePreview;