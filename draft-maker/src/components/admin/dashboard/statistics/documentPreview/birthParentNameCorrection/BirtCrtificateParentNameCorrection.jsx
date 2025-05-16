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

const BirthCertificateParentNameCorrection = () => {
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
                text: `${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`We, `),
                  new TextRun({
                    text: `${formData.fatherTitle || "Mr."} ${
                      formData.fatherName || "___________________"
                    }`,
                    bold: true,
                  }),
                  new TextRun(` H/O `),
                  new TextRun({
                    text: `${formData.motherTitle || "Mrs."} ${
                      formData.motherName || "___________________"
                    }`,
                    bold: true,
                  }),
                  new TextRun(`, Permanent Address `),
                  new TextRun({
                    text:
                      formData?.address ||
                      "[Address Line 1, Address Line 2, City, State, Pin Code]",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`Our Aadhaar No: Aadhaar No: `),
                  new TextRun({
                    text: formData?.fatherAadhaar || "0000 0000 0000",
                    bold: true,
                  }),
                  new TextRun(`, Aadhaar No: `),
                  new TextRun({
                    text: formData?.motherAadhaar || "0000 0000 0000",
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
                  new TextRun(`That Birth Certificate SL No: `),
                  new TextRun({
                    text: formData.certificateNumber || "______",
                    bold: true,
                  }),
                  new TextRun(` issued for our `),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(` `),
                  new TextRun({
                    text: formData.childName || "NAME",
                    bold: true,
                  }),
                  new TextRun(
                    ` from (Chief Register of Births and Deaths, Govt of Karnataka), the name of parents issued Father name as `
                  ),
                  new TextRun({
                    text: formData.incorrectFatherName || "Incorrect Name",
                    bold: true,
                  }),
                  new TextRun(` and Mother name as `),
                  new TextRun({
                    text: formData.incorrectMotherName || "Incorrect Name",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    `That as per our Aadhaar card the given name of Father is `
                  ),
                  new TextRun({
                    text: formData.correctFatherName || "Correct Name",
                    bold: true,
                  }),
                  new TextRun(` AND Mother as `),
                  new TextRun({
                    text: formData.correctMotherName || "Correct Name",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    `We state that name in our Aadhaar card's and name in our `
                  ),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(
                    ` Birth Certificate is the name of one and the same persons and that is our self's.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That we also required this affidavit for RE ISSUE the Birth Certificate with parent's name as per Aadhaar card.`,
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
                text: `${formData?.fatherName || "___________________"}     ${
                  formData?.motherName || "___________________"
                }`,
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
      const fileName = `Birth_Certificate_Correction_${
        formData.childName
          ? formData.childName.replace(/\s+/g, "_")
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
              {formData.documentType}
            </h1>

            <p className="mb-4 text-justify">
              We,{" "}
              <span
                className={
                  isFilled(formData?.fatherTitle)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.fatherTitle || "Mr."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.fatherName)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.fatherName || "___________________"}
              </span>{" "}
              H/O{" "}
              <span
                className={
                  isFilled(formData?.motherTitle)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.motherTitle || "Mrs."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.motherName)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.motherName || "___________________"}
              </span>
              , Permanent Address{" "}
              <span
                className={
                  isFilled(formData?.address)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-4 text-justify">
              Our Aadhaar No: Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.fatherAadhaar)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.fatherAadhaar || "0000 0000 0000"}
              </span>
              , Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.motherAadhaar)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.motherAadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 text-justify font-bold">
              Do hereby solemnly affirm and declare as under:
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-justify">
                That Birth Certificate SL No:{" "}
                <span
                  className={
                    isFilled(formData?.certificateNumber)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.certificateNumber || "______"}
                </span>{" "}
                issued for our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>{" "}
                <span
                  className={
                    isFilled(formData?.childName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childName || "NAME"}
                </span>{" "}
                from (Chief Register of Births and Deaths, Govt of Karnataka),
                the name of parents issued Father name as{" "}
                <span
                  className={
                    isFilled(formData?.incorrectFatherName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.incorrectFatherName || "Incorrect Name"}
                </span>{" "}
                and Mother name as{" "}
                <span
                  className={
                    isFilled(formData?.incorrectMotherName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.incorrectMotherName || "Incorrect Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                That as per our Aadhaar card the given name of Father is{" "}
                <span
                  className={
                    isFilled(formData?.correctFatherName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.correctFatherName || "Correct Name"}
                </span>{" "}
                AND Mother as{" "}
                <span
                  className={
                    isFilled(formData?.correctMotherName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.correctMotherName || "Correct Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                We state that name in our Aadhaar card's and name in our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>{" "}
                Birth Certificate is the name of one and the same persons and
                that is our self's.
              </li>

              <li className="text-justify">
                That we also required this affidavit for RE ISSUE the Birth
                Certificate with parent's name as per Aadhaar card.
              </li>
            </ol>

            <div className="mt-12">
              <p className="text-justify">
                Verified at{" "}
                <span
                  className={
                    isFilled(formData?.place)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(formData?.day)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(formData?.month)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.year)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponents)</p>
              <p className="mt-1">
                {formData?.fatherName || "___________________"}{" "}
                {formData?.motherName || "___________________"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCertificateParentNameCorrection;
