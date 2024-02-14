const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const cartSchema = new Schema(
    {
        cart_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        user_id:{
            type:String,
            required:true
        },
        cart_items:[
            {
                name:{
                    type:String,
                    required:true 
                },
                currency:{
                    type:String,
                    required:true 
                },
                description:{
                    type:String,
                    required:true 
                },
                image:{
                    type:String,
                    required:true 
                },
                product_id:{
                    type:String,
                    required:true 
                },
                variation:{
                    name:{
                        type:String,
                        required:true,
                    },
                    amount:{
                        type:Number,
                        required:true
                    }
                },
                quantity:{
                    type:Number,
                    required:true 
                },
                amount:{
                    type:Number,
                    required:true
                },
                total:{
                    type:Number,
                    required:true
                }
            }
        ],
        order_id:{
            type:String,
            required:false 
        },
        date:{
            type:Date,
            default:Date.now()
        },
        totalAmount:{
            type:Number,
            required:false 
        },
        tax:{
            type:Number,
            required:true
        },
        subTax:{
            type:Number,
            default:0
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-cart-schema", cartSchema);