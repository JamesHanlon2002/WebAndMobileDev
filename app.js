const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const User = require("./models/user");
const app = express();

// MongoDB connection
mongoose
  .connect("mongodb+srv://jmhanlon2002:Uniwork@cluster0.qnlfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    connectTimeoutMS: 20000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//session middleware
const secureKey = crypto.randomBytes(64).toString('hex');
const session = require("express-session")
app.use(session({
    secret: secureKey,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, "routes")));





// Routes
app.get("/", (req, res) => {
  res.render("home"); // Render home.ejs by default
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/add-task", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("add-task");
});

app.get("/settings", (req, res) => {
  res.render("settings");
});





// login route and login authentication
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login");
    }

    req.session.userId = user._id; // Store user ID in session
    res.redirect("/loggedin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



// register route and adding accounts to mongodb data base
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/loggedin", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const user = await User.findById(req.session.userId);
    res.render("loggedin", { username: user.username, tasks: user.tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// code to add a task
const addTaskRouter = require("./routes/add-task");

// Use the add-task route
app.use("/add-task", addTaskRouter);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
