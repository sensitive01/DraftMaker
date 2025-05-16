import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

export default function GapPeriodPreview() {
  const { bookingId } = useParams();
  const [data, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response.data.data);
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

  // Helper function to highlight empty fields
  const HighlightedField = ({ value, placeholder, className = "" }) => {
    return value ? (
      <span className="font-serif">{value}</span>
    ) : (
      <span className={`bg-yellow-100 px-1 font-serif ${className}`}>
        {placeholder}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Affidavit content */}
      <div className="print-container p-8 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 underline font-serif tracking-wide">
          AFFIDAVIT
        </h2>

        <p className="mb-4 font-serif text-base leading-relaxed">
          I,{" "}
          <HighlightedField value={data.name} placeholder="________________" />{" "}
          {data.relation}{" "}
          <HighlightedField
            value={data.relationName}
            placeholder="________________"
          />
          , Aged: <HighlightedField value={data.age} placeholder="____" />{" "}
          Years,
        </p>

        <p className="mb-4 font-serif text-base leading-relaxed">
          Permanent Address{" "}
          <HighlightedField
            value={data.address}
            placeholder="[Address Line 1, Address Line 2, City, State, Pin Code]"
            className="inline-block"
          />
        </p>

        <p className="mb-6 font-serif text-base leading-relaxed">
          My Aadhaar No:{" "}
          <HighlightedField
            value={data.aadhaarNo}
            placeholder="0000 0000 0000"
          />
        </p>

        <p className="mb-4 font-serif text-base leading-relaxed">
          Do hereby solemnly affirm and state as follows;
        </p>

        <ol className="list-decimal pl-6 mb-6 space-y-2 font-serif text-base leading-relaxed">
          <li>That, I am the deponent of the affidavit.</li>
          <li>That there is Gap Period as follows</li>
        </ol>

        <div className="mb-6">
          <table className="w-full border-collapse font-serif">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-3 py-2 w-1/6 text-sm font-semibold">
                  No. of Gap Periods
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/4 text-sm font-semibold">
                  From
                </th>
                <th className="border border-gray-400 px-3 py-2 w-1/4 text-sm font-semibold">
                  To
                </th>
                <th className="border border-gray-400 px-3 py-2 w-2/5 text-sm font-semibold">
                  Reasons For Gap
                </th>
              </tr>
            </thead>
            <tbody>
              {data.gapPeriods &&
                data.gapPeriods.map((period, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-400 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-3 py-2 text-center">
                      {period.from ? (
                        formatDate(period.from)
                      ) : (
                        <span className="bg-yellow-100 px-1 block text-center">
                          ________
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-3 py-2 text-center">
                      {period.to ? (
                        formatDate(period.to)
                      ) : (
                        <span className="bg-yellow-100 px-1 block text-center">
                          ________
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      {period.reason ? (
                        period.reason
                      ) : (
                        <span className="bg-yellow-100 px-1 block text-center">
                          ________
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ol
          className="list-decimal pl-6 mb-6 space-y-2 font-serif text-base leading-relaxed"
          start="3"
        >
          <li>
            That, this affidavit is required to be produced before the concerned
            authority of{" "}
            <HighlightedField value={data.authority} placeholder="XXXXXX" /> for
            necessary purpose.
          </li>
          <li>
            That, the facts stated above to the best of my knowledge and belief.
          </li>
        </ol>

        <p className="mb-6 font-serif text-base leading-relaxed">
          I hereby state that whatever is stated herein above are true to the
          best of my knowledge.
        </p>

        <p className="mb-10 font-serif text-base leading-relaxed">
          Verified at{" "}
          <HighlightedField value={data.place} placeholder="PLACE" /> on this{" "}
          <HighlightedField value={data.day} placeholder="XX" /> day of{" "}
          <HighlightedField value={data.month} placeholder="XXXX" />,{" "}
          <HighlightedField value={data.year} placeholder="XXXX" /> that the
          contents of the above said affidavit are true and correct to the best
          of my knowledge and belief.
        </p>

        <div className="text-right mt-16 font-serif">
          <p>(Signature of the Deponent)</p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            font-family: "Times New Roman", Times, serif;
          }
          .no-print {
            display: none;
          }
          .print-container {
            margin: 0;
            padding: 0;
            width: 100%;
          }
          .bg-yellow-100 {
            background-color: transparent !important;
            border-bottom: 1px dotted #000;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          thead {
            display: table-header-group;
          }
          tfoot {
            display: table-footer-group;
          }
        }
      `}</style>
    </div>
  );
}
