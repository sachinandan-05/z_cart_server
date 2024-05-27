import mongoose, { Schema } from "mongoose"

const cartSchema = new mongoose.Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
    // Quantity:Number

},{timestamps:true})

export const cartproduct = mongoose.model("cartproduct",cartSchema)