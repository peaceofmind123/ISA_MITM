const fs = require('fs');
const readline =require('readline');
const crypto = require('crypto');
export default async (req,res) => {

    try {
        // fs.writeFileSync(`${__dirname}/serverKey.json`, JSON.stringify({publicKey:data.publicKey}), {flag:'w'}) ;
        if(fs.existsSync(`${__dirname}/messages.txt`,{encoding:'utf-8'})
            && fs.existsSync(`${__dirname}/decryptedMessages.txt`,{encoding:'utf-8'})) {

            const stream = fs.createReadStream(`${__dirname}/messages.txt`)

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });


            const lines = [];
            const decryptedLines = [];
            for await (const line of rl) {
                lines.unshift(line)

            }
            rl.close()
            const stream1 = fs.createReadStream(`${__dirname}/decryptedMessages.txt`)
            const rl1 = readline.createInterface({
                input: stream1,
                crlfDelay: Infinity
            });

            for await (const line1 of rl1) {
                decryptedLines.unshift(line1)
            }
            rl1.close()
            res.status(200).json({encrypted:lines, decrypted: decryptedLines})
        }
        else {

            res.status(500).send('internal server error')
        }

    }
    catch(e) {
        res.status(500).send('internal server error')
    }

}