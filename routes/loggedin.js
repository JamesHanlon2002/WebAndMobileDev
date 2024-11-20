const express = require('express');
const router = express.Router();

router.get('/loggedin', (req, res) => {
    res.render('loggedin'); // Assuming 'loggedin.ejs' exists in the 'views' folder
});

module.exports = router;
