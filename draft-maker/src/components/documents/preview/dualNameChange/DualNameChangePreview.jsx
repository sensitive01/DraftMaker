import React, { useRef } from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

const DualNameChangePreview = ({ formData }) => {
  const pdfTemplateRef = useRef(null);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Single page preview with continuous content */}
        <div className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-300 rounded shadow relative mx-2 sm:mx-4 lg:mx-0 overflow-hidden font-serif w-full max-w-3xl">
          {/* Watermark */}
          <div className="watermark">INTERNAL PURPOSE ONLY</div>

          {/* Corner marks */}
          <div className="absolute top-0 left-0 border-t border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute top-0 right-0 border-t border-r w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 border-b border-l w-4 h-4 border-gray-400"></div>
          <div className="absolute bottom-0 right-0 border-b border-r w-4 h-4 border-gray-400"></div>

          <div className="relative z-20 font-serif">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center underline mb-4 sm:mb-6 md:mb-8 tracking-wider">
              AFFIDAVIT
            </h1>

            <div className="space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed">
              <p className="text-justify">
                I,{" "}
                <span
                  className={formData?.fullName ? "" : "bg-yellow-200 px-1"}
                >
                  <strong>
                    {formData?.namePrefix}{" "}
                    {formData?.fullName ||
                      "Mr/Mrs/Ms ..........................."}
                  </strong>
                </span>{" "}
                <span
                  className={formData?.relation ? "" : "bg-yellow-200 px-1"}
                >
                  <strong>{formData?.relation || "D/o, S/o, H/o, W/o"}</strong>
                </span>{" "}
                <span
                  className={formData?.relationName ? "" : "bg-yellow-200 px-1"}
                >
                  <strong>
                    {formData?.relationName || "..................."}
                  </strong>
                </span>
                , Aged:{" "}
                <span className={formData?.age ? "" : "bg-yellow-200 px-1"}>
                  <strong>{formData?.age || "......"}</strong>
                </span>{" "}
                Years,
              </p>

              <p className="text-justify">
                Permanent Address{" "}
                <span
                  className={
                    formData?.permanentAddress ? "" : "bg-yellow-200 px-1"
                  }
                >
                  <strong>
                    {formData?.permanentAddress ||
                      "Address Line 1, Address Line 2, City, State, Pin Code"}
                  </strong>
                </span>
              </p>

              <p className="text-justify">
                My Aadhaar No:{" "}
                <span
                  className={formData?.aadhaarNo ? "" : "bg-yellow-200 px-1"}
                >
                  <strong>{formData?.aadhaarNo || "0000 0000 0000"}</strong>
                </span>
              </p>

              <p className="text-justify font-medium">
                Do hereby solemnly affirm and declare as under:
              </p>

              <div className="space-y-3 sm:space-y-4 md:space-y-5 pl-2 sm:pl-4 md:pl-6 mt-6 sm:mt-8">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                    1.
                  </span>
                  <p className="text-justify">
                    That I am the citizen of India.
                  </p>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                    2.
                  </span>
                  <p className="text-justify">
                    That my name has been recorded as{" "}
                    <span
                      className={formData?.name1 ? "" : "bg-yellow-200 px-1"}
                    >
                      <strong>{formData?.name1 || "NAME"}</strong>
                    </span>
                    , Name of document-
                    <span
                      className={
                        formData?.document1 ? "" : "bg-yellow-200 px-1"
                      }
                    >
                      <strong>
                        {formData?.document1 || "NAME OF DOCUMENT"}
                      </strong>
                    </span>
                    , Document Serial No-
                    <span
                      className={
                        formData?.documentNo1 ? "" : "bg-yellow-200 px-1"
                      }
                    >
                      <strong>
                        {formData?.documentNo1 || "DOCUMENT SERIAL NO"}
                      </strong>
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                    3.
                  </span>
                  <p className="text-justify">
                    That my name has been recorded as{" "}
                    <span
                      className={formData?.name2 ? "" : "bg-yellow-200 px-1"}
                    >
                      <strong>{formData?.name2 || "NAME"}</strong>
                    </span>
                    , Name of document-
                    <span
                      className={
                        formData?.document2 ? "" : "bg-yellow-200 px-1"
                      }
                    >
                      <strong>
                        {formData?.document2 || "NAME OF DOCUMENT"}
                      </strong>
                    </span>
                    , Document Serial No-
                    <span
                      className={
                        formData?.documentNo2 ? "" : "bg-yellow-200 px-1"
                      }
                    >
                      <strong>
                        {formData?.documentNo2 || "DOCUMENT SERIAL NO"}
                      </strong>
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                    4.
                  </span>
                  <p className="text-justify">
                    That I further declare that both the names mentioned here in
                    above belongs to one and the same person i.e.{" "}
                    <strong>"myself"</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                    5.
                  </span>
                  <p className="text-justify">
                    That my statement is true and correct.
                  </p>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 md:mt-12 text-justify">
                <p>
                  Verified at{" "}
                  <span className={formData?.place ? "" : "bg-yellow-200 px-1"}>
                    <strong>{formData?.place || "PLACE"}</strong>
                  </span>{" "}
                  on this{" "}
                  <span className={formData?.day ? "" : "bg-yellow-200 px-1"}>
                    <strong>{getDayWithSuffix(formData?.day) || "XX"}</strong>
                  </span>{" "}
                  day of{" "}
                  <span className={formData?.month ? "" : "bg-yellow-200 px-1"}>
                    <strong>{formData?.month || "XXXX"}</strong>
                  </span>
                  ,{" "}
                  <span className={formData?.year ? "" : "bg-yellow-200 px-1"}>
                    <strong>{formData?.year || "XXXX"}</strong>
                  </span>{" "}
                  that the contents of the above said affidavit are true and
                  correct to the best of my knowledge and belief.
                </p>
              </div>

              <div className="mt-12 sm:mt-16 md:mt-20 text-right">
                <div className="inline-block">
                  <p className="text-sm sm:text-base md:text-lg">
                    (Signature of the Deponent)
                  </p>
                  <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base md:text-lg">
                    {formData?.fullName}
                  </p>
                </div>
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
                  textDecoration: "underline",
                }}
              >
                AFFIDAVIT
              </h1>

              <p style={{ marginBottom: "16px", lineHeight: "1.5" }}>
                I,{" "}
                <span
                  style={
                    formData?.fullName
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
                  }
                >
                  {formData?.namePrefix}{" "}
                  {formData?.fullName ||
                    "Mr/Mrs/Ms ..........................."}
                </span>{" "}
                <span
                  style={
                    formData?.relation
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
                  }
                >
                  {formData?.relation || "D/o, S/o, H/o, W/o"}
                </span>{" "}
                <span
                  style={
                    formData?.relationName
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
                  }
                >
                  {formData?.relationName || "..................."}
                </span>
                , Aged:{" "}
                <span
                  style={
                    formData?.age
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
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
                    formData?.permanentAddress
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
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
                    formData?.aadhaarNo
                      ? { fontWeight: "bold" }
                      : {
                          backgroundColor: "#FEFCBF",
                          padding: "0 0.25rem",
                          fontWeight: "bold",
                        }
                  }
                >
                  {formData?.aadhaarNo || "0000 0000 0000"}
                </span>
              </p>

              <p
                style={{
                  marginBottom: "20px",
                  lineHeight: "1.5",
                  fontWeight: "500",
                }}
              >
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
                      formData?.name1
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.name1 || "NAME"}
                  </span>
                  , Name of document-
                  <span
                    style={
                      formData?.document1
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.document1 || "NAME OF DOCUMENT"}
                  </span>
                  , Document Serial No-
                  <span
                    style={
                      formData?.documentNo1
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
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
                      formData?.name2
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.name2 || "NAME"}
                  </span>
                  , Name of document-
                  <span
                    style={
                      formData?.document2
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.document2 || "NAME OF DOCUMENT"}
                  </span>
                  , Document Serial No-
                  <span
                    style={
                      formData?.documentNo2
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.documentNo2 || "DOCUMENT SERIAL NO"}
                  </span>
                </li>

                <li style={{ marginBottom: "16px" }}>
                  That I further declare that both the names mentioned{" "}
                  <span style={{ textDecoration: "underline" }}>
                    hereinabove
                  </span>{" "}
                  belongs to one and the same person i.e.{" "}
                  <span style={{ fontWeight: "bold" }}>"myself"</span>.
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
                      formData?.place
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.place || "PLACE"}
                  </span>{" "}
                  on this{" "}
                  <span
                    style={
                      formData?.day
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {getDayWithSuffix(formData?.day) || "XX"}
                  </span>{" "}
                  day of{" "}
                  <span
                    style={
                      formData?.month
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
                    }
                  >
                    {formData?.month || "XXXX"}
                  </span>
                  ,{" "}
                  <span
                    style={
                      formData?.year
                        ? { fontWeight: "bold" }
                        : {
                            backgroundColor: "#FEFCBF",
                            padding: "0 0.25rem",
                            fontWeight: "bold",
                          }
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
                <p style={{ marginTop: "12px", fontWeight: "600" }}>
                  {formData?.fullName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark styles */}
      <style jsx>{`
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          letter-spacing: 0.2em;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          user-select: none;
        }

        @media (max-width: 640px) {
          .watermark {
            font-size: 1.5rem;
            letter-spacing: 0.1em;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .watermark {
            font-size: 2rem;
            letter-spacing: 0.15em;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .watermark {
            font-size: 2.5rem;
            letter-spacing: 0.2em;
          }
        }

        @media (min-width: 1025px) {
          .watermark {
            font-size: 3rem;
            letter-spacing: 0.2em;
          }
        }

        @media print {
          .watermark {
            font-size: 4rem;
            color: rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </>
  );
};

export default DualNameChangePreview;
