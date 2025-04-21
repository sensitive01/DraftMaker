import { useState } from "react";
import HufForm from "./HufForm";
import HufPreview from "./HufPreview";

export default function HufAgreement() {
  const [formData, setFormData] = useState({
    title: "Mr",
    name: "",
    relationTo: "",
    relationName: "",
    age: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    aadhaarNo: "",
    hufName: "",
    hufExistenceDate: "",
    place: "",
    day: "",
    month: "",
    year: "",
    coparceners: [
      { name: "", relationship: "", address: "" },
      { name: "", relationship: "", address: "" },
      { name: "", relationship: "", address: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCoparcenerChange = (index, field, value) => {
    const updatedCoparceners = [...formData.coparceners];
    updatedCoparceners[index] = {
      ...updatedCoparceners[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      coparceners: updatedCoparceners,
    });
  };

  // Function to add new coparcener
  const addCoparcener = () => {
    setFormData({
      ...formData,
      coparceners: [...formData.coparceners, { name: "", relationship: "", address: "" }]
    });
  };

  // Function to remove a coparcener
  const removeCoparcener = (index) => {
    if (formData.coparceners.length > 1) {
      const updatedCoparceners = formData.coparceners.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        coparceners: updatedCoparceners
      });
    }
  };

  return (
    <div className="container-fluid mx-auto   max-w-8xl">
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <HufForm
            formData={formData}
            handleChange={handleChange}
            handleCoparcenerChange={handleCoparcenerChange}
            addCoparcener={addCoparcener}
            removeCoparcener={removeCoparcener}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="sticky top-4">
            <HufPreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}