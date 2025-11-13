const crypto = require("crypto");

function encrypt(data, workingKey) {
    const m = crypto.createHash("md5").update(workingKey).digest();
    const iv = Buffer.alloc(16, '\0');
    const cipher = crypto.createCipheriv('aes-128-cbc', m, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encrypted, workingKey) {
    const m = crypto.createHash("md5").update(workingKey).digest();
    const iv = Buffer.alloc(16, '\0');
    const decipher = crypto.createDecipheriv('aes-128-cbc', m, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };
