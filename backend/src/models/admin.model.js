const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const adminSchema = new Schema(
    {
        admin_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        firstname:{
            type:String,
            required: false
        },
        lastname:{
            type:String,
            required: false
        },
        password:{
            type:String,
            required:true 
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone_number:{
            type:String,
            required:true 
        },
        gender:{
            type:String,
            required: false
        },
        date:{
            type:Date,
            default: Date.now()
        },
        state:{
            type:String,
            required: true
        },
        nin:{
            type:String,
            required: true
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("lucky-admin-schema", adminSchema);