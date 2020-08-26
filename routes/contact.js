const express = require('express');
const router = express.Router();
const Telegraf = require('telegraf');
const bot = new Telegraf("1379579193:AAGoH6lMwmVSBCJWL7TQz1vx8F9xNhXigCc");


router.post('/',async (req,res,next)=>{
    let message = `name: ${req.body.name} \n number: ${req.body.number} \n email: ${req.body.email} \n subject: ${req.body.subject} \n message: ${req.body.message}`;
    await bot.telegram.sendMessage('716916580', message,{
        parse_mode:'HTML'
    });
    bot.launch();
    res.redirect(`/${req.body.direc}`);
});



module.exports = router;







