
const TenancyForm = ({formData,handleChange,addFixture}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <form className="w-full md:w-1/2 space-y-4 overflow-y-auto h-screen p-4 border">
        <h2 className="text-xl font-bold">Tenancy Agreement Form</h2>

        <div className="grid grid-cols-2 gap-2">
          <input name="agreementDate" onChange={handleChange} placeholder="Agreement Date" className="input" />
          <input name="lessorName" onChange={handleChange} placeholder="Lessor Name" className="input" />
          <input name="lessorAddress1" onChange={handleChange} placeholder="Lessor Address Line 1" className="input" />
          <input name="lessorAddress2" onChange={handleChange} placeholder="Lessor Address Line 2" className="input" />
          <input name="lessorCity" onChange={handleChange} placeholder="Lessor City" className="input" />
          <input name="lessorState" onChange={handleChange} placeholder="Lessor State" className="input" />
          <input name="lessorPin" onChange={handleChange} placeholder="Lessor Pincode" className="input" />
        </div>

        <hr />

        <div className="grid grid-cols-2 gap-2">
          <input name="lesseeName" onChange={handleChange} placeholder="Lessee Name" className="input" />
          <input name="lesseeAadhaar" onChange={handleChange} placeholder="Aadhaar Number" className="input" />
          <input name="lesseeAddress1" onChange={handleChange} placeholder="Lessee Address Line 1" className="input" />
          <input name="lesseeAddress2" onChange={handleChange} placeholder="Lessee Address Line 2" className="input" />
          <input name="lesseeCity" onChange={handleChange} placeholder="Lessee City" className="input" />
          <input name="lesseeState" onChange={handleChange} placeholder="Lessee State" className="input" />
          <input name="lesseePin" onChange={handleChange} placeholder="Lessee Pincode" className="input" />
        </div>

        <hr />

        <input name="premisesAddress" onChange={handleChange} placeholder="Premises Address" className="input" />
        <input name="premisesSqFt" onChange={handleChange} placeholder="Size (Sq. Ft.)" className="input" />

        <hr />
        <input name="rentAmount" onChange={handleChange} placeholder="Rent Amount" className="input" />
        <input name="rentInWords" onChange={handleChange} placeholder="Rent in Words" className="input" />
        <label>
          <input type="checkbox" name="maintenanceIncluded" onChange={handleChange} />
          Maintenance Included
        </label>

        <hr />
        <input name="securityDeposit" onChange={handleChange} placeholder="Security Deposit" className="input" />
        <input name="securityInWords" onChange={handleChange} placeholder="Deposit in Words" className="input" />
        <input name="paidAmount" onChange={handleChange} placeholder="Paid Amount" className="input" />
        <select name="paymentMode" onChange={handleChange} className="input">
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>

        <hr />
        <input name="tenancyStartDate" onChange={handleChange} placeholder="Tenancy Start Date" className="input" />
        <input name="rentIncrease" onChange={handleChange} placeholder="Rent Increase (%)" className="input" />
        <input name="noticePeriod" onChange={handleChange} placeholder="Notice Period (months)" className="input" />
        <input name="defaultPeriod" onChange={handleChange} placeholder="Default Period (months)" className="input" />
        <input name="paintingCharge" onChange={handleChange} placeholder="Painting Charges" className="input" />

        <hr />
        <h3 className="font-semibold">Fixtures</h3>
        {formData.fixtureItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <input
              name="item"
              value={item.item}
              onChange={(e) => handleChange(e, idx, "fixtureItems")}
              placeholder="Item"
              className="input"
            />
            <input
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, idx, "fixtureItems")}
              placeholder="Quantity"
              className="input"
            />
          </div>
        ))}
        <button type="button" onClick={addFixture} className="btn">+ Add Fixture</button>

        <input name="witness1" onChange={handleChange} placeholder="Witness 1" className="input" />
        <input name="witness2" onChange={handleChange} placeholder="Witness 2" className="input" />
      </form>

     
    </div>
  );
};

export default TenancyForm;
