import { useState } from "react";
import AddressAffadavitForm from "./AddressAffadavitForm";
import AddressAffadavitPreview from "./AddressAffadavitPreview";

// Main component that contains both form and preview
const AddressAffadavit = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    permanentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: ""
    },
    presentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: ""
    },
    aadhaarNo: "",
    currentResidenceAddress: "",
    companyName: "",
    purposeOfAffidavit: "",
    date: "",
    place: "Bangalore"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddressAffadavitForm formData={formData} handleChange={handleChange} />
        <AddressAffadavitPreview formData={formData} />
      </div>
    </div>
  );
};





export default AddressAffadavit;