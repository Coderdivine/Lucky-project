const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const deliverySchema = new Schema(
   {
     delivery_id: {
        type:String,
        required: true
     },
     delivery_name: {
        type:String,
        required:false
     },
     user_id: {
        type:String,
        required:false
     },
     mode: {
        type:String,
        enum:[ "door_delivery", "classic_delivery", "postoffice_delivery", "jumia", "oriamo", "custom_delivery" ]
     },
     product_id: {
        type:String,
        required: true
     },
     filteredStates: [
       {
        country:{
            type:String,
            required:true 
        },
        states:{
            type:[String],
            default:[""]
        }
       }
     ],
     countries: {
        type:[String],
        required: true
     },
     default_charge: {
        type: Number,
        required: true
     },
     states_delivery_charge: [
        {
            country: {
                type:String,
                required:true
            },
            states:[
                {
                    state:{
                        type: String,
                        required: true
                    },
                    charge:{
                        type: Number,
                        required:true
                    }
                }
            ]
        }
     ]
   },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-delivery-schema", deliverySchema);