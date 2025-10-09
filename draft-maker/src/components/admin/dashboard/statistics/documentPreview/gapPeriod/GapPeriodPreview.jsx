import { useEffect, useState, useRef } from "react";
import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import { getDayWithSuffix } from "../../../../../../utils/dateFormat";
import html2pdf from "html2pdf.js";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { useParams } from "react-router-dom";

const EnhancedGapPeriodPreview = () => {
  const { bookingId } = useParams();
  const [data, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");
  const [error, setError] = useState(null);
  const documentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading data");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      return dateString;
    }
  };

  // Helper function to check if a field has content
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
      filename: `Gap_Period_Affidavit_${
        data.name ? data.name.replace(/\s+/g, "_") : "User"
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
          <div style="text-align: center; font-weight: bold; font-size: 18pt; margin-bottom: 30px;">
            ${data.documentType || "GAP PERIOD AFFIDAVIT"}
          </div>
    ${
      data.firstParty && data.secondParty
        ? `
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt;">
  <tbody>
    <tr style="background-color: #f3f4f6;">
      <td style="border: 1px solid #9ca3af; padding: 8px; font-weight: bold; width: 33%;">
        First Party
      </td>
      <td style="border: 1px solid #9ca3af; padding: 8px;">
        ${data.firstParty}
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #9ca3af; padding: 8px; font-weight: bold;">
        Second Party
      </td>
      <td style="border: 1px solid #9ca3af; padding: 8px;">
        ${data.secondParty}
      </td>
    </tr>
    <tr style="background-color: #f3f4f6;">
      <td style="border: 1px solid #9ca3af; padding: 8px; font-weight: bold;">
        Stamp Duty Paid By
      </td>
      <td style="border: 1px solid #9ca3af; padding: 8px;">
        ${
          data.stampDutyPayer === "First Party"
            ? data.firstParty
            : data.stampDutyPayer === "Second Party"
            ? data.secondParty
            : "Not Selected"
        }
      </td>
    </tr>
  </tbody>
