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

const MinorNameCorrectionPreview = () => {
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

  // Get correct pronoun based on child relation
  const getPronoun = (type) => {
    if (!formData.childRelation) return "his/her";
    return formData.childRelation === "Daughter" ? "her" : "his";
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
                    text: `${formData.parentTitle || "Mr./Mrs."} ${
                      formData.parentName || "___________________"
                    }`,
                    bold: true,
                  }),
                  new TextRun(` H/O `),
                  new TextRun({
                    text: `${formData.spouseTitle || "Mr./Mrs."} ${
                      formData.spouseName || "___________________"
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
                    text: formData?.parentAadhaar || "0000 0000 0000",
                    bold: true,
                  }),
                  new TextRun(`, Aadhaar No: `),
                  new TextRun({
                    text: formData?.spouseAadhaar || "0000 0000 0000",
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
                  new TextRun(`That Birth Certificate No: `),
                  new TextRun({
                    text: formData.certificateNumber || "_______",
                    bold: true,
                  }),
                  new TextRun(` issued for our `),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(` `),
                  new TextRun({
                    text: formData.childName || "_______",
                    bold: true,
                  }),
                  new TextRun(
                    ` from (Chief Register of Births and Deaths, Govt of Karnataka), the name of our `
                  ),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(` mentioned as `),
                  new TextRun({
                    text: formData.incorrectName || "Incorrect Name",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That as per our `),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(`'s Aadhaar card the given name is `),
                  new TextRun({
                    text: formData.correctName || "Correct Name",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`We state that we wanted to change our `),
                  new TextRun({
                    text: formData.childRelation || "child",
                    bold: true,
                  }),
                  new TextRun(`'s name in `),
                  new TextRun({
                    text: formData.childRelation === "Daughter" ? "her" : "his",
                  }),
                  new TextRun(` Birth Certificate as per `),
                  new TextRun({
                    text: formData.childRelation === "Daughter" ? "her" : "his",
                  }),
                  new TextRun(` Aadhaar Card that is `),
                  new TextRun({
                    text: formData.correctName || "Correct Name",
                    bold: true,
                  }),
                  new TextRun(` which is correct name.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That we also required this affidavit for RE ISSUE the Birth Certificate with correct name.`,
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
                    `, that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                text: "(Signature of the Deponents)",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: `${formData?.parentName || "___________________"}     ${
                  formData?.spouseName || "___________________"
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
      const fileName = `Minor_Name_Correction_${
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
                  isFilled(formData?.parentTitle)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.parentTitle || "Mr./Mrs."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.parentName)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.parentName || "___________________"}
              </span>{" "}
              H/O{" "}
              <span
                className={
                  isFilled(formData?.spouseTitle)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.spouseTitle || "Mr./Mrs."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.spouseName)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.spouseName || "___________________"}
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
                  isFilled(formData?.parentAadhaar)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.parentAadhaar || "0000 0000 0000"}
              </span>
              , Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.spouseAadhaar)
                    ? "font-bold"
                    : "bg-yellow-200 px-1 font-bold"
                }
              >
                {formData?.spouseAadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 text-justify font-bold">
              Do hereby solemnly affirm and declare as under:
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-justify">
                That Birth Certificate No:{" "}
                <span
                  className={
                    isFilled(formData?.certificateNumber)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.certificateNumber || "_______"}
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
                  {formData?.childName || "_______"}
                </span>{" "}
                from (Chief Register of Births and Deaths, Govt of Karnataka),
                the name of our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>{" "}
                mentioned as{" "}
                <span
                  className={
                    isFilled(formData?.incorrectName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.incorrectName || "Incorrect Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                That as per our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>
                's Aadhaar card the given name is{" "}
                <span
                  className={
                    isFilled(formData?.correctName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.correctName || "Correct Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                We state that we wanted to change our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>
                's name in {getPronoun()} Birth Certificate as per{" "}
                {getPronoun()} Aadhaar Card that is{" "}
                <span
                  className={
                    isFilled(formData?.correctName)
                      ? "font-bold"
                      : "bg-yellow-200 px-1 font-bold"
                  }
                >
                  {formData?.correctName || "Correct Name"}
                </span>{" "}
                which is correct name.
              </li>

              <li className="text-justify">
                That we also required this affidavit for RE ISSUE the Birth
                Certificate with correct name.
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
                </span>
                , that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponents)</p>
              <p className="mt-1">
                {formData?.parentName || "___________________"}{" "}
                {formData?.spouseName || "___________________"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinorNameCorrectionPreview;
