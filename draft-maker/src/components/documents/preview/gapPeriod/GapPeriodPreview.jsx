import { getDayWithSuffix } from "../../../../utils/dateFormat";

export default function AffidavitDisplay({ data, onEdit }) {
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

  // Function to handle PDF generation
  const handleGeneratePDF = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Affidavit content */}
      <div className="print-container p-2 sm:p-4 md:p-6 lg:p-8 border border-gray-300 rounded-lg relative">
        {/* Watermark */}
        <div className="watermark">INTERNAL PURPOSE ONLY</div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 underline font-serif tracking-wide">
          GAP PERIOD PREVIEW
        </h2>
        {data.firstParty && (
          <>
            <div className="mb-5 text-justify leading-relaxed">
              <span className="font-lg">
                First Party (Stamp Duty):{" "}
                <span className="font-bold">{data.firstParty}</span>
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
                <span className="font-bold">{data.secondParty}</span>
              </span>
            </div>
          </>
        )}

        <p className="mb-3 sm:mb-4 font-serif text-sm sm:text-base leading-relaxed">
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

        <p className="mb-3 sm:mb-4 font-serif text-sm sm:text-base leading-relaxed">
          Permanent Address{" "}
          <HighlightedField
            value={data.address}
            placeholder="[Address Line 1, Address Line 2, City, State, Pin Code]"
            className="inline-block"
          />
        </p>

        <p className="mb-4 sm:mb-6 font-serif text-sm sm:text-base leading-relaxed">
          My Aadhaar No:{" "}
          <HighlightedField
            value={data.aadhaarNo}
            placeholder="0000 0000 0000"
          />
        </p>

        <p className="mb-3 sm:mb-4 font-serif text-sm sm:text-base leading-relaxed">
          Do hereby solemnly affirm and state as follows;
        </p>

        <ol className="list-decimal pl-4 sm:pl-6 mb-4 sm:mb-6 space-y-2 font-serif text-sm sm:text-base leading-relaxed">
          <li>That, I am the deponent of the affidavit.</li>
          <li>That there is Gap Period as follows</li>
        </ol>

        <div className="mb-4 sm:mb-6 overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse font-serif text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-1 sm:px-3 py-2 w-1/6 text-xs sm:text-sm font-semibold">
                    No. of Gap Periods
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-3 py-2 w-1/4 text-xs sm:text-sm font-semibold">
                    From
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-3 py-2 w-1/4 text-xs sm:text-sm font-semibold">
                    To
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-3 py-2 w-2/5 text-xs sm:text-sm font-semibold">
                    Reasons For Gap
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.gapPeriods &&
                  data.gapPeriods.map((period, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-400 px-1 sm:px-3 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-3 py-2 text-center">
                        {period.from ? (
                          formatDate(period.from)
                        ) : (
                          <span className="bg-yellow-100 px-1 block text-center">
                            ________
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-3 py-2 text-center">
                        {period.to ? (
                          formatDate(period.to)
                        ) : (
                          <span className="bg-yellow-100 px-1 block text-center">
                            ________
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-3 py-2">
                        {period.reason ? (
                          <span className="block break-words">
                            {period.reason}
                          </span>
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
        </div>

        <ol
          className="list-decimal pl-4 sm:pl-6 mb-4 sm:mb-6 space-y-2 font-serif text-sm sm:text-base leading-relaxed"
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

        <p className="mb-4 sm:mb-6 font-serif text-sm sm:text-base leading-relaxed">
          I hereby state that whatever is stated herein above are true to the
          best of my knowledge.
        </p>

        <p className="mb-8 sm:mb-10 font-serif text-sm sm:text-base leading-relaxed">
          Verified at{" "}
          <HighlightedField value={data.place} placeholder="PLACE" /> on this{" "}
          <HighlightedField
            value={getDayWithSuffix(data.day)}
            placeholder="XX"
          />{" "}
          <HighlightedField value={data.month} placeholder="XXXX" />,{" "}
          <HighlightedField value={data.year} placeholder="XXXX" /> that the
          contents of the above said affidavit are true and correct to the best
          of my knowledge and belief.
        </p>

        <div className="text-right mt-12 sm:mt-16 font-serif">
          <p className="text-sm sm:text-base">(Signature of the Deponent)</p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 2rem;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          letter-spacing: 0.2em;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          user-select: none;
        }

        @media (min-width: 640px) {
          .watermark {
            font-size: 3rem;
          }
        }

        @media (max-width: 639px) {
          .max-w-4xl {
            margin: 0;
            max-width: 100%;
          }

          .rounded-lg {
            border-radius: 0.25rem;
          }

          .shadow-md {
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          table {
            font-size: 0.65rem;
          }

          th,
          td {
            padding: 0.25rem 0.25rem;
          }

          .watermark {
            font-size: 1.25rem;
          }

          .print-container {
            padding: 0.5rem;
          }
        }

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
          .watermark {
            font-size: 4rem;
            color: rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </div>
  );
}
