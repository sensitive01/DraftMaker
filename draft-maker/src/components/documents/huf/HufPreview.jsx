import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const HufPreview = ({ formData }) => {
  // Function to determine if a field should be highlighted
  const shouldHighlight = (value) => {
    return !value || value.length === 0;
  };

  // Helper function to display fields with optional highlighting
  const Field = ({ value, placeholder, inline = false }) => {
    const isEmpty = shouldHighlight(value);
    const className = `${isEmpty ? "bg-yellow-100 px-1 rounded" : ""} ${
      inline ? "inline" : ""
    }`;
    return <span className={className}>{isEmpty ? placeholder : value}</span>;
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (err) {
      return null;
    }
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

    return parts.length > 0 ? parts.join(", ") : null;
  };

  const address = formatAddress();
  const formattedExistenceDate = formatDate(formData.hufExistenceDate);

  return (
  <div>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-2xl sm:text-3xl md:text-4xl font-bold transform rotate-45 select-none font-sans opacity-80">
            INTERNAL PURPOSE ONLY
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
              page-break-inside: avoid;
            }
          }
          
          @media (max-width: 639px) {
            .huf-preview-container {
              padding: 0.5rem;
            }
            
            .huf-preview-title {
              font-size: 1.25rem;
              margin-bottom: 1rem;
            }
            
            .huf-preview-text {
              font-size: 0.75rem;
              line-height: 1.4;
              margin-bottom: 0.75rem;
            }
            
            .huf-preview-table {
              font-size: 0.65rem;
            }
            
            .huf-preview-table th,
            .huf-preview-table td {
              padding: 0.25rem 0.125rem;
            }
            
            .huf-preview-signature {
              margin-top: 2rem;
              margin-bottom: 2rem;
            }
          }
          
          @media (min-width: 640px) and (max-width: 767px) {
            .huf-preview-container {
              padding: 1rem;
            }
            
            .huf-preview-title {
              font-size: 1.5rem;
              margin-bottom: 1.5rem;
            }
            
            .huf-preview-text {
              font-size: 0.875rem;
              line-height: 1.5;
              margin-bottom: 1rem;
            }
            
            .huf-preview-table {
              font-size: 0.75rem;
            }
            
            .huf-preview-table th,
            .huf-preview-table td {
              padding: 0.5rem 0.25rem;
            }
          }
        `}</style>

        {/* Affidavit content */}
        <div className="huf-preview-container p-3 sm:p-4 md:p-6 print-container font-serif">
          <h2 className="huf-preview-title text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 md:mb-8 underline">
            AFFIDAVIT
          </h2>

          <p className="huf-preview-text mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
            I, {formData.title}{" "}
            <Field value={formData.name} placeholder="[FULL NAME]" inline />{" "}
            {formData.relationTo && (
              <>
                {formData.relationTo}{" "}
                <Field
                  value={formData.relationName}
                  placeholder="[RELATION NAME]"
                  inline
                />
              </>
            )}
            , Aged: <Field value={formData.age} placeholder="[AGE]" inline />{" "}
            Years,
          </p>

          <p className="huf-preview-text mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
            Permanent Address{" "}
            <Field
              value={address}
              placeholder="[COMPLETE ADDRESS WITH PIN CODE]"
              inline
            />
          </p>

          <p className="huf-preview-text mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
            My Aadhaar No:{" "}
            <Field
              value={formData.aadhaarNo}
              placeholder="[AADHAAR NUMBER]"
              inline
            />{" "}
            and as <strong>Karta of my Hindu Undivided Family (HUF)</strong>{" "}
            affirm on oath and declare as under --
          </p>

          <p className="huf-preview-text mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base leading-relaxed">
            <li>
              That I am {formData.title}{" "}
              <Field value={formData.name} placeholder="[FULL NAME]" inline />{" "}
              of our <strong>HUF</strong> which is known as{" "}
              <strong>
                <Field
                  value={formData.hufName}
                  placeholder="[HUF NAME]"
                  inline
                />{" "}
                HUF
              </strong>
            </li>
            <li>
              That as on today, name of coparceners of our above said HUF, their
              name, Relationship and addresses are as below --
            </li>
          </ol>

          <div className="overflow-x-auto mb-8 sm:mb-12 md:mb-16">
            <table className="huf-preview-table w-full border-collapse border border-gray-400 min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 w-1/12 text-xs sm:text-sm font-semibold">
                    S. No
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 w-1/3 text-xs sm:text-sm font-semibold">
                    Name of the coparceners
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 w-1/4 text-xs sm:text-sm font-semibold">
                    Relationship
                  </th>
                  <th className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 w-1/3 text-xs sm:text-sm font-semibold">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.coparceners.map((coparcener, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                      {shouldHighlight(coparcener.name) ? (
                        <span className="bg-yellow-100 px-1 block text-center">
                          [NAME]
                        </span>
                      ) : (
                        <span className="block break-words">{coparcener.name}</span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                      {shouldHighlight(coparcener.relationship) ? (
                        <span className="bg-yellow-100 px-1 block text-center">
                          [RELATIONSHIP]
                        </span>
                      ) : (
                        <span className="block break-words">{coparcener.relationship}</span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-1 sm:px-2 md:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                      {shouldHighlight(coparcener.address) ? (
                        <span className="bg-yellow-100 px-1 block text-center">
                          [ADDRESS]
                        </span>
                      ) : (
                        <span className="block break-words">{coparcener.address}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="huf-preview-text mb-6 sm:mb-8 md:mb-12 text-xs sm:text-sm md:text-base leading-relaxed">
            That the above said HUF is in existence since{" "}
            <Field
              value={formattedExistenceDate}
              placeholder="[DATE OF EXISTENCE]"
              inline
            />
            .
          </p>

          <p className="huf-preview-text mb-4 sm:mb-6 md:mb-10 text-xs sm:text-sm md:text-base leading-relaxed">
            Verified at{" "}
            <Field value={formData.place} placeholder="[PLACE]" inline /> on
            this{" "}
            <Field
              value={getDayWithSuffix(formData.day)}
              placeholder="[DAY]"
              inline
            />{" "}
            <Field value={formData.month} placeholder="[MONTH]" inline />,{" "}
            <Field value={formData.year} placeholder="[YEAR]" inline /> that the
            contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>

          <div className="huf-preview-signature text-right mt-8 sm:mt-16 md:mt-40 mb-8 sm:mb-16 md:mb-96">
            <p className="border-t border-black inline-block pt-1 text-xs sm:text-sm md:text-base">
              (Signature of the Deponent)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HufPreview;
