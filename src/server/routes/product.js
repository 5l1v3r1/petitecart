const express = require('express');
const { Product } = require('../models/product');

const router = express.Router();

/**
 * GET all
 */
router.get('/', (req, res) => {
  Product.find()
    .sort('name')
    .then((products, err) => {
      res.send(products);
    });
});

/**
 * GET by name
 */
router.get('/name/:name', (req, res) => {
  const productName = req.params.name; 
  Product.find({ name: productName})
  .then((products, err) => {
    res.send(products);
  });
}); 

/**
 * GET by id
 */
router.get('/id/:id', (req, res) => {
  const productId = req.params.id; 
  Product.find({ _id: productId})
  .then((products, err) => {
    res.send(products);
  });
});  


/**
 * POST
 */
router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body));
  const unsavedProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  unsavedProduct.save((err, unsavedProduct) => {
    if (err) console.log(`Error: ${err}`);
    console.log(unsavedProduct);
    Product.find({ _id: unsavedProduct.id }).then((product, err) => {
      res.send(product);
    });
  });
});

module.exports = router;
