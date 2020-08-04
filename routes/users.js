const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('joi');
/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login'); 
});



/* Post Login and authenticate page. */
router.post('/login', (req, res, next)=> {

  const schema = Joi.object({
    name: Joi.string().min(4).max(10).required(),
    pass: Joi.string().min(4).max(10).required()
  });
  const {err} = schema.validate(req.body);
  if(err){
    console.log('err');
    req.flash('info','Xatolik');
    res.redirect('/users');
  }
  else{
    console.log('validate');
    passport.authenticate('local',{
      successRedirect:'/admin/product/all',
      failureRedirect:'/users',
      failureFlash:true
    })(req,res,next);
  }
});

/* GET Logout page. */
router.get('/logout', (req, res, next)=> {
  req.logout();
  res.redirect('/');
});

module.exports = router;
