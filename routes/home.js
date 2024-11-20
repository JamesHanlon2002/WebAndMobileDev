const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // Assuming 'home.ejs' exists in the 'views' folder
});

module.exports = router;
