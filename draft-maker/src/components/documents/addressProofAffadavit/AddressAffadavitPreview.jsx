
const AffidavitPreview = ({ formData }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Format permanent address
  const formatPermanentAddress = () => {
    const { line1, line2, city, state, pinCode } = formData.permanentAddress;
    const parts = [line1, line2, city, state, pinCode].filter(part => part);
    return parts.length ? parts.join(', ') : '[Address Line 1, Address Line 2, City, State, Pin Code]';
  };

  // Format present address
  const formatPresentAddress = () => {
    const { line1, line2, city, state, pinCode } = formData.presentAddress;
    const parts = [line1, line2, city, state, pinCode].filter(part => part);
    return parts.length ? parts.join(', ') : '[Address Line 1, Address Line 2, City, State, Pin Code]';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">AFFIDAVIT</h2>
      
      <div className="mb-6 border-b pb-2">
        <p className="mb-2">I, {formData.name || "Mr/Mrs/Ms _______________"}, {formData.gender || "S/O/D/O/W/O"} _______________, Aged: {formData.age || "XX"} Years,</p>
        <p className="mb-2">Permanent Address: {formatPermanentAddress()}</p>
        <p className="mb-2">Present Address: {formatPresentAddress()}</p>
        <p className="mb-2">My Aadhaar No: {formData.aadhaarNo || "536709665679"}.</p>
        <p className="mb-2">Do hereby solemnly affirm and declare as under:</p>
      </div>
      
      <div className="mb-6">
        <ol className="list-decimal pl-6 space-y-2">
          <li>I hereby declare that I am presently residing at above address since {formData.currentResidenceAddress || "XX/XX/XXXX"}.</li>
          <li>I further declare that the swearing this affidavit to produce the concerned <span className="bg-yellow-200 font-bold">{formData.companyName || "COMPANY NAME"}</span>.</li>
          <li>That this affidavit is being made to serve as proof of my Address for the purpose of <span className="bg-yellow-200">{formData.purposeOfAffidavit || "XXX"}</span>.</li>
        </ol>
        
        <p className="mt-4">I do hereby verify and declare that what is stated above are true and correct to the best of my knowledge, information and belief.</p>
      </div>
      
      <div className="flex flex-col items-end mt-8">
        <p className="mb-6">Solemnly affirmed at {formData.place || "Bangalore"}</p>
        
        <p className="mb-2">Date: {formatDate(formData.date)}</p>
        
        <div className="mt-10">
          <p>[Signature of the Applicant]</p>
          <p>Deponent</p>
        </div>
      </div>
    </div>
  );
};

export default AffidavitPreview;