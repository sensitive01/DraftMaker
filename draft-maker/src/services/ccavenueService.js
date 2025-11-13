import CryptoJS from 'crypto-js';

// These should be moved to environment variables in production
const CCAVENUE_MERCHANT_ID = 'YOUR_MERCHANT_ID';
const CCAVENUE_ACCESS_CODE = 'YOUR_ACCESS_CODE';
const CCAVENUE_WORKING_KEY = 'YOUR_WORKING_KEY';

export const encrypt = (plainText, key) => {
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.lib.WordArray.random(16);
  
  const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  // Combine IV and ciphertext
  const result = CryptoJS.enc.Hex.parse(iv.toString() + encrypted.ciphertext.toString());
  return CryptoJS.enc.Base64.stringify(result);
};

export const generateCCavenueFormData = (orderData) => {
  const { amount, orderId, customerName, customerEmail, customerPhone, redirectUrl } = orderData;
  
  // Prepare the plain text for encryption
  const plainText = [
    `merchant_id=${CCAVENUE_MERCHANT_ID}`,
    `order_id=${orderId}`,
    `currency=INR`,
    `amount=${amount}`,
    `redirect_url=${redirectUrl}`,
    `cancel_url=${redirectUrl}`,
    `language=EN`,
    `billing_name=${encodeURIComponent(customerName)}`,
    `billing_email=${customerEmail}`,
    `billing_tel=${customerPhone}`,
    `billing_address=NA`,
    `billing_city=NA`,
    `billing_state=NA`,
    `billing_zip=NA`,
    `billing_country=India`,
    `delivery_name=${encodeURIComponent(customerName)}`,
    `delivery_address=NA`,
    `delivery_city=NA`,
    `delivery_state=NA`,
    `delivery_zip=NA`,
    `delivery_country=India`,
    `merchant_param1=additional_info_1`,
    `merchant_param2=additional_info_2`,
    `merchant_param3=additional_info_3`,
    `merchant_param4=additional_info_4`,
    `merchant_param5=additional_info_5`,
    `promo_code=`
  ].join('&');

  // Encrypt the data
  const encryptedData = encrypt(plainText, CCAVENUE_WORKING_KEY);
  
  return {
    encRequest: encryptedData,
    access_code: CCAVENUE_ACCESS_CODE
  };
};

export const handleCCavenueResponse = (encResponse) => {
  // This would be handled on your server in production
  // For now, we'll just return the raw response for demo purposes
  console.log('Payment Response:', encResponse);
  return encResponse;
};
