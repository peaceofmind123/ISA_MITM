const fetch = require('node-fetch');
const fs = require('fs');

export default async (req,res) => {
    const response = await fetch('http://localhost:5500/api/getKey', {mode:'cors'}).catch(console.log)
    const data = await response.json()
    console.log(data);
    try{
        fs.writeFileSync(`${__dirname}/serverKey`, data.publicKey, {flag:'w'}) ;
        res.status(200).json({publicKey: data.publicKey})
    }
    catch(e) {

    }
}