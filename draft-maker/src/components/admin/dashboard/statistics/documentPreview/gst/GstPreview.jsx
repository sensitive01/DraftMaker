import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

const GstPreview = () => {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response?.data?.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="bg-gray-50 p-6 border rounded-md">
        <div className="mb-4 text-center">
          <h1 className="font-bold underline text-xl mb-2">
            NO OBJECTION CERTIFICATE
          </h1>
          <p className="text-sm text-gray-500">(For GST Registration)</p>
        </div>

        <p className="mb-4 leading-relaxed">
          I,{" "}
          <span className="font-bold">
            {formData?.ownerName || "__________________"}
          </span>
          , Aadhaar no.{" "}
          <span className="font-bold">
            {formData?.aadhaarNo || "__________________"}
          </span>
        </p>

        <p className="mb-4 leading-relaxed">
          Address:{" "}
          <span className="font-bold">
            {formData?.ownerAddress || "__________________"}
          </span>
          , and being legal owner of the premises address{" "}
          <span className="font-bold">
            {formData?.premisesAddress || "__________________"}
          </span>
          , do hereby permit Mr./Ms.{" "}
          <span className="font-bold">
            {formData?.tenantName || "__________________"}
          </span>{" "}
          and Proprietor of
          <span className="font-bold">
            {" "}
            {formData?.companyName || "__________________"}
          </span>{" "}
          (Name of the Company/Firm), office address at{" "}
          <span className="font-bold">
            {formData?.officeAddress || "__________________"}
          </span>
          .
        </p>

        <p className="mb-6 italic">
          I hereby state that I have no objection with the said company/Firm
          carrying on his Business and profession from the said premises and
          getting registered Under GST.
        </p>

        <p className="mb-8 leading-relaxed">
          Verified at{" "}
          <span className="font-bold">{formData?.place || "________"}</span> on
          this <span className="font-bold">{formData?.day || "__"}</span> day of{" "}
          <span className="font-bold">{formData?.month || "_______"}</span>,
          <span className="font-bold"> {formData?.year || "____"}</span> that
          the contents of the above said affidavit are true and correct to the
          best of my knowledge and belief.
        </p>

        <div className="text-right mt-12 pt-8 border-t">
          <p className="mb-1">(Signature of the Deponent)</p>
          <p className="text-sm text-gray-600">Property Owner</p>
        </div>
      </div>
    </div>
  );
};

export default GstPreview;
