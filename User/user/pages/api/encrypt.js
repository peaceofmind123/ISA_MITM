const fs = require('fs');
const crypto = require('crypto');

export default (req,res) => {
    const message = req?.query?.message;
    if(!message) {
        res.status(400).json({err: 'provide query param: message'})
    }

    try {
        const data = fs.readFileSync(`${__dirname}/serverKey.json`, {flag:'r'});
        const parsed = JSON.parse(data);
        const {publicKey} = parsed;
        const encrypted = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256"
        }, Buffer.from(message))
        const base64Encoded = encrypted.toString('base64')
        res.status(200).json({encrypted: base64Encoded});
    }
    catch(e) {

    }

};