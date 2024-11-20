const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');  // Renders views/loggedin.ejs
});

module.exports = router;