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
   if(Oneproduct){
       collections = await Collection.find({'product':Oneproduct._id});
       res.render('en/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_en});
   }
   else{
       res.redirect('/en');
   }

});

/* GET katalog page. */
router.get('/katalog/:id', async(req, res, next) => {
    products = await Product.find({});
    Oneproduct = await Product.findById(req.params.id);
    if(Oneproduct){
        collections = await Collection.find({'product':Oneproduct._id});
        res.render('en/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_en});
    }
    else {
        res.redirect('/en');
    }

});
/* GET home page. */
router.get('/collection/:id', async (req, res, next) => {
    collection = await Collection.findById(req.params.id);
    Oneproduct = await Product.findById(collection.product);
    if(Oneproduct){
        res.render('en/collection_id',{'product':Oneproduct,collection});
    }
    else {
        res.redirect('/en');
    }
});


module.exports = router;
