import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";
import jsPDF from "jspdf";

const NameChangePreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloadType, setDownloadType] = useState(""); // Track which download is in progress

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

  // Helper function to check if field is filled
  const isFilled = (value) => {
    return typeof value === "string" && value.trim() !== "";
  };

  // Generate Word document function
  const generateWordDocument = async () => {
    setDownloadType("word");
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
                  new TextRun(
                    ", " + (formData.relation || "...............") + " of "
                  ),
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
                    text:
                      formData.permanentAddress ||
                      "......................................",
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
                  new TextRun(
                    "That now I have changed my name permanently to "
                  ),
                  new TextRun({
                    text: formData.newName || "..................",
                    bold: true,
                  }),
                  new TextRun(
                    " (new name) in place of my previous name i.e., "
                  ),
                  new TextRun({
                    text: formData.oldName || "..................",
                    bold: true,
                  }),
                  new TextRun(" (old name)."),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    "That in future I will be known by my new name i.e., "
                  ),
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
                text: "That I further declare that both the names mentioned hereinabove belong to one and the same person i.e., myself",
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
                  new TextRun(
                    " that the contents of the above said affidavit are true and correct to the best of my knowledge and belief."
                  ),
                ],
              }),

              // Signature section
              new Paragraph({
                spacing: { before: 600 },
                children: [
                  new TextRun({
                    text: "Deponent",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: formData?.fullName || "................................",
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
      setDownloadType("");
    }
  };

  // Generate PDF document
  const generatePDFDocument = async () => {
    setDownloadType("pdf");
    setLoading(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      // Helper function to add formatted text with form data in bold
      const addFormattedText = (text, x, y, options = {}) => {
        const fontSize = options.fontSize || 12;
        const align = options.align || "left";
        const textWidth = pageWidth - 2 * margin;

        // Identify form data fields to make bold
        const formFields = [
          formData.fullName,
          formData.relation,
          formData.relationName,
          formData.age?.toString(),
          formData.permanentAddress,
          formData.aadhaarNo,
          formData.oldName,
          formData.newName,
          formData.place,
          getDayWithSuffix(formData.day),
          formData.month,
          formData.year,
        ].filter(Boolean);

        let currentText = text;
        let currentY = y;

        // For simplicity, make text with form data bold
        const hasFormData = formFields.some((field) => text.includes(field));

        pdf.setFontSize(fontSize);
        pdf.setFont(
          "helvetica",
          hasFormData && options.boldFormData
            ? "bold"
            : options.bold
            ? "bold"
            : "normal"
        );

        const lines = pdf.splitTextToSize(currentText, textWidth);

        lines.forEach((line, index) => {
          if (currentY + index * lineHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
          }

          let xPos = x;
          if (align === "center") {
            xPos = pageWidth / 2;
            pdf.text(line, xPos, currentY + index * lineHeight, {
              align: "center",
            });
          } else if (align === "right") {
            xPos = pageWidth - margin;
            pdf.text(line, xPos, currentY + index * lineHeight, {
              align: "right",
            });
          } else {
            pdf.text(line, xPos, currentY + index * lineHeight);
          }
        });

        return currentY + lines.length * lineHeight;
      };

      // Title
      currentY = addFormattedText(
        formData.documentType || "AFFIDAVIT",
        margin,
        currentY + 10,
        { fontSize: 18, bold: true, align: "center" }
      );

      currentY += 15;

      // Content paragraphs
      const content = [
        `I, ${formData.fullName || ".................."}, ${
          formData.relation || "..............."
        } of ${formData.relationName || ".................."}, aged ${
          formData.age?.toString() || "......"
        } years,`,

        `Permanent Resident of: ${
          formData.permanentAddress || "......................................"
        }`,

        `Aadhaar No: ${formData.aadhaarNo || "............."}`,

        "Do hereby solemnly affirm and declare as under:",

        "1. That I am a citizen of India.",

        `2. That my name has been recorded as ${
          formData.oldName || ".................."
        } (old name) in my official documents.`,

        `3. That now I have changed my name permanently to ${
          formData.newName || ".................."
        } (new name) in place of my previous name i.e., ${
          formData.oldName || ".................."
        } (old name).`,

        `4. That in future I will be known by my new name i.e., ${
          formData.newName || ".................."
        } for all purposes.`,

        "5. That I further declare that both the names mentioned hereinabove belong to one and the same person i.e., myself",

        "6. That my statement is true and correct to the best of my knowledge and belief.",

        `Verified at ${formData.place || ".................."} on this ${
          formData.day || "..."
        } day of ${formData.month || ".................."}, ${
          formData.year || "........"
        } that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`,
      ];

      content.forEach((paragraph, index) => {
        if (index === 3) {
          // "Do hereby solemnly affirm..." - make it bold and centered
          currentY = addFormattedText(paragraph, margin, currentY + 10, {
            bold: true,
            align: "center",
          });
        } else {
          // Make paragraphs with form data bold
          currentY = addFormattedText(paragraph, margin, currentY + 8, {
            boldFormData: true,
          });
        }
      });

      // Signature section
      currentY += 30;
      currentY = addFormattedText("Deponent", margin, currentY, {
        align: "right",
        bold: true,
      });
      currentY = addFormattedText(
        formData?.fullName || "................................",
        margin,
        currentY + 5,
        { align: "right", bold: true }
      );

      // Save the PDF
      const fileName = `Name_Change_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"
      }.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF document:", error);
      alert("Failed to generate PDF document. Please try again.");
    } finally {
      setLoading(false);
      setDownloadType("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Download buttons */}
      <div className="mb-4 flex justify-end gap-3">
        <button
          onClick={generatePDFDocument}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          {loading && downloadType === "pdf" ? (
            <span>Generating PDF...</span>
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
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Download PDF
            </>
          )}
        </button>

        <button
          onClick={generateWordDocument}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          {loading && downloadType === "word" ? (
            <span>Generating Word...</span>
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
              Download Word
            </>
          )}
        </button>
      </div>

      {/* Preview content */}
      <div className="bg-white p-8 border border-gray-300 rounded-md shadow-md font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold border-black pb-2 inline-block">
            {formData.documentType || "AFFIDAVIT"}
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-6 leading-relaxed">
          <p className="mb-3">
            I,{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.fullName) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.fullName || ".................."}
            </span>
            ,{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.relation) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.relation || "..............."}
            </span>{" "}
            of{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.relationName) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.relationName || ".................."}
            </span>
            , aged{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.age?.toString()) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.age || "......"}
            </span>{" "}
            years,
          </p>

          <p className="mb-3">
            Permanent Resident of:{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.permanentAddress) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.permanentAddress ||
                "......................................"}
            </span>
          </p>

          <p className="mb-5">
            Aadhaar No:{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.aadhaarNo) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.aadhaarNo || "............."}
            </span>
          </p>

          <p className="font-bold mb-5 text-center">
            Do hereby solemnly affirm and declare as under:
          </p>
        </div>

        {/* Declaration Points */}
        <div className="mb-8">
          <ol className="list-decimal pl-8 space-y-4">
            <li>That I am a citizen of India.</li>

            <li>
              That my name has been recorded as{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.oldName) ? "bg-yellow-200" : ""
                }`}
              >
                {formData.oldName || ".................."}
              </span>{" "}
              (old name) in my official documents.
            </li>

            <li>
              That now I have changed my name permanently to{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.newName) ? "bg-yellow-200" : ""
                }`}
              >
                {formData.newName || ".................."}
              </span>{" "}
              (new name) in place of my previous name i.e.,{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.oldName) ? "bg-yellow-200" : ""
                }`}
              >
                {formData.oldName || ".................."}
              </span>{" "}
              (old name).
            </li>

            <li>
              That in future I will be known by my new name i.e.,{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.newName) ? "bg-yellow-200" : ""
                }`}
              >
                {formData.newName || ".................."}
              </span>{" "}
              for all purposes.
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
            Verified at{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.place) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.place || ".................."}
            </span>{" "}
            on this{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.day) ? "bg-yellow-200" : ""
              }`}
            >
              {getDayWithSuffix(formData.day) || "..."}
            </span>{" "}
            day of{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.month) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.month || ".................."}
            </span>
            ,{" "}
            <span
              className={`font-bold ${
                !isFilled(formData?.year) ? "bg-yellow-200" : ""
              }`}
            >
              {formData.year || "........"}
            </span>{" "}
            that the contents of the above said affidavit are true and correct
            to the best of my knowledge and belief.
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
              <p className="font-bold">Deponent</p>
              <p className="font-bold mt-2">
                {formData?.fullName || "................................"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameChangePreview;
