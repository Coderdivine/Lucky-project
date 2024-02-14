const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// const { BCRYPT_SALT } = require("../config");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const UserSchema = new Schema(
    {
        user_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone_number:{
            type:String,
            required: false
        },
        firstname:{
            type:String,
            required: true
        },
        lastname:{
            type:String,
            required: true
        },
        gender:{
            type:String,
            required: true,
            enum:[ "male", "female" ]
        },
        age:{
            type:String,
            required: true
        },
        nin:{
            type:String,
            required: true,
            unique: true
        },
        state:{
            type:String,
            required: true
        },
        pool_id:{
            type:String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("lucky-user-schema", UserSchema);