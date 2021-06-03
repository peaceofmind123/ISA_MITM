const fs = require('fs');

export default (req,res) => {
    const data = fs.readFileSync(`${__dirname}/keys.json`,{encoding:'utf-8'});
    const parsed = JSON.parse(data);

    res.setHeader('Access-control-allow-origin','*')
    res.status(200).json({publicKey: parsed.publicKey})
}