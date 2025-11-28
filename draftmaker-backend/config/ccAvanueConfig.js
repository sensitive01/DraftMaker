// config/ccavenue.config.js
const crypto = require('crypto-js');

module.exports = {
    merchantId: process.env.CCAVENUE_MERCHANT_ID,
    workingKey: process.env.CCAVENUE_WORKING_KEY,
    accessCode: process.env.CCAVENUE_ACCESS_CODE,
    redirectUrl: `${process.env.BASE_URL}/api/documents/payment/ccavenue/response`,
    cancelUrl: `${process.env.BASE_URL}/payment-failed`,

    encrypt: function (plainText) {
        const key = crypto.enc.Utf8.parse(this.workingKey);
        const iv = crypto.enc.Utf8.parse(this.workingKey);
        const encrypted = crypto.AES.encrypt(
            crypto.enc.Utf8.parse(plainText),
            key,
            {
                keySize: 256,
                iv: iv,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7
            }
        );
        return encrypted.toString();
    },

    decrypt: function (encryptedText) {
        const key = crypto.enc.Utf8.parse(this.workingKey);
        const iv = crypto.enc.Utf8.parse(this.workingKey);
        const decrypted = crypto.AES.decrypt(encryptedText, key, {
            keySize: 256,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        });
        return decrypted.toString(crypto.enc.Utf8);
    }
};