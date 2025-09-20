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
  Table,
  TableRow,
  TableCell,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";
import html2pdf from 'html2pdf.js';

const HufPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({
    coparceners: [],
  });
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState('');
  const [error, setError] = useState(null);
  const documentRef = useRef(null);

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

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType('pdf');
    
    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `HUF_Affidavit_${formData.name ? formData.name.replace(/\s+/g, "_") : "Document"}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compressPDF: true
      }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setDownloadLoading(false);
      setDownloadType('');
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      setDownloadLoading(false);
      setDownloadType('');
    });
  };

  // Generate Word document
  const generateWordDocument = async () => {
    setDownloadLoading(true);
    setDownloadType('word');

    try {
      // Create structured content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px;">
            ${formData.documentType || "HUF AFFIDAVIT"}
          </div>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${(formData.title || "") + " " + (formData.name || "[FULL NAME]")}
            </strong> 
            ${formData.relationTo ? 
              `<strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.relationTo + " " + (formData.relationName || "[RELATION NAME]")}
              </strong>` : ''
            }, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.age || "[AGE]"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${address || "[COMPLETE ADDRESS WITH PIN CODE]"}
            </strong>
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6;">
            My Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.aadhaarNo || "[AADHAAR NUMBER]"}
            </strong> 
            and as 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              Karta of my Hindu Undivided Family (HUF)
            </strong> 
            affirm on oath and declare as under --
          </p>

          <p style="font-weight: bold; text-align: center; margin: 20px 0 30px 0;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <div style="margin-bottom: 32px;">
            <p style="margin-bottom: 16px; line-height: 1.6;">
              1. That I am 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${(formData.title || "") + " " + (formData.name || "[FULL NAME]")}
              </strong> 
              of our 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                HUF
              </strong> 
              which is known as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${(formData.hufName || "[HUF NAME]") + " HUF"}
              </strong>
            </p>

            <p style="margin: 20px 0; line-height: 1.6;">
              2. That as on today, name of coparceners of our above said HUF, their name, Relationship and addresses are as below --
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #666;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #666; padding: 8px; width: 8.33%; text-align: center; font-weight: bold;">
                  S. No
                </th>
                <th style="border: 1px solid #666; padding: 8px; width: 33.33%; text-align: center; font-weight: bold;">
                  Name of the coparceners
                </th>
                <th style="border: 1px solid #666; padding: 8px; width: 25%; text-align: center; font-weight: bold;">
                  Relationship
                </th>
                <th style="border: 1px solid #666; padding: 8px; width: 33.33%; text-align: center; font-weight: bold;">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              ${(formData.coparceners || []).map((coparcener, index) => `
                <tr>
                  <td style="border: 1px solid #666; padding: 8px; text-align: center;">
                    ${index + 1}
                  </td>
                  <td style="border: 1px solid #666; padding: 8px;">
                    <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                      ${coparcener?.name || "[NAME]"}
                    </strong>
                  </td>
                  <td style="border: 1px solid #666; padding: 8px;">
                    <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                      ${coparcener?.relationship || "[RELATIONSHIP]"}
                    </strong>
                  </td>
                  <td style="border: 1px solid #666; padding: 8px;">
                    <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                      ${coparcener?.address || "[ADDRESS]"}
                    </strong>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p style="margin: 30px 0; line-height: 1.6;">
            That the above said HUF is in existence since 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formattedExistenceDate || "[DATE OF EXISTENCE]"}
            </strong>.
          </p>

          <div style="margin-top: 50px; margin-bottom: 40px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.place || "[PLACE]"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData.day) || "[DAY]"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.month || "[MONTH]"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData.year || "[YEAR]"}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 80px; text-align: right;">
            <p>(Signature of the Deponent)</p>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>HUF Affidavit</title>
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
          </style>
        </head>
        <body>
          ${generateWordContent()}
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([wordDocument], {
        type: 'application/msword'
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HUF_Affidavit_${formData.name ? formData.name.replace(/\s+/g, "_") : "Document"}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setDownloadLoading(false);
      setDownloadType('');
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
      setDownloadLoading(false);
      setDownloadType('');
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
          {downloadLoading && downloadType === 'pdf' ? (
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
          {downloadLoading && downloadType === 'word' ? (
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

      {/* Simple legal document preview */}
      <div 
        ref={documentRef}
        className="bg-white border border-gray-300 w-full max-w-3xl p-8 font-serif"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{formData.documentType}</h1>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            I, {formData.title || ""}{" "}
            <span className="font-bold form-data">{formData.name || "[FULL NAME]"}</span>{" "}
            {formData.relationTo && (
              <>
                <span className="form-data">{formData.relationTo}</span>{" "}
                <span className="font-bold form-data">
                  {formData.relationName || "[RELATION NAME]"}
                </span>
              </>
            )}
            , Aged: <span className="font-bold form-data">{formData.age || "[AGE]"}</span>{" "}
            Years,
          </p>

          <p>
            Permanent Address{" "}
            <span className="font-bold form-data">
              {address || "[COMPLETE ADDRESS WITH PIN CODE]"}
            </span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-bold form-data">
              {formData.aadhaarNo || "[AADHAAR NUMBER]"}
            </span>{" "}
            and as <strong className="form-data">Karta of my Hindu Undivided Family (HUF)</strong>{" "}
            affirm on oath and declare as under --
          </p>

          <p className="font-bold text-center mt-6 mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal ml-6 space-y-4">
            <li>
              That I am {formData.title || ""}{" "}
              <span className="font-bold form-data">
                {formData.name || "[FULL NAME]"}
              </span>{" "}
              of our <strong className="form-data">HUF</strong> which is known as{" "}
              <strong>
                <span className="font-bold form-data">
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
                <th className="border border-gray-400 px-3 py-2 w-1/12 bg-gray-100">
                  S. No
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/3 bg-gray-100">
                  Name of the coparceners
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/4 bg-gray-100">
                  Relationship
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/3 bg-gray-100">
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
                    <span className="form-data">
                      {coparcener?.name || "[NAME]"}
                    </span>
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <span className="form-data">
                      {coparcener?.relationship || "[RELATIONSHIP]"}
                    </span>
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <span className="form-data">
                      {coparcener?.address || "[ADDRESS]"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            That the above said HUF is in existence since{" "}
            <span className="font-bold form-data">
              {formattedExistenceDate || "[DATE OF EXISTENCE]"}
            </span>
            .
          </p>

          <p className="mt-8">
            Verified at{" "}
            <span className="font-bold form-data">{formData.place || "[PLACE]"}</span> on
            this <span className="font-bold form-data">{getDayWithSuffix(formData.day) || "[DAY]"}</span>{" "}
           {" "}
            <span className="font-bold form-data">{formData.month || "[MONTH]"}</span>,{" "}
            <span className="font-bold form-data">{formData.year || "[YEAR]"}</span> that
            the contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>

          {/* Signature Block */}
          <div className="text-right mt-16">
            <p>(Signature of the Deponent)</p>
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
          transition-property: background-color, border-color, color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
};

export default HufPreview;