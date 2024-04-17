const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");
const { DEFAULT_ID } = require("../config");

const PoolSchema = new Schema(
    {
        pool_id:{
            type:String,
            required: false
        },
        admin_id:{
            type:String,
            required: true
        },
        state:{
            type:String,
            required: true
        },
        region:{
            type:String,
            required: true
        },
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        date:{
            type:Date,
            default: Date.now() 
        },
        status:{
            type:String,
            default:"ongoing",
            enum: [ "ongoing", "pending", "suspended", "completed" ]
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("lucky-pool-schema", PoolSchema);