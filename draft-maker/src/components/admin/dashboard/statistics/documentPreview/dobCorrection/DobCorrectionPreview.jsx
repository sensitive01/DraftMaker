import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Download } from "lucide-react";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";
import html2pdf from "html2pdf.js";

const DobCorrectionPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");
  const documentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType("pdf");

    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `DOB_Correction_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "Document"
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
  const downloadAsDoc = () => {
    setDownloadLoading(true);
    setDownloadType("word");

    try {
      // Create structured content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 40px; text-decoration: underline; text-transform: uppercase;">
            ${formData.documentType || "AFFIDAVIT FOR DATE OF BIRTH CORRECTION"}
          </div>

          <div style="margin-bottom: 24px; line-height: 1.6;">
            <p style="margin-bottom: 24px;">
              I, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.fullName || "_________________"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.relation || "son/daughter/wife"}
              </strong> 
              of 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.relationName || "_________________"}
              </strong>, 
              Aged: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.age || "__"}
              </strong> 
              Years,
            </p>

            <p style="margin-bottom: 24px;">
              Permanent Address: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${
                  formData.permanentAddress || "_______________________________"
                }
              </strong>
            </p>

            <p style="margin-bottom: 24px;">
              My Aadhaar No: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.aadhaarNo || "________________"}
              </strong>
            </p>

            <p style="margin-bottom: 24px; font-weight: bold;">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <ol style="padding-left: 32px; counter-reset: item; margin-bottom: 48px; line-height: 1.6;">
            <li style="margin-bottom: 16px; counter-increment: item; display: block;">
              That I am the citizen of India.
            </li>

            <li style="margin-bottom: 16px; counter-increment: item; display: block;">
              That my Date of Birth has been recorded as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formatDate(formData.dob1) || "__-__-____"}
              </strong> 
              in my 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.document1 || "_________"}
              </strong> 
              bearing number 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.documentNo1 || "____________"}
              </strong>.
            </li>

            <li style="margin-bottom: 16px; counter-increment: item; display: block;">
              That my Date of Birth has been recorded as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formatDate(formData.dob2) || "__-__-____"}
              </strong> 
              in my 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.document2 || "_________"}
              </strong> 
              bearing number 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.documentNo2 || "____________"}
              </strong>.
            </li>

            <li style="margin-bottom: 16px; counter-increment: item; display: block;">
              That I further declare that both the Dates of Birth mentioned hereinabove belong to one and the same person i.e. "myself".
            </li>

            <li style="margin-bottom: 16px; counter-increment: item; display: block;">
              That my statement is true and correct to the best of my knowledge and belief.
            </li>
          </ol>

          <div style="margin-top: 48px; margin-bottom: 32px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.place || "_________"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData.day) || "___"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.month || "________"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.year || "____"}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 80px; text-align: right;">
            <div>
              <p style="margin-bottom: 48px;">______________________</p>
              <p style="font-weight: bold;">(Signature of the Deponent)</p>
              <p style="margin-top: 4px; font-weight: bold; background-color: #f3f4f6; padding: 2px 4px; display: inline-block;">
                ${formData.fullName || "_________________"}
              </p>
            </div>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>DOB Correction Affidavit</title>
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
      link.download = `DOB_Correction_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "Document"
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
        <div className="text-gray-600">Loading document...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      {/* Download buttons - Top Right */}
      <div className="flex justify-end items-center mb-6 gap-3">
        <button
          onClick={downloadPDF}
          disabled={downloadLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          {downloadLoading && downloadType === "pdf" ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download PDF</span>
            </>
          )}
        </button>

        <button
          onClick={downloadAsDoc}
          disabled={downloadLoading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          {downloadLoading && downloadType === "word" ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Word</span>
            </>
          )}
        </button>
      </div>

      <div
        ref={documentRef}
        id="affidavit-content"
        className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg"
      >
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold uppercase underline mb-1">
            {formData.documentType || "AFFIDAVIT FOR DATE OF BIRTH CORRECTION"}
          </h1>
        </div>

        <div className="space-y-6 text-gray-800">
          <p>
            I,{" "}
            <span className="font-semibold form-data">
              {formData.fullName || "_________________"}
            </span>
            ,{" "}
            <span className="font-semibold form-data">
              {formData.relation || "son/daughter/wife"}
            </span>{" "}
            of{" "}
            <span className="font-semibold form-data">
              {formData.relationName || "_________________"}
            </span>
            , Aged:{" "}
            <span className="font-semibold form-data">
              {formData.age || "__"}
            </span>{" "}
            Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-semibold form-data">
              {formData.permanentAddress || "_______________________________"}
            </span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-semibold form-data">
              {formData.aadhaarNo || "________________"}
            </span>
          </p>

          <p className="font-semibold">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal pl-6 space-y-4">
            <li>That I am the citizen of India.</li>

            <li>
              That my Date of Birth has been recorded as{" "}
              <span className="font-semibold form-data">
                {formatDate(formData.dob1) || "__-__-____"}
              </span>{" "}
              in my{" "}
              <span className="font-semibold form-data">
                {formData.document1 || "_________"}
              </span>{" "}
              bearing number{" "}
              <span className="font-semibold form-data">
                {formData.documentNo1 || "____________"}
              </span>
              .
            </li>

            <li>
              That my Date of Birth has been recorded as{" "}
              <span className="font-semibold form-data">
                {formatDate(formData.dob2) || "__-__-____"}
              </span>{" "}
              in my{" "}
              <span className="font-semibold form-data">
                {formData.document2 || "_________"}
              </span>{" "}
              bearing number{" "}
              <span className="font-semibold form-data">
                {formData.documentNo2 || "____________"}
              </span>
              .
            </li>

            <li>
              That I further declare that both the Dates of Birth mentioned
              hereinabove belong to one and the same person i.e. "myself".
            </li>

            <li>
              That my statement is true and correct to the best of my knowledge
              and belief.
            </li>
          </ol>

          <div className="mt-12">
            <p>
              Verified at{" "}
              <span className="font-semibold form-data">
                {formData.place || "_________"}
              </span>{" "}
              on this{" "}
              <span className="font-semibold form-data">
                {getDayWithSuffix(formData.day) || "___"}
              </span>{" "}
              <span className="font-semibold form-data">
                {formData.month || "________"}
              </span>
              ,{" "}
              <span className="font-semibold form-data">
                {formData.year || "____"}
              </span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>
          </div>

          <div className="mt-20 flex justify-end">
            <div className="text-right">
              <p className="mb-12">______________________</p>
              <p className="font-semibold">(Signature of the Deponent)</p>
              <p className="mt-1 font-semibold form-data">
                {formData.fullName || "_________________"}
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

export default DobCorrectionPreview;
