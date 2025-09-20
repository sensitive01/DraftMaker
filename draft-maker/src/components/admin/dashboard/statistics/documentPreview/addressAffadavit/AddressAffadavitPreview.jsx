import React, { useRef, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import html2pdf from "html2pdf.js";

export default function AddressAffidavitPreview() {
  const affidavitRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAggrementFormData(bookingId);
        console.log("response", response);
        if (response.status === 200) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching agreement data:", error);
      }
    };
    fetchData();
  }, [bookingId]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format permanent address
  const formatPermanentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.permanentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format present address
  const formatPresentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.presentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format the relationship part of the declaration
  const formatRelationship = () => {
    if (!formData.gender) return "D/o, S/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  // PDF Download Function
  const downloadPDF = () => {
    setLoading(true);
    setDownloadType("pdf");

    const element = affidavitRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `Address_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "User"
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
        setLoading(false);
        setDownloadType("");
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setLoading(false);
        setDownloadType("");
      });
  };

  // Generate Word document using HTML-to-Word approach
  const generateWordDocument = async () => {
    setLoading(true);
    setDownloadType("word");

    try {
      // Create structured HTML content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 40px; text-decoration: underline; text-transform: uppercase; letter-spacing: 1px;">
            ${formData.documentType || "ADDRESS AFFIDAVIT"}
          </div>

          <div style="margin-bottom: 40px; line-height: 1.6;">
            <p style="margin-bottom: 24px; text-align: justify;">
              I, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.name || "Mr/Mrs/Ms ........................."}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formatRelationship()}
              </strong>, 
              Aged: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.age || "......"}
              </strong> 
              Years,
            </p>
            
            <p style="margin-bottom: 16px;">
              Permanent Address: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formatPermanentAddress()}
              </strong>
            </p>
            
            <p style="margin-bottom: 16px;">
              Present Address: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formatPresentAddress()}
              </strong>
            </p>
            
            <p style="margin-bottom: 32px;">
              My Aadhaar No: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.aadhaarNo || "536709665679"}
              </strong>.
            </p>
            
            <p style="margin-bottom: 32px; font-weight: 600;">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <div style="margin-bottom: 40px; line-height: 1.6;">
            <ol style="padding-left: 32px; counter-reset: item;">
              <li style="margin-bottom: 20px; text-align: justify; counter-increment: item; display: block; margin-bottom: 0.5em;">
                I hereby declare that I am presently residing at above address since 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData.currentResidenceAddress || "XX/XX/XXXX"}
                </strong>.
              </li>
              
              <li style="margin-bottom: 20px; text-align: justify; counter-increment: item; display: block; margin-bottom: 0.5em;">
                I further declare that I am swearing this affidavit to produce before the concerned 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData.companyName || "COMPANY NAME"}
                </strong>.
              </li>
              
              <li style="margin-bottom: 20px; text-align: justify; counter-increment: item; display: block; margin-bottom: 0.5em;">
                That this affidavit is being made to serve as proof of my
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;"> Address </strong>
                for the purpose of 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData.purposeOfAffidavit || "XXXX"}
                </strong>.
              </li>
            </ol>

            <p style="margin-top: 40px; text-align: justify;">
              I do hereby verify and declare that what is stated above are true and correct to the best of my knowledge, information and belief.
            </p>
          </div>

          <div style="display: table; width: 100%; margin-top: 80px;">
            <div style="display: table-cell; width: 50%; vertical-align: top;">
              <p style="margin-bottom: 16px;">
                Solemnly affirmed at 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData.place || "MANIYUR"}
                </strong>
              </p>
              <p style="margin-bottom: 16px;">
                Date: 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formatDate(formData.date)}
                </strong>
              </p>
            </div>
            
            <div style="display: table-cell; width: 50%; vertical-align: top; text-align: right;">
              <div style="margin-top: 32px; border-top: 2px solid #000; padding-top: 8px; width: 200px; text-align: center; margin-left: auto;">
                <p>(Signature of the Applicant)</p>
                <p style="font-weight: bold; margin-top: 4px;">Deponent</p>
              </div>
            </div>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Address Affidavit</title>
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
      link.download = `Address_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "User"
      }.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setLoading(false);
      setDownloadType("");
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
      setLoading(false);
      setDownloadType("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with download buttons in the top right */}
        <div className="mb-6 bg-gray-100 rounded-t-lg px-8 py-4 flex justify-end items-center gap-3">
          <button
            onClick={downloadPDF}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2 shadow-sm"
          >
            {loading && downloadType === "pdf" ? (
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
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Download PDF</span>
              </>
            )}
          </button>

          <button
            onClick={generateWordDocument}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center space-x-2 shadow-sm"
          >
            {loading && downloadType === "word" ? (
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
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Download Word</span>
              </>
            )}
          </button>
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
          {/* Document Preview */}
          <div
            ref={affidavitRef}
            className="p-8 bg-white border-b border-gray-200"
          >
            <h2 className="text-center text-2xl font-bold mb-10 underline uppercase tracking-wide">
              {formData.documentType || "ADDRESS AFFIDAVIT"}
            </h2>

            {/* Content */}
            <div className="mb-10 leading-relaxed">
              <p className="mb-6 text-justify">
                I,{" "}
                <span className="font-bold form-data">
                  {formData.name || "Mr/Mrs/Ms ........................."}
                </span>
                ,{" "}
                <span className="form-data font-bold">
                  {formatRelationship()}
                </span>
                , Aged:{" "}
                <span className="font-bold form-data">
                  {formData.age || "......"}
                </span>{" "}
                Years,
              </p>
              <p className="mb-4">
                Permanent Address:{" "}
                <span className="font-bold form-data">
                  {formatPermanentAddress()}
                </span>
              </p>
              <p className="mb-4">
                Present Address:{" "}
                <span className="font-bold form-data">
                  {formatPresentAddress()}
                </span>
              </p>
              <p className="mb-8">
                My Aadhaar No:{" "}
                <span className="font-bold form-data">
                  {formData.aadhaarNo || "536709665679"}
                </span>
                .
              </p>
              <p className="mb-8 font-medium">
                Do hereby solemnly affirm and declare as under:
              </p>
            </div>

            <div className="mb-10 leading-relaxed">
              {/* Numbered list with proper styling */}
              <ol className="list-decimal pl-8 space-y-5">
                <li className="text-justify">
                  I hereby declare that I am presently residing at above address
                  since{" "}
                  <span className="font-bold form-data">
                    {formData.currentResidenceAddress || "XX/XX/XXXX"}.
                  </span>
                </li>
                <li className="text-justify">
                  I further declare that I am swearing this affidavit to produce
                  before the concerned{" "}
                  <span className="font-bold form-data">
                    {formData.companyName || "COMPANY NAME"}
                  </span>
                  .
                </li>
                <li className="text-justify">
                  That this affidavit is being made to serve as proof of my
                  <span className="font-bold form-data"> Address </span> for the
                  purpose of{" "}
                  <span className="font-bold form-data">
                    {formData.purposeOfAffidavit || "XXXX"}
                  </span>
                  .
                </li>
              </ol>

              <p className="mt-10 text-justify">
                I do hereby verify and declare that what is stated above are
                true and correct to the best of my knowledge, information and
                belief.
              </p>
            </div>

            {/* Signature section with left and right alignment */}
            <div className="flex justify-between items-start mt-20">
              {/* Left side - Place and Date */}
              <div className="text-left">
                <p className="mb-4">
                  Solemnly affirmed at{" "}
                  <span className="font-bold form-data">
                    {formData.place || "MANIYUR"}
                  </span>
                </p>
                <p className="mb-4">
                  Date:{" "}
                  <span className="font-bold form-data">
                    {formatDate(formData.date)}
                  </span>
                </p>
              </div>

              {/* Right side - Signature */}
              <div className="text-right">
                <div className="mt-8 border-t-2 border-black pt-2 w-48 text-center">
                  <p>(Signature of the Applicant)</p>
                  <p className="font-bold mt-1">Deponent</p>
                </div>
              </div>
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
      `}</style>
    </div>
  );
}
