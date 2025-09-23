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
  Table,
  TableRow,
  TableCell,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export default function PassportAffadavitPreview() {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({
    residences: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadType, setDownloadType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response?.data?.data || { residences: [] });
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (err) {
      return "";
    }
  };

  // Generate Word document
  const generateWordDocument = async () => {
    setDownloadType("word");
    setLoading(true);

    try {
      const borders = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      };

      let residenceTable = null;

      if (
        formData.nonResidentIndian === "YES" &&
        formData.residences &&
        formData.residences.length > 0
      ) {
        const headerRow = new TableRow({
          children: [
            new TableCell({
              borders,
              width: { size: 500, type: "dxa" },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "S. No.", bold: true })],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: "dxa" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Name of the Country", bold: true }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: "dxa" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Length of residence from... To...",
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
            new TableCell({
              borders,
              width: { size: 2500, type: "dxa" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Page Nos. of passport bearing departure and arrival stamps",
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          ],
        });

        const rows = formData.residences
          .filter((residence) => residence.country)
          .map(
            (residence, index) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders,
                    children: [
                      new Paragraph({
                        text: `${index + 1}.`,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                  }),
                  new TableCell({
                    borders,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: residence.country || "",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${residence.periodFrom || ""} to ${
                              residence.periodTo || ""
                            }`,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: residence.pageNos || "",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
          );

        residenceTable = new Table({
          width: { size: 100, type: "pct" },
          rows: [headerRow, ...rows],
        });
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: formData.documentType || "AFFIDAVIT",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),

              new Paragraph({
                text: "SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU OF LOST/DAMAGED PASSPORT",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, Mr/Mrs/Ms "),
                  new TextRun({ text: formData.name || "[NAME]", bold: true }),
                  new TextRun(" " + (formData.relationType || "") + " "),
                  new TextRun({
                    text: formData.guardianName || "[GUARDIAN NAME]",
                    bold: true,
                  }),
                  new TextRun(", Aged: "),
                  new TextRun({ text: formData.age || "[AGE]", bold: true }),
                  new TextRun(" Years,"),
                ],
              }),

              new Paragraph({
                spacing: { after: 100 },
                text: "Permanent Address:",
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: formData.permanentAddress || "[PERMANENT ADDRESS]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 100 },
                text: "Present Address:",
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: formData.presentAddress || "[PRESENT ADDRESS]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("My Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaarNo || "[AADHAAR NUMBER]",
                    bold: true,
                  }),
                  new TextRun("   My Passport No: "),
                  new TextRun({
                    text: formData.passportNo || "[PASSPORT NUMBER]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    text: "1. State how and when the passport was lost/ damaged and when FIR was lodged at which Police Station and how many passports were lost/ damaged earlier?",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 50 },
                text: "DETAILS OF INCIDENT:",
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: formData.incidentDetails || "[INCIDENT DETAILS]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [
                  new TextRun({
                    text: "2. State whether you travelled on the lost/ damaged passport, if so state flight number and date and port of entry into India?",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({ text: formData.travelled || "NO", bold: true }),
                  formData.travelled === "YES"
                    ? new TextRun({
                        text: `: ${formData.travelDetails || ""}`,
                        bold: true,
                      })
                    : new TextRun(""),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [
                  new TextRun({
                    text: "3. State whether you availed of any TR concessions/FTs allowance and if so details thereof?",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: formData.trConcessions || "NO",
                    bold: true,
                  }),
                  formData.trConcessions === "YES"
                    ? new TextRun({
                        text: `: ${formData.concessionDetails || ""}`,
                        bold: true,
                      })
                    : new TextRun(""),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [
                  new TextRun({
                    text: "4. State whether non-resident Indian and if resident abroad, the details of the residence as follows:",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({
                    text: formData.nonResidentIndian || "NO",
                    bold: true,
                  }),
                ],
              }),

              ...(residenceTable ? [residenceTable] : []),

              new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    text: "5. State whether the Passport had any objection by the PIA and if so the details thereof.",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: formData.passportObjection || "NO",
                    bold: true,
                  }),
                  formData.passportObjection === "YES"
                    ? new TextRun({
                        text: `: ${formData.objectionDetails || ""}`,
                        bold: true,
                      })
                    : new TextRun(""),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [
                  new TextRun({
                    text: "6. State whether you were deported at any time at the expenses of the Government and if so was the expenditure incurred reimbursed to Government of India.",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({ text: formData.deported || "NO", bold: true }),
                  formData.deported === "YES"
                    ? new TextRun({
                        text: `: ${formData.deportationDetails || ""}`,
                        bold: true,
                      })
                    : new TextRun(""),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 300 },
                text: "I further affirm that I will take utmost care of my passport if issued and the Government will be at liberty to take any legal action under the Passports Act, 1967, if the lapse is repeated.",
              }),

              new Paragraph({
                spacing: { before: 400 },
                children: [
                  new TextRun("Date: "),
                  new TextRun({
                    text: formatDate(formData.date) || "[DATE]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 300 },
                children: [
                  new TextRun("PLACE: "),
                  new TextRun({
                    text: formData.place || "[PLACE]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                children: [
                  new TextRun({
                    text: formData.useNameAsSignature
                      ? formData.name || "[SIGNATURE]"
                      : "[SIGNATURE]",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                spacing: { before: 100 },
                text: "(Signature of applicant)",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBlob(doc);
      const fileName = `Passport_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "Document"
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
      const margin = 15;
      const lineHeight = 6;
      let currentY = margin;

      const addText = (text, x, y, options = {}) => {
        const fontSize = options.fontSize || 10;
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
      currentY = addText(
        "SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU OF LOST/DAMAGED PASSPORT",
        margin,
        currentY + 8,
        { fontSize: 12, bold: true, align: "center" }
      );

      currentY += 15;

      // Content
      currentY = addText(
        `I, Mr/Mrs/Ms ${formData.name || "[NAME]"} ${
          formData.relationType || ""
        } ${formData.guardianName || "[GUARDIAN NAME]"}, Aged: ${
          formData.age || "[AGE]"
        } Years,`,
        margin,
        currentY + 6,
        { bold: true }
      );

      currentY = addText("Permanent Address:", margin, currentY + 8);
      currentY = addText(
        formData.permanentAddress || "[PERMANENT ADDRESS]",
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText("Present Address:", margin, currentY + 8);
      currentY = addText(
        formData.presentAddress || "[PRESENT ADDRESS]",
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        `My Aadhaar No: ${
          formData.aadhaarNo || "[AADHAAR NUMBER]"
        }   My Passport No: ${formData.passportNo || "[PASSPORT NUMBER]"}`,
        margin,
        currentY + 8,
        { bold: true }
      );

      currentY = addText(
        "1. State how and when the passport was lost/ damaged and when FIR was lodged at which Police Station and how many passports were lost/ damaged earlier?",
        margin,
        currentY + 10,
        { bold: true }
      );
      currentY = addText("DETAILS OF INCIDENT:", margin, currentY + 6);
      currentY = addText(
        formData.incidentDetails || "[INCIDENT DETAILS]",
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "2. State whether you travelled on the lost/ damaged passport, if so state flight number and date and port of entry into India?",
        margin,
        currentY + 8,
        { bold: true }
      );
      currentY = addText(
        `${formData.travelled || "NO"}${
          formData.travelled === "YES"
            ? `: ${formData.travelDetails || ""}`
            : ""
        }`,
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "3. State whether you availed of any TR concessions/FTs allowance and if so details thereof?",
        margin,
        currentY + 8,
        { bold: true }
      );
      currentY = addText(
        `${formData.trConcessions || "NO"}${
          formData.trConcessions === "YES"
            ? `: ${formData.concessionDetails || ""}`
            : ""
        }`,
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "4. State whether non-resident Indian and if resident abroad, the details of the residence as follows:",
        margin,
        currentY + 8,
        { bold: true }
      );
      currentY = addText(
        formData.nonResidentIndian || "NO",
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "5. State whether the Passport had any objection by the PIA and if so the details thereof.",
        margin,
        currentY + 8,
        { bold: true }
      );
      currentY = addText(
        `${formData.passportObjection || "NO"}${
          formData.passportObjection === "YES"
            ? `: ${formData.objectionDetails || ""}`
            : ""
        }`,
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "6. State whether you were deported at any time at the expenses of the Government and if so was the expenditure incurred reimbursed to Government of India.",
        margin,
        currentY + 8,
        { bold: true }
      );
      currentY = addText(
        `${formData.deported || "NO"}${
          formData.deported === "YES"
            ? `: ${formData.deportationDetails || ""}`
            : ""
        }`,
        margin,
        currentY + 4,
        { bold: true }
      );

      currentY = addText(
        "I further affirm that I will take utmost care of my passport if issued and the Government will be at liberty to take any legal action under the Passports Act, 1967, if the lapse is repeated.",
        margin,
        currentY + 10
      );

      currentY += 20;
      currentY = addText(
        `Date: ${formatDate(formData.date) || "[DATE]"}`,
        margin,
        currentY,
        { bold: true }
      );
      currentY = addText(
        `PLACE: ${formData.place || "[PLACE]"}`,
        margin,
        currentY + 6,
        { bold: true }
      );

      currentY += 15;
      currentY = addText(
        formData.useNameAsSignature
          ? formData.name || "[SIGNATURE]"
          : "[SIGNATURE]",
        margin,
        currentY,
        { align: "right", bold: true }
      );
      currentY = addText("(Signature of applicant)", margin, currentY + 5, {
        align: "right",
      });

      const fileName = `Passport_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "Document"
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
      <div className="w-full max-w-4xl mb-4 flex justify-end gap-3">
        <button
          onClick={generatePDFDocument}
          className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-md flex items-center"
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
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md flex items-center"
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
              Download
            </>
          )}
        </button>
      </div>

      {/* Document Preview */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg border border-gray-300 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">{formData.documentType}</h1>
          <h2 className="text-sm font-bold">
            SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU
            OF LOST/DAMAGED PASSPORT
          </h2>
        </div>

        <div className="space-y-6 text-sm">
          <div className="mb-4">
            <p>
              I, Mr/Mrs/Ms{" "}
              <span className="font-bold underline px-1">{formData.name}</span>{" "}
              {formData.relationType}{" "}
              <span className="font-bold underline px-1">
                {formData.guardianName}
              </span>
              , Aged:{" "}
              <span className="font-bold underline px-1">{formData.age}</span>{" "}
              Years,
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-1">Permanent Address:</p>
            <p className="font-bold pb-1">{formData.permanentAddress}</p>
          </div>

          <div className="mb-4">
            <p className="mb-1">Present Address:</p>
            <p className="font-bold pb-1">{formData.presentAddress}</p>
          </div>

          <div className="flex flex-wrap gap-6 mb-4">
            <p>
              My Aadhaar No:{" "}
              <span className="font-bold px-1">{formData.aadhaarNo}</span>
            </p>
            <p>
              My Passport No:{" "}
              <span className="font-bold px-1">{formData.passportNo}</span>
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">
              1. State how and when the passport was lost/ damaged and when FIR
              was lodged at which Police Station and how many passports were
              lost/ damaged earlier?
            </p>
            <p className="mb-1">DETAILS OF INCIDENT:</p>
            <div className="pb-1 min-h-12">
              <p className="font-bold">{formData.incidentDetails}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">
              2. State whether you travelled on the lost/ damaged passport, if
              so state flight number and date and port of entry into India?
            </p>
            <p className="font-bold">
              {formData.travelled}
              {formData.travelled === "YES"
                ? `: ${formData.travelDetails}`
                : ""}
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">
              3. State whether you availed of any TR concessions/FTs allowance
              and if so details thereof?
            </p>
            <p className="font-bold">
              {formData.trConcessions}
              {formData.trConcessions === "YES"
                ? `: ${formData.concessionDetails}`
                : ""}
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">
              4. State whether non-resident Indian and if resident abroad, the
              details of the residence as follows:
            </p>
            <p className="font-bold">{formData.nonResidentIndian}</p>

            {formData.nonResidentIndian === "YES" && (
              <table className="w-full border border-black mt-2">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-left w-16 font-bold">
                      S. No.
                    </th>
                    <th className="border border-black p-2 text-left font-bold">
                      Name of the Country
                    </th>
                    <th className="border border-black p-2 text-left font-bold">
                      Length of residence from... To...
                    </th>
                    <th className="border border-black p-2 text-left font-bold">
                      Page Nos. of passport bearing departure and arrival stamps
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.residences &&
                    formData.residences.map(
                      (residence, index) =>
                        residence.country && (
                          <tr key={index}>
                            <td className="border border-black p-2">
                              {index + 1}.
                            </td>
                            <td className="border border-black p-2 font-bold">
                              {residence.country}
                            </td>
                            <td className="border border-black p-2 font-bold">
                              {residence.periodFrom} to {residence.periodTo}
                            </td>
                            <td className="border border-black p-2 font-bold">
                              {residence.pageNos}
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            )}
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">
              5. State whether the Passport had any objection by the PIA and if
              so the details thereof.
            </p>
            <p className="font-bold">
              {formData.passportObjection}
              {formData.passportObjection === "YES"
                ? `: ${formData.objectionDetails}`
                : ""}
            </p>
          </div>

          <div className="mb-6">
            <p className="font-bold mb-1">
              6. State whether you were deported at any time at the expenses of
              the Government and if so was the expenditure incurred reimbursed
              to Government of India.
            </p>
            <p className="font-bold">
              {formData.deported}
              {formData.deported === "YES"
                ? `: ${formData.deportationDetails}`
                : ""}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm">
              I further affirm that I will take utmost care of my passport if
              issued and the Government will be at liberty to take any legal
              action under the Passports Act, 1967, if the lapse is repeated.
            </p>
          </div>

          <div className="flex justify-between mt-12">
            <div>
              <p>
                Date:{" "}
                <span className="font-bold">{formatDate(formData.date)}</span>
              </p>
              <p>
                PLACE: <span className="font-bold">{formData.place}</span>
              </p>
            </div>

            <div className="text-center">
              <div className="h-8">
                {formData.useNameAsSignature && (
                  <p className="font-bold italic">{formData.name}</p>
                )}
              </div>
              <div className="w-48"></div>
              <p>(Signature of applicant)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
