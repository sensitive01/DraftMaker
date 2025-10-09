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
  const getStampDutyPaidByName = () => {
  if (formData.stampDutyPaidBy === "firstParty") {
    return formData.firstParty;
  } else if (formData.stampDutyPaidBy === "secondParty") {
    return formData.secondParty;
  }
  return "Not Selected";
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
    const wordDocument = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Matriculation Lost Affidavit</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotPromptForConvert/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 21cm 29.7cm;
            margin: 2.54cm 2.54cm 2.54cm 2.54cm;
          }
          * {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
          }
          h1 {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 20px;
            text-transform: uppercase;
          }
          table.party-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table.party-table td {
            border: 1px solid #000;
            padding: 8px 10px;
            font-size: 11pt;
          }
          table.party-table td:first-child {
            font-weight: bold;
            width: 35%;
            background-color: #f0f0f0;
          }
          p {
            margin-bottom: 12px;
            text-align: justify;
            line-height: 1.6;
          }
          .center {
            text-align: center;
            font-weight: bold;
            margin: 20px 0;
          }
          .signature-section {
            margin-top: 80px;
            text-align: right;
          }
          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>${formData.documentType || "AFFIDAVIT"}</h1>
        
        ${
          formData.firstParty && formData.secondParty
            ? `
        <table class="party-table">
          <tr>
            <td>First Party</td>
            <td>${formData.firstParty}</td>
          </tr>
          <tr>
            <td>Second Party</td>
            <td>${formData.secondParty}</td>
          </tr>
          <tr>
            <td>Stamp Duty Paid By</td>
            <td>${getStampDutyPaidByName()}</td>
          </tr>
        </table>
        `
            : ""
        }

        <p>
          I, <strong>${formData.name || "Mr/Mrs/Ms ................................"}</strong> 
          ${formData.relation || "D/o, S/o, H/o, W/o ........................"}, 
          Aged: <strong>${formData?.age || "......"}</strong> Years,
        </p>

        <p>
          Permanent Address: <strong>${formData?.address || "[Address Line 1, Address Line 2, City, State, Pin Code]"}</strong>
        </p>

        <p>
          My Aadhaar No: <strong>${formData?.aadhaar || "0000 0000 0000"}</strong>
        </p>

        <p class="center">Do hereby solemnly affirm and declare as under:</p>

        <p>
          Hereby affirm and declare that I have irrecoverable Lost my <strong>${formData.year || "X"}</strong> 
          year, <strong>${formData.semester || "X"}</strong> Semester, marks card of 
          <strong>${formData.program || "..........................,"}</strong> 
          issued to me by <strong>${formData.authority || "........................................................"}</strong>
        </p>

        <p>
          Name of the college/Institution: <strong>${formData.collegeName || "XXXX"}</strong>
        </p>

        <p>
          Batch: In the year <strong>${formData.batch || "XXXX"}</strong>.
        </p>

        <p>
          Registration Number: <strong>${formData.regNumber || "..........................,"}</strong>
        </p>

        <p style="margin-top: 20px;">
          In the event of the above mentioned Statement of <strong>${formData.documentName || "DOCUMENT NAME"}</strong> 
          being found subsequently, I hereby undertake to return the duplicate issued. It is at my own risk the Statement of 
          <strong>${formData.documentName || "DOCUMENT NAME"}</strong> may be sent the address given by me.
        </p>

        <p style="margin-top: 30px;">
          Verified at <strong>${formData?.place || "PLACE"}</strong> 
          on this <strong>${getDayWithSuffix(formData?.day) || "XX"}</strong> 
          <strong>${formData?.month || "XXXX"}</strong>, 
          <strong>${formData?.year_verification || "XXXX"}</strong> 
          that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
        </p>

        <div class="signature-section">
          <p>(Signature of the Deponent)</p>
          <p style="margin-top: 10px;"><strong>${formData?.name || "................................"}</strong></p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([wordDocument], {
      type: "application/msword",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Matriculation_Lost_Affidavit_${
      formData.name ? formData.name.replace(/\s+/g, "_") : "User"
    }.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setLoading(false);
    setDownloadType("");
  } catch (error) {
    console.error("Error generating Word document:", error);
    alert("Failed to generate Word document. Please try again.");
    setLoading(false);
    setDownloadType("");
  }
};

// Generate PDF document - REPLACE THIS ENTIRE FUNCTION
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
      { fontSize: 16, bold: true, align: "center" }
    );

    currentY += 10;

    // Add Party Table if data exists
    if (formData.firstParty && formData.secondParty) {
      const tableData = [
        ["First Party", formData.firstParty],
        ["Second Party", formData.secondParty],
        ["Stamp Duty Paid By", getStampDutyPaidByName()],
      ];

      const tableX = margin;
      const tableY = currentY;
      const colWidths = [60, 110]; // Column widths
      const rowHeight = 10;

      // Draw table
      tableData.forEach((row, rowIndex) => {
        let cellX = tableX;
        
        row.forEach((cell, cellIndex) => {
          // Draw cell border
          pdf.rect(cellX, tableY + rowIndex * rowHeight, colWidths[cellIndex], rowHeight);
          
          // Add cell text
          pdf.setFontSize(11);
          pdf.setFont("helvetica", cellIndex === 0 ? "bold" : "normal");
          
          // Add gray background for first column
          if (cellIndex === 0) {
            pdf.setFillColor(240, 240, 240);
            pdf.rect(cellX, tableY + rowIndex * rowHeight, colWidths[cellIndex], rowHeight, 'F');
            pdf.rect(cellX, tableY + rowIndex * rowHeight, colWidths[cellIndex], rowHeight);
          }
          
          pdf.text(cell, cellX + 3, tableY + rowIndex * rowHeight + 7);
          cellX += colWidths[cellIndex];
        });
      });

      currentY = tableY + tableData.length * rowHeight + 15;
    }

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
      } issued to me by ${
        formData.authority || "........................................................"
      }`,

      `Name of the college/Institution: ${formData.collegeName || "XXXX"}`,

      `Batch: In the year ${formData.batch || "XXXX"}.`,

      `Registration Number: ${formData.regNumber || "...........................,"}`,

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

    content.forEach((paragraph, index) => {
      if (index === 3) {
        // "Do hereby solemnly affirm..." - make it bold and centered
        currentY = addText(paragraph, margin, currentY + 10, {
          bold: true,
          align: "center",
        });
      } else {
        currentY = addText(paragraph, margin, currentY + 8);
      }
    });

    // Signature section
    currentY += 30;
    currentY = addText("(Signature of the Deponent)", margin, currentY, {
      align: "right",
    });
    currentY = addText(
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
            {formData.firstParty && formData.secondParty && (
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        First Party
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {formData.firstParty}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        Second Party
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {formData.secondParty}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        Stamp Duty Paid By
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {formData.stampDutyPaidBy === "firstParty"
                          ? formData.firstParty
                          : formData.stampDutyPaidBy === "secondParty"
                          ? formData.secondParty
                          : "Not Selected"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

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
