// emailTemplate.js

const emailTemplates = {
  draftingService: {
    subject: "New Drafting Service Booking Notification",
    html: `
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
      min-height: 100vh;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: white;
      padding: 0;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    h2 {
      color: white;
      text-align: center;
      font-size: 26px;
      margin: 0;
      font-weight: 700;
    }
    .content {
      padding: 30px;
    }
    p {
      color: #555;
      line-height: 1.6;
      font-size: 15px;
      margin-bottom: 25px;
    }
    ul {
      list-style: none;
      padding: 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      padding: 25px;
      border-left: 5px solid #4facfe;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(79, 172, 254, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }
    li:hover {
      background-color: rgba(79, 172, 254, 0.05);
      padding-left: 10px;
      border-radius: 8px;
    }
    li:last-child {
      border-bottom: none;
    }
    b {
      color: #2c3e50;
      font-weight: 600;
      min-width: 130px;
      font-size: 14px;
    }
    .value {
      color: #495057;
      font-weight: 500;
      text-align: right;
      font-size: 14px;
    }
    .highlight {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      padding: 5px 12px;
      border-radius: 20px;
      color: #333;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    .status {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    }
    .amount {
      background: linear-gradient(135deg, #17a2b8, #138496);
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);
    }
    .footer {
      text-align: center;
      margin-top: 25px;
      padding: 20px;
      background: linear-gradient(135deg, #e9ecef, #f8f9fa);
      border-radius: 10px;
      color: #6c757d;
      border: 1px solid #dee2e6;
      font-weight: 500;
    }
    .icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    </style>

    <div class="container">
      <div class="header">
        <div class="icon">📄</div>
        <h2>Drafting Service Booking</h2>
      </div>
      <div class="content">
        <p>A new booking has been made with the following details:</p>
        <ul>
          <li><b>Booking ID:</b> <span class="value highlight">{{bookingId}}</span></li>
          <li><b>Agreement Name:</b> <span class="value">{{agreementName}}</span></li>
          <li><b>Date & Time:</b> <span class="value">{{dateTime}}</span></li>
          <li><b>User Name:</b> <span class="value">{{userName}}</span></li>
          <li><b>Mobile:</b> <span class="value">{{mobile}}</span></li>
          <li><b>Payment Id:</b> <span class="value">{{paymentId}}</span></li>
          <li><b>Payment Status:</b> <span class="value status">{{paymentStatus}}</span></li>
          <li><b>Amount paid:</b> <span class="value amount">{{amount}}</span></li>
        </ul>
        <p class="footer">Please review this booking in the admin panel.</p>
      </div>
    </div>
  `,
  },

  uploadDocuments: {
    subject: "New Upload Documents Booking Notification",
    html: `
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
      min-height: 100vh;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: white;
      padding: 0;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    h2 {
      color: white;
      text-align: center;
      font-size: 26px;
      margin: 0;
      font-weight: 700;
    }
    .content {
      padding: 30px;
    }
    p {
      color: #555;
      line-height: 1.6;
      font-size: 15px;
      margin-bottom: 25px;
    }
    ul {
      list-style: none;
      padding: 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      padding: 25px;
      border-left: 5px solid #ff9a56;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 154, 86, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }
    li:hover {
      background-color: rgba(255, 154, 86, 0.05);
      padding-left: 10px;
      border-radius: 8px;
    }
    li:last-child {
      border-bottom: none;
    }
    b {
      color: #2c3e50;
      font-weight: 600;
      min-width: 130px;
      font-size: 14px;
    }
    .value {
      color: #495057;
      font-weight: 500;
      text-align: right;
      font-size: 14px;
    }
    .highlight {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      padding: 5px 12px;
      border-radius: 20px;
      color: #333;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    .footer {
      text-align: center;
      margin-top: 25px;
      padding: 20px;
      background: linear-gradient(135deg, #e9ecef, #f8f9fa);
      border-radius: 10px;
      color: #6c757d;
      border: 1px solid #dee2e6;
      font-weight: 500;
    }
    .icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    </style>

    <div class="container">
      <div class="header">
        <div class="icon">📤</div>
        <h2>Upload Documents Booking</h2>
      </div>
      <div class="content">
        <p>A user has booked the Upload Documents service with these details:</p>
        <ul>
          <li><b>Booking ID:</b> <span class="value highlight">{{bookingId}}</span></li>
          <li><b>Agreement Name:</b> <span class="value">{{agreementName}}</span></li>
          <li><b>Date & Time:</b> <span class="value">{{dateTime}}</span></li>
          <li><b>User Name:</b> <span class="value">{{userName}}</span></li>
          <li><b>Mobile:</b> <span class="value">{{mobile}}</span></li>
          <li><b>Payment Id:</b> <span class="value">{{paymentId}}</span></li>
          <li><b>Payment Status:</b> <span class="value">{{paymentStatus}}</span></li>
          <li><b>Amount paid:</b> <span class="value">{{amount}}</span></li>

        </ul>
        <p class="footer">Please verify and process the uploaded documents.</p>
      </div>
    </div>
  `,
  },

  eStamp: {
    subject: "New E-Stamp Booking Notification",
    html: `
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
      min-height: 100vh;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: white;
      padding: 0;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    h2 {
      color: white;
      text-align: center;
      font-size: 26px;
      margin: 0;
      font-weight: 700;
    }
    .content {
      padding: 30px;
    }
    p {
      color: #555;
      line-height: 1.6;
      font-size: 15px;
      margin-bottom: 25px;
    }
    ul {
      list-style: none;
      padding: 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      padding: 25px;
      border-left: 5px solid #43cea2;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(67, 206, 162, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }
    li:hover {
      background-color: rgba(67, 206, 162, 0.05);
      padding-left: 10px;
      border-radius: 8px;
    }
    li:last-child {
      border-bottom: none;
    }
    b {
      color: #2c3e50;
      font-weight: 600;
      min-width: 130px;
      font-size: 14px;
    }
    .value {
      color: #495057;
      font-weight: 500;
      text-align: right;
      font-size: 14px;
    }
    .highlight {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      padding: 5px 12px;
      border-radius: 20px;
      color: #333;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    .footer {
      text-align: center;
      margin-top: 25px;
      padding: 20px;
      background: linear-gradient(135deg, #e9ecef, #f8f9fa);
      border-radius: 10px;
      color: #6c757d;
      border: 1px solid #dee2e6;
      font-weight: 500;
    }
    .icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    </style>

    <div class="container">
      <div class="header">
        <div class="icon">🖋️</div>
        <h2>E-Stamp Booking</h2>
      </div>
      <div class="content">
        <p>A new E-Stamp booking has been confirmed:</p>
        <ul>
          <li><b>Booking ID:</b> <span class="value highlight">{{bookingId}}</span></li>
          <li><b>Agreement Name:</b> <span class="value">{{agreementName}}</span></li>
          <li><b>Date & Time:</b> <span class="value">{{dateTime}}</span></li>
          <li><b>User Name:</b> <span class="value">{{userName}}</span></li>
          <li><b>Mobile:</b> <span class="value">{{mobile}}</span></li>
          <li><b>Payment Id:</b> <span class="value">{{paymentId}}</span></li>
          <li><b>Payment Status:</b> <span class="value">{{paymentStatus}}</span></li>
          <li><b>Amount paid:</b> <span class="value">{{amount}}</span></li>
        </ul>
        <p class="footer">Kindly proceed with the required E-Stamp process.</p>
      </div>
    </div>
  `,
  },
};

module.exports = emailTemplates;
