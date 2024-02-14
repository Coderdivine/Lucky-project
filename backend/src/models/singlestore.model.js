const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");
const productModel = require("./product.model");

const singlestoreSchema = new Schema(
    {
        store_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        hero_image:{
            type:String,
            required:true 
        },
        admin_id:{
            type:String,
            required:true
        },
        user_id:{
            type:String,
            required:true
        },
        btnTxt:{
            type:String,
            default:"Shop Now"
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        product_id:{
            type:String,
            required:true 
        },
        product_link:{
            type:String,
            required:true 
        },
        reviewAllowed:{
            type:Boolean,
            default:true,
        },
        features:[Array],
        headers:[Array],
        date:String,
        lastEdited:{
            type:Date,
            required:false
        },
        footer:[Array]
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-singlestore-schema", singlestoreSchema);