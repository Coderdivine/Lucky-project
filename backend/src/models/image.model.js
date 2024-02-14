const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const imageSchema = new Schema(
    {
       image_id:{
        type:String,
        required:true 
       },
       image_link:{
            type:String,
            required:true 
       },
       product_id:{
        type:String,
        required:false
       },
       admin_id:{
        type:String,
        required:true
       },
       datePosted:{
        type:Date,
        default:Date.now()
       },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-image-schema", imageSchema);