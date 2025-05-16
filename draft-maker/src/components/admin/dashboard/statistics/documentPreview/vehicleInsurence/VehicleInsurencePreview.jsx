import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

const VehicleInsurencePreview = () => {
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
  // Helper function to determine if a field needs highlighting
  const highlightIfEmpty = (value) => {
    return !value
      ? "bg-yellow-100 px-2 py-1 border-b border-dashed border-yellow-400"
      : "";
  };

  // Check if all form data exists
  const isFormDataEmpty = !formData;

  if (isFormDataEmpty) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200 shadow-md h-full flex items-center justify-center">
        <div>
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p className="mt-4 text-lg text-gray-500 font-medium">
            Fill the form to see your affidavit preview
          </p>
        </div>
      </div>
    );
  }

  // Format dates properly
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg border-2 border-gray-300 shadow-lg">
      <div className="max-w-3xl mx-auto">
        {/* Official Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-3">
            AFFIDAVIT
          </h1>
          <div className="border-b-2 border-black w-48 mx-auto mb-2"></div>
          <div className="border-b-2 border-black w-32 mx-auto"></div>
        </div>

        {/* Official Note */}
        <div className="text-sm text-gray-500 mb-10 text-center italic">
          [To be printed on a stamp paper of appropriate value as per State
          stamp duty laws]
        </div>

        <div className="space-y-7 text-gray-800 leading-relaxed text-lg">
          <p className="mb-6">
            I,{" "}
            {formData.title ? (
              formData.title
            ) : (
              <span className={highlightIfEmpty(formData.title)}>___</span>
            )}{" "}
            {formData.name ? (
              <span className="font-medium">{formData.name}</span>
            ) : (
              <span className={highlightIfEmpty(formData.name)}>
                _______________
              </span>
            )}{" "}
            {formData.relation ? (
              `${formData.relation}`
            ) : (
              <span className={highlightIfEmpty(formData.relation)}>
                ______
              </span>
            )}
            , Aged:{" "}
            <span className={highlightIfEmpty(formData.age)}>
              {formData.age || "___"}
            </span>{" "}
            Years,
          </p>

          <p className="mb-6">
            Permanent Address:{" "}
            <span className={highlightIfEmpty(formData.address)}>
              {formData.address || "_________________"}
            </span>
          </p>

          <p className="mb-8">
            My Aadhaar No:{" "}
            <span className={highlightIfEmpty(formData.aadhaar)}>
              {formData.aadhaar || "__ ____ ____"}
            </span>
          </p>

          <p className="font-medium text-xl mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>

          <ol className="list-decimal ml-6 space-y-10">
            <li>
              I am the owner of the Vehicle No-{" "}
              <span
                className={`font-medium ${highlightIfEmpty(
                  formData.vehicleNo
                )}`}
              >
                {formData.vehicleNo || "________"}
              </span>
              , VEHICLE MODEL:{" "}
              <span
                className={`font-medium ${highlightIfEmpty(
                  formData.vehicleModel
                )}`}
              >
                {formData.vehicleModel || "________"}
              </span>
              , Engine No-{" "}
              <span className={highlightIfEmpty(formData.engineNo)}>
                {formData.engineNo || "________"}
              </span>
              , Chassis No:{" "}
              <span className={highlightIfEmpty(formData.chassisNo)}>
                {formData.chassisNo || "________"}
              </span>{" "}
              Insured with{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.insurer)}`}
              >
                {formData.insurer || "________"}
              </span>{" "}
              Under Policy No:{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.policyNo)}`}
              >
                {formData.policyNo || "________"}
              </span>{" "}
              for the period{" "}
              <span className={highlightIfEmpty(formData.policyStart)}>
                {formatDate(formData.policyStart) || "________"}
              </span>{" "}
              to{" "}
              <span className={highlightIfEmpty(formData.policyEnd)}>
                {formatDate(formData.policyEnd) || "________"}
              </span>
              .
            </li>

            <li>
              Vehicle was Driven by{" "}
              <span
                className={`font-medium ${highlightIfEmpty(
                  formData.driverName
                )}`}
              >
                {formData.driverName || "________"}
              </span>{" "}
              and the Vehicle met with an accident as follows:
              <div className="bg-gray-50 p-6 mt-4 rounded-md border-l-4 border-blue-600">
                <p className="font-bold text-gray-700 mb-4">
                  DETAILS OF INCIDENT:
                </p>
                <p
                  className={`italic text-gray-700 leading-relaxed ${highlightIfEmpty(
                    formData.accidentDetails
                  )}`}
                >
                  {formData.accidentDetails ||
                    "Please provide detailed information about the accident including date, time, location, and circumstances"}
                </p>
              </div>
            </li>

            <li>
              The above accident was reported to the Police Station and the
              respective police acknowledgement has been submitted alongside
              other claim documents.
            </li>

            <li>
              I hereby confirm that no third-party injury / death / property
              damage is involved in this accident and there will not be any
              claim from any third party. In the event of any claim from any
              third party on account of the above accident, it shall be my
              responsibility to take such claims and the insurer is fully
              discharged of the liability under the policy by virtue of
              settlement of my claim for Damage to the Vehicle.
            </li>

            <li>
              I understand that providing false information in this affidavit
              may result in rejection of my claim and could have legal
              consequences under applicable laws.
            </li>
          </ol>

          <div className="mt-8 pt-4">
            <p>
              I hereby solemnly declare that the above statement is true to the
              best of my knowledge and belief and that I have not withheld or
              misrepresented any material facts.
            </p>
          </div>

          <div className="mt-8 pt-4">
            <p>
              Verified at{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.place)}`}
              >
                {formData.place || "________"}
              </span>{" "}
              on this{" "}
              <span className={highlightIfEmpty(formData.day)}>
                {formData.day || "__"}
              </span>{" "}
              day of{" "}
              <span
                className={`font-medium ${highlightIfEmpty(formData.month)}`}
              >
                {formData.month || "________"}
              </span>
              ,{" "}
              <span className={highlightIfEmpty(formData.year)}>
                {formData.year || "____"}
              </span>{" "}
              that the contents of the above said affidavit are true and correct
              to the best of my knowledge and belief.
            </p>
          </div>

          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 mt-24 mb-8">
            <div className="text-left">
              <div className="h-24 border-b-2 border-black mb-3"></div>
              <p className="font-medium">Signature of Notary Public</p>
              <p className="text-sm text-gray-600">With Seal</p>
            </div>

            <div className="text-right">
              <div className="h-24 border-b-2 border-black mb-3"></div>
              <p className="font-medium">Signature of the Deponent</p>
              <p className="text-sm text-gray-600">
                {formData.title ? formData.title : ""}{" "}
                {formData.name ? formData.name : ""}
              </p>
            </div>
          </div>

          {/* Stamp/Seal Placeholder */}
          <div className="mt-16 mb-6 text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-full h-40 w-40 mx-auto flex items-center justify-center text-gray-400">
              <p className="text-sm">Notary Seal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsurencePreview;
