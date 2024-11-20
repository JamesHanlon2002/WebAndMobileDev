const express = require('express');
const path = require('path');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const homeRoute = require('./routes/home');
const loggedInRoute = require('./routes/loggedin'); // Add this
app.use('/', homeRoute);
app.use('/', loggedInRoute); // Add this

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
