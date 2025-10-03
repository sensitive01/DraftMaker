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

const BirthCertificateParentNameCorrection = () => {
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
      filename: `Birth_Certificate_Correction_${
        formData.childName
          ? formData.childName.replace(/\s+/g, "_")
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

  // Generate Word document using HTML-to-Word approach
  const generateWordDocument = async () => {
    setDownloadLoading(true);
    setDownloadType("word");

    try {
      // Create structured HTML content for Word document
      const generateWordContent = () => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px; text-decoration: underline;">
            ${
              formData.documentType ||
              "BIRTH CERTIFICATE PARENT NAME CORRECTION"
            }
          </div>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6;">
            We, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.fatherTitle || "Mr."} ${
          formData?.fatherName || "___________________"
        }
            </strong> 
            H/O 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.motherTitle || "Mrs."} ${
          formData?.motherName || "___________________"
        }
            </strong>, 
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                formData?.address ||
                "[Address Line 1, Address Line 2, City, State, Pin Code]"
              }
            </strong>
          </p>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6;">
            Our Aadhaar No: Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.fatherAadhaar || "0000 0000 0000"}
            </strong>, 
            Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${formData?.motherAadhaar || "0000 0000 0000"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; text-align: justify; line-height: 1.6; font-weight: bold;">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol style="padding-left: 32px; counter-reset: item; margin-bottom: 32px;">
            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That Birth Certificate SL No: 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.certificateNumber || "______"}
              </strong> 
              issued for our 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.childRelation || "child"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.childName || "NAME"}
              </strong> 
              from (Chief Register of Births and Deaths, Govt of Karnataka), the name of parents issued Father name as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.incorrectFatherName || "Incorrect Name"}
              </strong> 
              and Mother name as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.incorrectMotherName || "Incorrect Name"}
              </strong>.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That as per our Aadhaar card the given name of Father is 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.correctFatherName || "Correct Name"}
              </strong> 
              AND Mother as 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.correctMotherName || "Correct Name"}
              </strong>.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              We state that name in our Aadhaar card's and name in our 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.childRelation || "child"}
              </strong> 
              Birth Certificate is the name of one and the same persons and that is our self's.
            </li>

            <li style="margin-bottom: 16px; text-align: justify; line-height: 1.6; counter-increment: item; display: block;">
              That we also required this affidavit for RE ISSUE the Birth Certificate with parent's name as per Aadhaar card.
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

          <div style="margin-top: 96px; text-align: right;">
            <p>(Signature of the Deponents)</p>
            <p style="margin-top: 4px;">
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.fatherName || "___________________"}
              </strong>     
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${formData?.motherName || "___________________"}
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
          <title>Birth Certificate Parent Name Correction</title>
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
      link.download = `Birth_Certificate_Correction_${
        formData.childName
          ? formData.childName.replace(/\s+/g, "_")
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
              {formData.documentType}
            </h1>
            {formData.firstParty && (
              <>
                <div className="mb-5 text-justify leading-relaxed">
                  <span className="font-lg">
                    First Party (Stamp Duty):{" "}
                    <span className="font-bold">{formData.firstParty}</span>
                  </span>

                  <br />
                  <span className="text-sm italic">
                    (Responsible for payment of stamp duty charges as per
                    applicable state regulations)
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

            <p className="mb-4 text-justify">
              We,{" "}
              <span
                className={
                  isFilled(formData?.fatherTitle)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.fatherTitle || "Mr."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.fatherName)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.fatherName || "___________________"}
              </span>{" "}
              H/O{" "}
              <span
                className={
                  isFilled(formData?.motherTitle)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.motherTitle || "Mrs."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.motherName)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.motherName || "___________________"}
              </span>
              , Permanent Address{" "}
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
              Our Aadhaar No: Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.fatherAadhaar)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.fatherAadhaar || "0000 0000 0000"}
              </span>
              , Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.motherAadhaar)
                    ? "font-bold form-data"
                    : "bg-yellow-200 px-1 font-bold form-data"
                }
              >
                {formData?.motherAadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 text-justify font-bold">
              Do hereby solemnly affirm and declare as under:
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-justify">
                That Birth Certificate SL No:{" "}
                <span
                  className={
                    isFilled(formData?.certificateNumber)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.certificateNumber || "______"}
                </span>{" "}
                issued for our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>{" "}
                <span
                  className={
                    isFilled(formData?.childName)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.childName || "NAME"}
                </span>{" "}
                from (Chief Register of Births and Deaths, Govt of Karnataka),
                the name of parents issued Father name as{" "}
                <span
                  className={
                    isFilled(formData?.incorrectFatherName)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.incorrectFatherName || "Incorrect Name"}
                </span>{" "}
                and Mother name as{" "}
                <span
                  className={
                    isFilled(formData?.incorrectMotherName)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.incorrectMotherName || "Incorrect Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                That as per our Aadhaar card the given name of Father is{" "}
                <span
                  className={
                    isFilled(formData?.correctFatherName)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.correctFatherName || "Correct Name"}
                </span>{" "}
                AND Mother as{" "}
                <span
                  className={
                    isFilled(formData?.correctMotherName)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.correctMotherName || "Correct Name"}
                </span>
                .
              </li>

              <li className="text-justify">
                We state that name in our Aadhaar card's and name in our{" "}
                <span
                  className={
                    isFilled(formData?.childRelation)
                      ? "font-bold form-data"
                      : "bg-yellow-200 px-1 font-bold form-data"
                  }
                >
                  {formData?.childRelation || "child"}
                </span>{" "}
                Birth Certificate is the name of one and the same persons and
                that is our self's.
              </li>

              <li className="text-justify">
                That we also required this affidavit for RE ISSUE the Birth
                Certificate with parent's name as per Aadhaar card.
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
                  {getDayWithSuffix(formData?.day) || "XX"}
                </span>{" "}
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
              <p>(Signature of the Deponents)</p>
              <p className="mt-1">
                <span className="font-bold form-data">
                  {formData?.fatherName || "___________________"}
                </span>{" "}
                <span className="font-bold form-data">
                  {formData?.motherName || "___________________"}
                </span>
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

export default BirthCertificateParentNameCorrection;
