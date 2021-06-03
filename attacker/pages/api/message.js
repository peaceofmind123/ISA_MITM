const fs = require('fs')

export default (req,res) => {
    res.setHeader('access-control-allow-origin', '*')
    const message = req?.query?.message;
    if(!message) {
        res.status(400).json({err:"provide query param: message"})

    }
    else {
        const stream = fs.createWriteStream(`${__dirname}/messages.txt`, {flags:'a+'});
        stream.write(message + '\n');
        stream.end();
        // todo: forward message to server
        res.status(200).json({status:'success'});
    }
}