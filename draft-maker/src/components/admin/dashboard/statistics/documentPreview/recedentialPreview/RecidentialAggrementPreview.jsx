import React, { useEffect, useRef, useState } from "react";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

const RecidentialAggrementPreview = () => {
  const previewRef = useRef(null);
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloadType, setDownloadType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAggrementFormData(bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
    };
    fetchData();
  }, [bookingId]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date, Month, Year";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // PDF Download Function
  const downloadPDF = () => {
    setLoading(true);
    setDownloadType("pdf");

    const element = previewRef.current;
    const opt = {
      margin: [20, 15, 20, 15], // top, left, bottom, right in mm
      filename: `Rental_Agreement_${bookingId || "document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compressPDF: true,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break",
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setLoading(false);
        setDownloadType("");
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setLoading(false);
        setDownloadType("");
      });
  };

  // Word Document Download Function
  const downloadWord = () => {
    setLoading(true);
    setDownloadType("word");

    try {
      const lessors = formData.lessors || [
        {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pinCode: "",
        },
      ];

      const lessees = formData.lessees || [
        {
          name: "",
          aadhaar: "",
          permanentAddressLine1: "",
          permanentAddressLine2: "",
          permanentCity: "",
          permanentState: "",
          permanentPinCode: "",
        },
      ];

      // Generate Word document content with ALL fields
      const wordDocument = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Rental Agreement</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4;
            margin: 2cm 1.5cm;
          }
          
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.8;
            color: #000000;
            margin: 0;
            padding: 20pt;
          }
          
          .page-container {
            width: 100%;
            max-width: 210mm;
          }
          
          .title-section {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 2px;
            margin-bottom: 25pt;
            margin-top: 10pt;
          }
          
          .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20pt;
            font-size: 11pt;
          }
          
          .info-table td {
            border: 1px solid #000000;
            padding: 8pt;
          }
          
          .info-table .label-cell {
            font-weight: bold;
            width: 35%;
            background-color: #f0f0f0;
          }
          
          .main-paragraph {
            text-align: justify;
            margin-bottom: 15pt;
            line-height: 1.8;
          }
          
          .party-section {
            margin-bottom: 20pt;
            padding-left: 10pt;
          }
          
          .party-name {
            font-weight: bold;
            font-size: 13pt;
          }
          
          .party-details {
            margin-top: 8pt;
            padding-left: 15pt;
            line-height: 1.6;
          }
          
          .party-designation {
            margin-top: 12pt;
            text-align: center;
            font-weight: bold;
          }
          
          .divider {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin: 20pt 0;
            letter-spacing: 3px;
          }
          
          .witnesseth {
            text-align: center;
            font-weight: bold;
            font-size: 13pt;
            margin: 25pt 0;
            text-decoration: underline;
          }
          
          .terms-section {
            margin-bottom: 25pt;
          }
          
          .term-item {
            margin-bottom: 15pt;
            page-break-inside: avoid;
          }
          
          .term-number {
            font-weight: bold;
            float: left;
            width: 30pt;
          }
          
          .term-content {
            margin-left: 35pt;
            text-align: justify;
            line-height: 1.8;
          }
          
          .highlight {
            font-weight: bold;
            background-color: #f5f5f5;
            padding: 2pt 4pt;
          }
          
          .schedule-section {
            margin-top: 30pt;
            margin-bottom: 25pt;
            page-break-inside: avoid;
          }
          
          .schedule-title {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            text-decoration: underline;
            margin-bottom: 15pt;
          }
          
          .schedule-content {
            text-align: justify;
            padding: 15pt;
            border: 2pt solid #000000;
            line-height: 1.8;
          }
          
          .witness-intro {
            text-align: justify;
            margin: 25pt 0;
            font-style: italic;
          }
          
          .signature-section {
            margin-top: 35pt;
          }
          
          .witnesses-block {
            margin-bottom: 25pt;
          }
          
          .witness-title {
            font-weight: bold;
            margin-bottom: 12pt;
          }
          
          .witness-line {
            margin-bottom: 10pt;
          }
          
          .signatures-row {
            display: table;
            width: 100%;
            margin-top: 30pt;
          }
          
          .signature-column {
            display: table-cell;
            width: 48%;
            vertical-align: top;
            padding: 0 10pt;
          }
          
          .signature-title {
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 15pt;
          }
          
          .signature-name {
            font-weight: bold;
            margin-bottom: 8pt;
          }
          
          .signature-line {
            margin-bottom: 5pt;
          }
          
          .signature-label {
            font-size: 10pt;
            font-style: italic;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .annexure-section {
            margin-top: 30pt;
          }
          
          .annexure-title {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            text-decoration: underline;
            margin-bottom: 10pt;
          }
          
          .annexure-subtitle {
            text-align: center;
            margin-bottom: 20pt;
          }
          
          .fixtures-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25pt;
          }
          
          .fixtures-table th,
          .fixtures-table td {
            border: 1px solid #000000;
            padding: 8pt;
          }
          
          .fixtures-table th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
          }
          
          .fixtures-table .sl-col {
            width: 10%;
            text-align: center;
          }
          
          .fixtures-table .item-col {
            width: 65%;
          }
          
          .fixtures-table .qty-col {
            width: 25%;
            text-align: center;
          }
          
          @media print {
            .page-break {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <!-- Title -->
          <div class="title-section">RENTAL AGREEMENT</div>
          
          <!-- Party Information Table -->
          <table class="info-table">
            <tr>
              <td class="label-cell">First Party</td>
              <td>${formData.firstParty || "Not Specified"}</td>
            </tr>
            <tr>
              <td class="label-cell">Second Party</td>
              <td>${formData.secondParty || "Not Specified"}</td>
            </tr>
            <tr>
              <td class="label-cell">Stamp Duty Paid By</td>
              <td>${
                formData.stampDutyPayer === "First Party"
                  ? formData.firstParty || "First Party"
                  : formData.stampDutyPayer === "Second Party"
                  ? formData.secondParty || "Second Party"
                  : "Not Selected"
              }</td>
            </tr>
          </table>
          
          <!-- Introduction -->
          <p class="main-paragraph">
            This Tenancy Agreement is made and executed at <strong>Bangalore</strong>, 
            on this <span class="highlight">${formatDate(
              formData.agreementDate
            )}</span>, by & between:
          </p>
          
          <!-- Lessors -->
          ${lessors
            .map(
              (lessor, index) => `
            <div class="party-section">
              <div class="party-name">${
                lessor.name || `LESSOR ${index + 1} NAME`
              }</div>
              <div class="party-details">
                <strong>Address:</strong> ${
                  lessor.addressLine1 || `LESSOR ${index + 1} Address Line 1`
                }${lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}${
                lessor.city ? ", " + lessor.city : ""
              }${lessor.state ? ", " + lessor.state : ""}${
                lessor.pinCode ? " - " + lessor.pinCode : ""
              }
              </div>
            </div>
          `
            )
            .join("")}
          
          <p class="party-designation">
            Hereinafter referred to as the <strong>"LESSOR"</strong> of ONE PART.
          </p>
          
          <p class="divider">AND</p>
          
          <!-- Lessees -->
          ${lessees
            .map(
              (lessee, index) => `
            <div class="party-section">
              <div class="party-name">${
                lessee.name || `LESSEE ${index + 1} NAME`
              }</div>
              <div class="party-details">
                <strong>Aadhaar No:</strong> ${
                  lessee.aadhaar || "0000 0000 0000"
                }<br/>
                <strong>Permanent Address:</strong> ${
                  lessee.permanentAddressLine1 ||
                  `LESSEE ${index + 1} Address Line 1`
                }${
                lessee.permanentAddressLine2
                  ? ", " + lessee.permanentAddressLine2
                  : ""
              }${lessee.permanentCity ? ", " + lessee.permanentCity : ""}${
                lessee.permanentState ? ", " + lessee.permanentState : ""
              }${lessee.permanentPinCode ? " - " + lessee.permanentPinCode : ""}
              </div>
            </div>
          `
            )
            .join("")}
          
          <p class="party-designation">
            In consideration of the rent hereinafter called as <strong>"LESSEE"</strong>.
          </p>
          
          <!-- Whereas Clause -->
          <p class="main-paragraph">
            <strong>WHEREAS</strong> the Owner is the sole and absolute owner of the Premises 
            situated at <span class="highlight">${
              formData.propertyAddress || getPropertyAddressString()
            }</span> 
            more fully described in Schedule. The tenant for want of accommodation requested the owner 
            to let out premises and Owner has also agreed to let out under the following terms and conditions:
          </p>
          
          <p class="witnesseth">NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:</p>
          
          <!-- Terms and Conditions -->
          <div class="terms-section">
            <div class="term-item">
              <div class="term-number">1.</div>
              <div class="term-content">
                <strong>Rent:</strong> The LESSEE shall pay a monthly rent of Rs. 
                <span class="highlight">${
                  formData.rentAmount || "00,000"
                }</span>/- 
                (Rupees <span class="highlight">${
                  formData.rentAmountWords || "In Words Only"
                }</span>) 
                Including Maintenance Charges on or before 5<sup>th</sup> of every month of English calendar.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">2.</div>
              <div class="term-content">
                <strong>Deposit:</strong> The LESSEE have paid a total sum of Rs. 
                <span class="highlight">${
                  formData.depositAmount || "00,000"
                }</span>/- 
                (Rupees <span class="highlight">${
                  formData.depositAmountWords || "In Words Only"
                }</span>) 
                Paid Rs <span class="highlight">${
                  formData.depositAmount || "00,000"
                }</span> 
                by way of cash/online as security deposit and advance which the LESSOR hereby acknowledges 
                the said sum shall carry no interest but refundable to the LESSEE on the termination of the tenancy.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">3.</div>
              <div class="term-content">
                <strong>Duration:</strong> The Tenancy shall be in force for a period of 11 (Eleven) months 
                commencing from <span class="highlight">${formatDate(
                  formData.agreementStartDate
                )}</span> 
                and the month of tenancy being the English calendar month. After the expiry of 11 months 
                the LESSEE shall pay an increase of 
                <span class="highlight">${
                  formData.rentIncreasePercentage || "00"
                }%</span> in the existing rent.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">4.</div>
              <div class="term-content">
                <strong>Sub-letting:</strong> The LESSEE shall not use the premises for any offensive or 
                objectionable purpose and shall not have consent of the LESSOR hereby to sublet, under let 
                or part with the possession to whomsoever or make any alteration.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">5.</div>
              <div class="term-content">
                <strong>Delivery back of possession:</strong> On termination of the tenancy period to any 
                renewal thereof, the LESSEE shall deliver back vacant possession of the schedule premises 
                to the LESSOR in the same condition in which it was handed over at the time of joining.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">6.</div>
              <div class="term-content">
                <strong>Notice:</strong> If the LESSOR or the LESSEE wishes to terminate the Commercial 
                Agreement period each party should issue 
                <span class="highlight">${
                  formData.noticePeriod || "One (1)"
                }</span> month notice in writing to each other.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">7.</div>
              <div class="term-content">
                <strong>Additions and alterations:</strong> The LESSEE shall not cause any damages to the 
                fixed fixtures on the above said property. Any damages caused shall be repaired at the cost of the LESSEE.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">8.</div>
              <div class="term-content">
                <strong>Terminate:</strong> The LESSOR shall have the right to terminate the tenancy if the 
                LESSEE fails to pay the rents regularly for a consecutive period of 
                <span class="highlight">${
                  formData.defaultPeriod || "Two (2)"
                }</span> Months or commits breach 
                of any of the terms herein mentioned and take possession of the premises.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">9.</div>
              <div class="term-content">
                <strong>Painting and Cleaning Charges:</strong> At the time of vacating the premises the LESSEE 
                shall pay <span class="highlight">Rs. ${
                  formData.paintingCharges || "5,000"
                }</span> as a painting 
                and cleaning charges or such amount will be deducted from the deposit amount.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">10.</div>
              <div class="term-content">
                <strong>Electricity and other Taxes:</strong> The LESSEE shall bear and pay the Electrical charges 
                consumed as per the meter provided to concerned authorities and the LESSOR shall pay the property taxes.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">11.</div>
              <div class="term-content">
                <strong>Inspection:</strong> The LESSOR or his representatives shall be entitled to enter the 
                premises with prior appointment to inspect the same to satisfy himself that the premises if being 
                and used in accordance with the terms of Agreement.
              </div>
            </div>
            
            <div class="term-item">
              <div class="term-number">12.</div>
              <div class="term-content">
                The LESSEE shall use the premises for <strong>"RESIDENTIAL PURPOSE"</strong> only.
              </div>
            </div>
            
            ${
              formData.additionaldetails
                ? `
            <div class="term-item">
              <div class="term-number">13.</div>
              <div class="term-content">
                <strong>Additional Terms:</strong> <span class="highlight">${formData.additionaldetails}</span>
              </div>
            </div>
            `
                : ""
            }
          </div>
          
          <!-- Schedule -->
          <div class="schedule-section">
            <div class="schedule-title">SCHEDULE</div>
            <div class="schedule-content">
              All the piece and parcel of the premises at 
              <span class="highlight">${
                formData.propertyAddress || getPropertyAddressString()
              }</span> 
              and consisting of 
              <span class="highlight">${formData.bhkConfig || "XBHK"}, ${
        formData.bedroomCount || "X"
      } bedroom, ${formData.hallCount || "X"} Hall, ${
        formData.kitchenCount || "X"
      } Kitchen with ${formData.toiletCount || "X"} Toilets</span>, 
              provided with electricity and water facilities.
            </div>
          </div>
          
          <!-- Witness Clause -->
          <p class="witness-intro">
            IN WITNESS WHEREOF the parties have set their respective hands unto this agreement 
            the day, month and year first above written.
          </p>
          
          <!-- Signatures -->
          <div class="signature-section">
            <div class="witnesses-block">
              <div class="witness-title">WITNESSES:</div>
              <div class="witness-line">1. _________________________</div>
              <div class="witness-line">2. _________________________</div>
            </div>
            
            <div class="signatures-row">
              <div class="signature-column">
                <div class="signature-title">LESSOR</div>
                ${lessors
                  .map(
                    (lessor) => `
                  <div class="signature-name">${
                    lessor.name || "LESSOR NAME"
                  }</div>
                  <div class="signature-line">_________________________</div>
                  <div class="signature-label">(Signature)</div>
                  <br/>
                `
                  )
                  .join("")}
              </div>
              
              <div class="signature-column">
                <div class="signature-title">LESSEE</div>
                ${lessees
                  .map(
                    (lessee) => `
                  <div class="signature-name">${
                    lessee.name || "LESSEE NAME"
                  }</div>
                  <div class="signature-line">_________________________</div>
                  <div class="signature-label">(Signature)</div>
                  <br/>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
          
          <!-- Page Break -->
          <div class="page-break"></div>
          
          <!-- Annexure -->
          <div class="annexure-section">
            <div class="annexure-title">ANNEXURE I</div>
            <div class="annexure-subtitle">List of fixtures and fittings provided</div>
            
            <table class="fixtures-table">
              <thead>
                <tr>
                  <th class="sl-col">SL</th>
                  <th class="item-col">ITEMS</th>
                  <th class="qty-col">QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                ${(formData.fixtures && formData.fixtures.length > 0
                  ? formData.fixtures
                  : Array(15).fill({ item: "", quantity: "" })
                )
                  .slice(0, 15)
                  .map(
                    (fixture, index) => `
                  <tr>
                    <td class="sl-col">${index + 1}</td>
                    <td class="item-col">${fixture.item || ""}</td>
                    <td class="qty-col">${fixture.quantity || ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

      // Create and download the Word document
      const blob = new Blob([wordDocument], {
        type: "application/msword",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Rental_Agreement_${bookingId || "document"}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setLoading(false);
      setDownloadType("");
    } catch (error) {
      console.error("Word generation failed:", error);
      setLoading(false);
      setDownloadType("");
    }
  };

  const renderLessors = () => {
    const lessors = formData.lessors || [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
      },
    ];

    return lessors.map((lessor, index) => (
      <div key={index} className="mb-5 text-justify leading-relaxed">
        <span className="font-semibold form-data">
          {lessor.name || `LESSOR ${index + 1} NAME`}
        </span>
        {index < lessors.length - 1 ? "," : ""}
        <br />
        Address:{" "}
        <span className="font-semibold form-data">
          {lessor.addressLine1 || `LESSOR ${index + 1} Address Line 1`}
          {lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}
          {lessor.city ? ", " + lessor.city : ""}
          {lessor.state ? ", " + lessor.state : ""}
          {lessor.pinCode ? " - " + lessor.pinCode : ""}
        </span>
      </div>
    ));
  };

  const renderLessees = () => {
    const lessees = formData.lessees || [
      {
        name: "",
        aadhaar: "",
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCity: "",
        permanentState: "",
        permanentPinCode: "",
      },
    ];

    return lessees.map((lessee, index) => (
      <div key={index} className="mb-5 text-justify leading-relaxed">
        <span className="font-semibold form-data">
          {lessee.name || `LESSEE ${index + 1} NAME`}
        </span>
        {index < lessees.length - 1 ? "," : ""}
        <br />
        Aadhaar No:{" "}
        <span className="font-semibold form-data">
          {lessee.aadhaar || "0000 0000 0000"}
        </span>
        <br />
        Permanent Address:{" "}
        <span className="font-semibold form-data">
          {lessee.permanentAddressLine1 || `LESSEE ${index + 1} Address Line 1`}
          {lessee.permanentAddressLine2
            ? ", " + lessee.permanentAddressLine2
            : ""}
          {lessee.permanentCity ? ", " + lessee.permanentCity : ""}
          {lessee.permanentState ? ", " + lessee.permanentState : ""}
          {lessee.permanentPinCode ? " - " + lessee.permanentPinCode : ""}
        </span>
      </div>
    ));
  };

  const renderWitnessSections = () => {
    const lessors = formData.lessors || [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
      },
    ];

    const lessees = formData.lessees || [
      {
        name: "",
        aadhaar: "",
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCity: "",
        permanentState: "",
        permanentPinCode: "",
      },
    ];

    return (
      <div className="mt-12 signature-grid">
        <div className="signature-col">
          <div className="font-semibold mb-2">WITNESSES:</div>
          <div className="mb-2">1. ________________________</div>
          <div className="mt-16">
            <div className="font-bold mb-1">LESSOR</div>
            {lessors.map((lessor, index) => (
              <div key={index} className="font-semibold form-data mb-1">
                {lessor.name || `LESSOR ${index + 1} NAME`}
              </div>
            ))}
            <div>(Signature)</div>
          </div>
        </div>
        <div className="signature-col">
          <div className="mb-2">2. ________________________</div>
          <div className="mt-16">
            <div className="font-bold mb-1">LESSEE</div>
            {lessees.map((lessee, index) => (
              <div key={index} className="font-semibold form-data mb-1">
                {lessee.name || `LESSEE ${index + 1} NAME`}
              </div>
            ))}
            <div>(Signature)</div>
          </div>
        </div>
      </div>
    );
  };

  const getPropertyAddress = () => {
    const lessor = formData.lessors?.[0] || {};
    return (
      <>
        {lessor.addressLine1 || "LESSOR Address Line 1"}
        {lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}
        {lessor.city ? ", " + lessor.city : ""}
        {lessor.state ? ", " + lessor.state : ""}
        {lessor.pinCode ? " - " + lessor.pinCode : ""}
      </>
    );
  };

  // Helper function for Word document property address
  const getPropertyAddressString = () => {
    const lessor = formData.lessors?.[0] || {};
    return `${lessor.addressLine1 || "LESSOR Address Line 1"}${
      lessor.addressLine2 ? ", " + lessor.addressLine2 : ""
    }${lessor.city ? ", " + lessor.city : ""}${
      lessor.state ? ", " + lessor.state : ""
    }${lessor.pinCode ? " - " + lessor.pinCode : ""}`;
  };

  return (
    <>
      {/* Download Buttons - Top Right */}
      <div className="flex justify-end mb-6 gap-3">
        <button
          onClick={downloadPDF}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
        >
          {loading && downloadType === "pdf" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Download PDF
            </>
          )}
        </button>

        <button
          onClick={downloadWord}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
        >
          {loading && downloadType === "word" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Generating Word...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Download Word
            </>
          )}
        </button>
      </div>

      <div className="max-w-full overflow-x-auto py-4">
        <div ref={previewRef} className="print-container">
          {/* Page 1 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

            {/* Content with proper legal document padding */}
            <div className="pdf-content">
              <div className="text-center font-bold text-xl mb-8 underline tracking-wide">
                RENTAL AGREEMENT
              </div>
              {formData.firstParty && formData.secondParty && (
                <div className="mb-6 relative z-10">
                  <table className="w-full border-collapse border border-gray-400 text-sm">
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                          First Party
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          {formData.firstParty}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                          Second Party
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          {formData.secondParty}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                          Stamp Duty Paid By
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          {formData.stampDutyPayer === "First Party"
                            ? formData.firstParty
                            : formData.stampDutyPayer === "Second Party"
                            ? formData.secondParty
                            : "Not Selected"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <p className="mb-5 text-justify leading-relaxed">
                This Tenancy Agreement is made and executed at Bangalore, on
                this{" "}
                <span className="font-semibold form-data px-1">
                  {formatDate(formData.agreementDate)}
                </span>
                , by & between:
              </p>
              {renderLessors()}

              <p className="mb-5 text-justify leading-relaxed">
                Hereinafter referred to as the{" "}
                <span className="font-semibold">"LESSOR"</span> of ONE PART.
              </p>

              <p className="mb-5 font-bold text-center">AND</p>
              {renderLessees()}

              <p className="mb-5 text-justify leading-relaxed">
                In consideration of the rent hereinafter called as{" "}
                <span className="font-semibold">"LESSEE"</span>.
              </p>

              <p className="mb-5 text-justify leading-relaxed">
                WHEREAS the Owner is the sole and absolute owner of the Premises
                situated at{" "}
                <span className="font-semibold form-data">
                  {getPropertyAddress() || "Complete Property Address"}
                </span>{" "}
                more fully described in Schedule. The tenant for want of
                accommodation requested the owner to let out premises and Owner
                has also agreed to let out under the following terms and
                conditions:
              </p>

              <p className="mb-5 font-bold text-center">
                NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
              </p>

              <div className="pl-8 mb-5 space-y-4">
                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">1.</span>
                  <div>
                    <span className="font-semibold">Rent:</span> The LESSEE
                    shall pay a monthly rent of Rs.{" "}
                    <span className="font-semibold form-data">
                      {formData.rentAmount || "00,000"}
                    </span>{" "}
                    /- (Rupees{" "}
                    <span className="font-semibold form-data">
                      {formData.rentAmountWords || "In Words Only"}
                    </span>
                    ) Including Maintenance Charges on or before 5<sup>th</sup>{" "}
                    of every month of English calendar.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">2.</span>
                  <div>
                    <span className="font-semibold">Deposit:</span> The LESSEE
                    have paid a total sum of Rs.{" "}
                    <span className="font-semibold form-data">
                      {formData.depositAmount || "00,000"}
                    </span>
                    /- (Rupees{" "}
                    <span className="font-semibold form-data">
                      {formData.depositAmountWords || "In Words Only"}
                    </span>
                    ) Paid Rs{" "}
                    <span className="font-semibold form-data">
                      {formData.depositAmount || "00,000"}
                    </span>{" "}
                    by way of cash/online as security deposit and advance which
                    the LESSOR hereby acknowledges the said sum shall carry no
                    interest but refundable to the LESSEE on the termination of
                    the tenancy.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">3.</span>
                  <div>
                    <span className="font-semibold">Duration:</span> The Tenancy
                    shall be in force for a period of 11 (Eleven) months
                    commencing from{" "}
                    <span className="font-semibold form-data">
                      {formatDate(formData.agreementStartDate)}
                    </span>{" "}
                    and the month of tenancy being the English calendar month.
                    After the expiry of 11 months the LESSEE shall pay an
                    increase of{" "}
                    <span className="font-semibold form-data">
                      {formData.rentIncreasePercentage || "00"}%
                    </span>{" "}
                    in the existing rent.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">4.</span>
                  <div>
                    <span className="font-semibold">Sub-letting:</span> The
                    LESSEE shall not use the premises for any offensive or
                    objectionable purpose and shall not have consent of the
                    LESSOR hereby to sublet, under let or part with the
                    possession to whomsoever or make any alteration.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">5.</span>
                  <div>
                    <span className="font-semibold">
                      Delivery back of possession:
                    </span>{" "}
                    On termination of the tenancy period to any renewal thereof,
                    the LESSEE shall deliver back vacant possession of the
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page break marker */}
          <div className="page-break"></div>

          {/* Page 2 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

            <div className="pdf-content">
              <p className="mb-5 text-justify leading-relaxed">
                schedule premises to the LESSOR in the same condition in which
                it was handed over at the time of joining.
              </p>

              <div className="pl-8 mb-5 space-y-4">
                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">6.</span>
                  <div>
                    <span className="font-semibold">Notice:</span> If the LESSOR
                    or the LESSEE wishes to terminate the Commercial Agreement
                    period each party should issue{" "}
                    <span className="font-semibold form-data">
                      {formData.noticePeriod || "..."}
                    </span>{" "}
                    month notice in writing to each other.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">7.</span>
                  <div>
                    <span className="font-semibold">
                      Additions and alterations:
                    </span>{" "}
                    The LESSEE shall not cause any damages to the fixed fixtures
                    on the above said property. Any damages caused shall be
                    repaired at the cost of the LESSEE.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">8.</span>
                  <div>
                    <span className="font-semibold">Terminate:</span> The LESSOR
                    shall have the right to terminate the tenancy if the LESSEEs
                    fails to pay the rents regularly for a consecutive period of{" "}
                    <span className="font-semibold form-data">
                      {formData.defaultPeriod || "2"}
                    </span>{" "}
                    Months or commits breach of any of the terms herein
                    mentioned and take possession of the premises.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">9.</span>
                  <div>
                    <span className="font-semibold">
                      Painting and Cleaning Charges:
                    </span>{" "}
                    At the time of vacating the premises the LESSEE shall pay{" "}
                    <span className="font-semibold form-data">
                      Rs. {formData.paintingCharges || "..."}
                    </span>{" "}
                    as a painting and cleaning charges or such amount will be
                    deducted from the deposit amount.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">10.</span>
                  <div>
                    <span className="font-semibold">
                      Electricity and other Taxes:
                    </span>{" "}
                    The LESSEE shall bear and pay the Electrical charges
                    consumed as per the meter provided to concerned authorities
                    and the LESSOR shall pay the property taxes.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">11.</span>
                  <div>
                    <span className="font-semibold">Inspection:</span> The
                    LESSOR or his representatives shall be entitled to enter the
                    premises with prior appointment to inspect the same to
                    satisfy himself that the premises if being and used in
                    accordance with the terms of Agreement.
                  </div>
                </div>

                <div className="text-justify leading-relaxed flex">
                  <span className="font-semibold mr-3 flex-shrink-0">12.</span>
                  <div>
                    The LESSEE shall use the premises for{" "}
                    <span className="font-semibold">"RESIDENTIAL PURPOSE"</span>{" "}
                    only.
                  </div>
                </div>
                {formData.additionaldetails && (
                  <div className="text-justify leading-relaxed flex">
                    <span className="font-semibold mr-3 flex-shrink-0">
                      13.
                    </span>
                    <div className="font-semibold form-data">
                      {formData.additionaldetails}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 mb-6">
                <div className="text-center font-bold mb-5 text-lg underline">
                  SCHEDULE
                </div>
                <p className="text-justify leading-relaxed">
                  All the piece and parcel of the premises at{" "}
                  <span className="font-semibold form-data">
                    {getPropertyAddress()}
                  </span>{" "}
                  and consisting of and consisting of{" "}
                  <span className="font-semibold form-data">
                    {formData.bhkConfig || "XBHK"},{" "}
                    {formData.bedroomCount || "X"} bedroom,{" "}
                    {formData.hallCount || "X"} Hall,{" "}
                    {formData.kitchenCount || "X"} Kitchen with{" "}
                    {formData.toiletCount || "X"} Toilets
                  </span>
                  , provided with electricity and water facilities.
                </p>
              </div>

              <p className="mb-6 text-justify leading-relaxed">
                IN WITNESS WHEREOF the parties have set their respective hands
                unto this agreement the day, month and year first above written.
              </p>

              {renderWitnessSections()}
            </div>
          </div>

          {/* Page break marker */}
          <div className="page-break"></div>

          {/* Page 3 */}
          <div className="page relative bg-white shadow-md mx-auto mb-8">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500"></div>

            <div className="pdf-content">
              <div className="text-center mt-6 mb-8">
                <div className="font-bold mb-2 text-lg underline">
                  ANNEXURE I
                </div>
                <div>List of fixtures and fittings provided</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-black p-3 bg-gray-100 text-center w-1/12 font-semibold">
                        SL
                      </th>
                      <th className="border border-black p-3 bg-gray-100 text-center w-7/12 font-semibold">
                        ITEMS
                      </th>
                      <th className="border border-black p-3 bg-gray-100 text-center w-1/4 font-semibold">
                        QUANTITY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.fixtures && formData.fixtures.length > 0
                      ? formData.fixtures
                      : Array(15).fill({ item: "", quantity: "" })
                    )
                      .slice(0, 15)
                      .map((fixture, index) => (
                        <tr key={index}>
                          <td className="border border-black p-3 text-center h-10">
                            {index + 1}
                          </td>
                          <td className="border border-black p-3 h-10">
                            <span className="form-data">{fixture.item}</span>
                          </td>
                          <td className="border border-black p-3 text-center h-10">
                            <span className="form-data">
                              {fixture.quantity}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for PDF generation and responsive display */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");

        .page {
          font-family: "Libre Baskerville", "Times New Roman", Times, serif;
          line-height: 1.6;
          color: #111827;
          position: relative;
        }

        .pdf-content {
          padding: 40px 30px;
          min-height: calc(297mm - 80px);
          box-sizing: border-box;
        }

        /* Enhanced form data styling */
        .form-data {
          font-weight: bold !important;
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          color: #1f2937;
          display: inline-block;
        }

        /* Page break styling for PDF */
        .page-break {
          page-break-before: always;
          height: 1px;
          visibility: hidden;
        }

        /* Signature grid for better layout */
        .signature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .page {
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            background: white !important;
            page-break-after: always;
            padding: 0 !important;
            position: relative;
          }
          .pdf-content {
            padding: 25mm 20mm !important;
            height: 247mm !important;
            overflow: hidden;
          }
          .page-break {
            display: none;
          }
          .form-data {
            background-color: transparent !important;
            font-weight: bold !important;
          }
        }

        /* A4 styling for screen */
        @media screen {
          .page {
            background: white;
            width: 100%;
            max-width: 210mm;
            min-height: 297mm;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
        }

        /* Responsive adjustments */
        @media screen and (max-width: 768px) {
          .pdf-content {
            padding: 20px 15px;
          }

          .page {
            min-height: auto;
            box-shadow: none;
            border: 1px solid #e5e7eb;
          }

          .signature-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media screen and (max-width: 640px) {
          .pdf-content {
            padding: 15px 10px;
          }

          .page {
            min-height: auto;
          }

          .text-xl {
            font-size: 1.125rem;
          }
        }

        /* Legal document styling */
        .text-justify {
          text-align: justify;
          hyphens: auto;
        }

        ol li {
          margin-bottom: 0.75rem;
        }

        table {
          border-spacing: 0;
        }

        th,
        td {
          vertical-align: middle;
        }

        /* Improved table styling for PDF */
        .border-collapse {
          border-collapse: collapse;
        }

        .border-black {
          border-color: #000000;
        }

        /* Enhanced typography for professional appearance */
        .font-semibold {
          font-weight: 600;
        }

        .font-bold {
          font-weight: 700;
        }

        /* Better spacing for lists */
        .space-y-4 > * + * {
          margin-top: 1rem;
        }

        /* Loading button animation */
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Button hover effects */
        .transition-colors {
          transition-property: background-color, border-color, color, fill,
            stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }

        /* Enhanced button styling */
        .bg-red-600 {
          background-color: #dc2626;
        }

        .hover\\:bg-red-700:hover {
          background-color: #b91c1c;
        }

        .disabled\\:bg-red-400:disabled {
          background-color: #f87171;
        }

        /* Flex utilities */
        .flex {
          display: flex;
        }

        .justify-end {
          justify-content: flex-end;
        }

        .items-center {
          align-items: center;
        }

        .gap-2 {
          gap: 0.5rem;
        }

        .gap-3 {
          gap: 0.75rem;
        }

        .flex-shrink-0 {
          flex-shrink: 0;
        }

        .mr-3 {
          margin-right: 0.75rem;
        }

        /* Grid utilities */
        .grid {
          display: grid;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        .md\\:grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .gap-8 {
          gap: 2rem;
        }

        /* Margin and padding utilities */
        .mb-1 {
          margin-bottom: 0.25rem;
        }
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        .mb-5 {
          margin-bottom: 1.25rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }
        .mt-6 {
          margin-top: 1.5rem;
        }
        .mt-10 {
          margin-top: 2.5rem;
        }
        .mt-12 {
          margin-top: 3rem;
        }
        .mt-16 {
          margin-top: 4rem;
        }
        .pl-8 {
          padding-left: 2rem;
        }
        .px-1 {
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .p-3 {
          padding: 0.75rem;
        }

        /* Text utilities */
        .text-center {
          text-align: center;
        }
        .text-justify {
          text-align: justify;
        }
        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        .leading-relaxed {
          line-height: 1.625;
        }
        .tracking-wide {
          letter-spacing: 0.025em;
        }
        .underline {
          text-decoration-line: underline;
        }

        /* Width utilities */
        .w-3 {
          width: 0.75rem;
        }
        .w-4 {
          width: 1rem;
        }
        .w-5 {
          width: 1.25rem;
        }
        .w-full {
          width: 100%;
        }
        .w-1\\/12 {
          width: 8.333333%;
        }
        .w-1\\/4 {
          width: 25%;
        }
        .w-7\\/12 {
          width: 58.333333%;
        }

        /* Height utilities */
        .h-3 {
          height: 0.75rem;
        }
        .h-4 {
          height: 1rem;
        }
        .h-5 {
          height: 1.25rem;
        }
        .h-10 {
          height: 2.5rem;
        }

        /* Border utilities */
        .border {
          border-width: 1px;
        }
        .border-t {
          border-top-width: 1px;
        }
        .border-r {
          border-right-width: 1px;
        }
        .border-b {
          border-bottom-width: 1px;
        }
        .border-l {
          border-left-width: 1px;
        }
        .border-black {
          border-color: #000000;
        }
        .border-gray-500 {
          border-color: #6b7280;
        }
        .border-gray-200 {
          border-color: #e5e7eb;
        }
        .rounded-lg {
          border-radius: 0.5rem;
        }
        .rounded-full {
          border-radius: 9999px;
        }

        /* Background utilities */
        .bg-white {
          background-color: #ffffff;
        }
        .bg-gray-100 {
          background-color: #f3f4f6;
        }
        .bg-blue-600 {
          background-color: #2563eb;
        }
        .hover\\:bg-blue-700:hover {
          background-color: #1d4ed8;
        }
        .disabled\\:bg-blue-400:disabled {
          background-color: #60a5fa;
        }

        /* Position utilities */
        .relative {
          position: relative;
        }
        .absolute {
          position: absolute;
        }
        .top-0 {
          top: 0px;
        }
        .right-0 {
          right: 0px;
        }
        .bottom-0 {
          bottom: 0px;
        }
        .left-0 {
          left: 0px;
        }

        /* Display utilities */
        .overflow-x-auto {
          overflow-x: auto;
        }
        .max-w-full {
          max-width: 100%;
        }

        /* Color utilities */
        .text-white {
          color: #ffffff;
        }
        .text-gray-500 {
          color: #6b7280;
        }

        /* Shadow utilities */
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Border utilities for tables */
        .border-2 {
          border-width: 2px;
        }
        .border-t-transparent {
          border-top-color: transparent;
        }
      `}</style>
    </>
  );
};

export default RecidentialAggrementPreview;
