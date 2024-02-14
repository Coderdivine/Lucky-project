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
        subcription_plan:{
            type:String,
            required:true,
            enum:["BASIC", "PRO", "ULTRA"]
        },
        admin_id:{
            type:String,
            required: true
        },
        currency:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        },
        status:{
            type:String,
            enum:[ "pending", "settled", "paid" ],
            required:true
        },
        email:{
            type:String,
            required:true
        },
        paymentPaid:{
            type:Boolean,
            required:true
        },
        paymentMade:{
            type:Boolean,
            default: false
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-admin-payment-schema", paymentSchema);