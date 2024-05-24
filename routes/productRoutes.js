const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/motorcycles', (req, res) => {
    res.render('motorcycles', { title: 'Motorcycles' });
});
router.get('/search', (req, res, next) => {
    const db = new sqlite3.Database('./db/bike_shop.db');

    db.all('SELECT * FROM product ', (err, rows) => {
        if (err) {
            return next(err);
        }
        res.render('products', { title: 'Search Results', products: rows });
    });

    db.close();
});
router.post('/search', (req, res, next) => {
    const { keyword } = req.body;
    const db = new sqlite3.Database('./db/bike_shop.db');
    db.all('SELECT * FROM product WHERE keyword LIKE ?', [`%${keyword}%`], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.render('products', { title: 'Search Results', products: rows, keyword: keyword });
    });

    db.close();
});


router.get('/menCollections', (req, res) => {
    res.render('MenCollections', { title: 'Men Fashion' });
});
router.get('/womenCollections', (req, res) => {
    res.render('womenCollections', { title: 'Women Fashion' });
});
router.get('/kidsCollections', (req, res) => {
    res.render('kidsCollections', { title: 'Kids Fashion' });
});

module.exports = router;
