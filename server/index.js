const express = require('express');
const app = express();
app.use(express.json());

// CORS middleware is used here to allow cross-origin requests from the frontend.
const cors = require('cors');
app.use(cors());

require('./db/connection');

// Import the employee model
const EmployeeModel = require('./models/employee'); // Correct import

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {  // Check if user exists
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json("Server error");
        });
});

// Register route
app.post("/register", async (req, res) => {
    try {
        let user = new EmployeeModel(req.body);
        let result = await user.save();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error saving user");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running...");
});