</table>
`
        : ""
    }

          <p style="margin-bottom: 16px; line-height: 1.6;">
            I, 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${data?.name || "Mr/Mrs/Ms ..........................."}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${data?.relation || "D/o, S/o, H/o, W/o"}
            </strong> 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${data?.relationName || "..................."}
            </strong>, 
            Aged: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${data?.age || "......"}
            </strong> 
            Years,
          </p>

          <p style="margin-bottom: 16px;">
            Permanent Address 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${
                data?.address ||
                "Address Line 1, Address Line 2, City, State, Pin Code"
              }
            </strong>
          </p>

          <p style="margin-bottom: 16px;">
            My Aadhaar No: 
            <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
              ${data?.aadhaarNo || "0000 0000 0000"}
            </strong>
          </p>

          <p style="margin-bottom: 16px; font-weight: bold;">
            Do hereby solemnly affirm and state as follows;
          </p>

          <div style="padding-left: 24px; margin-bottom: 32px;">
            <ol style="counter-reset: item; padding-left: 0;">
              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That, I am the deponent of the affidavit.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That there is Gap Period as follows
              </li>
            </ol>
          </div>

          <div style="margin: 24px 0; padding-left: 32px;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #666;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="border: 1px solid #666; padding: 12px; width: 16.67%; text-align: left; font-weight: 600;">
                    No. of Gap Periods
                  </th>
                  <th style="border: 1px solid #666; padding: 12px; width: 25%; text-align: left; font-weight: 600;">
                    From
                  </th>
                  <th style="border: 1px solid #666; padding: 12px; width: 25%; text-align: left; font-weight: 600;">
                    To
                  </th>
                  <th style="border: 1px solid #666; padding: 12px; width: 33.33%; text-align: left; font-weight: 600;">
                    Reasons For Gap
                  </th>
                </tr>
              </thead>
              <tbody>
                ${
                  data.gapPeriods && data.gapPeriods.length > 0
                    ? data.gapPeriods
                        .map(
                          (period, index) => `
                    <tr>
                      <td style="border: 1px solid #666; padding: 12px; text-align: center;">
                        ${index + 1}
                      </td>
                      <td style="border: 1px solid #666; padding: 12px;">
                        <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                          ${period.from ? formatDate(period.from) : "________"}
                        </strong>
                      </td>
                      <td style="border: 1px solid #666; padding: 12px;">
                        <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                          ${period.to ? formatDate(period.to) : "________"}
                        </strong>
                      </td>
                      <td style="border: 1px solid #666; padding: 12px;">
                        <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                          ${period.reason || "________"}
                        </strong>
                      </td>
                    </tr>
                  `
                        )
                        .join("")
                    : `<tr>
                    <td colspan="4" style="border: 1px solid #666; padding: 12px; text-align: center; color: #666;">
                      No gap periods recorded
                    </td>
                  </tr>`
                }
              </tbody>
            </table>
          </div>

          <div style="padding-left: 24px; margin-bottom: 32px;">
            <ol style="counter-reset: item; counter-increment: item 2; padding-left: 0;">
              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That, this affidavit is required to be produced before the concerned authority of 
                <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                  ${data?.authority || "XXXXXX"}
                </strong> 
                for necessary purpose.
              </li>

              <li style="margin-bottom: 16px; counter-increment: item; display: block; padding-left: 1.5em; line-height: 1.6;">
                That, the facts stated above to the best of my knowledge and belief.
              </li>
            </ol>
          </div>

          <p style="margin-top: 24px; margin-bottom: 16px; line-height: 1.6;">
            I hereby state that whatever is stated herein above are true to the best of my knowledge.
          </p>

          <div style="margin-top: 48px;">
            <p style="line-height: 1.6;">
              Verified at 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${data?.place || "PLACE"}
              </strong> 
              on this 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${getDayWithSuffix(data?.day) || "XX"}
              </strong> 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${data?.month || "XXXX"}
              </strong>, 
              <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
                ${data?.year || "XXXX"}
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
          <title>Gap Period Affidavit</title>
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
      link.download = `Gap_Period_Affidavit_${
        data.name ? data.name.replace(/\s+/g, "_") : "User"
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

  if (isLoading) {
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

          {/* Page 1 Content */}
          <div className="mb-12">
            <h1 className="text-center font-bold text-xl mb-6">
              {data.documentType || "GAP PERIOD AFFIDAVIT"}
            </h1>

            {data.firstParty && data.secondParty && (
              <div className="mb-6 relative z-10">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        First Party
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {data.firstParty}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        Second Party
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {data.secondParty}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                        Stamp Duty Paid By
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {data.stampDutyPayer === "First Party"
                          ? data.firstParty
                          : data.stampDutyPayer === "Second Party"
                          ? data.secondParty
                          : "Not Selected"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <p className="mb-4">
              I,{" "}
              <span
                className={
                  isFilled(data?.name)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.name || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                className={
                  isFilled(data?.relation)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                className={
                  isFilled(data?.relationName)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                className={
                  isFilled(data?.age?.toString())
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span
                className={
                  isFilled(data?.address)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.address ||
                  "Address Line 1, Address Line 2, City, State, Pin Code"}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span
                className={
                  isFilled(data?.aadhaarNo)
                    ? "form-data"
                    : "bg-yellow-200 px-1 form-data"
                }
              >
                {data?.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4 font-bold">
              Do hereby solemnly affirm and state as follows;
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
                That, I am the deponent of the affidavit.
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {2}.
                </span>{" "}
                That there is Gap Period as follows
              </li>
            </ol>

            {/* Gap periods table */}
            <div className="my-6 pl-8">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-4 py-2 w-1/6 text-left font-medium">
                      No. of Gap Periods
                    </th>
                    <th className="border border-gray-400 px-4 py-2 w-1/4 text-left font-medium">
                      From
                    </th>
                    <th className="border border-gray-400 px-4 py-2 w-1/4 text-left font-medium">
                      To
                    </th>
                    <th className="border border-gray-400 px-4 py-2 w-2/5 text-left font-medium">
                      Reasons For Gap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.gapPeriods && data.gapPeriods.length > 0 ? (
                    data.gapPeriods.map((period, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span
                            className={
                              isFilled(period.from)
                                ? "form-data"
                                : "bg-yellow-200 px-1 form-data"
                            }
                          >
                            {period.from ? formatDate(period.from) : "________"}
                          </span>
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span
                            className={
                              isFilled(period.to)
                                ? "form-data"
                                : "bg-yellow-200 px-1 form-data"
                            }
                          >
                            {period.to ? formatDate(period.to) : "________"}
                          </span>
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span
                            className={
                              isFilled(period.reason)
                                ? "form-data"
                                : "bg-yellow-200 px-1 form-data"
                            }
                          >
                            {period.reason || "________"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="border border-gray-400 px-4 py-3 text-center text-gray-500"
                      >
                        No gap periods recorded
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <ol
              className="list-decimal space-y-6"
              style={{ counterReset: "item", counterIncrement: "item 2" }}
            >
              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {3}.
                </span>{" "}
                That, this affidavit is required to be produced before the
                concerned authority of{" "}
                <span
                  className={
                    isFilled(data?.authority)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {data?.authority || "XXXXXX"}
                </span>{" "}
                for necessary purpose.
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {4}.
                </span>{" "}
                That, the facts stated above to the best of my knowledge and
                belief.
              </li>
            </ol>

            <p className="mt-6 mb-4">
              I hereby state that whatever is stated herein above are true to
              the best of my knowledge.
            </p>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span
                  className={
                    isFilled(data?.place)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {data?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(data?.day)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {getDayWithSuffix(data?.day) || "XX"}
                </span>{" "}
                <span
                  className={
                    isFilled(data?.month)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {data?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(data?.year)
                      ? "form-data"
                      : "bg-yellow-200 px-1 form-data"
                  }
                >
                  {data?.year || "XXXX"}
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

export default EnhancedGapPeriodPreview;
