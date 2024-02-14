const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const productSchema = new Schema(
    {
        product_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        admin_id:{
            type:String,
            required:true
        },
        name: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type:[String],
            required: true,
        },
        amount:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            required:true
        },
        sizes:[String],
        variations:[
            {
                name:{
                    type:String,
                    required: true,
                },
                amount:{
                    type:Number,
                    required:true
                }
            }
        ],
        ordered:{
            type:Number,
            default:0
        },
        remaining:{
            type:Number,
            default:0
        },
        allowCustomerReview:{
            type:Boolean,
            default:false
        },
        likes:{
            type:Number,
            default:0
        },
        released:{
            type:Date,
            default:Date.now()
        },
        outOfStock:{
            type:Boolean,
            default:false
        },
        features:[
            {
                image:{
                    type:String,
                    required:false 
                },
                title:{
                    type:String,
                    required:false 
                },
                description:{
                    type:String,
                    required:false
                }
            }
        ],
        allowPickUpDelivery:{
            type:Boolean,
            default:false
        },
        editedLast:{
            type:Date,
            required:false,
            select:false
        },
        lasteOrdered:{
            type:Date,
            required:false
        },
        onHold:{
            type:Boolean,
            select:false,
            default:false
        },
        addedAmount:{
            type:Number,
            default:0,
        },
        deliveryMode: {
            type:String,
            default:"door_delivery"
        },
        lastClicked:{
            type:Date,
            required:false
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
       
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("dabinx-product-schema", productSchema);