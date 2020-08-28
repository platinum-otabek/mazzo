const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionSchema = mongoose.Schema({
    name_en:{
        type:String
    },
    name_ru:{
        type:String
    },
    allItems_en:{
        type:String,
        required:true
    },
    allItems_ru:{
        type:String,
        required:true
    },
    imgs:[{
            url:{
                type:String,
                required:true
            }
    }],
    price:{
        type:String
    },
    product:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }
});

module.exports = mongoose.model('Collection',collectionSchema);