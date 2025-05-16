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

const KhPreview = () => {
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
                text: `${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                text: "[To be printed on a stamp paper of appropriate value as per State stamp duty laws]",
                alignment: AlignmentType.CENTER,
                spacing: { after: 500 },
                italics: true,
              }),

              // First Applicant
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, 1. "),
                  new TextRun({
                    text: formData.name1 || "________________________",
                    bold: true,
                  }),
                  new TextRun(" "),
                  new TextRun(
                    formData.relation1 || "D/o, S/o, H/o, W/o ________________"
                  ),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: formData.age1 || "____",
                    bold: true,
                  }),
                  new TextRun(" Years,"),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Address: "),
                  new TextRun({
                    text:
                      formData.address1 ||
                      "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaar1 || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              // Second Applicant
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("2. "),
                  new TextRun({
                    text: formData.name2 || "________________________",
                    bold: true,
                  }),
                  new TextRun(" "),
                  new TextRun(
                    formData.relation2 || "D/o, S/o, H/o, W/o ________________"
                  ),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: formData.age2 || "____",
                    bold: true,
                  }),
                  new TextRun(" Years,"),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Address: "),
                  new TextRun({
                    text:
                      formData.address2 ||
                      "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 400 },
                children: [
                  new TextRun("Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaar2 || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                text: "Do hereby solemnly affirm and declare as under:",
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 300 },
                bold: true,
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(
                    "Are applying for the joint Khatha transfer for property, which is situated at "
                  ),
                  new TextRun({
                    text:
                      formData.propertyAddress ||
                      ".................................................",
                    bold: true,
                  }),
                  new TextRun(" in the ward number "),
                  new TextRun({
                    text: formData.wardNumber || "XXX",
                    bold: true,
                  }),
                  new TextRun(" and zone "),
                  new TextRun({
                    text: formData.zone || "XXX",
                    bold: true,
                  }),
                  new TextRun(" of "),
                  new TextRun({
                    text: formData.authority || "BBMP",
                    bold: true,
                  }),
                  new TextRun(", Khata No is "),
                  new TextRun({
                    text: formData.khataNo || "XXXX",
                    bold: true,
                  }),
                  new TextRun(", SAS Base Application number is "),
                  new TextRun({
                    text: formData.sasNumber || "XXXXX",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 300, after: 200 },
                text: "We all are the joint applicants for Khatha transfer, and we authorize",
              }),

              new Paragraph({
                spacing: { after: 200 },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: formData.authorizedPerson || "NAME",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                text: "for e-signing the application for Khata transfer on our behalf.",
              }),

              new Paragraph({
                spacing: { after: 300 },
                text: "We swear that the above mentioned is true to the best of our knowledge and belief.",
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
                  new TextRun(
                    ` that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                text: "(Signature of the Deponents)",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: `${formData?.name1 || "___________________"}`,
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: `${formData?.name2 || "___________________"}`,
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Khatha_Affidavit_${
        formData.name1 && formData.name2
          ? `${formData.name1}_${formData.name2}`.replace(/\s+/g, "_")
          : "Document"
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
          <h1 className="text-2xl font-bold mb-2">
            {formData.documentType || "AFFIDAVIT"}
          </h1>
          <p className="text-sm italic">
            [To be printed on a stamp paper of appropriate value as per State
            stamp duty laws]
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          {/* First Applicant */}
          <p>
            I, 1.{" "}
            <span className="font-bold">
              {formData.name1 || "________________________"}
            </span>{" "}
            {formData.relation1 || "D/o, S/o, H/o, W/o ________________"}, Aged:{" "}
            <span className="font-bold">{formData.age1 || "____"}</span> Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold">
              {formData.address1 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p>
            Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaar1 || "0000 0000 0000"}
            </span>
          </p>

          {/* Second Applicant */}
          <p>
            2.{" "}
            <span className="font-bold">
              {formData.name2 || "________________________"}
            </span>{" "}
            {formData.relation2 || "D/o, S/o, H/o, W/o ________________"}, Aged:{" "}
            <span className="font-bold">{formData.age2 || "____"}</span> Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold">
              {formData.address2 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p>
            Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaar2 || "0000 0000 0000"}
            </span>
          </p>

          <p className="text-center font-bold mt-6 mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <p>
            Are applying for the joint Khatha transfer for property, which is
            situated at{" "}
            <span className="font-bold">
              {formData.propertyAddress ||
                "................................................."}
            </span>{" "}
            in the ward number{" "}
            <span className="font-bold">{formData.wardNumber || "XXX"}</span>{" "}
            and zone <span className="font-bold">{formData.zone || "XXX"}</span>{" "}
            of <span className="font-bold">{formData.authority || "BBMP"}</span>
            , Khata No is{" "}
            <span className="font-bold">{formData.khataNo || "XXXX"}</span>, SAS
            Base Application number is{" "}
            <span className="font-bold">{formData.sasNumber || "XXXXX"}</span>
          </p>

          <p className="mt-6">
            We all are the joint applicants for Khatha transfer, and we
            authorize
          </p>

          <p className="text-center font-bold my-2">
            {formData.authorizedPerson || "NAME"}
          </p>

          <p>for e-signing the application for Khata transfer on our behalf.</p>

          <p className="mt-4">
            We swear that the above mentioned is true to the best of our
            knowledge and belief.
          </p>

          <p className="mt-8">
            Verified at{" "}
            <span className="font-bold">{formData.place || "PLACE"}</span> on
            this <span className="font-bold">{formData.day || "XX"}</span> day
            of <span className="font-bold">{formData.month || "XXXX"}</span>,{" "}
            <span className="font-bold">{formData.year || "XXXX"}</span> that
            the contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>

          {/* Signature Block */}
          <div className="text-right mt-16">
            <p>Signature of the Deponents</p>
            <p className="mt-2">{formData.name1 || "___________________"}</p>
            <p>{formData.name2 || "___________________"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhPreview;
