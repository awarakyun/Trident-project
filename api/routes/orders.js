const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get request to /orders'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling post request /orders'
    })
})

router.get('/:id',(req, res, next) => {
    res.status(200).json({
        message: `We got an get request in /orders with param ${req.params.id} (cool)`
    })
})
module.exports = router;