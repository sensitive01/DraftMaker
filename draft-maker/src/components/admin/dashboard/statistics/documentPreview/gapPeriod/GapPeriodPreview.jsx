import { useEffect, useState } from "react";
import { Document, Packer } from "docx";
import { saveAs } from "file-saver";

const EnhancedGapPeriodPreview = () => {
  const [data, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Your existing data fetching logic
        setTimeout(() => {
          // Sample data for demonstration
          setFormData({
            documentType: "GAP PERIOD AFFIDAVIT",
            name: "John Doe",
            relation: "S/O",
            relationName: "Richard Doe",
            age: "28",
            address: "123 Main Street, Apartment 4B, New Delhi, Delhi, 110001",
            aadhaarNo: "1234 5678 9012",
            gapPeriods: [
              {
                from: "2020-01-01",
                to: "2020-06-30",
                reason: "Preparation for higher studies",
              },
              {
                from: "2021-03-15",
                to: "2021-12-20",
                reason: "Health issues and recovery",
              },
            ],
            authority: "Delhi University",
            place: "New Delhi",
            day: "17",
            month: "May",
            year: "2025",
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading data");
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

  // Generate Word document
  const generateWordDocument = async () => {
    setDownloadLoading(true);

    try {
      // Your existing Word document generation logic
      // This is a placeholder - implement with your actual logic
      setTimeout(() => {
        setDownloadLoading(false);
        alert("Document downloaded successfully!");
      }, 1500);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
      setDownloadLoading(false);
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
      {/* Download button */}
      <div className="w-full max-w-2xl mb-4 flex justify-end">
        <button
          onClick={generateWordDocument}
          className="bg-red-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md flex items-center"
          disabled={downloadLoading}
        >
          {downloadLoading ? (
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

          {/* Page 1 Content */}
          <div className="mb-12">
            <h1 className="text-center font-bold text-xl mb-6">{data.documentType || "GAP PERIOD AFFIDAVIT"}</h1>

            <p className="mb-4">
              I,{" "}
              <span
                className={
                  isFilled(data?.name) ? "" : "bg-yellow-200 px-1"
                }
              >
                {data?.name || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                className={
                  isFilled(data?.relation) ? "" : "bg-yellow-200 px-1"
                }
              >
                {data?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                className={
                  isFilled(data?.relationName) ? "" : "bg-yellow-200 px-1"
                }
              >
                {data?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                className={
                  isFilled(data?.age?.toString()) ? "" : "bg-yellow-200 px-1"
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
                  isFilled(data?.address) ? "" : "bg-yellow-200 px-1"
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
                  isFilled(data?.aadhaarNo) ? "" : "bg-yellow-200 px-1"
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
                              isFilled(period.from) ? "" : "bg-yellow-200 px-1"
                            }
                          >
                            {period.from ? formatDate(period.from) : "________"}
                          </span>
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span
                            className={
                              isFilled(period.to) ? "" : "bg-yellow-200 px-1"
                            }
                          >
                            {period.to ? formatDate(period.to) : "________"}
                          </span>
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span
                            className={
                              isFilled(period.reason) ? "" : "bg-yellow-200 px-1"
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
                That, this affidavit is required to be produced before the concerned authority of{" "}
                <span
                  className={
                    isFilled(data?.authority) ? "" : "bg-yellow-200 px-1"
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
                That, the facts stated above to the best of my knowledge and belief.
              </li>
            </ol>

            <p className="mt-6 mb-4">
              I hereby state that whatever is stated herein above are true to the best of my knowledge.
            </p>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span
                  className={
                    isFilled(data?.place) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {data?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(data?.day) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {data?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(data?.month) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {data?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(data?.year) ? "" : "bg-yellow-200 px-1"
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
    </div>
  );
};

export default EnhancedGapPeriodPreview;