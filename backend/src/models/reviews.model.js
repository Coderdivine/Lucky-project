const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const reviewSchema = new Schema(
    {
        review_id:{
            type:String,
            required:true 
        },
        product_id:{
            type:String,
            required:true 
        },
        username:{
            type:String,
            required:true 
        },
        country:{
            type:String,
            required:false 
        },
        image:{
            type:String,
            default:null
        },
        rate:{
            type:Number,
            enum:[0,1,2,3,4,5],
            required:true
        },
        reason:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-review-schema", reviewSchema);