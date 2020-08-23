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
router.get('/', async (req, res, next) => {
   let products =  await  Product.find(); // oxirgi 3 tani bazadan oladi
    let productCollection=[],collection,index=0;
   products =  get3element(products);

   for (const collections of products){
       collection = await Collection.find({"product":collections._id});
       collection = get3element(collection);
       productCollection.push(collection); // har bir productdan 3tadan oladi
       index++;
   }
   res.render('en/index',{"collections":productCollection,"products":products});
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
