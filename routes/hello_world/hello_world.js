const express = require('express');

const router = express.Router();

router.all('/', (req, res) => {
    return res.status(200).send('Hello world');
});

module.exports = router;