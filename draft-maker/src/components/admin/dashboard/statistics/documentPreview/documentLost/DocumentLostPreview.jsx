import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const DocumentLostPreview = () => {
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
                    text: `${formData.personTitle || "Mr/Mrs/Ms"} ${formData.personName || "................................"}`,
                    bold: true,
                  }),
                  new TextRun(` ${formData.relationType || "D/o"} `),
                  new TextRun({
                    text: formData.relationName || "........................",
                    bold: true,
                  }),
                  new TextRun(`, Aged: `),
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
                    text: formData?.address || "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`My Aadhaar No: `),
                  new TextRun({
                    text: formData?.aadhaarNumber || "0000 0000 0000",
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
                children: [
                  new TextRun(`That I have inadvertently misplaced the original `),
                  new TextRun({
                    text: formData.documentType || "DOCUMENT NAME",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData.documentType || "DOCUMENT",
                    bold: true,
                  }),
                  new TextRun(` SERIAL NO: `),
                  new TextRun({
                    text: formData.documentNumber || "...........",
                    bold: true,
                  }),
                  new TextRun(`, which I am unable to trace even after extensive search.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That an FIR has been lodged bearing No `),
                  new TextRun({
                    text: formData.firNumber || "XXXX",
                    bold: true,
                  }),
                  new TextRun(` on DATE: `),
                  new TextRun({
                    text: `${formData.firDay || "XX"}/${formData.firMonth || "XX"}/${formData.firYear || "XXXX"}`,
                    bold: true,
                  }),
                  new TextRun(` reporting about the loss of `),
                  new TextRun({
                    text: formData.documentType || "DOCUMENT",
                    bold: true,
                  }),
                  new TextRun(`, The copy of the same is enclosed herewith.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That I hereby request the Company/ Developer to provide me with the duplicate copy of `),
                  new TextRun({
                    text: formData.documentType || "DOCUMENT",
                    bold: true,
                  }),
                  new TextRun(` for the purpose of my records and fulfillment of any requirement which may arise in future.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I undertake to inform your good office if the original document is found in future.`,
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
              
              new Paragraph({
                text: formData?.personName || "................................",
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
      const fileName = `${formData.documentType || "Document"}_Lost_Affidavit_${
        formData.personName ? formData.personName.replace(/\s+/g, "_") : "User"
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

          {/* Content */}
          <div>
            <h1 className="text-center font-bold text-xl mb-6 underline">
              {formData.documentType || "AFFIDAVIT"}
            </h1>

            <p className="mb-4 text-justify">
              I,{" "}
              <span className={isFilled(formData?.personTitle) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.personTitle || "Mr/Mrs/Ms"}
              </span>{" "}
              <span className={isFilled(formData?.personName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.personName || "................................"}
              </span>{" "}
              <span className={isFilled(formData?.relationType) ? "" : "bg-yellow-200 px-1"}>
                {formData?.relationType || "D/o"}
              </span>{" "}
              <span className={isFilled(formData?.relationName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.relationName || "........................"}
              </span>
              , Aged:{" "}
              <span className={isFilled(formData?.age?.toString()) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4 text-justify">
              Permanent Address{" "}
              <span className={isFilled(formData?.address) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.address || "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-4 text-justify">
              My Aadhaar No:{" "}
              <span className={isFilled(formData?.aadhaarNumber) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.aadhaarNumber || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 text-justify font-bold">
              Do hereby solemnly affirm and declare as under:
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-justify">
                That I have inadvertently misplaced the original{" "}
                <span className={isFilled(formData?.documentType) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.documentType || "DOCUMENT NAME"}
                </span>
                ,{" "}
                <span className={isFilled(formData?.documentType) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.documentType || "DOCUMENT"}
                </span>{" "}
                SERIAL NO:{" "}
                <span className={isFilled(formData?.documentNumber) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.documentNumber || "..........."}
                </span>
                , which I am unable to trace even after extensive search.
              </li>

              <li className="text-justify">
                That an FIR has been lodged bearing No{" "}
                <span className={isFilled(formData?.firNumber) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.firNumber || "XXXX"}
                </span>{" "}
                on DATE:{" "}
                <span className={
                  (isFilled(formData?.firDay) && isFilled(formData?.firMonth) && isFilled(formData?.firYear)) ? 
                  "font-bold" : "bg-yellow-200 px-1 font-bold"
                }>
                  {formData?.firDay || "XX"}/{formData?.firMonth || "XX"}/{formData?.firYear || "XXXX"}
                </span>{" "}
                reporting about the loss of{" "}
                <span className={isFilled(formData?.documentType) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.documentType || "DOCUMENT"}
                </span>
                , The copy of the same is enclosed herewith.
              </li>

              <li className="text-justify">
                That I hereby request the Company/ Developer to provide me with the duplicate copy of{" "}
                <span className={isFilled(formData?.documentType) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.documentType || "DOCUMENT"}
                </span>{" "}
                for the purpose of my records and fulfillment of any requirement which may arise in future.
              </li>

              <li className="text-justify">
                That I undertake to inform your good office if the original document is found in future.
              </li>
            </ol>

            <div className="mt-12">
              <p className="text-justify">
                Verified at{" "}
                <span className={isFilled(formData?.place) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span className={isFilled(formData?.day) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span className={isFilled(formData?.month) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span className={isFilled(formData?.year) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponent)</p>
              <p className="mt-1">
                {formData?.personName || "................................"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLostPreview;