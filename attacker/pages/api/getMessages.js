const fs = require('fs');
const readline =require('readline');

export default async (req,res) => {
    // fs.writeFileSync(`${__dirname}/serverKey.json`, JSON.stringify({publicKey:data.publicKey}), {flag:'w'}) ;
    const stream = fs.createReadStream(`${__dirname}/messages.txt`)
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });
    const lines = [];
    for await (const line of rl) {
        lines.unshift(line)
    }


    res.status(200).json({data: JSON.stringify(lines)})
}