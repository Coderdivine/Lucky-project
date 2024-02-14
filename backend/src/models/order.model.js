const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const orderSchema = new Schema(
    {
        order_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        email:{
            type:String,
            required: true
        }, 
        billing_address:{
            type:String,
            required: false
        },
        user_id:{
            type:String,
            required:true
        },
        shipping_address:{
            type:String,
            required: true
        },
        admin_id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["ordered","shipping","delivered","settled","hold","refund-request"],
            required:true
        },
        currency:{
            type:String,
            required:true
        },
        sentEmailCount:{
            type:Number,
            default:0
        },
        amount:{
            type:Number,
            required:true,
        },
        delivery_type:{
            type:String,
            required:true 
        },
        lastResponse:{
            type:String,
            default:"No response"
        },
        orders:[Array],
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
        },
        paymentPaid:{
            type:Boolean,
            required:true
        },
        paymentMade:{
            type:Boolean,
            required:true
        },
        payment_id:{
            type:String,
            required:true
        },
        reference:{
            type:String,
            required:true
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


module.exports = mongoose.model("dabinx-order-schema", orderSchema);