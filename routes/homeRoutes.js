const express = require('express');
const router = express.Router();

// Route for the form page
router.get('/', (req, res) => {
    const { name } = req.query;
    res.render('home', { title: 'Home', name: name });
});

module.exports = router;
