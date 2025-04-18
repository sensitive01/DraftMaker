import React, { useState } from "react";
import CommercialPreview from "./CommercialPreview"
import CommercialForm from "./CommercialForm"

const CommercialAggrement = () => {
  const [formData, setFormData] = useState({
    agreementDate: "",
    lessorName: "",
    lessorAddress1: "",
    lessorAddress2: "",
    lessorCity: "",
    lessorState: "",
    lessorPin: "",

    lesseeName: "",
    lesseeAadhaar: "",
    lesseeAddress1: "",
    lesseeAddress2: "",
    lesseeCity: "",
    lesseeState: "",
    lesseePin: "",

    premisesAddress: "",
    premisesSqFt: "",

    rentAmount: "",
    rentInWords: "",
    maintenanceIncluded: false,

    securityDeposit: "",
    securityInWords: "",
    paidAmount: "",
    paymentMode: "cash",

    tenancyStartDate: "",
    rentIncrease: "",

    noticePeriod: "",
    defaultPeriod: "",
    paintingCharge: "",

    witness1: "",
    witness2: "",

    fixtureItems: [{ item: "", quantity: "" }],
  });

  const handleChange = (e, index, key) => {
    if (key === "fixtureItems") {
      const newItems = [...formData.fixtureItems];
      newItems[index][e.target.name] = e.target.value;
      setFormData({ ...formData, fixtureItems: newItems });
    } else {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const addFixture = () => {
    setFormData({
      ...formData,
      fixtureItems: [...formData.fixtureItems, { item: "", quantity: "" }],
    });
  };

  return <>
  <CommercialForm formData={formData} addFixture={addFixture} handleChange={handleChange}  />
  <CommercialPreview data={formData} />
  </>;
};

export default CommercialAggrement;
