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
import html2pdf from 'html2pdf.js';

const GstPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
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

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType('pdf');
    
    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `GST_NOC_${formData.ownerName ? formData.ownerName.replace(/\s+/g, "_") : "Owner"}.pdf`,
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
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 10px; text-decoration: underline;">
            ${formData.documentType || "NO OBJECTION CERTIFICATE"}
          </div>

          <div style="text-align: center; font-size: 12pt; margin-bottom: 30px; color: #666;">
            (For GST Registration)
          </div>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.ownerName || "__________________"}
            </strong>, 
            Aadhaar no. 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.aadhaarNo || "__________________"}
            </strong>
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6;">
            Address: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.ownerAddress || "__________________"}
            </strong>, 
            and being legal owner of the premises address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.premisesAddress || "__________________"}
            </strong>, 
            do hereby permit Mr./Ms. 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.tenantName || "__________________"}
            </strong> 
            and Proprietor of 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.companyName || "__________________"}
            </strong> 
            (Name of the Company/Firm), office address at 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.officeAddress || "__________________"}
            </strong>.
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6; font-style: italic;">
            I hereby state that I have no objection with the said company/Firm carrying on his Business and profession from the said premises and getting registered Under GST.
          </p>

          <div style="margin-top: 48px; margin-bottom: 40px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.place || "________"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData?.day) || "__"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.month || "_______"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.year || "____"}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 80px; text-align: right;">
            <p>(Signature of the Deponent)</p>
            <p style="margin-top: 4px; font-weight: bold;">Property Owner</p>
          </div>
        `;
      };

      // Enhanced Word document template with proper A4 styling
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>GST NOC</title>
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
      link.download = `GST_NOC_${formData.ownerName ? formData.ownerName.replace(/\s+/g, "_") : "Owner"}.doc`;
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

      {/* Document preview */}
      <div className="bg-white border border-gray-300 shadow w-full max-w-3xl">
        <div 
          ref={documentRef}
          className="relative p-8"
        >
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
                className={`font-bold form-data ${
                  !isFilled(formData?.ownerName) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.ownerName || "__________________"}
              </span>
              , Aadhaar no.{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.aadhaarNo) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.aadhaarNo || "__________________"}
              </span>
            </p>

            <p className="mb-4 leading-relaxed">
              Address:{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.ownerAddress) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.ownerAddress || "__________________"}
              </span>
              , and being legal owner of the premises address{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.premisesAddress) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.premisesAddress || "__________________"}
              </span>
              , do hereby permit Mr./Ms.{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.tenantName) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.tenantName || "__________________"}
              </span>{" "}
              and Proprietor of
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.companyName) ? "bg-yellow-50" : ""
                }`}
              >
                {" "}
                {formData?.companyName || "__________________"}
              </span>{" "}
              (Name of the Company/Firm), office address at{" "}
              <span
                className={`font-bold form-data ${
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
                className={`font-bold form-data ${
                  !isFilled(formData?.place) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.place || "________"}
              </span>{" "}
              on this{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.day) ? "bg-yellow-50" : ""
                }`}
              >
                {getDayWithSuffix(formData?.day) || "__"}
              </span>{" "}
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.month) ? "bg-yellow-50" : ""
                }`}
              >
                {formData?.month || "_______"}
              </span>
              ,
              <span
                className={`font-bold form-data ${
                  !isFilled(formData?.year) ? "bg-yellow-50" : ""
                }`}
              >
                {" "}
                {formData?.year || "____"}
              </span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponent)</p>
              <p className="mt-1 font-bold">Property Owner</p>
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
          transition-property: background-color, border-color, color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
};

export default GstPreview;