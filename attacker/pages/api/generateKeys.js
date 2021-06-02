const crypto = require('crypto');
const fs = require('fs');

export default async (req, res) => {
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'secret'
        }
    });
    try{
        fs.writeFileSync(`${__dirname}/keys.json'}`, JSON.stringify({publicKey, privateKey}), {flag:'w'}) ;

    }
    catch(e) {

    }
    res.status(200).json({publicKey, privateKey});
}