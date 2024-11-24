const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Adjust the path based on your project structure

// POST /add-task
router.post("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const { name, description, date, time } = req.body;

  // Input validation
  if (!name || !description || !date || !time) {
    return res.status(400).send("All fields are required!");
  }

  // Combine date and time into a valid Date object
  const dueDate = new Date(`${date}T${time}`);
  if (isNaN(dueDate)) {
    return res.status(400).send("Invalid date or time provided.");
  }

  try {
    const user = await User.findById(req.session.userId);
    user.tasks.push({ name, description, date: dueDate }); // Add the task to the user's tasks
    await user.save();

    res.redirect("/loggedin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
