import React, { useRef } from "react";

const DualNameChangePreview = ({ formData }) => {
  const pdfTemplateRef = useRef(null);

  // Function to check if a field is filled
  const isFilled = (value) => {
    return value && value.trim() !== "";
  };

  return (
    <div className="flex flex-col items-center">
      {/* Single page preview with continuous content */}
      <div className="bg-white border border-gray-300 shadow font-serif w-full max-w-3xl">
        <div className="relative p-8">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          {/* Page 1 Content */}
          <div className="mb-12">
            <h1 className="text-center font-bold text-xl mb-6">AFFIDAVIT</h1>

            <p className="mb-4">
              I,{" "}
              <span
                className={
                  isFilled(formData?.fullName) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.namePrefix}{" "}
                {formData?.fullName || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relation) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                className={
                  isFilled(formData?.relationName) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                className={isFilled(formData?.age) ? "" : "bg-yellow-200 px-1"}
              >
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address{" "}
              <span
                className={
                  isFilled(formData?.permanentAddress)
                    ? ""
                    : "bg-yellow-200 px-1"
                }
              >
                {formData?.permanentAddress ||
                  "Address Line 1, Address Line 2, City, State, Pin Code"}
              </span>
            </p>

            <p className="mb-4">
              My Aadhaar No:{" "}
              <span
                className={
                  isFilled(formData?.aadhaarNo) ? "" : "bg-yellow-200 px-1"
                }
              >
                {formData?.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-4">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          {/* Page 2 Content */}
          <div className="pl-6">
            <ol
              className="list-decimal space-y-6"
              style={{ counterReset: "item" }}
            >
              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {1}.
                </span>{" "}
                That I am the citizen of India.
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {2}.
                </span>{" "}
                That my name has been recorded as{" "}
                <span
                  className={
                    isFilled(formData?.name1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.name1 || "NAME"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.document1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.document1 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.documentNo1) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {3}.
                </span>{" "}
                That my name has been recorded as{" "}
                <span
                  className={
                    isFilled(formData?.name2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.name2 || "NAME"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.document2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.document2 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.documentNo2) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.documentNo2 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {4}.
                </span>{" "}
                That I further declare that both the names mentioned here in
                above belongs to one and the same person i.e. "myself".
              </li>

              <li style={{ display: "block", counterIncrement: "item" }}>
                <span style={{ display: "inline-block", width: "1.5em" }}>
                  {5}.
                </span>{" "}
                That my statement is true and correct.
              </li>
            </ol>

            <div className="mt-12">
              <p>
                Verified at{" "}
                <span
                  className={
                    isFilled(formData?.place) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={
                    isFilled(formData?.day) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  className={
                    isFilled(formData?.month) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={
                    isFilled(formData?.year) ? "" : "bg-yellow-200 px-1"
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-24 text-right pr-4">
              <p>(Signature of the Deponent)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden elements for download formatting - won't be visible */}
      <div className="hidden">
        <div
          id="pdf-template"
          ref={pdfTemplateRef}
          style={{
            width: "210mm",
            fontFamily: "Times New Roman",
            fontSize: "12pt",
          }}
        >
          {/* Page 1 */}
          <div
            style={{
              height: "297mm",
              position: "relative",
              padding: "20mm",
              pageBreakAfter: "always",
            }}
          >
            {/* Corner marks */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderTop: "1px solid #999",
                borderLeft: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                borderTop: "1px solid #999",
                borderRight: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                borderBottom: "1px solid #999",
                borderLeft: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                borderBottom: "1px solid #999",
                borderRight: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>

            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16pt",
                marginBottom: "24px",
              }}
            >
              AFFIDAVIT
            </h1>

            <p style={{ marginBottom: "16px", lineHeight: "1.5" }}>
              I,{" "}
              <span
                style={
                  isFilled(formData?.fullName)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.fullName || "Mr/Mrs/Ms ..........................."}
              </span>{" "}
              <span
                style={
                  isFilled(formData?.relation)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.relation || "D/o, S/o, H/o, W/o"}
              </span>{" "}
              <span
                style={
                  isFilled(formData?.relationName)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.relationName || "..................."}
              </span>
              , Aged:{" "}
              <span
                style={
                  isFilled(formData?.age)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p style={{ marginBottom: "16px", lineHeight: "1.5" }}>
              Permanent Address{" "}
              <span
                style={
                  isFilled(formData?.permanentAddress)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.permanentAddress ||
                  "Address Line 1, Address Line 2, City, State, Pin Code"}
              </span>
            </p>

            <p style={{ marginBottom: "16px", lineHeight: "1.5" }}>
              My Aadhaar No:{" "}
              <span
                style={
                  isFilled(formData?.aadhaarNo)
                    ? {}
                    : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                }
              >
                {formData?.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>

            <p style={{ marginBottom: "20px", lineHeight: "1.5" }}>
              Do hereby solemnly affirm and declare as under:
            </p>

            {/* Start of the numbered list */}
            <ol
              style={{
                listStyleType: "decimal",
                marginLeft: "20px",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              <li style={{ marginBottom: "16px" }}>
                That I am the citizen of India.
              </li>

              <li style={{ marginBottom: "16px" }}>
                That my name has been recorded as{" "}
                <span
                  style={
                    isFilled(formData?.name1)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.name1 || "NAME"}
                </span>
                ,{" "}
                <span
                  style={
                    isFilled(formData?.document1)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.document1 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  style={
                    isFilled(formData?.documentNo1)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                </span>
              </li>
            </ol>
          </div>

          {/* Page 2 */}
          <div
            style={{ height: "297mm", position: "relative", padding: "20mm" }}
          >
            {/* Corner marks */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderTop: "1px solid #999",
                borderLeft: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                borderTop: "1px solid #999",
                borderRight: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                borderBottom: "1px solid #999",
                borderLeft: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                borderBottom: "1px solid #999",
                borderRight: "1px solid #999",
                width: "16px",
                height: "16px",
              }}
            ></div>

            {/* Continue the numbered list */}
            <ol
              style={{
                listStyleType: "decimal",
                marginLeft: "20px",
                lineHeight: "1.6",
                marginBottom: "24px",
              }}
              start="3"
            >
              <li style={{ marginBottom: "16px" }}>
                That my name has been recorded as{" "}
                <span
                  style={
                    isFilled(formData?.name2)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.name2 || "NAME"}
                </span>
                ,{" "}
                <span
                  style={
                    isFilled(formData?.document2)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.document2 || "NAME OF DOCUMENT"}
                </span>
                ,{" "}
                <span
                  style={
                    isFilled(formData?.documentNo2)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.documentNo2 || "DOCUMENT SERIAL NO"}
                </span>
              </li>

              <li style={{ marginBottom: "16px" }}>
                That I further declare that both the names mentioned{" "}
                <span style={{ textDecoration: "underline" }}>hereinabove</span>{" "}
                belongs to one and the same person i.e. "myself".
              </li>

              <li style={{ marginBottom: "16px" }}>
                That my statement is true and correct.
              </li>
            </ol>

            <div style={{ marginTop: "40px", lineHeight: "1.5" }}>
              <p>
                Verified at{" "}
                <span
                  style={
                    isFilled(formData?.place)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  style={
                    isFilled(formData?.day)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.day || "XX"}
                </span>{" "}
                day of{" "}
                <span
                  style={
                    isFilled(formData?.month)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  style={
                    isFilled(formData?.year)
                      ? {}
                      : { backgroundColor: "#FEFCBF", padding: "0 0.25rem" }
                  }
                >
                  {formData?.year || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div
              style={{
                marginTop: "60px",
                textAlign: "right",
                paddingRight: "20px",
              }}
            >
              <p>(Signature of the Deponent)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualNameChangePreview;
