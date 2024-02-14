const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");
const { DEFAULT_ID } = require("../config");

const configSchema = new Schema(
    {
        config_id:{
            type:String,
            default:DEFAULT_ID
        },
        currentTax:{
            type:Number,
            default:350
        },
        lastTax:{
            type:Number,
            default:350
        },
        home_delivery:{
            type:Boolean,
            default:false
        },
        lastUpdated:{
            type:Date,
            default:Date.now()
        }

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-config-schema", configSchema);