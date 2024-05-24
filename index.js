const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon'); 
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3003;

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware to serve favicon 
app.use(favicon(__dirname + '/public_html/images/favicon.ico')); 

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for session
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// Middleware to pass session user data to all templates
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


// Mount route modules (New Feature 1)
app.use('/', homeRoutes);
app.use('/home', homeRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/service', serviceRoutes);


// Middleware to handle errors (New Feature 1)
app.use((err, req, res, next) => {
    // Default status code to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Default error message
    const message = err.message || 'Internal Server Error';

    // Log the error
    console.error(err.stack);

    // Log the error to a file
    const logFilePath = path.join(__dirname, 'error.log');
    const logMessage = `[${new Date().toISOString()}] ${message}\n${err.stack}\n\n`;
    fs.appendFile(logFilePath, logMessage, (fileErr) => {
        if (fileErr) {
            console.error('Error writing to log file:', fileErr);
        }
    });

    // Render the error page
    res.status(statusCode).render('error', { message: message });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

