const express = require('express');
const router = express.Router();

//model
const Product = require('../models/Product');
const Collection = require('../models/Collection');


// /* GET portfolio-details page. */
// router.get('/portfolio-details', (req, res, next)=> {
//     console.log('asd');
//     res.render('en/portfolio_details');
// });


/* GET collection/id page. */
router.get('/:id', async(req, res, next)=> {
    const id = req.params.id;
    collection = await Collection.findById(id);

    katalog = await Product.findById(collection.product)
    res.render('en/portfolio_details',{'collection':collection,'katalog':katalog});
});






module.exports = router;