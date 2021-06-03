const fs = require('fs');
const crypto = require('crypto');

export default (req,res) => {
    const message = req?.query?.message;
    if(!message) {
        res.status(400).json({err: 'provide query param: message'})
    }

    try {
        const publicKey = fs.readFileSync(`${__dirname}/serverKey`, {encoding:'utf-8'});

        const encrypted = crypto.publicEncrypt({
            key: publicKey
        }, Buffer.from(message))
        const base64Encoded = encrypted.toString('base64')
        res.status(200).json({encrypted: base64Encoded});
    }
    catch(e) {
        res.status(500).json({err: "Internal server error"})
    }

};