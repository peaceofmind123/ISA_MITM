const fs = require('fs');

export default (req, res) => {
    const p = fs.openSync(`${__dirname}/privatekey`,'a+')
    const pu = fs.openSync(`${__dirname}/publickey`,'a+')
    const m = fs.openSync(`${__dirname}/messages.txt`,'a+')
    const dm = fs.openSync(`${__dirname}/decryptedMessages.txt`,'a+')
    const sp = fs.openSync(`${__dirname}/serverKey`,'a+')

    fs.closeSync(p)
    fs.closeSync(pu)
    fs.closeSync(m)
    fs.closeSync(dm)
    fs.closeSync(sp)
    res.status(200).json({status:'success'})
}