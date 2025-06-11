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
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";

const HufPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({
    coparceners: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response?.data?.data || { coparceners: [] });
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

  // Format date in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (err) {
      return null;
    }
  };

  // Format address for display
  const formatAddress = () => {
    if (!formData.address) return null;

    const { line1, line2, city, state, pinCode } = formData.address || {};
    const parts = [];
    if (line1) parts.push(line1);
    if (line2) parts.push(line2);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (pinCode) parts.push(pinCode);

    return parts.length > 0 ? parts.join(", ") : null;
  };

  const address = formatAddress();
  const formattedExistenceDate = formatDate(formData.hufExistenceDate);

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
                    text: "S. No",
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
                    text: "Name of the coparceners",
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
              size: 2000,
              type: "dxa",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Relationship",
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
                    text: "Address",
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
      const rows = formData.coparceners.map(
        (coparcener, index) =>
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
                children: [new Paragraph(coparcener?.name || "[NAME]")],
              }),
              new TableCell({
                borders,
                children: [
                  new Paragraph(coparcener?.relationship || "[RELATIONSHIP]"),
                ],
              }),
              new TableCell({
                borders,
                children: [new Paragraph(coparcener?.address || "[ADDRESS]")],
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
                text: `${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, "),
                  new TextRun({
                    text:
                      (formData.title || "") +
                      " " +
                      (formData.name || "[FULL NAME]"),
                    bold: true,
                  }),
                  new TextRun(" "),
                  formData.relationTo &&
                    new TextRun({
                      text:
                        formData.relationTo +
                        " " +
                        (formData.relationName || "[RELATION NAME]"),
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
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Address "),
                  new TextRun({
                    text: address || "[COMPLETE ADDRESS WITH PIN CODE]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("My Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaarNo || "[AADHAAR NUMBER]",
                    bold: true,
                  }),
                  new TextRun(" and as "),
                  new TextRun({
                    text: "Karta of my Hindu Undivided Family (HUF)",
                    bold: true,
                  }),
                  new TextRun(" affirm on oath and declare as under --"),
                ],
              }),

              new Paragraph({
                text: "Do hereby solemnly affirm and declare as under:",
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 300 },
                bold: true,
              }),

              // Numbered list
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("1. That I am "),
                  new TextRun({
                    text:
                      (formData.title || "") +
                      " " +
                      (formData.name || "[FULL NAME]"),
                    bold: true,
                  }),
                  new TextRun(" of our "),
                  new TextRun({
                    text: "HUF",
                    bold: true,
                  }),
                  new TextRun(" which is known as "),
                  new TextRun({
                    text: (formData.hufName || "[HUF NAME]") + " HUF",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                text: "2. That as on today, name of coparceners of our above said HUF, their name, Relationship and addresses are as below --",
              }),

              // Table for coparceners
              new Table({
                width: {
                  size: 100,
                  type: "pct",
                },
                rows: [headerRow, ...rows],
              }),

              new Paragraph({
                spacing: { before: 300, after: 300 },
                children: [
                  new TextRun("That the above said HUF is in existence since "),
                  new TextRun({
                    text: formattedExistenceDate || "[DATE OF EXISTENCE]",
                    bold: true,
                  }),
                  new TextRun("."),
                ],
              }),

              new Paragraph({
                spacing: { before: 500, after: 500 },
                children: [
                  new TextRun("Verified at "),
                  new TextRun({
                    text: formData.place || "[PLACE]",
                    bold: true,
                  }),
                  new TextRun(" on this "),
                  new TextRun({
                    text: formData.day || "[DAY]",
                    bold: true,
                  }),
                  new TextRun(" day of "),
                  new TextRun({
                    text: formData.month || "[MONTH]",
                    bold: true,
                  }),
                  new TextRun(", "),
                  new TextRun({
                    text: formData.year || "[YEAR]",
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
      const fileName = `HUF_Affidavit_${
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
      <div className="w-full max-w-2xl mb-4 flex justify-end">
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

      {/* Simple legal document preview */}
      <div className="bg-white border border-gray-300 w-full max-w-3xl p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{formData.documentType}</h1>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            I, {formData.title || ""}{" "}
            <span className="font-bold">{formData.name || "[FULL NAME]"}</span>{" "}
            {formData.relationTo && (
              <>
                {formData.relationTo}{" "}
                <span className="font-bold">
                  {formData.relationName || "[RELATION NAME]"}
                </span>
              </>
            )}
            , Aged: <span className="font-bold">{formData.age || "[AGE]"}</span>{" "}
            Years,
          </p>

          <p>
            Permanent Address{" "}
            <span className="font-bold">
              {address || "[COMPLETE ADDRESS WITH PIN CODE]"}
            </span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaarNo || "[AADHAAR NUMBER]"}
            </span>{" "}
            and as <strong>Karta of my Hindu Undivided Family (HUF)</strong>{" "}
            affirm on oath and declare as under --
          </p>

          <p className="font-bold text-center mt-6 mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal ml-6 space-y-4">
            <li>
              That I am {formData.title || ""}{" "}
              <span className="font-bold">
                {formData.name || "[FULL NAME]"}
              </span>{" "}
              of our <strong>HUF</strong> which is known as{" "}
              <strong>
                <span className="font-bold">
                  {formData.hufName || "[HUF NAME]"}
                </span>{" "}
                HUF
              </strong>
            </li>
            <li>
              That as on today, name of coparceners of our above said HUF, their
              name, Relationship and addresses are as below --
            </li>
          </ol>

          <table className="w-full border-collapse border border-gray-400 my-4">
            <thead>
              <tr>
                <th className="border border-gray-400 px-3 py-2 w-1/12">
                  S. No
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/3">
                  Name of the coparceners
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/4">
                  Relationship
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/3">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {(formData.coparceners || []).map((coparcener, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {coparcener?.name || "[NAME]"}
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {coparcener?.relationship || "[RELATIONSHIP]"}
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {coparcener?.address || "[ADDRESS]"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            That the above said HUF is in existence since{" "}
            <span className="font-bold">
              {formattedExistenceDate || "[DATE OF EXISTENCE]"}
            </span>
            .
          </p>

          <p className="mt-8">
            Verified at{" "}
            <span className="font-bold">{formData.place || "[PLACE]"}</span> on
            this <span className="font-bold">{getDayWithSuffix(formData.day) || "[DAY]"}</span>{" "}
           {" "}
            <span className="font-bold">{formData.month || "[MONTH]"}</span>,{" "}
            <span className="font-bold">{formData.year || "[YEAR]"}</span> that
            the contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>

          {/* Signature Block */}
          <div className="text-right mt-16">
            <p>(Signature of the Deponent)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HufPreview;
