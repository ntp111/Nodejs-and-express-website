const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");

const saltRounds = 10; // Number of salt rounds for bcrypt

// Middleware to pass session user data to all templates
router.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Login route  (New Feature 2)
router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    res.render("login", { title: "Login" });
});

router.post("/login", (req, res, next) => {
    const { login_cd, password } = req.body;
    const db = new sqlite3.Database("./db/bike_shop.db");

    db.get("SELECT * FROM user WHERE login_cd = ?", [login_cd], (err, row) => {
        if (err) {
            return next(err); // Pass the error to the error handling middleware
        }
        if (!row) {
            return res.render("login", {
                title: "Login",
                error: "Your login or password is wrong, please try again.",
            });
        }
        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                return next(err); // Pass the error to the error handling middleware
            }
            if (result) {
                req.session.user = { name: row.name, login_cd: row.login_cd };
                return res.redirect("/");
            } else {
                res.render("login", {
                    title: "Login",
                    error: "Your login or password is wrong, please try again.",
                });
            }
        });
    });
    db.close();
});

// Logout route
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err); // Pass the error to the error handling middleware
        }
        res.redirect("/user/login");
    });
});

// Registration route (New Feature 2)
router.get("/registration", (req, res) => {
    res.render("registration", { title: "Registration" });
});

router.post("/registration", (req, res, next) => {
    const { login_cd, password, email, name, mobile } = req.body;
    const db = new sqlite3.Database("./db/bike_shop.db");

    db.get("SELECT * FROM user WHERE login_cd = ?", [login_cd], (err, row) => {
        if (err) {
            return next(err); // Pass the error to the error handling middleware
        }
        if (row) {
            db.close();
            return res.render("registration", {
                title: "Registration Error",
                error: "Your login_cd already exists, please choose a different login_cd.",
            });
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return next(err); // Pass the error to the error handling middleware
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return next(err); // Pass the error to the error handling middleware
                }
                db.run(
                    "INSERT INTO user (login_cd, password, email, name, phone) VALUES (?, ?, ?, ?, ?)",
                    [login_cd, hash, email, name, mobile],
                    function (err) {
                        db.close(); // Close database connection here
                        if (err) {
                            return next(err); // Pass the error to the error handling middleware
                        }
                        req.session.user = { name: name, login_cd: login_cd };
                        res.redirect("/user/login");
                    }
                );
            });
        });
    });
});

module.exports = router;
