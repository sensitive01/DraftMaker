import React, { useEffect, useState } from "react";
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

const PassportNameChangePreview = () => {
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    try {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    } catch (e) {
      return "xx/xx/xxxx";
    }
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
    if (!formData.gender) return "D/o, S/o, H/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
      "H/O": "H/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
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
                text: "[To be printed on a stamp paper of appropriate value as per State stamp duty laws]",
                alignment: AlignmentType.CENTER,
                spacing: { after: 500 },
                italics: true,
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("I, "),
                  new TextRun({
                    text: formData.name || "Mr/Mrs/Ms ………………………….",
                    bold: true,
                  }),
                  new TextRun(", "),
                  new TextRun(formatRelationship()),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: formData.age || "……",
                    bold: true,
                  }),
                  new TextRun(" Years,"),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Permanent Address: "),
                  new TextRun({
                    text: formatPermanentAddress(),
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("Present Address: "),
                  new TextRun({
                    text: formatPresentAddress(),
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("My Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaarNo || "0000 0000 0000",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("My Passport No: "),
                  new TextRun({
                    text: formData.passportNo || "0000",
                    bold: true,
                  }),
                ],
              }),

              // Numbered list
              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun(
                    "1. That as per My Aadhaar card my given name is "
                  ),
                  new TextRun({
                    text: formData.currentGivenName || "NAME",
                    bold: true,
                  }),
                  new TextRun(" and in my Expired Passport, my given name is "),
                  new TextRun({
                    text: formData.currentGivenName || "NAME",
                    bold: true,
                  }),
                  new TextRun(", surname is "),
                  new TextRun({
                    text: formData.currentSurname || "NAME",
                    bold: true,
                  }),
                  new TextRun("."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun("2. That I wanted to change my given name as "),
                  new TextRun({
                    text: formData.newGivenName || "NAME",
                    bold: true,
                  }),
                  new TextRun(" and surname as "),
                  new TextRun({
                    text: formData.newSurname || "NAME",
                    bold: true,
                  }),
                  new TextRun(" from given name "),
                  new TextRun({
                    text: formData.currentGivenName || "NAME",
                    bold: true,
                  }),
                  new TextRun(" and surname "),
                  new TextRun({
                    text: formData.currentSurname || "NAME",
                    bold: true,
                  }),
                  new TextRun(", for getting reissue of PASSPORT."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 300 },
                children: [
                  new TextRun(
                    "3. That I also required this affidavit for Publishing News Paper Advertisement for The Name Change."
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun(
                    "I hereby state that whatever is stated herein above is true to the best of my knowledge."
                  ),
                ],
              }),

              new Paragraph({
                spacing: { before: 800, after: 100 },
                children: [
                  new TextRun("Solemnly affirmed at "),
                  new TextRun({
                    text: formData.place || "Bangalore",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                spacing: { before: 100, after: 500 },
                children: [
                  new TextRun("Date: "),
                  new TextRun({
                    text: formatDate(formData.date),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                spacing: { before: 500, after: 100 },
                text: "(Signature of the Applicant)",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: "Deponent",
                alignment: AlignmentType.RIGHT,
                bold: true,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Passport_Name_Change_Affidavit_${
        formData.name ? formData.name.replace(/\s+/g, "_") : "Document"
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
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md flex items-center"
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

      {/* Document preview */}
      <div className="bg-white border border-gray-300 w-full max-w-3xl p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 underline">
            {formData.documentType}
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            I,{" "}
            <span className="font-bold">
              {formData.name || "Mr/Mrs/Ms …………………………."}
            </span>
            , {formatRelationship()}, Aged:{" "}
            <span className="font-bold">{formData.age || "……"}</span> Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold">{formatPermanentAddress()}</span>
          </p>

          <p>
            Present Address:{" "}
            <span className="font-bold">{formatPresentAddress()}</span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaarNo || "0000 0000 0000"}
            </span>
          </p>

          <p>
            My Passport No:{" "}
            <span className="font-bold">{formData.passportNo || "0000"}</span>
          </p>

          <ol className="list-decimal pl-5 space-y-4">
            <li className="text-justify">
              That as per My Aadhaar card my given name is{" "}
              <span className="font-bold">
                {formData.currentGivenName || "NAME"}
              </span>{" "}
              and in my Expired Passport, my given name is{" "}
              <span className="font-bold">
                {formData.currentGivenName || "NAME"}
              </span>
              , surname is{" "}
              <span className="font-bold">
                {formData.currentSurname || "NAME"}
              </span>
              .
            </li>
            <li className="text-justify">
              That I wanted to change my given name as{" "}
              <span className="font-bold">
                {formData.newGivenName || "NAME"}
              </span>{" "}
              and surname as{" "}
              <span className="font-bold">{formData.newSurname || "NAME"}</span>{" "}
              from given name{" "}
              <span className="font-bold">
                {formData.currentGivenName || "NAME"}
              </span>{" "}
              and surname{" "}
              <span className="font-bold">
                {formData.currentSurname || "NAME"}
              </span>
              , for getting reissue of PASSPORT.
            </li>
            <li className="text-justify">
              That I also required this affidavit for Publishing News Paper
              Advertisement for The Name Change.
            </li>
          </ol>

          <p className="mt-6 text-justify">
            I hereby state that whatever is stated herein above is true to the
            best of my knowledge.
          </p>

       
          <div className="flex justify-between mt-16 pt-16">
            {/* Left Side: Place and Date */}
            <div className="text-left">
              <p className="mb-6">
                Solemnly affirmed at{" "}
                <span className="font-bold">
                  {" "}
                  {formData.place || "Bangalore"}
                </span>
              </p>
              <p className="mb-8">
                Date: <span className="font-bold">{formatDate(formData.date)}</span>
              </p>
            </div>

            {/* Right Side: Signature and Deponent */}
            <div className="text-right">
              <div className="mt-12 border-t border-black pt-2 w-48 text-center ml-auto">
                <p>(Signature of the Applicant)</p>
                <p className="font-bold">Deponent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportNameChangePreview;
