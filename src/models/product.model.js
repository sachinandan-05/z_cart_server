import mongoose from "mongoose";
const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        require:true,
        
    },
    brandName:{
        type:String,
        require:true,
        
    },
    productImage:{
        type:[String],
        require:true,

    },
    catogry:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    sellingPrice:{
        type:String,
        require:true
    },
    description:{
        type:String,
        // required:true
    },



},{timestamps:true})
export const Product=mongoose.model("Product",productSchema)

// //  productName:" ",
// brandName:" ",
// catogry:"",
// productImage:[],
// price:" ",

// description:""