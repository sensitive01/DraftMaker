import React from "react";
import "./RentalPreview.css";


const RentalPreview = ({ formData }) => {
  return (
    <div>
      <div className="rental-agreement-container">
        {/* Page 1 */}
        <div className="page">
          <div className="corner corner-top-left"></div>
          <div className="corner corner-top-right"></div>
          <div className="corner corner-bottom-left"></div>
          <div className="corner corner-bottom-right"></div>

          <div className="agreement-title">RENTAL AGREEMENT</div>

          <p className="paragraph">
            This Tenancy Agreement is made and executed at Bangalore, on this{" "}
            <span className="highlight">
              {formData.agreementDate
                ? new Date(formData.agreementDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date, Month, Year"}
            </span>
            , by & between:
          </p>

          <p className="paragraph">
            <span className="highlight">
              {formData.lessorName || "LESSOR NAME"}
            </span>
            ,
            <br />
            Address{" "}
            <span className="highlight">
              [{formData.lessorAddressLine1 || "LESSOR Address Line 1"},{" "}
              {formData.lessorAddressLine2 || "Address Line 2"},{" "}
              {formData.lessorCity || "City"}, {formData.lessorState || "State"}
              , {formData.lessorPinCode || "Pin Code"}]
            </span>
          </p>

          <p className="paragraph">
            Hereinafter referred to as the "LESSOR" of ONE PART.
          </p>

          <p className="paragraph" style={{ fontWeight: "bold" }}>
            AND
          </p>

          <p className="paragraph">
            <span className="highlight">
              {formData.lesseeName || "LESSOR NAME"}
            </span>
            ,
            <br />
            Aadhaar No:{" "}
            <span className="highlight">
              {formData.lesseeAadhaar || "0000 0000 0000"}
            </span>
            <br />
            Permanent Address{" "}
            <span className="highlight">
              [{formData.lesseePermanentAddressLine1 || "LESSOR Address Line 1"}
              , {formData.lesseePermanentAddressLine2 || "Address Line 2"},{" "}
              {formData.lesseePermanentCity || "City"},{" "}
              {formData.lesseePermanentState || "State"},{" "}
              {formData.lesseePermanentPinCode || "Pin Code"}]
            </span>
          </p>

          <p className="paragraph">
            In consideration of the rent hereinafter called as "LESSEE".
          </p>

          <p className="paragraph">
            WHEREAS the Owner is the sole and absolute owner of the Premises
            situated at{" "}
            <span className="highlight">
              [{formData.propertyAddressLine1 || "LESSOR Address Line 1"},{" "}
              {formData.propertyAddressLine2 || "Address Line 2"},{" "}
              {formData.propertyCity || "City"},{" "}
              {formData.propertyState || "State"},{" "}
              {formData.propertyPinCode || "Pin Code"}]
            </span>{" "}
            more fully described in Schedule. The tenant for want of
            accommodation requested the owner to let out premises and Owner has
            also agreed to let out under the following terms and conditions:
          </p>

          <p className="paragraph" style={{ fontWeight: "bold" }}>
            NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
          </p>

          <ol className="clause-list">
            <li>
              <span className="clause-title">Rent:</span> The LESSEE shall pay a
              monthly rent of Rs.{" "}
              <span className="highlight">
                {formData.rentAmount || "00,000"}
              </span>{" "}
              /- (Rupees{" "}
              <span className="highlight">
                {formData.rentAmountWords || "in words Only"}
              </span>
              ) Including Maintenance Charges on or before 5<sup>th</sup> of
              every month of English calendar.
            </li>
            <li>
              <span className="clause-title">Deposit:</span> The LESSEE have
              paid a total sum of Rs.{" "}
              <span className="highlight">
                {formData.depositAmount || "00,000"}
              </span>
              /- (Rupees{" "}
              <span className="highlight">
                {formData.depositAmountWords || "in words Only"}
              </span>
              ) Paid Rs{" "}
              <span className="highlight">
                {formData.depositAmount || "00,000"}
              </span>{" "}
              by way of cash/online as security deposit and advance which the
              LESSOR hereby acknowledges the said sum shall carry no interest
              but refundable to the LESSEE on the termination of the tenancy.
            </li>
            <li>
              <span className="clause-title">Duration:</span> The Tenancy shall
              be in force for a period of 11 (Eleven) months commencing from{" "}
              <span className="highlight">
                {formData.agreementStartDate
                  ? new Date(formData.agreementStartDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Date, Month, Year"}
              </span>{" "}
              and the month of tenancy being the English calendar month. After
              the expiry of 11 months the LESSEE shall pay an increase of{" "}
              <span className="highlight">
                {formData.rentIncreasePercentage || "00"}%
              </span>{" "}
              in the existing rent.
            </li>
            <li>
              <span className="clause-title">Sub-letting:</span> The LESSEE
              shall not use the premises for any offensive or objectionable
              purpose and shall not have consent of the LESSOR hereby to sublet,
              under let or part with the possession to whomsoever or make any
              alteration.
            </li>
            <li>
              <span className="clause-title">Delivery back of possession:</span>{" "}
              On termination of the tenancy period to any renewal thereof, the
              LESSEE shall deliver back vacant possession of the
            </li>
          </ol>

          <div className="page-number">Page 1 of 3</div>
        </div>

        <div className="page-break"></div>

        {/* Page 2 */}
        <div className="page">
          <div className="corner corner-top-left"></div>
          <div className="corner corner-top-right"></div>
          <div className="corner corner-bottom-left"></div>
          <div className="corner corner-bottom-right"></div>

          <p className="paragraph">
            schedule premises to the LESSOR in the same condition in which it
            was handed over at the time of joining.
          </p>

          <ol className="clause-list" start="6">
            <li>
              <span className="clause-title">Notice:</span> If the LESSOR or the
              LESSEE wishes to terminate the Rental Agreement period each party
              should issue{" "}
              <span className="highlight">
                {formData.noticePeriod || "......"}
              </span>{" "}
              month notice in writing to each other.
            </li>
            <li>
              <span className="clause-title">Additions and alterations:</span>{" "}
              The LESSEE shall not cause any damages to the fixed fixtures on
              the above said property. Any damages caused shall be repaired at
              the cost of the LESSEE.
            </li>
            <li>
              <span className="clause-title">Terminate:</span> The LESSOR shall
              have the right to terminate the tenancy if the LESSEEs fails to
              pay the rents regularly for a consecutive period of{" "}
              <span className="highlight">
                {formData.defaultPeriod || "......"}
              </span>{" "}
              Months or commits breach of any of the terms herein mentioned and
              take possession of the premises.
            </li>
            <li>
              <span className="clause-title">
                Painting and Cleaning Charges:
              </span>{" "}
              At the time of vacating the premises the LESSEE shall pay{" "}
              <span className="highlight">
                {formData.paintingCharges || "............"}
              </span>{" "}
              as a painting and cleaning charges or such amount will be deducted
              from the deposit amount.
            </li>
            <li>
              <span className="clause-title">Electricity and other Taxes:</span>{" "}
              The LESSEE shall bear and pay the Electrical charges consumed as
              per the meter provided to concerned authorities and the LESSOR
              shall pay the property taxes.
            </li>
            <li>
              <span className="clause-title">Inspection:</span> The LESSOR or
              his representatives shall be entitled to enter the premises with
              prior appointment to inspect the same to satisfy himself that the
              premises if being and used in accordance with the terms of
              Agreement.
            </li>
            <li>
              The LESSEE shall use the premises for{" "}
              <span className="highlight">"RESIDENTIAL PURPOSE"</span> only.
            </li>
          </ol>

          <div className="schedule">
            <div className="schedule-title">SCHEDULE</div>
            <p>
              All the piece and parcel of the premises at{" "}
              <span className="highlight">
                [{formData.propertyAddressLine1 || "LESSOR Address Line 1"},{" "}
                {formData.propertyAddressLine2 || "Address Line 2"},{" "}
                {formData.propertyCity || "City"},{" "}
                {formData.propertyState || "State"},{" "}
                {formData.propertyPinCode || "Pin Code"}]
              </span>{" "}
              and consisting of{" "}
              <span className="highlight">
                {formData.bhkConfig || "XBHK"}, {formData.bedroomCount || "X"}{" "}
                bedroom, {formData.hallCount || "X"} Hall,{" "}
                {formData.kitchenCount || "X"} Kitchen with{" "}
                {formData.toiletCount || "X"}Toilets
              </span>
              , provided with electricity and water facilities
            </p>
          </div>

          <p className="paragraph">
            IN WITNESS WHEREOF the parties have set their respective hands unto
            this agreement the day, month and year first above written.
          </p>

          <div className="signatures">
            <div>
              <div>WITNESSES:</div>
              <div>1.</div>
              <div className="signature-block">
                <div className="signature-title">LESSOR</div>
                <div className="highlight">
                  {formData.lessorName || "LESSOR NAME"}
                </div>
              </div>
            </div>
            <div>
              <div>2.</div>
              <div className="signature-block">
                <div className="signature-title">LESSEE</div>
                <div className="highlight">
                  {formData.lesseeName || "LESSOR NAME"}
                </div>
              </div>
            </div>
          </div>

          <div className="page-number">Page 2 of 3</div>
        </div>

        <div className="page-break"></div>

        {/* Page 3 */}
        <div className="page">
          <div className="corner corner-top-left"></div>
          <div className="corner corner-top-right"></div>
          <div className="corner corner-bottom-left"></div>
          <div className="corner corner-bottom-right"></div>

          <div className="annexure">
            <div className="annexure-title">ANNEXURE I</div>
            <div>List of fixtures and fittings provided</div>
          </div>

          <table className="fixtures-table">
            <thead>
              <tr>
                <th className="serial-column">SL</th>
                <th className="item-column">ITEMS</th>
                <th className="quantity-column">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {(formData.fixtures && formData.fixtures.length > 0
                ? formData.fixtures
                : [
                    { item: "", quantity: "" },
                    { item: "", quantity: "" },
                    { item: "", quantity: "" },
                  ]
              ).map((fixture, index) => (
                <tr key={index}>
                  <td className="serial-column">{index + 1}</td>
                  <td>{fixture.item}</td>
                  <td className="quantity-column">{fixture.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="page-number">Page 3 of 3</div>
        </div>
      </div>

      <button className="print-button" onClick={() => window.print()}>
        Print Agreement
      </button>
    </div>
  );
};

export default RentalPreview;
