import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";
import html2pdf from 'html2pdf.js';

const GasPreview = () => {
  const pdfTemplateRef = useRef(null);
  const documentRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState('');
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

  // Format date if available
  const formatDate = (dateString) => {
    try {
      if (!dateString) return ".....................";
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return ".....................";
    }
  };

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType('pdf');
    
    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `Gas_Affidavit_${formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"}.pdf`,
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
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px; text-decoration: underline;">
            ${formData.documentType || "GAS AFFIDAVIT"}
          </div>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.fullName || "..........................."}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.relation || "..."}
            </strong>, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.fatherName || "..........................."}
            </strong> 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.age?.toString() || "......"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px;">
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.permanentAddress || "..........................."}
            </strong>
          </p>

          <p style="margin-bottom: 16px;">
            My Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.aadhaarNo || "..........................."}
            </strong>
          </p>

          <p style="margin-bottom: 16px; font-weight: bold;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <div style="padding-left: 24px; margin-bottom: 32px;">
            <ol style="counter-reset: item; padding-left: 0;">
              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I am / was a consumer of 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.gasCompanyName || "..........................."}
                </strong> 
                for domestic use at the following address 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.serviceAddress || "..........................."}
                </strong> 
                since 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formatDate(formData?.connectionDate)}
                </strong>
                <br><br>
                My consumer number is / was 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.consumerNumber || "..........................."}
                </strong> 
                I was issued with Subscription Voucher No 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.subscriptionVoucher || "..........................."}
                </strong> 
                by M/s 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.gasCompanyName || "..........................."}
                </strong> 
                towards 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.cylinderCount?.toString() || "..."}
                </strong> 
                Gas cylinder and 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.regulatorCount?.toString() || "..."}
                </strong> 
                regulator on loan for my use against the refundable deposit of Rs 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.depositAmount?.toString() || "..."}
                </strong>
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I was given the gas cylinder and a regulator when I was residing in 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${formData?.previousAddress || "..........................."}
                </strong> 
                Thereafter, I shifted to my above mentioned residence.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                ${formData?.reason === "shifting" ? 
                  "That I want to return the Subscription Voucher along with the cylinder(s) and regulator as I am shifting my residence from this town and want to terminate the agreement with the above mentioned Corporation." :
                  "That I want to terminate the agreement with the above mentioned distributor."
                }
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                ${formData?.lostItem === "subscription" ?
                  "That I am not able to produce the Subscription Voucher along with the cylinder and regulator to obtain the refundable deposit as it is misplaced / lost." :
                  "That I am not able to produce the Termination Voucher as it misplaced / lost."
                }
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I have not assigned or transferred the Subscription Voucher / Termination Voucher to any person whomsoever.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I undertake to return forthwith the above referred Subscription Voucher / Termination Voucher to M/s. Hindustan Petroleum Corporation Ltd. if found at any time in the future.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That I shall be liable to M/s. Hindustan Petroleum Corporation Ltd. for any loss or expense incurred by them if any one produces the above referred Subscription Voucher / Termination Voucher to claim any amount from the Corporation.
              </li>
            </ol>
          </div>

          <div style="margin-top: 48px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.place || "..........................."}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData?.day) || "..."}
              </strong> 
              day of 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.month || "..."}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.year || "..."}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 96px; text-align: right;">
            <p>(Signature of the Deponent)</p>
            <p style="margin-top: 4px;">
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.fullName || "..........................."}
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
          <title>Gas Affidavit</title>
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
        type: 'application/msword'
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Gas_Affidavit_${formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"}.doc`;
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

      {/* Single page preview with continuous content */}
      <div className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl">
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
          <div>
            <h1 className="text-center font-bold text-xl mb-6 underline">{formData.documentType}</h1>

            <p className="mb-4">
              I,{" "}
              <span className={isFilled(formData?.fullName) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                {formData?.fullName || "..........................."}
              </span>{" "}
              <span className={isFilled(formData?.relation) ? "form-data" : "bg-yellow-200 px-1 form-data"}>
                {formData?.relation || "..."}
              </span>,
              <span className={isFilled(formData?.fatherName) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                {formData?.fatherName || "..........................."}
              </span>{" "}
              Aged:{" "}
              <span className={isFilled(formData?.age?.toString()) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                {formData?.age || "..."}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span className={isFilled(formData?.permanentAddress) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                {formData?.permanentAddress || "..........................."}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span className={isFilled(formData?.aadhaarNo) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                {formData?.aadhaarNo || "..........................."}
              </span>
            </p>

            <p className="mb-4 font-bold">Do hereby solemnly affirm and declare as under:</p>

            <ol className="list-decimal pl-6 space-y-4">
              <li>
                That I am / was a consumer of{" "}
                <span className={isFilled(formData?.gasCompanyName) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.gasCompanyName || "..........................."}
                </span>{" "}
                for domestic use at the following address{" "}
                <span className={isFilled(formData?.serviceAddress) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.serviceAddress || "..........................."}
                </span>{" "}
                since{" "}
                <span className={isFilled(formData?.connectionDate) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formatDate(formData?.connectionDate)}
                </span>
                <p className="mt-2">
                  My consumer number is / was{" "}
                  <span className={isFilled(formData?.consumerNumber) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.consumerNumber || "..........................."}
                  </span>{" "}
                  I was issued with Subscription Voucher No{" "}
                  <span className={isFilled(formData?.subscriptionVoucher) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.subscriptionVoucher || "..........................."}
                  </span>{" "}
                  by M/s{" "}
                  <span className={isFilled(formData?.gasCompanyName) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.gasCompanyName || "..........................."}
                  </span>{" "}
                  towards{" "}
                  <span className={isFilled(formData?.cylinderCount?.toString()) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.cylinderCount || "..."}
                  </span>{" "}
                  Gas cylinder and{" "}
                  <span className={isFilled(formData?.regulatorCount?.toString()) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.regulatorCount || "..."}
                  </span>{" "}
                  regulator on loan for my use against the refundable deposit of Rs{" "}
                  <span className={isFilled(formData?.depositAmount?.toString()) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                    {formData?.depositAmount || "..."}
                  </span>
                </p>
              </li>

              <li>
                That I was given the gas cylinder and a regulator when I was residing in{" "}
                <span className={isFilled(formData?.previousAddress) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.previousAddress || "..........................."}
                </span>{" "}
                Thereafter, I shifted to my above mentioned residence.
              </li>

              <li>
                {formData?.reason === "shifting" ? (
                  <p>
                    That I want to return the Subscription Voucher along with the cylinder(s) and regulator as I am shifting my residence from this town and want to terminate the agreement with the above mentioned Corporation.
                  </p>
                ) : (
                  <p>
                    That I want to terminate the agreement with the above mentioned distributor.
                  </p>
                )}
              </li>

              <li>
                {formData?.lostItem === "subscription" ? (
                  <p>
                    That I am not able to produce the Subscription Voucher along with the cylinder and regulator to obtain the refundable deposit as it is misplaced / lost.
                  </p>
                ) : (
                  <p>
                    That I am not able to produce the Termination Voucher as it misplaced / lost.
                  </p>
                )}
              </li>

              <li>
                That I have not assigned or transferred the Subscription Voucher / Termination Voucher to any person whomsoever.
              </li>

              <li>
                That I undertake to return forthwith the above referred Subscription Voucher / Termination Voucher to M/s. Hindustan Petroleum Corporation Ltd. if found at any time in the future.
              </li>

              <li>
                That I shall be liable to M/s. Hindustan Petroleum Corporation Ltd. for any loss or expense incurred by them if any one produces the above referred Subscription Voucher / Termination Voucher to claim any amount from the Corporation.
              </li>
            </ol>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span className={isFilled(formData?.place) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.place || "..........................."}
                </span>{" "}
                on this{" "}
                <span className={isFilled(formData?.day) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {getDayWithSuffix(formData?.day) || "..."}
                </span>{" "}
                day of{" "}
                <span className={isFilled(formData?.month) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.month || "..."}
                </span>,{" "}
                <span className={isFilled(formData?.year) ? "font-bold form-data" : "bg-yellow-200 px-1 font-bold form-data"}>
                  {formData?.year || "..."}
                </span>{" "}
                that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponent)</p>
              <p className="mt-1 font-bold form-data">
                {formData?.fullName || "..........................."}
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

export default GasPreview;