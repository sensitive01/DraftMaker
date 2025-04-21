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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Affidavit Preview
        </h1>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Edit
          </button>
        )}
      </div>

      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow">
        <h2 className="text-xl font-bold text-center mb-6 underline">
          AFFIDAVIT
        </h2>

        <p className="mb-4">
          I, {data.name ? data.name : "________________"} {data.relation}{" "}
          {data.relationName ? data.relationName : "________________"}, Aged:{" "}
          {data.age ? data.age : "____"} Years,
        </p>

        <p className="mb-4">
          Permanent Address{" "}
          {data.address
            ? data.address
            : "[Address Line 1, Address Line 2, City, State, Pin Code]"}
        </p>

        <p className="mb-6">
          My Aadhaar No: {data.aadhaarNo ? data.aadhaarNo : "0000 0000 0000"}
        </p>

        <p className="mb-4">Do hereby solemnly affirm and state as follows;</p>

        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>That, I am the deponent of the affidavit.</li>
          <li>That there is Gap Period as follows</li>
        </ol>

        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  No. of Gap Periods
                </th>
                <th className="border border-gray-300 px-4 py-2">From</th>
                <th className="border border-gray-300 px-4 py-2">To</th>
                <th className="border border-gray-300 px-4 py-2">
                  Reasons For Gap
                </th>
              </tr>
            </thead>
            <tbody>
              {data.gapPeriods &&
                data.gapPeriods.map((period, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDate(period.from) || "________"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDate(period.to) || "________"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {period.reason || "________"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ol className="list-decimal pl-6 mb-6 space-y-2" start="3">
          <li>
            That, this affidavit is required to be produced before the concerned
            authority of {data.authority ? data.authority : "XXXXXX"} for
            necessary purpose.
          </li>
          <li>
            That, the facts stated above to the best of my knowledge and belief.
          </li>
        </ol>

        <p className="mb-6">
          I hereby state that whatever is stated herein above are true to the
          best of my knowledge.
        </p>

        <p className="mb-10">
          Verified at {data.place ? data.place : "PLACE"} on this{" "}
          {data.day ? data.day : "XX"} day of {data.month ? data.month : "XXXX"}
          , {data.year ? data.year : "XXXX"} that the contents of the above said
          affidavit are true and correct to the best of my knowledge and belief.
        </p>

        <div className="text-right mt-16">
          <p>(Signature of the Deponent)</p>
        </div>
      </div>
    </div>
  );
}
