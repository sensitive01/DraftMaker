import React, { useEffect, useRef, useState } from "react";
import { getAggrementFormData } from "../../../../../../api/service/axiosService";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
// Add missing imports for document generation
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

const CommercialAggrementPreview = () => {
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
      filename: `Commercial_Agreement_${bookingId || "document"}.pdf`,
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
      // Create structured content for Word document
      const generateWordContent = () => {
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

        return `
        <div class="title-section">
          COMMERCIAL LEASE AGREEMENT
        </div>
         ${
           formData.firstParty
             ? `
      <div style="margin-bottom: 20px; line-height: 1.6;">
        <p style="margin-bottom: 8px;">
          <span style="font-size: 12pt;">First Party (Stamp Duty): </span>
          <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
            ${formData.firstParty}
          </strong>
        </p>
        <p style="font-size: 10pt; font-style: italic; margin-bottom: 16px;">
          (Responsible for payment of stamp duty charges as per applicable state regulations)
        </p>
        <p style="margin-bottom: 16px;">
          <span style="font-size: 12pt;">Second Party: </span>
          <strong style="background-color: #f3f4f6; padding: 2px 4px; font-weight: bold;">
            ${formData.secondParty}
          </strong>
        </p>
      </div>
    `
             : ""
         }

        <div class="intro-section">
          <p class="main-paragraph">
            This Commercial Lease Agreement is made and executed at <strong>Bangalore</strong>, 
            on this <span class="highlight-field">${formatDate(
              formData.agreementDate
            )}</span>, 
            by and between:
          </p>
        </div>

        <div class="parties-section">
          <div class="lessor-section">
            ${lessors
              .map(
                (lessor, index) => `
              <div class="party-info">
                <strong class="party-name">${
                  lessor.name || `LESSOR ${index + 1} NAME`
                }</strong>${index < lessors.length - 1 ? "," : ""}<br/>
                <div class="address-info">
                  <strong>Address:</strong> <span class="highlight-field">
                    ${
                      lessor.addressLine1 ||
                      `LESSOR ${index + 1} Address Line 1`
                    }${lessor.addressLine2 ? ", " + lessor.addressLine2 : ""}${
                  lessor.city ? ", " + lessor.city : ""
                }${lessor.state ? ", " + lessor.state : ""}${
                  lessor.pinCode ? " - " + lessor.pinCode : ""
                }
                  </span>
                </div>
              </div>
            `
              )
              .join("")}
            
            <p class="party-designation">
              Hereinafter referred to as the <strong>"LESSOR"</strong> of ONE PART.
            </p>
          </div>

          <div class="and-divider">AND</div>

          <div class="lessee-section">
            ${lessees
              .map(
                (lessee, index) => `
              <div class="party-info">
                <strong class="party-name">${
                  lessee.name || `LESSEE ${index + 1} NAME`
                }</strong>${index < lessees.length - 1 ? "," : ""}<br/>
                <div class="detail-info">
                  <strong>Aadhaar No:</strong> <span class="highlight-field">${
                    lessee.aadhaar || "0000 0000 0000"
                  }</span><br/>
                  <strong>Permanent Address:</strong> <span class="highlight-field">
                    ${
                      lessee.permanentAddressLine1 ||
                      `LESSEE ${index + 1} Address Line 1`
                    }${
                  lessee.permanentAddressLine2
                    ? ", " + lessee.permanentAddressLine2
                    : ""
                }${lessee.permanentCity ? ", " + lessee.permanentCity : ""}${
                  lessee.permanentState ? ", " + lessee.permanentState : ""
                }${
                  lessee.permanentPinCode ? " - " + lessee.permanentPinCode : ""
                }
                  </span>
                </div>
              </div>
            `
              )
              .join("")}
            
            <p class="party-designation">
              Hereinafter referred to as the <strong>"LESSEE"</strong> of the OTHER PART.
            </p>
          </div>
        </div>

        <div class="whereas-section">
          <p class="main-paragraph">
            <strong>WHEREAS</strong> the LESSOR is the sole and absolute owner of the commercial premises 
            situated at <span class="highlight-field">${
              formData.propertyAddress || "Complete Property Address"
            }</span> 
            more fully described in the Schedule hereto; and the LESSEE having requested the LESSOR 
            to lease the said premises for commercial purposes, and the LESSOR having agreed to the same 
            subject to the terms and conditions hereinafter contained.
          </p>
        </div>

        <div class="witnesseth-section">
          NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
        </div>

        <div class="terms-section">
          <div class="term-item">
            <div class="term-number">1.</div>
            <div class="term-content">
              <strong>RENT:</strong> The LESSEE shall pay a monthly rent of Rs. 
              <span class="highlight-field">${
                formData.rentAmount || "00,000"
              }</span>/- 
              (Rupees <span class="highlight-field">${
                formData.rentAmountWords || "In Words Only"
              }</span>) 
              inclusive of maintenance charges, payable on or before the 5th day of every English calendar month.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">2.</div>
            <div class="term-content">
              <strong>SECURITY DEPOSIT:</strong> The LESSEE has paid a sum of Rs. 
              <span class="highlight-field">${
                formData.depositAmount || "00,000"
              }</span>/- 
              (Rupees <span class="highlight-field">${
                formData.depositAmountWords || "In Words Only"
              }</span>) 
              as security deposit, which the LESSOR hereby acknowledges receipt of. The said deposit 
              shall carry no interest and shall be refundable to the LESSEE upon termination of this agreement, 
              subject to deductions for any damages or outstanding dues.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">3.</div>
            <div class="term-content">
              <strong>TERM OF LEASE:</strong> This lease shall be in force for a period of Eleven (11) months 
              commencing from <span class="highlight-field">${formatDate(
                formData.agreementStartDate
              )}</span>. 
              Upon expiry of the initial term, the rent shall be increased by 
              <span class="highlight-field">${
                formData.rentIncreasePercentage || "00"
              }%</span> 
              for any renewal period.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">4.</div>
            <div class="term-content">
              <strong>PERMITTED USE:</strong> The leased premises shall be used exclusively for 
              <strong>COMMERCIAL PURPOSES</strong> only. The LESSEE shall not use the premises 
              for any illegal, offensive, or objectionable purpose.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">5.</div>
            <div class="term-content">
              <strong>SUB-LETTING PROHIBITED:</strong> The LESSEE shall not, without the prior written 
              consent of the LESSOR, sub-let, under-let, assign, or part with possession of the 
              leased premises or any part thereof to any third party.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">6.</div>
            <div class="term-content">
              <strong>NOTICE FOR TERMINATION:</strong> Either party may terminate this agreement by giving 
              <span class="highlight-field">${
                formData.noticePeriod || "One (1)"
              }</span> month's 
              prior written notice to the other party.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">7.</div>
            <div class="term-content">
              <strong>MAINTENANCE AND REPAIRS:</strong> The LESSEE shall maintain the premises in good 
              condition and shall not cause any damage to fixtures, fittings, or the structure. 
              Any damages caused shall be repaired at the LESSEE's cost.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">8.</div>
            <div class="term-content">
              <strong>DEFAULT AND TERMINATION:</strong> The LESSOR shall have the right to terminate 
              this agreement if the LESSEE fails to pay rent for 
              <span class="highlight-field">${
                formData.defaultPeriod || "Two (2)"
              }</span> consecutive months 
              or commits any material breach of the terms herein.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">9.</div>
            <div class="term-content">
              <strong>PAINTING AND CLEANING CHARGES:</strong> Upon vacation of the premises, 
              the LESSEE shall pay Rs. <span class="highlight-field">${
                formData.paintingCharges || "5,000"
              }</span>/- 
              towards painting and cleaning charges, or the same shall be deducted from the security deposit.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">10.</div>
            <div class="term-content">
              <strong>UTILITIES AND TAXES:</strong> The LESSEE shall bear and pay all electricity charges 
              as per actual consumption. Property taxes shall be borne by the LESSOR.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">11.</div>
            <div class="term-content">
              <strong>RIGHT OF INSPECTION:</strong> The LESSOR or authorized representatives shall be 
              entitled to inspect the premises with reasonable prior notice to ensure compliance 
              with the terms of this agreement.
            </div>
          </div>

          <div class="term-item">
            <div class="term-number">12.</div>
            <div class="term-content">
              <strong>VACATION OF PREMISES:</strong> Upon termination or expiry of this agreement, 
              the LESSEE shall peacefully deliver vacant possession of the premises in the same 
              condition as received, normal wear and tear excepted.
            </div>
          </div>

          ${
            formData.additionaldetails
              ? `
            <div class="term-item">
              <div class="term-number">13.</div>
              <div class="term-content">
                <strong>ADDITIONAL TERMS:</strong> <span class="highlight-field">${formData.additionaldetails}</span>
              </div>
            </div>
          `
              : ""
          }
        </div>

        <div class="schedule-section">
          <div class="schedule-title">SCHEDULE OF PROPERTY</div>
          <p class="schedule-content">
            All that piece and parcel of commercial premises bearing address 
            <span class="highlight-field">${
              formData.propertyAddress || "Complete Property Address"
            }</span>, 
            consisting of <span class="highlight-field">
              ${
                formData.commercialType
                  ? formData.commercialType.toUpperCase()
                  : "SHOP/OFFICE"
              } 
              SPACE measuring ${formData.squareFeet || "XXX"} Square Feet
            </span>, complete with electricity and water connections.
          </p>
        </div>

        <div class="witness-section">
          <p class="witness-intro">
            IN WITNESS WHEREOF, the parties hereto have executed this Agreement on the day, 
            month and year first above written.
          </p>
        </div>

        <div class="signature-section">
          <div class="signature-block">
            <div class="witnesses-column">
              <div class="witness-title">WITNESSES:</div>
              <div class="witness-line">1. _________________________</div>
              <div class="witness-line">2. _________________________</div>
            </div>
          </div>

          <div class="parties-signature">
            <div class="lessor-signature">
              <div class="signature-title">LESSOR:</div>
              ${lessors
                .map(
                  (lessor) => `
                <div class="signature-name">${
                  lessor.name || "LESSOR NAME"
                }</div>
                <div class="signature-line">_________________________</div>
                <div class="signature-label">(Signature)</div>
              `
                )
                .join("")}
            </div>

            <div class="lessee-signature">
              <div class="signature-title">LESSEE:</div>
              ${lessees
                .map(
                  (lessee) => `
                <div class="signature-name">${
                  lessee.name || "LESSEE NAME"
                }</div>
                <div class="signature-line">_________________________</div>
                <div class="signature-label">(Signature)</div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="page-break"></div>

        <div class="annexure-section">
          <div class="annexure-title">ANNEXURE - I</div>
          <div class="annexure-subtitle">List of Fixtures and Fittings Provided</div>

          <table class="fixtures-table">
            <thead>
              <tr>
                <th class="sl-header">Sl. No.</th>
                <th class="item-header">Description of Items</th>
                <th class="qty-header">Quantity</th>
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
                    <td class="sl-cell">${index + 1}</td>
                    <td class="item-cell">${fixture.item || ""}</td>
                    <td class="qty-cell">${fixture.quantity || ""}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
      };

      // Professional Word document template with proper legal formatting
      const wordDocument = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Commercial Lease Agreement</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotPromptForConvert/>
            <w:DoNotShowInsertionsAndDeletions/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4;
            margin: 1in 0.75in 1in 0.75in;
          }
          
          body {
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.8;
            color: #000000;
            margin: 0;
            padding: 0;
            text-align: justify;
          }
          
          .title-section {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 2px;
            margin-bottom: 30pt;
            margin-top: 20pt;
          }
          
          .intro-section {
            margin-bottom: 25pt;
          }
          
          .main-paragraph {
            text-align: justify;
            margin-bottom: 15pt;
            text-indent: 0;
          }
          
          .parties-section {
            margin-bottom: 25pt;
          }
          
          .party-info {
            margin-bottom: 15pt;
            padding-left: 20pt;
          }
          
          .party-name {
            font-size: 13pt;
            text-decoration: underline;
          }
          
          .address-info, .detail-info {
            margin-top: 8pt;
            padding-left: 15pt;
          }
          
          .party-designation {
            margin-top: 15pt;
            margin-bottom: 20pt;
            text-align: center;
            font-weight: bold;
          }
          
          .and-divider {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin: 20pt 0;
            letter-spacing: 3px;
          }
          
          .whereas-section {
            margin-bottom: 25pt;
          }
          
          .witnesseth-section {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin: 25pt 0;
            text-decoration: underline;
            letter-spacing: 1px;
          }
          
          .terms-section {
            margin-bottom: 30pt;
          }
          
          .term-item {
            display: table;
            width: 100%;
            margin-bottom: 18pt;
            page-break-inside: avoid;
          }
          
          .term-number {
            display: table-cell;
            width: 30pt;
            vertical-align: top;
            font-weight: bold;
            padding-right: 10pt;
          }
          
          .term-content {
            display: table-cell;
            vertical-align: top;
            text-align: justify;
          }
          
          .highlight-field {
            background-color: #f0f0f0;
            padding: 2pt 4pt;
            border: 1px solid #cccccc;
            font-weight: bold;
          }
          
          .schedule-section {
            margin-top: 35pt;
            margin-bottom: 30pt;
            page-break-inside: avoid;
          }
          
          .schedule-title {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            text-decoration: underline;
            margin-bottom: 20pt;
            letter-spacing: 1px;
          }
          
          .schedule-content {
            text-align: justify;
            padding: 15pt;
            border: 1px solid #000000;
          }
          
          .witness-section {
            margin-top: 30pt;
            margin-bottom: 25pt;
          }
          
          .witness-intro {
            text-align: justify;
            font-style: italic;
          }
          
          .signature-section {
            margin-top: 40pt;
          }
          
          .signature-block {
            margin-bottom: 30pt;
          }
          
          .witnesses-column {
            margin-bottom: 25pt;
          }
          
          .witness-title {
            font-weight: bold;
            margin-bottom: 15pt;
          }
          
          .witness-line {
            margin-bottom: 10pt;
          }
          
          .parties-signature {
            display: table;
            width: 100%;
          }
          
          .lessor-signature, .lessee-signature {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding: 0 15pt;
          }
          
          .signature-title {
            font-weight: bold;
            margin-bottom: 15pt;
            text-decoration: underline;
          }
          
          .signature-name {
            font-weight: bold;
            margin-bottom: 8pt;
          }
          
          .signature-line {
            margin-bottom: 5pt;
            font-family: monospace;
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
            margin-bottom: 15pt;
            letter-spacing: 1px;
          }
          
          .annexure-subtitle {
            text-align: center;
            font-weight: bold;
            margin-bottom: 25pt;
          }
          
          .fixtures-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30pt;
          }
          
          .fixtures-table th, .fixtures-table td {
            border: 1px solid #000000;
            padding: 10pt;
            text-align: left;
          }
          
          .fixtures-table th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
          }
          
          .sl-header, .sl-cell {
            width: 10%;
            text-align: center;
          }
          
          .item-header, .item-cell {
            width: 65%;
          }
          
          .qty-header, .qty-cell {
            width: 25%;
            text-align: center;
          }
          
          .fixtures-table tr {
            height: 35pt;
          }
          
          /* Print-specific styles */
          @media print {
            body {
              font-size: 11pt;
            }
            .page-break {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body>
        ${generateWordContent()}
      </body>
      </html>
    `;

      // Create blob and download
      const blob = new Blob([wordDocument], {
        type: "application/msword",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Commercial_Lease_Agreement_${
        bookingId || "document"
      }.doc`;
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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="font-semibold mb-2">WITNESSES:</div>
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
        <div>
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
            <div className="p-8 md:p-10 lg:p-12">
              <div className="text-center font-bold text-xl mb-8 underline tracking-wide">
                COMMERCIAL AGREEMENT
              </div>
              {formData.firstParty && (
                <>
                  <div className="mb-5 text-justify leading-relaxed">
                    <span className="font-lg">
                      First Party (Stamp Duty):{" "}
                      <span className="font-bold">{formData.firstParty}</span>
                    </span>

                    <br />
                    <span className="text-sm italic">
                      (Responsible for payment of stamp duty charges as per
                      applicable state regulations)
                    </span>
                  </div>
                  <div className="mb-5 text-justify leading-relaxed">
                    <span className="font-lg">
                      Second Party :{" "}
                      <span className="font-bold">{formData.secondParty}</span>
                    </span>
                  </div>
                </>
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
                  {formData.propertyAddress || "Complete Property Address"}
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

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 1 of 3
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

            <div className="p-8 md:p-10 lg:p-12">
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
                    <span className="font-semibold">"COMMERCIAL PURPOSE"</span>{" "}
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
                    {formData.propertyAddress}
                  </span>
                  and consisting of{" "}
                  <span className="font-semibold form-data">
                    {formData.commercialType
                      ? formData.commercialType.toUpperCase()
                      : "SHOP/OFFICE"}{" "}
                    SPACE WITH {formData.squareFeet || "XX"} SQ.FT
                  </span>
                  , provided with electricity and water facilities.
                </p>
              </div>

              <p className="mb-6 text-justify leading-relaxed">
                IN WITNESS WHEREOF the parties have set their respective hands
                unto this agreement the day, month and year first above written.
              </p>

              {renderWitnessSections()}

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 2 of 3
              </div>
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

            <div className="p-8 md:p-10 lg:p-12">
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

              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                Page 3 of 3
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

        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: 210mm;
            height: 297mm;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
            padding: 0;
          }
          .page > div {
            padding: 25mm 20mm;
          }
          .form-data {
            background-color: transparent !important;
            font-weight: bold !important;
          }
          .page-break {
            display: none;
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
          }
        }

        /* Make sure content doesn't overflow on small screens */
        @media screen and (max-width: 640px) {
          .page {
            min-height: auto;
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
      `}</style>
    </>
  );
};

export default CommercialAggrementPreview;
