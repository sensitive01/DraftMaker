const crypto = require('crypto');

class CCAvenue {
    constructor(workingKey) {
        console.log("workingKey",workingKey)
        this.workingKey = workingKey;
    }

    encrypt(plainText) {
        try {
            const m = crypto.createHash('md5');
            m.update(this.workingKey);
            const key = m.digest();
            const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
            let encoded = cipher.update(plainText, 'utf8', 'hex');
            encoded += cipher.final('hex');
            return encoded;
        } catch (error) {
            console.error('Encryption error:', error);
            throw error;
        }
    }

    decrypt(encText) {
        try {
            const m = crypto.createHash('md5');
            m.update(this.workingKey);
            const key = m.digest();
            const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
            let decoded = decipher.update(encText, 'hex', 'utf8');
            decoded += decipher.final('utf8');
            return decoded;
        } catch (error) {
            console.error('Decryption error:', error);
            throw error;
        }
    }
}

module.exports = CCAvenue;