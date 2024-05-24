import { Product } from "../models/product.model.js";
import apiError from "../utils/ApiError.js";

const sendProduct = async (req, res) => {
    try {
        const { productName, catogry, brandName, productImage, price, sellingPrice, description } = req.body

        if (([productName, catogry, productImage, price, sellingPrice, description, brandName].some((field) => field?.trim === ''))) {
            throw new Error(`${field} are required!`)

        }

        const newProduct = new Product({
            productName,
            catogry,
            productImage,
            price,
            sellingPrice,
            description,
            brandName

        })
        console.log(newProduct)
        await newProduct.save()
        console.log("product details", newProduct)

        res.json({
            dats: newProduct,
            message: "productuct has been uploded successfully",
            status: 200


        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ------------------getting all product info---------------------------------

const allProductInfo = async (req, res) => {
    const allProductDetails = await Product.find()

    res.json({
        data: allProductDetails,
        successs: true,
        error: false,
        message: "here all product that you uploded"
    })


}


//----------------------Update_Products_details-----------------------------

const updateProductsDetails = async (req, res) => {
    try {
        const { _id, productName, catogry, productImage, price, sellingPrice, description, brandName } = req?.body

        console.log("id ", _id, productName, catogry, productImage, price, sellingPrice, description, brandName)

        const updatedProduct = await Product.findByIdAndUpdate(_id, {

            $set: {
                productName,
                catogry,
                productImage,
                price, sellingPrice,
                description,
                brandName
            }
        }, { new: true })
        console.log("updatedProduct", updatedProduct)

        res.json({
            message: "product updated successfully",
            data: updatedProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// -----------------------------remove ptoduct----------------------------

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body
        console.log("id :", _id)
        if (!_id) {
            throw new Error("Id is not getting")

        }

        const deletedProduct = await Product.findByIdAndDelete(_id)
        if (!deleteProduct) {
            throw new Error("not getting product has to be delete")

        }
        console.log("detail of deleted product", deletedProduct)
        res.status(200)
            .json({
                message: "product deleted success fully",
                success: true,
                data: _id,
                error: false
            })
    }
    catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//---------------------------------get categoryof products-------------------------------------

const getListOfProductCategrywise = async (req, res) => {
    try {
        const getProductCatogry = await Product.distinct("catogry", { "catogry": { $nin: [''] } })
        // console.log(getProductCatogry)

        const product = []

        for (const catogry of getProductCatogry) {

            //  console.log( "cat",catogry)


            const getProduct = await Product.findOne({ "catogry": catogry })

            if (getProduct) {
                product.push(getProduct)
            }

        }
        // console.log(product)



        res.status(200)
            .json({
                data: product,
                success: true,
                error: false
            })
    }

    catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })



    }
}

//-------------------------------getProductcatogrywise------------------------------------

const getProductCatogryWise = async (req, res) => {

    try {
        const { catogry } = req?.body || req?.query

        const product = await Product.find({ catogry })

        console.log("product list catogry wise", product)

        res.status(200)
            .json({
                data: product,
                success: true,
                error: false
            })



    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })


    }

}

const getProductDetails=async(req,res)=>{
    try {
        const {productId}=req.body

        console.log("productId",productId)

        const producDetails= await Product.findById(productId)

        console.log("productDeatails",producDetails)
        res.status(200)
        .json({
            data: producDetails,
            success: true,
            error: false
        })
    
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })

        
    }

}



export {
    sendProduct,
    allProductInfo,
    updateProductsDetails,
    deleteProduct,
    getListOfProductCategrywise,
    getProductCatogryWise,
    getProductDetails

}