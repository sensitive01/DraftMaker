import React from 'react'

const DocumentLostPreview = ({formData}) => {
  return (
    <div className="border p-6 bg-white shadow-md space-y-6">
    <h2 className="text-xl font-bold text-center underline">AFFIDAVIT</h2>
    
    <p className="text-justify">
      I, {formData.personTitle || 'Mr/Mrs/Ms'} {formData.personName || '................................'} {formData.relationType || 'D/o'} {formData.relationName || '........................'}, Aged: {formData.age || '......'} Years,
    </p>
    
    <p className="text-justify">
      Permanent Address {formData.address || '[Address Line 1, Address Line 2, City, State, Pin Code]'}
    </p>
    
    <p className="text-justify">
      My Aadhaar No: Aadhaar No: {formData.aadhaarNumber || '0000 0000 0000'}
    </p>
    
    <p className="text-justify">
      Do hereby solemnly affirm and declare as under:
    </p>
    
    <ol className="list-decimal pl-6">
      <li className="mb-3">
        That I have inadvertently misplaced the original {formData.documentType || 'DOCUMENT NAME'}, {formData.documentType || 'DOCUMENT'} SERIAL NO: {formData.documentNumber || '...........'}, which I am unable to trace even after extensive search.
      </li>
      
      <li className="mb-3">
        That an FIR has been lodged bearing No {formData.firNumber || 'XXXX'} on DATE: {formData.firDay || 'XX'}/{formData.firMonth || 'XX'}/{formData.firYear || 'XXXX'} reporting about the loss of {formData.documentType || 'DOCUMENT'}, The copy of the same is enclosed herewith.
      </li>
      
      <li className="mb-3">
        That I hereby request the Company/ Developer to provide me with the duplicate copy of {formData.documentType || 'DOCUMENT'} for the purpose of my records and fulfillment of any requirement which may arise in future.
      </li>
      
      <li className="mb-3">
        That I undertake to inform your good office if the original document is found in future.
      </li>
    </ol>
    
    <p className="text-justify">
      Verified at {formData.place || 'PLACE'} on this {formData.day || 'XX'} day of {formData.month || 'XXXX'}, {formData.year || 'XXXX'} that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
    </p>
    
    <div className="mt-16 text-right">
      <p>(Signature of the Deponent)</p>
    </div>
  </div>
  )
}

export default DocumentLostPreview