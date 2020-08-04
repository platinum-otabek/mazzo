const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// verify token
const verifyToken = require('../../middleware/verifyToken');
const {eA} = require('../../middleware/middleware');

/* GET all products  page. */ 
router.get('/all',eA, async(req, res, next)=> {
    const products = await Product.find({});
    res.render('admin/product/all',{token:global.token,'products':products});
});

/* GET create product  page. */ 
router.get('/create',eA, async(req, res, next)=> {
    console.log('product create');
    res.render('admin/product/create',{token:global.token});
});

/* POST create product  page. */ 
router.post('/create',verifyToken, async(req, res, next)=> {
    const newProduct = new Product({
        'name_en': req.body.en,
        'name_ru': req.body.ru
    });
    newProduct.save((err,data)=>{
        if(err){
            console.log(err)
            req.flash('danger','Bazadan tekshirib qaytadan kiriting');
            res.redirect('/admin/product/create');
        }
        else{
            req.flash('info','Muvaffaqiyatli qo`shildi');
            res.redirect('/admin/product/create');
        }
    })
});


/* GET update/id product  page. */ 
router.get('/update/:id',eA, async(req, res, next)=> {
    const product = await Product.findById(req.params.id);
    res.render('admin/product/update',{token:global.token,product});
});
/* POST update/id product  page. */ 
router.post('/update/:id',eA,verifyToken, async(req, res, next)=> {
    await Product.findByIdAndUpdate({_id:req.params.id},
        {
            'name_en':req.body.en,
            'name_ru':req.body.ru
        },(err)=>{
            if(err){
                req.flash('danger','Bazadan tekshirib qaytadan kiriting');
                res.redirect('/admin/product/all');
            }
            else{
                req.flash('info','Muvaffaqiyatli o`zgartirildi');
                res.redirect('/admin/product/all');
            }
        })
});


/* Delete /id product  page. */ 
router.get('/delete/:id',eA,(req,res,next)=>{
    console.log('assadasd');
    console.log(req.params.id);
     Product.deleteOne({_id:req.params.id},(err)=>{
        res.redirect('/admin/product/all');
    });
    
})

module.exports = router;  
  