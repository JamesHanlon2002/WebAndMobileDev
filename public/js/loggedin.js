const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('loggedin');  // Renders views/loggedin.ejs
});

module.exports = router;

