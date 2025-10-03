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

const KhPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");
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

  // PDF Download Function
  const downloadPDF = () => {
    setDownloadLoading(true);
    setDownloadType("pdf");

    const element = documentRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `Khatha_Affidavit_${
        formData.name1 && formData.name2
          ? `${formData.name1}_${formData.name2}`.replace(/\s+/g, "_")
          : "Document"
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
      // Create structured content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 10px;">
            ${formData.documentType || "AFFIDAVIT"}
          </div>
           ${
             formData.firstParty
               ? `
      <div style="margin-bottom: 20px; line-height: 1.6;">
        <p style="margin-bottom: 8px;">
          <span style="font-size: 12pt;">First Party (Stamp Duty): </span>
          <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
            ${formData.firstParty}
          </strong>
        </p>
        <p style="font-size: 10pt; font-style: italic; margin-bottom: 16px;">
          (Responsible for payment of stamp duty charges as per applicable state regulations)
        </p>
        <p style="margin-bottom: 16px;">
          <span style="font-size: 12pt;">Second Party: </span>
          <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
            ${formData.secondParty}
          </strong>
        </p>
      </div>
    `
               : ""
           }

          <div style="text-align: center; font-style: italic; font-size: 10pt; margin-bottom: 40px;">
            [To be printed on a stamp paper of appropriate value as per State stamp duty laws]
          </div>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 1. 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.name1 || "________________________"}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.relation1 || "D/o, S/o, H/o, W/o ________________"}
            </strong>, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.age1 || "____"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            Permanent Address: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData.address1 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"
              }
            </strong>
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6;">
            Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.aadhaar1 || "0000 0000 0000"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            2. 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.name2 || "________________________"}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.relation2 || "D/o, S/o, H/o, W/o ________________"}
            </strong>, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.age2 || "____"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            Permanent Address: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData.address2 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"
              }
            </strong>
          </p>

          <p style="margin-bottom: 40px; line-height: 1.6;">
            Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.aadhaar2 || "0000 0000 0000"}
            </strong>
          </p>

          <p style="text-align: center; font-weight: bold; margin: 20px 0 30px 0;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6;">
            Are applying for the joint Khatha transfer for property, which is situated at 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData.propertyAddress ||
                "................................................."
              }
            </strong> 
            in the ward number 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.wardNumber || "XXX"}
            </strong> 
            and zone 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.zone || "XXX"}
            </strong> 
            of 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.authority || "BBMP"}
            </strong>, 
            Khata No is 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.khataNo || "XXXX"}
            </strong>, 
            SAS Base Application number is 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.sasNumber || "XXXXX"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            We all are the joint applicants for Khatha transfer, and we authorize
          </p>

          <p style="text-align: center; margin: 16px 0; font-weight: bold;">
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData.authorizedPerson || "NAME"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; line-height: 1.6;">
            for e-signing the application for Khata transfer on our behalf.
          </p>

          <p style="margin-bottom: 30px; line-height: 1.6;">
            We swear that the above mentioned is true to the best of our knowledge and belief.
          </p>

          <div style="margin-top: 50px; margin-bottom: 40px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.place || "PLACE"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(formData?.day) || "XX"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.month || "XXXX"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.year || "XXXX"}
              </strong> 
              that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
            </p>
          </div>

          <div style="margin-top: 80px; text-align: right;">
            <p>(Signature of the Deponents)</p>
            <p style="margin-top: 8px;">
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.name1 || "___________________"}
              </strong>
            </p>
            <p style="margin-top: 4px;">
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.name2 || "___________________"}
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
          <title>Khatha Affidavit</title>
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
        type: "application/msword",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Khatha_Affidavit_${
        formData.name1 && formData.name2
          ? `${formData.name1}_${formData.name2}`.replace(/\s+/g, "_")
          : "Document"
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

      {/* Simple legal document preview */}
      <div
        ref={documentRef}
        className="bg-white border border-gray-300 w-full max-w-3xl p-8 font-serif"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {formData.documentType || "AFFIDAVIT"}
          </h1>
          <p className="text-sm italic">
            [To be printed on a stamp paper of appropriate value as per State
            stamp duty laws]
          </p>
        </div>
        {formData.firstParty && (
          <>
            <div className="mb-5 text-justify leading-relaxed">
              <span className="font-lg">
                First Party (Stamp Duty):{" "}
                <span className="font-bold">{formData.firstParty}</span>
              </span>

              <br />
              <span className="text-sm italic">
                (Responsible for payment of stamp duty charges as per applicable
                state regulations)
              </span>
            </div>
            <div className="mb-5 text-justify leading-relaxed">
              <span className="font-lg">
                Second Party :{" "}
                <span className="font-bold">{formData.secondParty}</span>
              </span>
            </div>
          </>
        )}

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          {/* First Applicant */}
          <p>
            I, 1.{" "}
            <span className="font-bold form-data">
              {formData.name1 || "________________________"}
            </span>{" "}
            <span className="form-data">
              {formData.relation1 || "D/o, S/o, H/o, W/o ________________"}
            </span>
            , Aged:{" "}
            <span className="font-bold form-data">
              {formData.age1 || "____"}
            </span>{" "}
            Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold form-data">
              {formData.address1 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p>
            Aadhaar No:{" "}
            <span className="font-bold form-data">
              {formData.aadhaar1 || "0000 0000 0000"}
            </span>
          </p>

          {/* Second Applicant */}
          <p>
            2.{" "}
            <span className="font-bold form-data">
              {formData.name2 || "________________________"}
            </span>{" "}
            <span className="form-data">
              {formData.relation2 || "D/o, S/o, H/o, W/o ________________"}
            </span>
            , Aged:{" "}
            <span className="font-bold form-data">
              {formData.age2 || "____"}
            </span>{" "}
            Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold form-data">
              {formData.address2 ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"}
            </span>
          </p>

          <p>
            Aadhaar No:{" "}
            <span className="font-bold form-data">
              {formData.aadhaar2 || "0000 0000 0000"}
            </span>
          </p>

          <p className="text-center font-bold mt-6 mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <p>
            Are applying for the joint Khatha transfer for property, which is
            situated at{" "}
            <span className="font-bold form-data">
              {formData.propertyAddress ||
                "................................................."}
            </span>{" "}
            in the ward number{" "}
            <span className="font-bold form-data">
              {formData.wardNumber || "XXX"}
            </span>{" "}
            and zone{" "}
            <span className="font-bold form-data">
              {formData.zone || "XXX"}
            </span>{" "}
            of{" "}
            <span className="font-bold form-data">
              {formData.authority || "BBMP"}
            </span>
            , Khata No is{" "}
            <span className="font-bold form-data">
              {formData.khataNo || "XXXX"}
            </span>
            , SAS Base Application number is{" "}
            <span className="font-bold form-data">
              {formData.sasNumber || "XXXXX"}
            </span>
          </p>

          <p className="mt-6">
            We all are the joint applicants for Khatha transfer, and we
            authorize
          </p>

          <p className="text-center font-bold form-data my-2">
            {formData.authorizedPerson || "NAME"}
          </p>

          <p>for e-signing the application for Khata transfer on our behalf.</p>

          <p className="mt-4">
            We swear that the above mentioned is true to the best of our
            knowledge and belief.
          </p>

          <p className="mt-8">
            Verified at{" "}
            <span className="font-bold form-data">
              {formData.place || "PLACE"}
            </span>{" "}
            on this{" "}
            <span className="font-bold form-data">
              {getDayWithSuffix(formData.day) || "XX"}
            </span>
            {""}{" "}
            <span className="font-bold form-data">
              {formData.month || "XXXX"}
            </span>
            ,{" "}
            <span className="font-bold form-data">
              {formData.year || "XXXX"}
            </span>{" "}
            that the contents of the above said affidavit are true and correct
            to the best of my knowledge and belief.
          </p>

          {/* Signature Block */}
          <div className="text-right mt-16">
            <p>Signature of the Deponents</p>
            <p className="mt-2 font-bold form-data">
              {formData.name1 || "___________________"}
            </p>
            <p className="font-bold form-data">
              {formData.name2 || "___________________"}
            </p>
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

export default KhPreview;
