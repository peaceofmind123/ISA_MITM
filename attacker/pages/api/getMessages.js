const fs = require('fs');
const readline =require('readline');
const crypto = require('crypto');
export default async (req,res) => {
    // fs.writeFileSync(`${__dirname}/serverKey.json`, JSON.stringify({publicKey:data.publicKey}), {flag:'w'}) ;
    const privateKey = fs.readFileSync(`${__dirname}/privatekey`,{encoding:'utf-8'})
    const stream = fs.createReadStream(`${__dirname}/messages.txt`)
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });
    const lines = [];
    const decryptedLines = [];
    for await (const line of rl) {
        console.log(line)
        lines.unshift(line)
        const decrypted = crypto.privateDecrypt({
            key: privateKey
        }, Buffer.from(line, 'base64'))
        decryptedLines.unshift(decrypted.toString())
    }


    res.status(200).json({encrypted:lines, decrypted: decryptedLines})
}