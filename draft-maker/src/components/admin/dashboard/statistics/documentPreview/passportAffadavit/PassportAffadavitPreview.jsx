import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";

export default function PassportAffadavitPreview() {
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
    };
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg border border-gray-300 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">ANNEXURE 'F'</h1>
        <h2 className="text-xl font-semibold">
          SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU OF
          LOST/DAMAGED PASSPORT
        </h2>
      </div>

      <div className="space-y-6 text-sm">
        <div className="mb-4">
          <p>
            I, Mr/Mrs/Ms{" "}
            <span className="font-medium underline px-1">{formData.name}</span>{" "}
            {formData.relationType}{" "}
            <span className="font-medium underline px-1">
              {formData.guardianName}
            </span>
            , Aged:{" "}
            <span className="font-medium underline px-1">{formData.age}</span>{" "}
            Years,
          </p>
        </div>

        <div className="mb-4">
          <p className="mb-1">Permanent Address:</p>
          <p className="border-b border-black pb-1">
            {formData.permanentAddress}
          </p>
        </div>

        <div className="mb-4">
          <p className="mb-1">Present Address:</p>
          <p className="border-b border-black pb-1">
            {formData.presentAddress}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mb-4">
          <p>
            My Aadhaar No:{" "}
            <span className="font-medium underline px-1">
              {formData.aadhaarNo}
            </span>
          </p>
          <p>
            My Passport No:{" "}
            <span className="font-medium underline px-1">
              {formData.passportNo}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">
            1. State how and when the passport was lost/ damaged and when FIR
            was lodged at which Police Station and how many passports were lost/
            damaged earlier?
          </p>
          <p className="mb-1">DETAILS OF INCIDENT:</p>
          <div className="border-b border-black pb-1 min-h-12">
            <p>{formData.incidentDetails}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">
            2. State whether you travelled on the lost/ damaged passport, if so
            state flight number and date and port of entry into India?
          </p>
          <p>
            {formData.travelled}
            {formData.travelled === "YES" ? `: ${formData.travelDetails}` : ""}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">
            3. State whether you availed of any TR concessions/FTs allowance and
            if so details thereof?
          </p>
          <p>
            {formData.trConcessions}
            {formData.trConcessions === "YES"
              ? `: ${formData.concessionDetails}`
              : ""}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">
            4. State whether non-resident Indian and if resident abroad, the
            details of the residence as follows:
          </p>
          <p>{formData.nonResidentIndian}</p>

          {formData.nonResidentIndian === "YES" && (
            <table className="w-full border border-black mt-2">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-left w-16">
                    S. No.
                  </th>
                  <th className="border border-black p-2 text-left">
                    Name of the Country
                  </th>
                  <th className="border border-black p-2 text-left">
                    Length of residence from... To...
                  </th>
                  <th className="border border-black p-2 text-left">
                    Page Nos. of passport bearing departure and arrival stamps
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.residences.map(
                  (residence, index) =>
                    residence.country && (
                      <tr key={index}>
                        <td className="border border-black p-2">
                          {index + 1}.
                        </td>
                        <td className="border border-black p-2">
                          {residence.country}
                        </td>
                        <td className="border border-black p-2">
                          {residence.periodFrom} to {residence.periodTo}
                        </td>
                        <td className="border border-black p-2">
                          {residence.pageNos}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">
            5. State whether the Passport had any objection by the PIA and if so
            the details thereof.
          </p>
          <p>
            {formData.passportObjection}
            {formData.passportObjection === "YES"
              ? `: ${formData.objectionDetails}`
              : ""}
          </p>
        </div>

        <div className="mb-6">
          <p className="font-medium mb-1">
            6. State whether you were deported at any time at the expenses of
            the Government and if so was the expenditure incurred reimbursed to
            Government of India.
          </p>
          <p>
            {formData.deported}
            {formData.deported === "YES"
              ? `: ${formData.deportationDetails}`
              : ""}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm">
            I further affirm that I will take utmost care of my passport if
            issued and the Government will be at liberty to take any legal
            action under the Passports Act, 1967, if the lapse is repeated.
          </p>
        </div>

        <div className="flex justify-between mt-12">
          <div>
            <p>
              Date:{" "}
              <span className="font-medium">{formatDate(formData.date)}</span>
            </p>
            <p>
              PLACE: <span className="font-medium">{formData.place}</span>
            </p>
          </div>

          <div className="text-center">
            <div className="h-8">
              {formData.useNameAsSignature && (
                <p className="font-medium italic">{formData.name}</p>
              )}
            </div>
            <div className="border-t border-black w-48"></div>
            <p>(Signature of applicant)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
