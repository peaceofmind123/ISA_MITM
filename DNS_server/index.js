const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.get('/B', (req, res) => {
    res.json({address: 'http://localhost:5500'});
});

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})