import React from 'react'

const NameCorrectionPreview = ({formData}) => {
  return (
    <div className="bg-white p-6 border border-gray-300 rounded shadow">
    <h1 className="text-xl font-bold text-center underline mb-6">AFFIDAVIT</h1>
    
    <p className="mb-4">
      I, {formData.fullName} {formData.relation} {formData.relationName}, Aged: {formData.age} Years,
    </p>
    
    <p className="mb-4">
      Permanent Address {formData.permanentAddress}
    </p>
    
    <p className="mb-4">
      My Aadhaar No: {formData.aadhaarNo}
    </p>
    
    <p className="mb-4">Do hereby solemnly affirm and declare as under:</p>
    
    <ol className="list-decimal pl-6 space-y-4">
      <li>
        That I am the citizen of India.
      </li>
      
      <li>
        That my name has been recorded as {formData.oldName} (old name)
      </li>
      
      <li>
        That now I have changed my name permanently as {formData.newName} (new name) in place of my previous name i.e. {formData.oldName} (old name).
      </li>
      
      <li>
        That in future I will be known by my new name i.e. {formData.newName} for all the purpose.
      </li>
      
      <li>
        That I further declare that both the names mentioned hereinabove belongs to one and the same person i.e. "myself".
      </li>
      
      <li>
        That my statement is true and correct.
      </li>
    </ol>
    
    <p className="mt-6">
      Verified at <strong>{formData.place}</strong> on this {formData.day} day of {formData.month}, {formData.year} that the contents of the above said affidavit are true and correct to the best of my knowledge and belief.
    </p>
    
    <div className="mt-10 text-right">
      <p>(Signature of the Deponent)</p>
      <p className="mt-1">{formData.fullName}</p>
    </div>
  </div>
  )
}

export default NameCorrectionPreview