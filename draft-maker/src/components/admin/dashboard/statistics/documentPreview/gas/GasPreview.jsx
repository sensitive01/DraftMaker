import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const GasPreview = () => {
  const pdfTemplateRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
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
    // Check if value exists and is a string with content
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

  // Generate Word document
  const generateWordDocument = async () => {
    setLoading(true);

    try {
      // Create a new document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: `${formData.documentType}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`I, `),
                  new TextRun({
                    text: formData?.fullName || "...........................",
                    bold: true,
                  }),
                  new TextRun(` ${formData?.relation || "..."}, `),
                  new TextRun({
                    text: formData?.fatherName || "...........................",
                    bold: true,
                  }),
                  new TextRun(` Aged: `),
                  new TextRun({
                    text: formData?.age?.toString() || "......",
                    bold: true,
                  }),
                  new TextRun(` Years,`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`Permanent Address `),
                  new TextRun({
                    text: formData?.permanentAddress || "...........................",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun(`My Aadhaar No: `),
                  new TextRun({
                    text: formData?.aadhaarNo || "...........................",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Do hereby solemnly affirm and declare as under:`,
                    bold: true,
                  }),
                ],
              }),

              // Numbered list items
              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That I am / was a consumer of `),
                  new TextRun({
                    text: formData?.gasCompanyName || "...........................",
                    bold: true,
                  }),
                  new TextRun(` for domestic use at the following address `),
                  new TextRun({
                    text: formData?.serviceAddress || "...........................",
                    bold: true,
                  }),
                  new TextRun(` since `),
                  new TextRun({
                    text: formatDate(formData?.connectionDate),
                    bold: true,
                  }),
                  new TextRun(` My consumer number is / was `),
                  new TextRun({
                    text: formData?.consumerNumber || "...........................",
                    bold: true,
                  }),
                  new TextRun(` I was issued with Subscription Voucher No `),
                  new TextRun({
                    text: formData?.subscriptionVoucher || "...........................",
                    bold: true,
                  }),
                  new TextRun(` by M/s `),
                  new TextRun({
                    text: formData?.gasCompanyName || "...........................",
                    bold: true,
                  }),
                  new TextRun(` towards `),
                  new TextRun({
                    text: formData?.cylinderCount?.toString() || "...",
                    bold: true,
                  }),
                  new TextRun(` Gas cylinder and `),
                  new TextRun({
                    text: formData?.regulatorCount?.toString() || "...",
                    bold: true,
                  }),
                  new TextRun(` regulator on loan for my use against the refundable deposit of Rs `),
                  new TextRun({
                    text: formData?.depositAmount?.toString() || "...",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(`That I was given the gas cylinder and a regulator when I was residing in `),
                  new TextRun({
                    text: formData?.previousAddress || "...........................",
                    bold: true,
                  }),
                  new TextRun(` Thereafter, I shifted to my above mentioned residence.`),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    formData?.reason === "shifting"
                      ? `That I want to return the Subscription Voucher along with the cylinder(s) and regulator as I am shifting my residence from this town and want to terminate the agreement with the above mentioned Corporation.`
                      : `That I want to terminate the agreement with the above mentioned distributor.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                children: [
                  new TextRun(
                    formData?.lostItem === "subscription"
                      ? `That I am not able to produce the Subscription Voucher along with the cylinder and regulator to obtain the refundable deposit as it is misplaced / lost.`
                      : `That I am not able to produce the Termination Voucher as it misplaced / lost.`
                  ),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I have not assigned or transferred the Subscription Voucher / Termination Voucher to any person whomsoever.`,
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I undertake to return forthwith the above referred Subscription Voucher / Termination Voucher to M/s. Hindustan Petroleum Corporation Ltd. if found at any time in the future.`,
              }),

              new Paragraph({
                spacing: { after: 200 },
                numbering: { reference: "my-numbering", level: 0 },
                text: `That I shall be liable to M/s. Hindustan Petroleum Corporation Ltd. for any loss or expense incurred by them if any one produces the above referred Subscription Voucher / Termination Voucher to claim any amount from the Corporation.`,
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun(`Verified at `),
                  new TextRun({
                    text: formData?.place || "...........................",
                    bold: true,
                  }),
                  new TextRun(` on this `),
                  new TextRun({
                    text: formData?.day || "...",
                    bold: true,
                  }),
                  new TextRun(` day of `),
                  new TextRun({
                    text: formData?.month || "...",
                    bold: true,
                  }),
                  new TextRun(`, `),
                  new TextRun({
                    text: formData?.year || "...",
                    bold: true,
                  }),
                  new TextRun(` that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.`),
                ],
              }),

              new Paragraph({
                spacing: { before: 500 },
                text: "(Signature of the Deponent)",
                alignment: AlignmentType.RIGHT,
              }),
              
              new Paragraph({
                text: formData?.fullName || "...........................",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
        numbering: {
          config: [
            {
              reference: "my-numbering",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: AlignmentType.START,
                  style: {
                    paragraph: {
                      indent: { left: 720, hanging: 260 },
                    },
                  },
                },
              ],
            },
          ],
        },
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Gas_Affidavit_${
        formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "User"
      }.docx`;
      saveAs(buffer, fileName);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
    } finally {
      setLoading(false);
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
      {/* Download button */}
      <div className="w-full max-w-2xl mb-4 flex justify-end">
        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          {loading ? (
            <span>Generating...</span>
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
              Download
            </>
          )}
        </button>
      </div>

      {/* Single page preview with continuous content */}
      <div className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl">
        <div className="relative p-8">
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
              <span className={isFilled(formData?.fullName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.fullName || "..........................."}
              </span>{" "}
              <span className={isFilled(formData?.relation) ? "" : "bg-yellow-200 px-1"}>
                {formData?.relation || "..."}
              </span>,
              <span className={isFilled(formData?.fatherName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.fatherName || "..........................."}
              </span>{" "}
              Aged:{" "}
              <span className={isFilled(formData?.age?.toString()) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.age || "..."}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span className={isFilled(formData?.permanentAddress) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.permanentAddress || "..........................."}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span className={isFilled(formData?.aadhaarNo) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                {formData?.aadhaarNo || "..........................."}
              </span>
            </p>

            <p className="mb-4 font-bold">Do hereby solemnly affirm and declare as under:</p>

            <ol className="list-decimal pl-6 space-y-4">
              <li>
                That I am / was a consumer of{" "}
                <span className={isFilled(formData?.gasCompanyName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.gasCompanyName || "..........................."}
                </span>{" "}
                for domestic use at the following address{" "}
                <span className={isFilled(formData?.serviceAddress) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.serviceAddress || "..........................."}
                </span>{" "}
                since{" "}
                <span className={isFilled(formData?.connectionDate) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formatDate(formData?.connectionDate)}
                </span>
                <p className="mt-2">
                  My consumer number is / was{" "}
                  <span className={isFilled(formData?.consumerNumber) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.consumerNumber || "..........................."}
                  </span>{" "}
                  I was issued with Subscription Voucher No{" "}
                  <span className={isFilled(formData?.subscriptionVoucher) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.subscriptionVoucher || "..........................."}
                  </span>{" "}
                  by M/s{" "}
                  <span className={isFilled(formData?.gasCompanyName) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.gasCompanyName || "..........................."}
                  </span>{" "}
                  towards{" "}
                  <span className={isFilled(formData?.cylinderCount?.toString()) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.cylinderCount || "..."}
                  </span>{" "}
                  Gas cylinder and{" "}
                  <span className={isFilled(formData?.regulatorCount?.toString()) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.regulatorCount || "..."}
                  </span>{" "}
                  regulator on loan for my use against the refundable deposit of Rs{" "}
                  <span className={isFilled(formData?.depositAmount?.toString()) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                    {formData?.depositAmount || "..."}
                  </span>
                </p>
              </li>

              <li>
                That I was given the gas cylinder and a regulator when I was residing in{" "}
                <span className={isFilled(formData?.previousAddress) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
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
                <span className={isFilled(formData?.place) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.place || "..........................."}
                </span>{" "}
                on this{" "}
                <span className={isFilled(formData?.day) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.day || "..."}
                </span>{" "}
                day of{" "}
                <span className={isFilled(formData?.month) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.month || "..."}
                </span>,{" "}
                <span className={isFilled(formData?.year) ? "font-bold" : "bg-yellow-200 px-1 font-bold"}>
                  {formData?.year || "..."}
                </span>{" "}
                that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right">
              <p>(Signature of the Deponent)</p>
              <p className="mt-1">
                {formData?.fullName || "..........................."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasPreview;