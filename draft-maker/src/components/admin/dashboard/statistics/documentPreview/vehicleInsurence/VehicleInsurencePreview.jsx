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

const VehicleInsurencePreview = () => {
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

  // Format dates properly
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "";
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
                    text: formData.title || "___",
                  }),
                  new TextRun(" "),
                  new TextRun({
                    text: formData.name || "_______________",
                    bold: true,
                  }),
                  new TextRun(" "),
                  new TextRun(formData.relation || "______"),
                  new TextRun(", Aged: "),
                  new TextRun({
                    text: formData.age || "___",
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
                    text: formData.address || "_________________",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun("My Aadhaar No: "),
                  new TextRun({
                    text: formData.aadhaar || "__ ____ ____",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                text: "Do hereby solemnly affirm and declare as under:",
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 300 },
                bold: true,
              }),

              // Numbered list
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun("1. I am the owner of the Vehicle No- "),
                  new TextRun({
                    text: formData.vehicleNo || "________",
                    bold: true,
                  }),
                  new TextRun(", VEHICLE MODEL: "),
                  new TextRun({
                    text: formData.vehicleModel || "________",
                    bold: true,
                  }),
                  new TextRun(", Engine No- "),
                  new TextRun({
                    text: formData.engineNo || "________",
                    bold: true,
                  }),
                  new TextRun(", Chassis No: "),
                  new TextRun({
                    text: formData.chassisNo || "________",
                    bold: true,
                  }),
                  new TextRun(" Insured with "),
                  new TextRun({
                    text: formData.insurer || "________",
                    bold: true,
                  }),
                  new TextRun(" Under Policy No: "),
                  new TextRun({
                    text: formData.policyNo || "________",
                    bold: true,
                  }),
                  new TextRun(" for the period "),
                  new TextRun({
                    text: formatDate(formData.policyStart) || "________",
                    bold: true,
                  }),
                  new TextRun(" to "),
                  new TextRun({
                    text: formatDate(formData.policyEnd) || "________",
                    bold: true,
                  }),
                  new TextRun("."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun("2. Vehicle was Driven by "),
                  new TextRun({
                    text: formData.driverName || "________",
                    bold: true,
                  }),
                  new TextRun(" and the Vehicle met with an accident as follows:"),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 100, left: 400 },
                children: [
                  new TextRun({
                    text: "DETAILS OF INCIDENT:",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 100, after: 200, left: 400 },
                children: [
                  new TextRun({
                    text: formData.accidentDetails || 
                    "Please provide detailed information about the accident including date, time, location, and circumstances",
                    italics: true,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun("3. The above accident was reported to the Police Station and the respective police acknowledgement has been submitted alongside other claim documents."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun("4. I hereby confirm that no third-party injury / death / property damage is involved in this accident and there will not be any claim from any third party. In the event of any claim from any third party on account of the above accident, it shall be my responsibility to take such claims and the insurer is fully discharged of the liability under the policy by virtue of settlement of my claim for Damage to the Vehicle."),
                ],
              }),

              new Paragraph({
                spacing: { before: 200, after: 300 },
                children: [
                  new TextRun("5. I understand that providing false information in this affidavit may result in rejection of my claim and could have legal consequences under applicable laws."),
                ],
              }),

              new Paragraph({
                spacing: { before: 300, after: 300 },
                children: [
                  new TextRun("I hereby solemnly declare that the above statement is true to the best of my knowledge and belief and that I have not withheld or misrepresented any material facts."),
                ],
              }),

              new Paragraph({
                spacing: { before: 300, after: 500 },
                children: [
                  new TextRun("Verified at "),
                  new TextRun({
                    text: formData.place || "________",
                    bold: true,
                  }),
                  new TextRun(" on this "),
                  new TextRun({
                    text: formData.day || "__",
                    bold: true,
                  }),
                  new TextRun(" day of "),
                  new TextRun({
                    text: formData.month || "________",
                    bold: true,
                  }),
                  new TextRun(", "),
                  new TextRun({
                    text: formData.year || "____",
                    bold: true,
                  }),
                  new TextRun(" that the contents of the above said affidavit are true and correct to the best of my knowledge and belief."),
                ],
              }),

              new Paragraph({
                spacing: { before: 800, after: 100 },
                text: "Signature of Notary Public",
                alignment: AlignmentType.LEFT,
              }),

              new Paragraph({
                spacing: { before: 0, after: 100 },
                text: "With Seal",
                alignment: AlignmentType.LEFT,
              }),

              new Paragraph({
                spacing: { before: 800, after: 100 },
                text: "Signature of the Deponent",
                alignment: AlignmentType.RIGHT,
              }),

              new Paragraph({
                text: formData.title ? formData.title + " " + formData.name : "",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });

      // Generate the document as a blob
      const buffer = await Packer.toBlob(doc);

      // Save the document with a meaningful filename
      const fileName = `Vehicle_Insurance_Affidavit_${formData.name ? formData.name.replace(/\s+/g, "_") : "Document"}.docx`;
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

  // Helper function to check if a field is empty
  const isEmpty = (value) => {
    return !value || value.trim() === "";
  };

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

      {/* Simple legal document preview */}
      <div className="bg-white border border-gray-300 w-full max-w-3xl p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{formData.documentType}</h1>
          <p className="text-sm italic">
            [To be printed on a stamp paper of appropriate value as per State
            stamp duty laws]
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            I, {formData.title || "___"}{" "}
            <span className="font-bold">{formData.name || "_______________"}</span>{" "}
            {formData.relation || "______"}, Aged:{" "}
            <span className="font-bold">{formData.age || "___"}</span> Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-bold">
              {formData.address || "_________________"}
            </span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-bold">
              {formData.aadhaar || "__ ____ ____"}
            </span>
          </p>

          <p className="text-center font-bold mt-6 mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal pl-5 space-y-4">
            <li>
              I am the owner of the Vehicle No-{" "}
              <span className="font-bold">{formData.vehicleNo || "________"}</span>,
              VEHICLE MODEL:{" "}
              <span className="font-bold">{formData.vehicleModel || "________"}</span>,
              Engine No-{" "}
              <span className="font-bold">{formData.engineNo || "________"}</span>,
              Chassis No:{" "}
              <span className="font-bold">{formData.chassisNo || "________"}</span>{" "}
              Insured with{" "}
              <span className="font-bold">{formData.insurer || "________"}</span>{" "}
              Under Policy No:{" "}
              <span className="font-bold">{formData.policyNo || "________"}</span>{" "}
              for the period{" "}
              <span className="font-bold">
                {formatDate(formData.policyStart) || "________"}
              </span>{" "}
              to{" "}
              <span className="font-bold">
                {formatDate(formData.policyEnd) || "________"}
              </span>
              .
            </li>

            <li>
              Vehicle was Driven by{" "}
              <span className="font-bold">{formData.driverName || "________"}</span>{" "}
              and the Vehicle met with an accident as follows:
              <div className="ml-5 mt-2 mb-2 pl-4 border-l-2 border-gray-400">
                <p className="font-bold">DETAILS OF INCIDENT:</p>
                <p className="italic">
                  {formData.accidentDetails ||
                    "Please provide detailed information about the accident including date, time, location, and circumstances"}
                </p>
              </div>
            </li>

            <li>
              The above accident was reported to the Police Station and the
              respective police acknowledgement has been submitted alongside
              other claim documents.
            </li>

            <li>
              I hereby confirm that no third-party injury / death / property
              damage is involved in this accident and there will not be any
              claim from any third party. In the event of any claim from any
              third party on account of the above accident, it shall be my
              responsibility to take such claims and the insurer is fully
              discharged of the liability under the policy by virtue of
              settlement of my claim for Damage to the Vehicle.
            </li>

            <li>
              I understand that providing false information in this affidavit
              may result in rejection of my claim and could have legal
              consequences under applicable laws.
            </li>
          </ol>

          <p className="mt-6">
            I hereby solemnly declare that the above statement is true to the
            best of my knowledge and belief and that I have not withheld or
            misrepresented any material facts.
          </p>

          <p className="mt-6">
            Verified at{" "}
            <span className="font-bold">{formData.place || "________"}</span> on
            this <span className="font-bold">{formData.day || "__"}</span> day of{" "}
            <span className="font-bold">{formData.month || "________"}</span>,{" "}
            <span className="font-bold">{formData.year || "____"}</span> that the
            contents of the above said affidavit are true and correct to the best
            of my knowledge and belief.
          </p>

          {/* Signature Block */}
          <div className="flex justify-between mt-16 pt-16">
            <div>
              <p>Signature of Notary Public</p>
              <p className="text-sm text-gray-600">With Seal</p>
            </div>

            <div className="text-right">
              <p>Signature of the Deponent</p>
              <p className="text-sm text-gray-600">
                {formData.title} {formData.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsurencePreview;