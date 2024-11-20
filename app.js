const express = require('express');
const path = require('path');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing requests (if needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
// Place this here to serve files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const homeRoute = require('./routes/home');
app.use('/', homeRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
