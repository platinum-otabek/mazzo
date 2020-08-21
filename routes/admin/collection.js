const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('joi');
const multer = require('multer');

const shortid = require('shortid');
const Collection = require('../../models/Collection');
const Product = require('../../models/Product');

// verify token
const verifyToken = require('../../middleware/verifyToken');
const {eA} = require('../../middleware/middleware');


const storage = multer.diskStorage({
    destination:function(req,res,cb) {
      cb(null,'public/uploads/')
    },
    filename: function(req,file,cb) {
      cb(null,shortid.generate() + file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const upload = multer({
  storage:storage,
  fileFilter:fileFilter
}).array('file',4);

/* GET all collection page. */
router.get('/all',async(req,res,next)=>{
  await Collection
              .find()
              .select()
              .populate('product','name_en').exec((err,allCollections)=>{
                  if(err){
                      console.log(err);
                    req.flash('danger','Xatolik');
                    res.redirect('/admin/collection/all');
                  }
                  if(allCollections){
                    res.render('admin/collection/all',{'collections':allCollections});
                  }
              });
})


/* GET create collection page. */ 
router.get('/create',eA, async(req, res, next)=> {
  const products = await Product.find({},(err,data)=>{
    if(err){
      req.flash('danger','Xatolik');
      res.redirect('/admin/collection/create');
    }
    if(data){
      res.render('admin/collection/create',{token:global.token,'katalogs':data});
    }
  })
  
});

/* POST create  page. */ 
router.post('/create', (req, res, next)=> {
    upload(req,res,function (err) {
      if(err) {
        console.log('err',err);
        return res.end("Error uploading file.");
      }
      
      // gain all imgs in im
        const imgs = [];
        const files = req.files;
        for (const gettingFile of files) {
            const { path } = gettingFile;
            imgs.push({
                url : path.replace(/\\/g, '/')
            });
        };
        const newCollection = new Collection({
            'name_en':req.body.nameen,
            'name_ru':req.body.nameru,
            'allItems_en':req.body.allitemsen,
            'allItems_ru':req.body.allitemsru,
            imgs,
            price:req.body.price,
            'product':req.body.katalog
        });
        newCollection.save((err)=>{
          if(err){
              console.log(err);
            req.flash('danger','Xatolik');
            res.redirect('/admin/collection/create');
          }
          else{
            req.flash('info','Muvaffaqiyatli yuklandi');
            res.redirect('/admin/collection/create');
          }
        })
      });
});

/* GET update/id  page. */ 
router.get('/update/:id',async(req,res,next)=>{
   await Collection.findById(req.params.id,(err,data)=>{
    if(err){
      req.flash('danger','Xatolik');
      res.redirect('/admin/collection/create');
    }
    if(data){
      res.render('admin/collection/update',{token:global.token,'collection':data});
    }
  })
});

/* POST update/id  page. */ 
router.post('/update/:id',async(req,res,next)=> {
    await Collection.findByIdAndUpdate(req.params.id, {
        'name_en': req.body.nameen,
        'name_ru': req.body.nameru,
        'allItems_en': req.body.allItemsen,
        'allItems_ru': req.body.allItemsru,
        'price': req.body.price
    }, (err) => {
        if (err) {
            req.flash('danger', 'Xatolik');
            res.redirect('/admin/collection/all');
        } else {
            res.redirect('/admin/collection/all');
        }
    })
})


router.get('/delete/:id',async(req,res,next)=>{

    await Collection.findByIdAndDelete(req.params.id,(err)=>{
      if(err){
        req.flash('danger','Xatolik');
        res.redirect('/admin/collection/all');
      }
      else{
        res.redirect('/admin/collection/all');
      }
    })
})








module.exports = router;
