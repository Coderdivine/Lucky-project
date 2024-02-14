const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const paymentSchema = new Schema(
    {
        payment_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        reference:{
            type:String,
            required:true,
            unique:true
        },
        user_id:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            required:true
        },
        cart_details:[
            {
                name:String,
                product_id:{
                    type:String,
                    required:true 
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
            required:true 
        },
        date:{
            type:Date,
            default:Date.now()
        },
        status:{
            type:String,
            enum:["ordered","shipping","delivered","settled","hold","refund-request"],
            required:true
        },
        sentEmailCount:{
            type:Number,
            required:false 
        },
        totalAmount:{
            type:Number,
            required:false 
        },
        tax:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone_number:{
            type:String,
            required:true 
        },
        shipping_address:{
            type:String,
            required:true
        },
        billing_address:{
            type:String,
            required:true 
        },
        payedDate:{
            type:Date,
            required:true
        },
        admin_id:{
            type:String,
            required:true 
        },
        delivery_type:{
            type:String,
            enum:["pickup","door"],
            required:true
        },
        paymentPaid:{
            type:Boolean,
            required:true
        },
        paymentMade:{
            type:Boolean,
            default: false
        },
        payment_method:{
            type:String,
            enum: [ "stripe", "paystack" ],
            required:false
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-payment-schema", paymentSchema);