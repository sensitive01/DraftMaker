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
import html2pdf from "html2pdf.js";

const DocumentLostPreview = () => {
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
    return typeof value === "string" && value.trim() !== "";
  };

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType("pdf");

    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `${formData.documentType || "Document"}_Lost_Affidavit_${
        formData.personName ? formData.personName.replace(/\s+/g, "_") : "User"
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

  // Enhanced Word Document Download Function
  const generateWordDocument = async () => {
    setDownloadLoading(true);
    setDownloadType("word");

    try {
      // Create structured content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px; text-decoration: underline;">
            ${formData.documentType || "AFFIDAVIT"}
          </div>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.personTitle || "Mr/Mrs/Ms"} ${
          formData?.personName || "................................"
        }
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.relationType || "D/o"}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.relationName || "........................"}
            </strong>, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.age || "......"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6;">
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData?.address ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"
              }
            </strong>
          </p>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6;">
            My Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.aadhaarNumber || "0000 0000 0000"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6; font-weight: bold;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol style="padding-left: 32px; counter-reset: item; margin-bottom: 32px;">
            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That I have inadvertently misplaced the original 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.documentType || "DOCUMENT NAME"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.documentType || "DOCUMENT"}
              </strong> 
              SERIAL NO: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.documentNumber || "..........."}
              </strong>, 
              which I am unable to trace even after extensive search.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That an FIR has been lodged bearing No 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.firNumber || "XXXX"}
              </strong> 
              on DATE: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.firDay || "XX"}/${formData?.firMonth || "XX"}/${
          formData?.firYear || "XXXX"
        }
              </strong> 
              reporting about the loss of 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.documentType || "DOCUMENT"}
              </strong>, 
              The copy of the same is enclosed herewith.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That I hereby request the Company/ Developer to provide me with the duplicate copy of 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.documentType || "DOCUMENT"}
              </strong> 
              for the purpose of my records and fulfillment of any requirement which may arise in future.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That I undertake to inform your good office if the original document is found in future.
            </li>
          </ol>

          <div style="margin-top: 48px;">
            <p style="text-align: justify; line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.place || "PLACE"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.day || "XX"}
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

          <div style="margin-top: 96px; text-align: right;">
            <p>(Signature of the Deponent)</p>
            <p style="margin-top: 4px;">
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.personName || "................................"}
              </strong>
            </p>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Document Lost Affidavit</title>
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
      link.download = `${formData.documentType || "Document"}_Lost_Affidavit_${
        formData.personName ? formData.personName.replace(/\s+/g, "_") : "User"
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

          {/* Content */}
          <div>
            <h1 className="text-center font-bold text-xl mb-6 underline">
              {formData.documentType || "AFFIDAVIT"}
            </h1>

            <p className="mb-4 text-justify">
              I,{" "}
              <span
                className={
                  isFilled(formData?.personTitle)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.personTitle || "Mr/Mrs/Ms"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.personName)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.personName || "................................"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relationType)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {formData?.relationType || "D/o"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relationName)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.relationName || "........................"}
              </span>
              , Aged:{" "}
              <span
                className={
                  isFilled(formData?.age?.toString())
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4 text-justify">
              Permanent Address{" "}
              <span
                className={
                  isFilled(formData?.address)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-4 text-justify">
              My Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.aadhaarNumber)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.aadhaarNumber || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 text-justify font-bold">
              Do hereby solemnly affirm and declare as under:
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-justify">
                That I have inadvertently misplaced the original{" "}
                <span
                  className={
                    isFilled(formData?.documentType)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.documentType || "DOCUMENT NAME"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.documentType)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.documentType || "DOCUMENT"}
                </span>{" "}
                SERIAL NO:{" "}
                <span
                  className={
                    isFilled(formData?.documentNumber)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.documentNumber || "..........."}
                </span>
                , which I am unable to trace even after extensive search.
              </li>

              <li className="text-justify">
                That an FIR has been lodged bearing No{" "}
                <span
                  className={
                    isFilled(formData?.firNumber)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.firNumber || "XXXX"}
                </span>{" "}
                on DATE:{" "}
                <span
                  className={
                    isFilled(formData?.firDay) &&
                    isFilled(formData?.firMonth) &&
                    isFilled(formData?.firYear)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.firDay || "XX"}/{formData?.firMonth || "XX"}/
                  {formData?.firYear || "XXXX"}
                </span>{" "}
                reporting about the loss of{" "}
                <span
                  className={
                    isFilled(formData?.documentType)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.documentType || "DOCUMENT"}
                </span>
                , The copy of the same is enclosed herewith.
              </li>

              <li className="text-justify">
                That I hereby request the Company/ Developer to provide me with
                the duplicate copy of{" "}
                <span
                  className={
                    isFilled(formData?.documentType)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.documentType || "DOCUMENT"}
                </span>{" "}
                for the purpose of my records and fulfillment of any requirement
                which may arise in future.
              </li>

              <li className="text-justify">
                That I undertake to inform your good office if the original
                document is found in future.
              </li>
            </ol>

            <div className="mt-12">
              <p className="text-justify">
                Verified at{" "}
                <span
                  className={
                    isFilled(formData?.place)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(formData?.day)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(formData?.month)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.year)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponent)</p>
              <p className="mt-1 font-bold form-data">
                {formData?.personName || "................................"}
              </p>
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

export default DocumentLostPreview;
