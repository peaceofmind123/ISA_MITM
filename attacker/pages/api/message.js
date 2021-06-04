const fs = require('fs')
const fetch = require('node-fetch')
const crypto = require('crypto')

export default async (req,res) => {

    res.setHeader('access-control-allow-origin', '*')

    const message = req?.query?.message;
    if(!message) {
        res.status(400).json({err:"provide query param: message"})

    }
    else {
        try {
            const serverPublicKey = fs.readFileSync(`${__dirname}/serverKey`,{encoding:'utf-8'})
            const privateKey = fs.readFileSync(`${__dirname}/privateKey`,{encoding:'utf-8'})

            const stream = fs.createWriteStream(`${__dirname}/messages.txt`, {flags:'a+'});
            stream.write(message + '\n');
            stream.end();
            const decryptedMessage = crypto.privateDecrypt(privateKey,Buffer.from(message,'base64'))

            const stream1 = fs.createWriteStream(`${__dirname}/decryptedMessages.txt`, {flags:'a+'});
            stream1.write(decryptedMessage.toString() + '\n');
            stream1.end();

            const serverEncrypted = crypto.publicEncrypt(serverPublicKey, Buffer.from(decryptedMessage.toString(), 'utf-8'))
            const response = await fetch('http://localhost:4000/api/message?' + new URLSearchParams({
                message: serverEncrypted.toString('base64')
            })).catch(console.log);
            res.status(200).json({status:'success'});
        }
        catch(e) {
            console.log(e)
            res.status(500).end();
        }
    }
}