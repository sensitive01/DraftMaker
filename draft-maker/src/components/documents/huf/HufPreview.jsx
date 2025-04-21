import React from 'react';

const HufPreview = ({ formData }) => {
  // Function to determine if a field should be highlighted
  const shouldHighlight = (value) => {
    return !value || value.length === 0;
  };

  // Helper function to display fields with optional highlighting
  const Field = ({ value, placeholder, inline = false }) => {
    const isEmpty = shouldHighlight(value);
    const className = `${isEmpty ? 'bg-yellow-100 px-1 rounded' : ''} ${inline ? 'inline' : ''}`;
    return <span className={className}>{isEmpty ? placeholder : value}</span>;
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (err) {
      return null;
    }
  };

  // Function to handle PDF generation
  const handleGeneratePDF = () => {
    window.print();
  };

  // Format address for display
  const formatAddress = () => {
    const { line1, line2, city, state, pinCode } = formData.address;
    const parts = [];
    if (line1) parts.push(line1);
    if (line2) parts.push(line2);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (pinCode) parts.push(pinCode);
    
    return parts.length > 0 ? parts.join(', ') : null;
  };

  const address = formatAddress();
  const formattedExistenceDate = formatDate(formData.hufExistenceDate);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header with actions */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Document Preview</h2>
        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
          </svg>
          Generate PDF
        </button>
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
            font-family: 'Times New Roman', Times, serif;
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
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Affidavit content */}
      <div className="p-6 print-container font-serif">
        <h2 className="text-2xl font-bold text-center mb-8 underline">
          AFFIDAVIT
        </h2>

        <p className="mb-4 leading-relaxed">
          I, {formData.title} <Field value={formData.name} placeholder="[FULL NAME]" inline />{" "}
          {formData.relationTo && (
            <>
              {formData.relationTo}{" "}
              <Field value={formData.relationName} placeholder="[RELATION NAME]" inline />
            </>
          )}
          , Aged: <Field value={formData.age} placeholder="[AGE]" inline /> Years,
        </p>

        <p className="mb-4 leading-relaxed">
          Permanent Address{" "}
          <Field value={address} placeholder="[COMPLETE ADDRESS WITH PIN CODE]" inline />
        </p>

        <p className="mb-6 leading-relaxed">
          My Aadhaar No: <Field value={formData.aadhaarNo} placeholder="[AADHAAR NUMBER]" inline /> and as{" "}
          <strong>Karta of my Hindu Undivided Family (HUF)</strong> affirm on
          oath and declare as under --
        </p>

        <p className="mb-4 leading-relaxed">Do hereby solemnly affirm and declare as under:</p>

        <ol className="list-decimal pl-6 mb-6 space-y-3 leading-relaxed">
          <li>
            That I am {formData.title} <Field value={formData.name} placeholder="[FULL NAME]" inline /> of our{" "}
            <strong>HUF</strong> which is known as{" "}
            <strong><Field value={formData.hufName} placeholder="[HUF NAME]" inline /> HUF</strong>
          </li>
          <li>
            That as on today, name of coparceners of our above said HUF, their
            name, Relationship and addresses are as below --
          </li>
        </ol>

        <table className="w-full border-collapse border border-gray-400 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-3 py-2 w-1/12 text-sm font-semibold">
                S. No
              </th>
              <th className="border border-gray-400 px-3 py-2 w-1/3 text-sm font-semibold">
                Name of the coparceners
              </th>
              <th className="border border-gray-400 px-3 py-2 w-1/4 text-sm font-semibold">
                Relationship
              </th>
              <th className="border border-gray-400 px-3 py-2 w-1/3 text-sm font-semibold">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.coparceners.map((coparcener, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border border-gray-400 px-3 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {shouldHighlight(coparcener.name) ? (
                    <span className="bg-yellow-100 px-1 block text-center">[NAME]</span>
                  ) : (
                    coparcener.name
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {shouldHighlight(coparcener.relationship) ? (
                    <span className="bg-yellow-100 px-1 block text-center">[RELATIONSHIP]</span>
                  ) : (
                    coparcener.relationship
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {shouldHighlight(coparcener.address) ? (
                    <span className="bg-yellow-100 px-1 block text-center">[ADDRESS]</span>
                  ) : (
                    coparcener.address
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mb-6 leading-relaxed">
          That the above said HUF is in existence since{" "}
          <Field 
            value={formattedExistenceDate} 
            placeholder="[DATE OF EXISTENCE]" 
            inline 
          />.
        </p>

        <p className="mb-10 leading-relaxed">
          Verified at <Field value={formData.place} placeholder="[PLACE]" inline /> on this{" "}
          <Field value={formData.day} placeholder="[DAY]" inline /> day of{" "}
          <Field value={formData.month} placeholder="[MONTH]" inline />,{" "}
          <Field value={formData.year} placeholder="[YEAR]" inline /> that the contents of the above said
          affidavit are true and correct to the best of my knowledge and belief.
        </p>

        <div className="text-right mt-16">
          <p className="border-t border-black inline-block pt-1">
            (Signature of the Deponent)
          </p>
        </div>
      </div>
    </div>
  );
};

export default HufPreview;