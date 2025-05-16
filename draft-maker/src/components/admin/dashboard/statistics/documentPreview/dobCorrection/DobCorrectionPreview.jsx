import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { Download } from "lucide-react";

const DobCorrectionPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAggrementFormData(bookingId);
        if (response.status === 200) {
          setFormData(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  const downloadAsDoc = () => {
    // Create header for MS Word document
    const header =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40">' +
      "<head>" +
      '<meta charset="utf-8">' +
      "<!--[if gte mso 9]>" +
      "<xml>" +
      "<w:WordDocument>" +
      "<w:View>Print</w:View>" +
      "<w:Zoom>100</w:Zoom>" +
      "<w:DoNotOptimizeForBrowser/>" +
      "</w:WordDocument>" +
      "</xml>" +
      "<![endif]-->" +
      "<style>" +
      "@page { size: 21cm 29.7cm; margin: 2cm; }" +
      'body { font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.5; }' +
      "h1 { font-size: 16pt; text-align: center; text-decoration: underline; font-weight: bold; }" +
      "ol { padding-left: 2cm; }" +
      ".signature { text-align: right; margin-top: 30pt; }" +
      "</style>" +
      "</head><body>";

    // Get the HTML content of the affidavit
    const affidavitContent =
      document.getElementById("affidavit-content").innerHTML;

    // Create the complete HTML document
    const content = header + affidavitContent + "</body></html>";

    // Create a Blob with the HTML content
    const blob = new Blob([content], { type: "application/msword" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = `DOB_Correction_Affidavit_${
      formData.fullName || "Document"
    }.doc`;

    // Create a URL for the Blob and set it as the href of the link
    link.href = URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading document...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={downloadAsDoc}
          className="flex items-center gap-2 bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>

      <div
        id="affidavit-content"
        className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg"
      >
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold uppercase underline mb-1">
            {formData.documentType || "AFFIDAVIT FOR DATE OF BIRTH CORRECTION"}
          </h1>
        </div>

        <div className="space-y-6 text-gray-800">
          <p>
            I,{" "}
            <span className="font-semibold">
              {formData.fullName || "_________________"}
            </span>
            , {formData.relation || "son/daughter/wife"} of{" "}
            <span className="font-semibold">
              {formData.relationName || "_________________"}
            </span>
            , Aged:{" "}
            <span className="font-semibold">{formData.age || "__"}</span> Years,
          </p>

          <p>
            Permanent Address:{" "}
            <span className="font-semibold">
              {formData.permanentAddress || "_______________________________"}
            </span>
          </p>

          <p>
            My Aadhaar No:{" "}
            <span className="font-semibold">
              {formData.aadhaarNo || "________________"}
            </span>
          </p>

          <p className="font-semibold">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal pl-6 space-y-4">
            <li>That I am the citizen of India.</li>

            <li>
              That my Date of Birth has been recorded as{" "}
              <span className="font-semibold">
                {formatDate(formData.dob1) || "__-__-____"}
              </span>{" "}
              in my{" "}
              <span className="font-semibold">
                {formData.document1 || "_________"}
              </span>{" "}
              bearing number{" "}
              <span className="font-semibold">
                {formData.documentNo1 || "____________"}
              </span>
              .
            </li>

            <li>
              That my Date of Birth has been recorded as{" "}
              <span className="font-semibold">
                {formatDate(formData.dob2) || "__-__-____"}
              </span>{" "}
              in my{" "}
              <span className="font-semibold">
                {formData.document2 || "_________"}
              </span>{" "}
              bearing number{" "}
              <span className="font-semibold">
                {formData.documentNo2 || "____________"}
              </span>
              .
            </li>

            <li>
              That I further declare that both the Dates of Birth mentioned
              hereinabove belong to one and the same person i.e. "myself".
            </li>

            <li>
              That my statement is true and correct to the best of my knowledge
              and belief.
            </li>
          </ol>

          <div className="mt-12">
            <p>
              Verified at{" "}
              <span className="font-semibold">
                {formData.place || "_________"}
              </span>{" "}
              on this{" "}
              <span className="font-semibold">{formData.day || "___"}</span> day
              of{" "}
              <span className="font-semibold">
                {formData.month || "________"}
              </span>
              , <span className="font-semibold">{formData.year || "____"}</span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>
          </div>

          <div className="mt-20 flex justify-end">
            <div className="text-right">
              <p className="mb-12">______________________</p>
              <p className="font-semibold">(Signature of the Deponent)</p>
              <p className="mt-1 font-semibold">
                {formData.fullName || "_________________"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DobCorrectionPreview;
