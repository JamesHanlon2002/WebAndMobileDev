const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');  // Renders views/loggedin.ejs
});

module.exports = router;