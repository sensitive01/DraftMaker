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

const GstPreview = () => {
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

  // Helper function to check if a field has content
  const isFilled = (value) => {
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
                text:`${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),

              new Paragraph({
                text: "(For GST Registration)",
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`I, `),
                  new TextRun({
                    text: formData?.ownerName || "__________________",
                    bold: true,
                  }),
                  new TextRun(`, Aadhaar no. `),
                  new TextRun({
                    text: formData?.aadhaarNo || "__________________",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun(`Address: `),
                  new TextRun({
                    text: formData?.ownerAddress || "__________________",
                    bold: true,
                  }),
                  new TextRun(
                    `, and being legal owner of the premises address `
                  ),
                  new TextRun({
                    text: formData?.premisesAddress || "__________________",
                    bold: true,
                  }),
                  new TextRun(`, do hereby permit Mr./Ms. `),
                  new TextRun({
                    text: formData?.tenantName || "__________________",
                    bold: true,
                  }),
                  new TextRun(` and Proprietor of `),
                  new TextRun({
                    text: formData?.companyName || "__________________",
                    bold: true,
                  }),
                  new TextRun(
                    ` (Name of the Company/Firm), office address at `
                  ),
                  new TextRun({
                    text: formData?.officeAddress || "__________________",
                    bold: true,
                  }),
                  new TextRun(`.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `I hereby state that I have no objection with the said company/Firm carrying on his Business and profession from the said premises and getting registered Under GST.`,
                    italics: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun(`Verified at `),
                  new TextRun({
                    text: formData?.place || "________",
                    bold: true,
                  }),
                  new TextRun(` on this `),
                  new TextRun({
                    text: formData?.day || "__",
                    bold: true,
                  }),
                  new TextRun(` day of `),
                  new TextRun({
                    text: formData?.month || "_______",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.year || "____",
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
                text: "Property Owner",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `GST_NOC_${
        formData.ownerName ? formData.ownerName.replace(/\s+/g, "_") : "Owner"
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

      {/* Document preview */}
      <div className="bg-white border border-gray-300 shadow w-full max-w-3xl">
        <div className="relative p-8">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          {/* Content */}
          <div className="bg-white rounded-lg">
            <div className="mb-4 text-center">
              <h1 className="font-bold underline text-xl mb-2">
                {formData.documentType}
              </h1>
              <p className="text-sm text-gray-500">(For GST Registration)</p>
            </div>

            <p className="mb-4 leading-relaxed">
              I,{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.ownerName) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.ownerName || "__________________"}
              </span>
              , Aadhaar no.{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.aadhaarNo) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.aadhaarNo || "__________________"}
              </span>
            </p>

            <p className="mb-4 leading-relaxed">
              Address:{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.ownerAddress) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.ownerAddress || "__________________"}
              </span>
              , and being legal owner of the premises address{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.premisesAddress) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.premisesAddress || "__________________"}
              </span>
              , do hereby permit Mr./Ms.{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.tenantName) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.tenantName || "__________________"}
              </span>{" "}
              and Proprietor of
              <span
                className={`font-bold ${
                  !isFilled(formData?.companyName) ? "bg-yellow-50" : ""
                }`}
              >
                {" "}
                {formData?.companyName || "__________________"}
              </span>{" "}
              (Name of the Company/Firm), office address at{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.officeAddress) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.officeAddress || "__________________"}
              </span>
              .
            </p>

            <p className="mb-6 italic">
              I hereby state that I have no objection with the said company/Firm
              carrying on his Business and profession from the said premises and
              getting registered Under GST.
            </p>

            <p className="mb-8 leading-relaxed">
              Verified at{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.place) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.place || "________"}
              </span>{" "}
              on this{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.day) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.day || "__"}
              </span>{" "}
              day of{" "}
              <span
                className={`font-bold ${
                  !isFilled(formData?.month) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.month || "_______"}
              </span>
              ,
              <span
                className={`font-bold ${
                  !isFilled(formData?.year) ? "bg-yellow-50" : ""
                }`}
              >
                {" "}
                {formData?.year || "____"}
              </span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstPreview;
