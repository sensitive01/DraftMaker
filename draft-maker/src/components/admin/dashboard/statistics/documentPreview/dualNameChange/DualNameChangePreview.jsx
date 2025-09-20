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
import html2pdf from "html2pdf.js";

const DualNameChangePreview = () => {
  const pdfTemplateRef = useRef(null);
  const documentRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          const data = response?.data?.data || {};

          // Handle backward compatibility - convert old format to new format if needed
          let processedData = { ...data };

          if (data.name2 && data.document2 && data.documentNo2) {
            // If old format exists, convert to new format
            processedData.additionalDocuments = [
              {
                id: 1,
                name: data.name2,
                document: data.document2,
                documentNo: data.documentNo2,
              },
            ];
          } else if (
            !data.additionalDocuments ||
            data.additionalDocuments.length === 0
          ) {
            // If no additional documents, create default empty one
            processedData.additionalDocuments = [
              {
                id: 1,
                name: "",
                document: "",
                documentNo: "",
              },
            ];
          }

          setFormData(processedData);
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
    return typeof value === "string" && value.trim() !== "";
  };

  // Handle backward compatibility - support both old and new data structures
  const getAdditionalDocuments = () => {
    if (
      formData?.additionalDocuments &&
      formData.additionalDocuments.length > 0
    ) {
      return formData.additionalDocuments;
    }

    // Fallback to old structure if new structure not available
    if (formData?.name2 || formData?.document2 || formData?.documentNo2) {
      return [
        {
          id: 1,
          name: formData.name2 || "",
          document: formData.document2 || "",
          documentNo: formData.documentNo2 || "",
        },
      ];
    }

    return [];
  };

  // Format name with prefix if available
  const formatFullName = () => {
    let name = "";
    if (formData?.namePrefix) {
      name += formData.namePrefix + " ";
    }
    name += formData?.fullName || "Mr/Mrs/Ms ...........................";
    return name;
  };

  // Format relation details
  const formatRelationship = () => {
    let relation = formData?.relation || "D/o, S/o, H/o, W/o";
    relation += " " + (formData?.relationName || "...................");
    return relation;
  };

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType("pdf");

    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `Dual_Name_Change_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compressPDF: true,
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setDownloadLoading(false);
        setDownloadType("");
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setDownloadLoading(false);
        setDownloadType("");
      });
  };

  // Generate Word document
  const generateWordDocument = async () => {
    setDownloadLoading(true);
    setDownloadType("word");

    try {
      const additionalDocuments = getAdditionalDocuments();

      // Create structured content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px;">
            ${formData.documentType || "AFFIDAVIT"}
          </div>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formatFullName()}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formatRelationship()}
            </strong>, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.age?.toString() || "......"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px;">
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData?.permanentAddress ||
                "Address Line 1, Address Line 2, City, State, Pin Code"
              }
            </strong>
          </p>

          <p style="margin-bottom: 16px;">
            My Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.aadhaarNo || "0000 0000 0000"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; font-weight: bold;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <div style="padding-left: 24px; margin-bottom: 32px;">
            <ol style="counter-reset: item; padding-left: 0;">
              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I am the citizen of India.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That my name has been recorded as 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.name1 || "NAME"}
                </strong>, 
                Name of document-
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.document1 || "NAME OF DOCUMENT"}
                </strong>, 
                Document Serial No-
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                </strong>
              </li>

              ${additionalDocuments
                .map(
                  (document, index) => `
                <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                  That my name has been recorded as 
                  <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                    ${document.name || "NAME"}
                  </strong>, 
                  Name of document-
                  <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                    ${document.document || "NAME OF DOCUMENT"}
                  </strong>, 
                  Document Serial No-
                  <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                    ${document.documentNo || "DOCUMENT SERIAL NO"}
                  </strong>
                </li>
              `
                )
                .join("")}

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I further declare that ${
                  additionalDocuments.length > 1
                    ? "all the names"
                    : "both the names"
                } mentioned hereinabove belongs to one and the same person i.e. "myself".
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That my statement is true and correct.
              </li>
            </ol>
          </div>

          <div style="margin-top: 48px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.place || "PLACE"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData?.day) || "XX"}
              </strong> 
              day of 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.month || "XXXX"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.year || "XXXX"}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 96px; text-align: right; padding-right: 16px;">
            <p>(Signature of the Deponent)</p>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Dual Name Change Affidavit</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>90</w:Zoom>
              <w:DoNotPromptForConvert/>
              <w:DoNotShowInsertionsAndDeletions/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page {
              size: A4;
              margin: 2cm 1.5cm 2cm 1.5cm;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              margin: 0;
              padding: 20px;
              max-width: 100%;
            }
            ol {
              counter-reset: item;
              padding-left: 0;
            }
            ol > li {
              display: block;
              margin-bottom: 1em;
              padding-left: 2em;
            }
            ol > li:before {
              content: counter(item, decimal) ".";
              counter-increment: item;
              font-weight: bold;
              width: 2em;
              margin-left: -2em;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          ${generateWordContent()}
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([wordDocument], {
        type: "application/msword",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Dual_Name_Change_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"
      }.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadLoading(false);
      setDownloadType("");
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
      setDownloadLoading(false);
      setDownloadType("");
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

  const additionalDocuments = getAdditionalDocuments();

  return (
    <div className="flex flex-col items-center">
      {/* Download buttons */}
      <div className="w-full max-w-2xl mb-4 flex justify-end gap-3">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
          disabled={downloadLoading}
        >
          {downloadLoading && downloadType === "pdf" ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Generating PDF...</span>
            </div>
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
              Download PDF
            </>
          )}
        </button>

        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
          disabled={downloadLoading}
        >
          {downloadLoading && downloadType === "word" ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Generating Word...</span>
            </div>
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

      {/* Single page preview with continuous content */}
      <div className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl">
        <div ref={documentRef} className="relative p-8">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          {/* Page 1 Content */}
          <div className="mb-12">
            <h1 className="text-center font-bold text-xl mb-6">
              {formData.documentType || "AFFIDAVIT"}
            </h1>

            <p className="mb-4">
              I,{" "}
              <span
                className={
                  isFilled(formData?.fullName)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.namePrefix ? formData.namePrefix + " " : ""}
                {formData?.fullName || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relation)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relationName)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                className={
                  isFilled(formData?.age?.toString())
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span
                className={
                  isFilled(formData?.permanentAddress)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.permanentAddress ||
                  "Address Line 1, Address Line 2, City, State, Pin Code"}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.aadhaarNo)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          {/* Page 2 Content */}
          <div className="pl-6">
            <ol
              className="list-decimal space-y-6"
              style={{ counterReset: "item" }}
            >
              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {1}.
                </span>{" "}
                That I am the citizen of India.
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {2}.
                </span>{" "}
                That my name has been recorded as{" "}
                <span
                  className={
                    isFilled(formData?.name1)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.name1 || "NAME"}
                </span>
                , Name of document-{" "}
                <span
                  className={
                    isFilled(formData?.document1)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.document1 || "NAME OF DOCUMENT"}
                </span>
                , Document Serial No-{" "}
                <span
                  className={
                    isFilled(formData?.documentNo1)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              {/* Dynamic additional documents */}
              {additionalDocuments.map((document, index) => (
                <li
                  key={document.id || index}
                  style={{ display: "block", counterIncrement: "item" }}
                >
                  <span style={{ display: "inline-block", width: "1.5em" }}>
                    {index + 3}.
                  </span>{" "}
                  That my name has been recorded as{" "}
                  <span
                    className={
                      isFilled(document.name)
                        ? "form-data"
                        : "bg-yellow-200 px-1 form-data"
                    }
                  >
                    {document.name || "NAME"}
                  </span>
                  , Name of document-{" "}
                  <span
                    className={
                      isFilled(document.document)
                        ? "form-data"
                        : "bg-yellow-200 px-1 form-data"
                    }
                  >
                    {document.document || "NAME OF DOCUMENT"}
                  </span>
                  , Document Serial No-{" "}
                  <span
                    className={
                      isFilled(document.documentNo)
                        ? "form-data"
                        : "bg-yellow-200 px-1 form-data"
                    }
                  >
                    {document.documentNo || "DOCUMENT SERIAL NO"}
                  </span>
                </li>
              ))}

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {additionalDocuments.length + 3}.
                </span>{" "}
                That I further declare that{" "}
                {additionalDocuments.length > 1
                  ? "all the names"
                  : "both the names"}{" "}
                mentioned hereinabove belongs to one and the same person i.e.
                "myself".
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {additionalDocuments.length + 4}.
                </span>{" "}
                That my statement is true and correct.
              </li>
            </ol>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span
                  className={
                    isFilled(formData?.place)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(formData?.day)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {getDayWithSuffix(formData?.day) || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(formData?.month)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.year)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right pr-4">
              <p>(Signature of the Deponent)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for form data styling */}
      <style jsx global>{`
        .form-data {
          background-color: #f3f4f6 !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
          color: #1f2937 !important;
          display: inline-block !important;
          font-weight: bold !important;
        }

        @media print {
          .form-data {
            background-color: transparent !important;
            font-weight: bold !important;
          }
        }

        /* Loading animation */
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Transition effects */
        .transition-colors {
          transition-property: background-color, border-color, color, fill,
            stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
};

export default DualNameChangePreview;
