const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const notificationSchema = new Schema(
    {
        notification_id:{
            type:String,
            required:true
        },
        unread:{
            type:Boolean,
            defaul:false,
        },
        message:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        user_id:{
            type:String,
            required:false,
        },
        admin_id:{
            type:String,
            required:false,
        }

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-notification-schema", notificationSchema);