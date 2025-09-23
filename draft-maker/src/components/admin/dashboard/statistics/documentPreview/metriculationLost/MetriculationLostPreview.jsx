import React, { useEffect, useState, useRef } from "react";
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

const MatriculationLostPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadType, setDownloadType] = useState(""); // Track which download is in progress
  const printRef = useRef(); // Reference for PDF generation

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

  // Helper function to check if a field has content
  const isFilled = (value) => {
    return typeof value === "string" && value.trim() !== "";
  };

  // Highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-50";
  };

  // Generate Word document
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
              new Paragraph({
                text: `${formData.documentType || "AFFIDAVIT"}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`I, `),
                  new TextRun({
                    text:
                      formData.name ||
                      "Mr/Mrs/Ms ................................",
                    bold: true,
                  }),
                  new TextRun(
                    ` ${
                      formData.relation ||
                      "D/o, S/o, H/o, W/o ........................"
                    }`
                  ),
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
                  new TextRun(`Permanent Address: `),
                  new TextRun({
                    text:
                      formData?.address ||
                      "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(`My Aadhaar No: `),
                  new TextRun({
                    text: formData?.aadhaar || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Do hereby solemnly affirm and declare as under:`,
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(
                    `Hereby affirm and declare that I have irrecoverable Lost my `
                  ),
                  new TextRun({
                    text: formData.year || "X",
                    bold: true,
                  }),
                  new TextRun(` year, `),
                  new TextRun({
                    text: formData.semester || "X",
                    bold: true,
                  }),
                  new TextRun(` Semester, marks card of `),
                  new TextRun({
                    text: formData.program || "..........................,",
                    bold: true,
                  }),
                  new TextRun(` issued to me by `),
                  new TextRun({
                    text:
                      formData.authority ||
                      "........................................................",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`Name of the college/Institution: `),
                  new TextRun({
                    text: formData.collegeName || "XXXX",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`Batch: In the year `),
                  new TextRun({
                    text: formData.batch || "XXXX",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(`Registration Number: `),
                  new TextRun({
                    text: formData.regNumber || "..........................,",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(
                    `In the event of the above mentioned Statement of `
                  ),
                  new TextRun({
                    text: formData.documentName || "DOCUMENT NAME",
                    bold: true,
                  }),
                  new TextRun(
                    ` being found subsequently, I hereby undertake to return the duplicate issued. It is at my own risk the Statement of `
                  ),
                  new TextRun({
                    text: formData.documentName || "DOCUMENT NAME",
                    bold: true,
                  }),
                  new TextRun(` may be sent the address given by me.`),
                ],
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
                    text: formData?.year_verification || "XXXX",
                    bold: true,
                  }),
                  new TextRun(
                    ` that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                text: "(Signature of the Deponent)",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: formData?.name || "................................",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Matriculation_Lost_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "User"
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

      // Helper function to add text with word wrapping
      const addText = (text, x, y, options = {}) => {
        const fontSize = options.fontSize || 12;
        const isBold = options.bold || false;
        const align = options.align || "left";

        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");

        const textWidth = pageWidth - 2 * margin;
        const lines = pdf.splitTextToSize(text, textWidth);

        lines.forEach((line, index) => {
          if (y + index * lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }

          let xPos = x;
          if (align === "center") {
            xPos = pageWidth / 2;
            pdf.text(line, xPos, y + index * lineHeight, { align: "center" });
          } else if (align === "right") {
            xPos = pageWidth - margin;
            pdf.text(line, xPos, y + index * lineHeight, { align: "right" });
          } else {
            pdf.text(line, xPos, y + index * lineHeight);
          }
        });

        return y + lines.length * lineHeight;
      };

      // Title
      currentY = addText(
        formData.documentType || "AFFIDAVIT",
        margin,
        currentY + 10,
        { fontSize: 18, bold: true, align: "center" }
      );

      currentY += 15;

      // Content
      const content = [
        `I, ${formData.name || "Mr/Mrs/Ms ................................"} ${
          formData.relation || "D/o, S/o, H/o, W/o ........................"
        }, Aged: ${formData?.age || "......"} Years,`,

        `Permanent Address: ${
          formData?.address ||
          "[Address Line 1, Address Line 2, City, State, Pin Code]"
        }`,

        `My Aadhaar No: ${formData?.aadhaar || "0000 0000 0000"}`,

        "Do hereby solemnly affirm and declare as under:",

        `Hereby affirm and declare that I have irrecoverable Lost my ${
          formData.year || "X"
        } year, ${formData.semester || "X"} Semester, marks card of ${
          formData.program || "..........................,"
        }  issued to me by ${
          formData.authority ||
          "........................................................"
        }`,

        `Name of the college/Institution: ${formData.collegeName || "XXXX"}`,

        `Batch: In the year ${formData.batch || "XXXX"}.`,

        `Registration Number: ${
          formData.regNumber || "..........................,"
        }`,

        `In the event of the above mentioned Statement of ${
          formData.documentName || "DOCUMENT NAME"
        } being found subsequently, I hereby undertake to return the duplicate issued. It is at my own risk the Statement of ${
          formData.documentName || "DOCUMENT NAME"
        } may be sent the address given by me.`,

        `Verified at ${formData?.place || "PLACE"} on this ${
          getDayWithSuffix(formData.day) || "XX"
        } ${formData?.month || "XXXX"}, ${
          formData?.year_verification || "XXXX"
        } that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`,
      ];

      // Helper function to make form data bold in PDF
      const addFormattedText = (text, x, y, options = {}) => {
        const fontSize = options.fontSize || 12;
        const align = options.align || "left";

        // Split text into parts and identify form data to make bold
        const formFields = [
          formData.name,
          formData.relation,
          formData.age?.toString(),
          formData.address,
          formData.aadhaar,
          formData.year,
          formData.semester,
          formData.program,
          formData.authority,
          formData.collegeName,
          formData.batch,
          formData.regNumber,
          formData.documentName,
          formData.place,
          getDayWithSuffix(formData.day),
          formData.month,
          formData.year_verification,
        ].filter(Boolean);

        let currentText = text;
        let currentY = y;
        const textWidth = pageWidth - 2 * margin;

        // For simplicity, we'll make the entire content with form data bold
        // You can enhance this further to selectively bold only form data
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
      currentY = addFormattedText(
        "(Signature of the Deponent)",
        margin,
        currentY,
        { align: "right" }
      );
      currentY = addFormattedText(
        formData?.name || "................................",
        margin,
        currentY + 5,
        { align: "right", bold: true }
      );

      // Save the PDF
      const fileName = `Matriculation_Lost_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "User"
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

  if (loading && !downloadType) {
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
      {/* Download buttons */}
      <div className="w-full max-w-2xl mb-4 flex justify-end gap-3">
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

      {/* Document preview */}
      <div
        className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl"
        ref={printRef}
      >
        <div className="relative p-8">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          {/* Content */}
          <div>
            {/* Official Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-wider mb-3 underline">
                {formData.documentType || "AFFIDAVIT"}
              </h1>
            </div>

            <div className="space-y-4 text-gray-800 leading-relaxed">
              {/* Personal Details */}
              <p>
                I,{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.name)}`}
                >
                  {formData.name ||
                    "Mr/Mrs/Ms ................................"}
                </span>{" "}
                {formData.relation ? (
                  <span className="font-bold">{formData.relation}</span>
                ) : (
                  <span className={highlightIfEmpty(formData.relation)}>
                    D/o, S/o, H/o, W/o ........................
                  </span>
                )}
                , Aged:{" "}
                <span className={`font-bold ${highlightIfEmpty(formData.age)}`}>
                  {formData.age || "......"}
                </span>{" "}
                Years,
              </p>

              <p>
                Permanent Address:{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.address)}`}
                >
                  {formData.address ||
                    "[Address Line 1, Address Line 2, City, State, Pin Code]"}
                </span>
              </p>

              <p className="mb-6">
                My Aadhaar No:{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.aadhaar)}`}
                >
                  {formData.aadhaar || "0000 0000 0000"}
                </span>
              </p>

              <p className="font-bold text-xl my-6 text-center">
                Do hereby solemnly affirm and declare as under:
              </p>

              <p>
                Hereby affirm and declare that I have irrecoverable Lost my{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.year)}`}
                >
                  {formData.year || "X"}
                </span>{" "}
                year,{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.semester)}`}
                >
                  {formData.semester || "X"}
                </span>{" "}
                Semester, marks card of{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.program)}`}
                >
                  {formData.program || "..........................,"}
                </span>{" "}
                issued to me by{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(
                    formData.authority
                  )}`}
                >
                  {formData.authority ||
                    "........................................................"}
                </span>
              </p>

              <p>
                Name of the college/Institution:{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(
                    formData.collegeName
                  )}`}
                >
                  {formData.collegeName || "XXXX"}
                </span>
              </p>

              <p>
                Batch: In the year{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(formData.batch)}`}
                >
                  {formData.batch || "XXXX"}
                </span>
                .
              </p>

              <p>
                Registration Number:{" "}
                <span
                  className={`font-bold ${highlightIfEmpty(
                    formData.regNumber
                  )}`}
                >
                  {formData.regNumber || "..........................,"}
                </span>
              </p>

              <div className="my-6">
                <p>
                  In the event of the above mentioned Statement of{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(
                      formData.documentName
                    )}`}
                  >
                    {formData.documentName || "DOCUMENT NAME"}
                  </span>{" "}
                  being found subsequently, I hereby undertake to return the
                  duplicate issued. It is at my own risk the Statement of{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(
                      formData.documentName
                    )}`}
                  >
                    {formData.documentName || "DOCUMENT NAME"}
                  </span>{" "}
                  may be sent the address given by me.
                </p>
              </div>

              <div className="mt-8 pt-4">
                <p>
                  Verified at{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(formData.place)}`}
                  >
                    {formData.place || "PLACE"}
                  </span>{" "}
                  on this{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(formData.day)}`}
                  >
                    {getDayWithSuffix(formData.day) || "XX"}
                  </span>{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(formData.month)}`}
                  >
                    {formData.month || "XXXX"}
                  </span>
                  ,{" "}
                  <span
                    className={`font-bold ${highlightIfEmpty(
                      formData.year_verification
                    )}`}
                  >
                    {formData.year_verification || "XXXX"}
                  </span>{" "}
                  that the contents of the above said affidavit are true and
                  correct to the best of my knowledge and belief.
                </p>
              </div>

              {/* Signature Block */}
              <div className="grid grid-cols-1 mt-24 mb-8">
                <div className="text-right">
                  <div className="h-24 border-black mb-3"></div>
                  <p className="font-medium">(Signature of the Deponent)</p>
                  <div className="text-sm text-gray-600 mt-1">
                    <p className="font-bold">
                      {formData.name ? formData.name : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatriculationLostPreview;
