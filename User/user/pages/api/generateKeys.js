const crypto = require('crypto');
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
    res.status(200).json({publicKey, privateKey});
}