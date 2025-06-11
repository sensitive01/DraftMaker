import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";

const NameChangePreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response?.data?.data);
      }
    };
    fetchData();
  }, []);

  // Generate Word document function
  const generateWordDocument = async () => {
    setLoading(true);
    try {
      // Create a new document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Header - Document Type
              new Paragraph({
                text: formData.documentType || "AFFIDAVIT",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                border: {
                  bottom: {
                    color: "000000",
                    space: 1,
                    style: "single",
                    size: 1,
                  },
                },
              }),

              // Introduction
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, "),
                  new TextRun({
                    text: formData.fullName || "..................",
                    bold: true,
                  }),
                  new TextRun(", " + (formData.relation || "...............") + " of "),
                  new TextRun({
                    text: formData.relationName || "..................",
                    bold: true,
                  }),
                  new TextRun(", aged "),
                  new TextRun({
                    text: formData.age?.toString() || "......",
                    bold: true,
                  }),
                  new TextRun(" years,"),
                ],
              }),

              // Permanent Resident
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Resident of: "),
                  new TextRun({
                    text: formData.permanentAddress || "......................................",
                    bold: true,
                  }),
                ],
              }),

              // Aadhaar No
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaarNo || ".............",
                    bold: true,
                  }),
                ],
              }),

              // Declaration header
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "Do hereby solemnly affirm and declare as under:",
                    bold: true,
                  }),
                ],
              }),

              // Numbered list items
              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: "That I am a citizen of India.",
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun("That my name has been recorded as "),
                  new TextRun({
                    text: formData.oldName || "..................",
                    bold: true,
                  }),
                  new TextRun(" (old name) in my official documents."),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun("That now I have changed my name permanently to "),
                  new TextRun({
                    text: formData.newName || "..................",
                    bold: true,
                  }),
                  new TextRun(" (new name) in place of my previous name i.e., "),
                  new TextRun(formData.oldName || ".................."),
                  new TextRun(" (old name)."),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun("That in future I will be known by my new name i.e., "),
                  new TextRun({
                    text: formData.newName || "..................",
                    bold: true,
                  }),
                  new TextRun(" for all purposes."),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: "That I further declare that both the names mentioned hereinabove belong to one and the same person i.e., myself"
              }),

              new Paragraph({
                spacing: { after: 400 },
                numbering: { reference: "my-numbering", level: 0 },
                text: "That my statement is true and correct to the best of my knowledge and belief.",
              }),

              // Verification
              new Paragraph({
                spacing: { before: 300, after: 600 },
                children: [
                  new TextRun("Verified at "),
                  new TextRun({
                    text: formData.place || "..................",
                    bold: true,
                  }),
                  new TextRun(" on this "),
                  new TextRun({
                    text: formData.day || "...",
                    bold: true,
                  }),
                  new TextRun(" day of "),
                  new TextRun({
                    text: formData.month || "..................",
                    bold: true,
                  }),
                  new TextRun(", "),
                  new TextRun({
                    text: formData.year || "........",
                    bold: true,
                  }),
                  new TextRun(" that the contents of the above said affidavit are true and correct to the best of my knowledge and belief."),
                ],
              }),

              // Signature section
              new Paragraph({
                spacing: { before: 600 },
                text: "Deponent",
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
      const fileName = `Name_Change_Affidavit_${
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

  return (
    <div className="max-w-3xl mx-auto">
      {/* Download button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
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

      {/* Preview content */}
      <div className="bg-white p-8 border border-gray-300 rounded-md shadow-md font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold border-black pb-2 inline-block">
            {formData.documentType}
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-6 leading-relaxed">
          <p className="mb-3">
            I, <span className="font-semibold">{formData.fullName}</span>,{" "}
            {formData.relation} of{" "}
            <span className="font-semibold">{formData.relationName}</span>, aged{" "}
            <span className="font-semibold">{formData.age}</span> years,
          </p>

          <p className="mb-3">
            Permanent Resident of:{" "}
            <span className="font-semibold">{formData.permanentAddress}</span>
          </p>

          <p className="mb-5">
            Aadhaar No:{" "}
            <span className="font-semibold">{formData.aadhaarNo}</span>
          </p>

          <p className="font-semibold mb-5">
            Do hereby solemnly affirm and declare as under:
          </p>
        </div>

        {/* Declaration Points */}
        <div className="mb-8">
          <ol className="list-decimal pl-8 space-y-4">
            <li>That I am a citizen of India.</li>

            <li>
              That my name has been recorded as{" "}
              <span className="font-semibold ">{formData.oldName}</span> (old
              name) in my official documents.
            </li>

            <li>
              That now I have changed my name permanently to{" "}
              <span className="font-semibold ">{formData.newName}</span> (new
              name) in place of my previous name i.e.,{" "}
              <span className="">{formData.oldName}</span> (old name).
            </li>

            <li>
              That in future I will be known by my new name i.e.,{" "}
              <span className="font-semibold ">{formData.newName}</span> for all
              purposes.
            </li>

            <li>
              That I further declare that both the names mentioned hereinabove
              belong to one and the same person i.e., "myself".
            </li>

            <li>
              That my statement is true and correct to the best of my knowledge
              and belief.
            </li>
          </ol>
        </div>

        {/* Verification */}
        <div className="mb-12 mt-8">
          <p className="leading-relaxed">
            Verified at <span className="font-semibold">{formData.place}</span> on
            this <span className="font-semibold">{getDayWithSuffix(formData.day)}</span>{" "}
            <span className="font-semibold">{formData.month}</span>,{" "}
            <span className="font-semibold">{formData.year}</span> that the
            contents of the above said affidavit are true and correct to the best
            of my knowledge and belief.
          </p>
        </div>

        {/* Signature */}
        <div className="flex justify-between items-end mt-16">
          <div>
            <p className="font-bold"></p>
            <div className="mt-8 border-black pt-1 w-40"></div>
            <div className="mt-8 border-black pt-1 w-40"></div>
          </div>

          <div className="text-center">
            <div className="h-16"></div>
            <div className="pt-1">
              <p className="font-semibold">Deponent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameChangePreview;