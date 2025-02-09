const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log("Received data:", req.body);  // Add this log to see what data is received

    // Validate input
    if (!username || !email || !password) {
        console.error("Validation failed: Missing fields");
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the email already exists in the database
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                console.error("Error checking email:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (result.length > 0) {
                console.log("Email already in use:", email);  // Log if email exists
                return res.status(400).json({ error: "Email is already in use" });
            }

            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }

                // Insert the new user into the database
                const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
                const values = [username, email, hashedPassword];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error("Error inserting data:", err);
                        return res.status(500).json({ error: "Signup failed" });
                    }
                    console.log("New user inserted:", result);  // Log insertion success
                    res.json({ message: "Signup successful", userId: result.insertId });
                });
            });
        });
    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(8081, () => {
    console.log("Server running on port 8081...");
});