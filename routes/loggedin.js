const express = require('express');
const router = express.Router();

app.get('/loggedin', (req, res) => {
    res.sendFile(__dirname + '/views/loggedin.html'); // Adjust path as necessary
  });

module.exports = router;
