const fs = require('fs')

export default (req,res) => {
    res.setHeader('access-control-allow-origin', '*')
    const message = req?.query?.message;
    if(!message) {
        res.status(400).json({err:"provide query param: message"})

    }
    else {
        try{
            const stream = fs.createWriteStream(`${__dirname}/messages.txt`, {flags:'a+'});
            stream.write(message + '\n');
            stream.end();

            const privateKey = fs.readFileSync(`${__dirname}/privateKey`,{encoding:'utf-8'})

            const decryptedMessage = crypto.privateDecrypt(privateKey,Buffer.from(message,'base64'))

            const stream1 = fs.createWriteStream(`${__dirname}/decryptedMessages.txt`, {flags:'a+'});
            stream1.write(decryptedMessage.toString() + '\n');
            stream1.end();

            res.status(200).json({status:'success'});
        }
        catch(e) {

        }

    }
}