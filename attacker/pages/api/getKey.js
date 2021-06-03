const fs = require('fs');

export default (req,res) => {
    const publicKey = fs.readFileSync(`${__dirname}/publickey`,{encoding:'utf-8'});


    res.setHeader('Access-control-allow-origin','*')
    res.status(200).json({publicKey})
}