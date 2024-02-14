const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const withdrawalSchema = new Schema(
    {
        admin_id:{
            type:String,
            required:true
        },
        withdrawal_id:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            required:true
        },
        order_id:{
            type:String,
            required:true,
        },
        amount:{
            type:Number,
            required:true
        },
        admin_balance_before:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["pending","ordered","shipping","delivered","settled","hold","refund-request"],
            required:true
        },
        admin_balance_now:{
            type:Number,
            required:true
        },
        total_tax_collected:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-withdrawal-schema-for-admin", withdrawalSchema);