const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();


router.get('/insurance', (req, res) => {
    res.render('insurance', { title: 'Warranty & Insurance' });
});
router.get('/service', (req, res) => {
    res.render('service', { title: 'Services' });
});
router.get('/news', (req, res) => {

    const db = new sqlite3.Database('./db/bike_shop.db');

    db.all('SELECT * FROM news ', (err, rows) => {
        if (err) {
            return next(err);
        }
        res.render('news', { title: 'Search Results', news: rows });
    });

    db.close();
});
router.get('/dealers', (req, res) => {
    res.render('dealers', { title: 'Dealers' });
});
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });

});
router.post('/contact', (req, res) => {

    const { title, message, name, email, mobile } = req.body;
    const db = new sqlite3.Database('./db/bike_shop.db');

    db.run('INSERT INTO contact (title, content, name, email, phone) VALUES (?, ?, ?, ?, ?)', [title, message, name, email, mobile], function (err) {
        if (err) {
            res.render('contact', { title: 'Contact Us', error: "error sending your message. please try again" });
        } else {
            res.render('contact', { title: 'Contact Us', success_msg: "your message is sent, we will get back to you as soon as possible." });
        }
    });

    db.close();

});

module.exports = router;
