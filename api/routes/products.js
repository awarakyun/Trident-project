const express = require('express');
const router = express.Router();
const Product = require('../../schemas/products/product');


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).then(doc => {
        console.log(doc);
        res.status(200).json({
            doc
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
        });
    
});

router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save().then((result => {
        console.log(result);
    }));

    res.status(200).json({
        message: 'Handling post request /products',
        createdProduct: product
    })
})

router.get('/',(req, res, next) => {
    Product.find().then(doc => {
        console.log(doc);
        res.status(200).json({
            doc
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
        });
    
})
module.exports = router;