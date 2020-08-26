const express = require('express');
const router = express.Router();

//model
const Product = require('../models/Product');
const Collection = require('../models/Collection');

const get3element = (data)=>{ // oxirgi 3tasini  oladi
    data = data.slice(data.length<3 ? 0:data.length-3, data.length);
    return data;
}

/* GET home page. */
router.get(['/','/ru'], async (req, res, next) => {
    try{
       let  products =  await  Product.find(); // oxirgi 3 tani bazadan oladi
       let productCollection=[],collection;
        products =await  get3element(products);
         for await (const collections of products){
            collection = await Collection.find({"product":collections._id});
            collection = await get3element(collection);
            productCollection.push(collection); // har bir productdan 3tadan oladi

        }

        res.render('ru/index',{"collections":productCollection,"products":products});
    }catch (e) {

        res.render('ru/index');
    }
});

// /* GET home page. */
// router.get('/en', (req, res, next) => {
//   res.render('en/index');
// });
/* GET katalog page. */
router.get('/ru/katalog', async(req, res, next) => {
   products = await Product.find({});
   Oneproduct = await Product.findOne({});
   if(Oneproduct){
       collections = await Collection.find({'product':Oneproduct._id});
       res.render('ru/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_ru});
   }
   else {
       res.redirect('/');
   }
});

/* GET katalog page. */
router.get('/ru/katalog/:id', async(req, res, next) => {
    products = await Product.find({});
    Oneproduct = await Product.findById(req.params.id);
    if(Oneproduct){
        collections = await Collection.find({'product':Oneproduct._id});
        res.render('ru/katalog',{'products':products,'collections':collections,'oneproduct':Oneproduct.name_ru});
    }
    else {
        res.redirect('/');
    }
});
/* GET home page. */
router.get('/ru/collection/:id', async (req, res, next) => {
    collection = await Collection.findById(req.params.id);
    Oneproduct = await Product.findById(collection.product);
    if(Oneproduct){
        res.render('ru/collection_id',{'product':Oneproduct,collection});
    }
    else {
        res.redirect('/');
    }

});


module.exports = router;
