const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error code
      res.status(400).send("Username already exists. Please choose another.");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
});

module.exports = router;