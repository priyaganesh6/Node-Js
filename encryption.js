const rijndael = require('rijndael-js');
const md5 = require('md5')
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const ivSize = 16;
const iv = crypto.randomBytes(ivSize);
let PUBLIC_KEY= 'BNXPRIVATEKEY2019';
const encrypt = (userName, Password) => {
    let privateKey = userName;
    let userSecret = Password;
    let publicKey = md5(PUBLIC_KEY)
    let cipher = new rijndael(md5(privateKey), 'cbc');
    let ciphertext = Buffer.from(cipher.encrypt(userSecret, 256, publicKey));
    let encryptedCredentials= md5(ciphertext.toString('base64'))
    return encryptedCredentials
}

module.exports={encrypt}