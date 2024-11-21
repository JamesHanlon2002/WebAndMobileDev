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

// Home route (handles requests to "/")
app.use('/', homeRoute);

app.get('/loggedin', (req, res) => {
    res.render('loggedin'); // Or return a view that you want to show for the logged-in page
  });

app.get('/login', (req, res) => {
    res.render('login'); // Or return a view that you want to show for the logged-in page
  });

app.get('/register', (req, res) => {
    res.render('register'); // Or return a view that you want to show for the logged-in page
  });
  
app.get('/settings', (req, res) => {
    res.render('settings'); // Or return a view that you want to show for the logged-in page
  });
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// testing