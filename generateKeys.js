
export default function generateKeys(callback) {
    crypto.generateKeyPair('rsa', {
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
    }, (err, publicKey, privateKey) => {

        return callback(err, publicKey, privateKey);
    });
}
