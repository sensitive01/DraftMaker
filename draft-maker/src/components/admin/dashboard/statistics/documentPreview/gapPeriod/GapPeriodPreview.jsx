import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Printer, Eye } from "lucide-react";
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

export default function EnhancedGapPeriodPreview() {
  const { bookingId } = useParams();
  const [data, setFormData] = useState({});
  const [viewMode, setViewMode] = useState("preview"); // preview or print
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      return dateString;
    }
  };

  // Helper function to highlight empty fields
  const HighlightedField = ({ value, placeholder, className = "" }) => {
    return value ? (
      <span className="font-serif">{value}</span>
    ) : (
      <span className={`bg-yellow-100 px-1 font-serif ${className}`}>
        {placeholder}
      </span>
    );
  };

  // Function to print document
  const printDocument = () => {
    window.print();
  };

  // Function to generate and download Word document
  const downloadAsWord = async () => {
    setIsLoading(true);

    try {
      // Create borders for table cells
      const borders = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      };

      // Table header row
      const headerRow = new TableRow({
        children: [
          new TableCell({
            borders,
            width: {
              size: 700,
              type: "dxa",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "No. of Gap Periods",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            borders,
            width: {
              size: 1500,
              type: "dxa",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "From",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            borders,
            width: {
              size: 1500,
              type: "dxa",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "To",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            borders,
            width: {
              size: 2500,
              type: "dxa",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Reasons For Gap",
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
      const rows = (data.gapPeriods || []).map(
        (period, index) =>
          new TableRow({
            children: [
              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    text: `${index + 1}`,
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    text: period.from ? formatDate(period.from) : "________",
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    text: period.to ? formatDate(period.to) : "________",
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    text: period.reason || "________",
                  }),
                ],
              }),
            ],
          })
      );

      // Create a new document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "AFFIDAVIT",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, "),
                  new TextRun({
                    text: data.name || "________________",
                    bold: true,
                  }),
                  new TextRun(" "),
                  new TextRun({
                    text: data.relation || "",
                  }),
                  new TextRun(" "),
                  new TextRun({
                    text: data.relationName || "________________",
                    bold: true,
                  }),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: data.age || "____",
                    bold: true,
                  }),
                  new TextRun(" Years,"),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Address "),
                  new TextRun({
                    text:
                      data.address ||
                      "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("My Aadhaar No: "),
                  new TextRun({
                    text: data.aadhaarNo || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                text: "Do hereby solemnly affirm and state as follows;",
                spacing: { before: 200, after: 300 },
              }),

              // Numbered list
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("1. That, I am the deponent of the affidavit."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                text: "2. That there is Gap Period as follows",
              }),

              // Table for gap periods
              new Table({
                width: {
                  size: 100,
                  type: "pct",
                },
                rows: [headerRow, ...rows],
              }),

              new Paragraph({
                spacing: { before: 300, after: 200 },
                children: [
                  new TextRun(
                    "3. That, this affidavit is required to be produced before the concerned authority of "
                  ),
                  new TextRun({
                    text: data.authority || "XXXXXX",
                    bold: true,
                  }),
                  new TextRun(" for necessary purpose."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 300 },
                text: "4. That, the facts stated above to the best of my knowledge and belief.",
              }),

              new Paragraph({
                spacing: { before: 300, after: 300 },
                text: "I hereby state that whatever is stated herein above are true to the best of my knowledge.",
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun("Verified at "),
                  new TextRun({
                    text: data.place || "PLACE",
                    bold: true,
                  }),
                  new TextRun(" on this "),
                  new TextRun({
                    text: data.day || "XX",
                    bold: true,
                  }),
                  new TextRun(" day of "),
                  new TextRun({
                    text: data.month || "XXXX",
                    bold: true,
                  }),
                  new TextRun(", "),
                  new TextRun({
                    text: data.year || "XXXX",
                    bold: true,
                  }),
                  new TextRun(
                    " that the contents of the above said affidavit are true and correct to the best of my knowledge and belief."
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 800, after: 100 },
                text: "(Signature of the Deponent)",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Gap_Period_Affidavit_${
        data.name ? data.name.replace(/\s+/g, "_") : "Document"
      }.docx`;
      saveAs(buffer, fileName);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Control Panel - not printed */}
      <div className="bg-gray-100 p-4 rounded-t-lg border-b flex justify-between items-center no-print">
        <h1 className="text-xl font-bold text-gray-800">
          Gap Period Affidavit
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={downloadAsWord}
            className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Generating...</span>
            ) : (
              <>
                <Download size={16} />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Affidavit content */}
      <div
        className={`print-container p-8 border border-gray-300 ${
          viewMode === "print" ? "bg-white" : "bg-gray-50"
        }`}
      >
        <div
          className={`${
            viewMode === "print"
              ? ""
              : "bg-white p-6 shadow-sm border border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-6 underline font-serif tracking-wide">
            AFFIDAVIT
          </h2>

          <p className="mb-4 font-serif text-base leading-relaxed">
            I,{" "}
            <HighlightedField
              value={data.name}
              placeholder="________________"
            />{" "}
            {data.relation}{" "}
            <HighlightedField
              value={data.relationName}
              placeholder="________________"
            />
            , Aged: <HighlightedField value={data.age} placeholder="____" />{" "}
            Years,
          </p>

          <p className="mb-4 font-serif text-base leading-relaxed">
            Permanent Address{" "}
            <HighlightedField
              value={data.address}
              placeholder="[Address Line 1, Address Line 2, City, State, Pin Code]"
              className="inline-block"
            />
          </p>

          <p className="mb-6 font-serif text-base leading-relaxed">
            My Aadhaar No:{" "}
            <HighlightedField
              value={data.aadhaarNo}
              placeholder="0000 0000 0000"
            />
          </p>

          <p className="mb-4 font-serif text-base leading-relaxed">
            Do hereby solemnly affirm and state as follows;
          </p>

          <ol className="list-decimal pl-6 mb-6 space-y-2 font-serif text-base leading-relaxed">
            <li>That, I am the deponent of the affidavit.</li>
            <li>That there is Gap Period as follows</li>
          </ol>

          <div className="mb-6">
            <table className="w-full border-collapse font-serif">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-3 py-2 w-1/6 text-sm font-semibold">
                    No. of Gap Periods
                  </th>
                  <th className="border border-gray-400 px-3 py-2 w-1/4 text-sm font-semibold">
                    From
                  </th>
                  <th className="border border-gray-400 px-3 py-2 w-1/4 text-sm font-semibold">
                    To
                  </th>
                  <th className="border border-gray-400 px-3 py-2 w-2/5 text-sm font-semibold">
                    Reasons For Gap
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.gapPeriods &&
                  data.gapPeriods.map((period, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-400 px-3 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-center">
                        {period.from ? (
                          formatDate(period.from)
                        ) : (
                          <span className="bg-yellow-100 px-1 block text-center">
                            ________
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-center">
                        {period.to ? (
                          formatDate(period.to)
                        ) : (
                          <span className="bg-yellow-100 px-1 block text-center">
                            ________
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {period.reason ? (
                          period.reason
                        ) : (
                          <span className="bg-yellow-100 px-1 block text-center">
                            ________
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <ol
            className="list-decimal pl-6 mb-6 space-y-2 font-serif text-base leading-relaxed"
            start="3"
          >
            <li>
              That, this affidavit is required to be produced before the
              concerned authority of{" "}
              <HighlightedField value={data.authority} placeholder="XXXXXX" />{" "}
              for necessary purpose.
            </li>
            <li>
              That, the facts stated above to the best of my knowledge and
              belief.
            </li>
          </ol>

          <p className="mb-6 font-serif text-base leading-relaxed">
            I hereby state that whatever is stated herein above are true to the
            best of my knowledge.
          </p>

          <p className="mb-10 font-serif text-base leading-relaxed">
            Verified at{" "}
            <HighlightedField value={data.place} placeholder="PLACE" /> on this{" "}
            <HighlightedField value={data.day} placeholder="XX" /> day of{" "}
            <HighlightedField value={data.month} placeholder="XXXX" />,{" "}
            <HighlightedField value={data.year} placeholder="XXXX" /> that the
            contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>

          <div className="text-right mt-16 font-serif">
            <p>(Signature of the Deponent)</p>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            font-family: "Times New Roman", Times, serif;
          }
          .no-print {
            display: none;
          }
          .print-container {
            margin: 0;
            padding: 0;
            width: 100%;
            background-color: white !important;
          }
          .bg-yellow-100 {
            background-color: transparent !important;
            border-bottom: 1px dotted #000;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          thead {
            display: table-header-group;
          }
          tfoot {
            display: table-footer-group;
          }
        }
      `}</style>
    </div>
  );
}
