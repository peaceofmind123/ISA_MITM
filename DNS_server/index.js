const express = require('express');

const app = express();

app.get('/B', (req, res) => {
    res.send('http://localhost:6000');
});

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})