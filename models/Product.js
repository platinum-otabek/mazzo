const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name_en:{
        type:String,
        required:true,
        unique:true
    },
    name_ru:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model('Product',productSchema);