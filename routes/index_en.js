const express = require('express');
const router = express.Router();

//model
const Product = require('../models/Product');
const Collection = require('../models/Collection');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('en/index');
});

/* GET katalog page. */
router.get('/katalog', async(req, res, next) => {
   products = await Product.find({});
   Oneproduct = await Product.findOne({});
   collections = await Collection.find({'product':Oneproduct._id});
  res.render('en/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_en});
});

/* GET katalog page. */
router.get('/katalog/:id', async(req, res, next) => {
    products = await Product.find({});
    Oneproduct = await Product.findById(req.params.id);
    collections = await Collection.find({'product':Oneproduct._id});
    res.render('en/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_en});
});
/* GET home page. */
router.get('/collection/:id', async (req, res, next) => {
    collection = await Collection.findById(req.params.id);
    Oneproduct = await Product.findById(collection.product);
    console.log(Oneproduct);
    res.render('en/collection_id',{'product':Oneproduct,collection});
});


module.exports = router;
