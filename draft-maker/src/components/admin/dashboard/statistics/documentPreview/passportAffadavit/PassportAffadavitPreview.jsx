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

export default function PassportAffadavitPreview() {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({
    residences: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);

    try {
      // Create borders for table cells
      const borders = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      };

      // Table for non-resident details if applicable
      let residenceTable = null;
      
      if (formData.nonResidentIndian === "YES" && formData.residences && formData.residences.length > 0) {
        // Table header row
        const headerRow = new TableRow({
          children: [
            new TableCell({
              borders,
              width: { size: 500, type: "dxa" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "S. No.",
                      bold: true,
                    }),
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
                      text: "Name of the Country",
                      bold: true,
                    }),
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

        // Table data rows
        const rows = formData.residences
          .filter(residence => residence.country)
          .map((residence, index) => 
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
                  children: [new Paragraph(residence.country || "")],
                }),
                new TableCell({
                  borders,
                  children: [
                    new Paragraph(`${residence.periodFrom || ""} to ${residence.periodTo || ""}`),
                  ],
                }),
                new TableCell({
                  borders,
                  children: [new Paragraph(residence.pageNos || "")],
                }),
              ],
            })
          );

        residenceTable = new Table({
          width: { size: 100, type: "pct" },
          rows: [headerRow, ...rows],
        });
      }

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
                  new TextRun({
                    text: formData.name || "[NAME]",
                    bold: true,
                  }),
                  new TextRun(" " + (formData.relationType || "") + " "),
                  new TextRun({
                    text: formData.guardianName || "[GUARDIAN NAME]",
                    bold: true,
                  }),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: formData.age || "[AGE]",
                    bold: true,
                  }),
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
                  new TextRun(formData.travelled || "NO"),
                  formData.travelled === "YES" ? new TextRun(`: ${formData.travelDetails || ""}`) : new TextRun(""),
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
                  new TextRun(formData.trConcessions || "NO"),
                  formData.trConcessions === "YES" ? new TextRun(`: ${formData.concessionDetails || ""}`) : new TextRun(""),
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
                text: formData.nonResidentIndian || "NO",
              }),
              
              // Insert residence table if applicable
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
                  new TextRun(formData.passportObjection || "NO"),
                  formData.passportObjection === "YES" ? new TextRun(`: ${formData.objectionDetails || ""}`) : new TextRun(""),
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
                  new TextRun(formData.deported || "NO"),
                  formData.deported === "YES" ? new TextRun(`: ${formData.deportationDetails || ""}`) : new TextRun(""),
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
                text: formData.useNameAsSignature ? formData.name || "[SIGNATURE]" : "[SIGNATURE]",
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

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Passport_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "Document"
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
      <div className="w-full max-w-4xl mb-4 flex justify-end">
        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md flex items-center"
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

      {/* Document Preview */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg border border-gray-300 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">{formData.documentType}</h1>
    
        </div>

        <div className="space-y-6 text-sm">
          <div className="mb-4">
            <p>
              I, Mr/Mrs/Ms{" "}
              <span className="font-medium underline px-1">{formData.name}</span>{" "}
              {formData.relationType}{" "}
              <span className="font-medium underline px-1">
                {formData.guardianName}
              </span>
              , Aged:{" "}
              <span className="font-medium underline px-1">{formData.age}</span>{" "}
              Years,
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-1">Permanent Address:</p>
            <p className=" pb-1">
              {formData.permanentAddress}
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-1">Present Address:</p>
            <p className=" pb-1">
              {formData.presentAddress}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-4">
            <p>
              My Aadhaar No:{" "}
              <span className="font-medium  px-1">
                {formData.aadhaarNo}
              </span>
            </p>
            <p>
              My Passport No:{" "}
              <span className="font-medium  px-1">
                {formData.passportNo}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-1">
              1. State how and when the passport was lost/ damaged and when FIR
              was lodged at which Police Station and how many passports were lost/
              damaged earlier?
            </p>
            <p className="mb-1">DETAILS OF INCIDENT:</p>
            <div className="pb-1 min-h-12">
              <p>{formData.incidentDetails}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-1">
              2. State whether you travelled on the lost/ damaged passport, if so
              state flight number and date and port of entry into India?
            </p>
            <p>
              {formData.travelled}
              {formData.travelled === "YES" ? `: ${formData.travelDetails}` : ""}
            </p>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-1">
              3. State whether you availed of any TR concessions/FTs allowance and
              if so details thereof?
            </p>
            <p>
              {formData.trConcessions}
              {formData.trConcessions === "YES"
                ? `: ${formData.concessionDetails}`
                : ""}
            </p>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-1">
              4. State whether non-resident Indian and if resident abroad, the
              details of the residence as follows:
            </p>
            <p>{formData.nonResidentIndian}</p>

            {formData.nonResidentIndian === "YES" && (
              <table className="w-full border border-black mt-2">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-left w-16">
                      S. No.
                    </th>
                    <th className="border border-black p-2 text-left">
                      Name of the Country
                    </th>
                    <th className="border border-black p-2 text-left">
                      Length of residence from... To...
                    </th>
                    <th className="border border-black p-2 text-left">
                      Page Nos. of passport bearing departure and arrival stamps
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.residences && formData.residences.map(
                    (residence, index) =>
                      residence.country && (
                        <tr key={index}>
                          <td className="border border-black p-2">
                            {index + 1}.
                          </td>
                          <td className="border border-black p-2">
                            {residence.country}
                          </td>
                          <td className="border border-black p-2">
                            {residence.periodFrom} to {residence.periodTo}
                          </td>
                          <td className="border border-black p-2">
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
            <p className="font-medium mb-1">
              5. State whether the Passport had any objection by the PIA and if so
              the details thereof.
            </p>
            <p>
              {formData.passportObjection}
              {formData.passportObjection === "YES"
                ? `: ${formData.objectionDetails}`
                : ""}
            </p>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-1">
              6. State whether you were deported at any time at the expenses of
              the Government and if so was the expenditure incurred reimbursed to
              Government of India.
            </p>
            <p>
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
                <span className="font-medium">{formatDate(formData.date)}</span>
              </p>
              <p>
                PLACE: <span className="font-medium">{formData.place}</span>
              </p>
            </div>

            <div className="text-center">
              <div className="h-8">
                {formData.useNameAsSignature && (
                  <p className="font-medium italic">{formData.name}</p>
                )}
              </div>
              <div className=" w-48"></div>
              <p>(Signature of applicant)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}