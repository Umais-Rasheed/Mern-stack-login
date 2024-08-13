const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser'); //middleware for Express.js

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true // Allow credentials (cookies) to be included in requests
}));

app.use(express.json()); // Middleware for parsing JSON requests
app.use(cookieParser()); // Middleware for parsing cookies
app.use(bodyParser.json()); // Middleware for parsing JSON request bodies

// Configure session middleware
app.use(session({
    secret: 'secret', // A secret key to encrypt the session cookies
    resave: false,
    saveUninitialized: false, // Prevent creating sessions for unauthenticated users
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true
    }
}));

// Endpoint to check session status
app.get('/', (req, res) => {
    if (req.session.name) {
        return res.json({ valid: true, name: req.session.name });
    } else {
        return res.json({ valid: false });
    }
});

// Import the connection and models using CommonJS syntax
require('./db/connection'); // Import your database connection
const EmployeeModel = require('./models/employee'); // Import the Employee model

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                req.session.name = user.name; // Store username in session
                res.cookie('sessionId', req.sessionID, {
                    httpOnly: true, // Prevents JavaScript access to cookies
                    secure: false, // Set to true if using HTTPS
                    maxAge: 1000 * 60 * 60 * 24 // 1 day
                });
                return res.json({ Login: true, message: "Success" });
            } else {
                return res.json({ Login: false, message: "The password is incorrect" });
            }
        } else {
            return res.json({ Login: false, message: "No record existed" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Login: false, message: "Server error" });
    }
});

// Registration Endpoint
app.post("/register", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if a user with the given email already exists
        const existingUser = await EmployeeModel.findOne({ email });

        if (existingUser) {
            // If user exists, send a response indicating email is already in use
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // If no existing user, create a new user
        let user = new EmployeeModel(req.body); // Create a new user instance
        let result = await user.save(); // Save user to the database
        res.json({ success: true, data: result });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Error saving user" });
    }
});

// **Logout Endpoint**
app.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session during logout:', err);
            return res.status(500).json({ success: false, message: 'Error during logout' });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' }); // 'connect.sid' is the default session cookie name
        res.clearCookie('sessionId', { path: '/' }); // 'connect.sid' is the default session cookie name

        // Send success response
        return res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
