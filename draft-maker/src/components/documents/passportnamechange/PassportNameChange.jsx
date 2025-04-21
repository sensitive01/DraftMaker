import React, { useState } from "react";
import PassportNameChangeForm from "./PassportNameChangeForm";
import PassportNameChangePreview from "./PassportNameChangePreview";

const PassportNameChange = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    relatedPersonName: "",
    permanentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    presentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    aadhaarNo: "",
    passportNo: "",
    currentGivenName: "",
    currentSurname: "",
    newGivenName: "",
    newSurname: "",
    date: "",
    place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects (addresses)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePrint = () => {
    // Create a print-friendly version that hides the form and shows only the preview
    const printContent = document.querySelector(".print-content");
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;

    // Reattach event handlers after restoring original content
    window.location.reload();
  };

  return (
    <div className="container-fluid mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Passport Name Change Affidavit Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PassportNameChangeForm
            formData={formData}
            handleChange={handleChange}
          />
        </div>
        <div className="print-content">
          <PassportNameChangePreview formData={formData} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={handlePrint}
        >
          Print Affidavit
        </button>
        <button
          className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200 ml-4"
          onClick={() =>
            setFormData({
              name: "",
              gender: "",
              age: "",
              relatedPersonName: "",
              permanentAddress: {
                line1: "",
                line2: "",
                city: "",
                state: "",
                pinCode: "",
              },
              presentAddress: {
                line1: "",
                line2: "",
                city: "",
                state: "",
                pinCode: "",
              },
              aadhaarNo: "",
              passportNo: "",
              currentGivenName: "",
              currentSurname: "",
              newGivenName: "",
              newSurname: "",
              date: "",
              place: "",
            })
          }
        >
          Reset Form
        </button>
      </div>

      <style jsx>{`
        @media print {
          .print-content {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          body * {
            visibility: hidden;
          }

          .print-content,
          .print-content * {
            visibility: visible;
          }

          .print-content {
            position: absolute;
            left: 0;
            top: 0;
          }

          h2.print:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PassportNameChange;
