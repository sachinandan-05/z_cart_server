// number of product added to cart

import { cartproduct } from "../models/cart.model.js";

const addProductToCart = async (req, res) => {
    console.log("api called");
    try {
        const { productId } = req?.body;
        // console.log("productId",productId)
        const currentUser = req?.userId;
        // console.log("id",currentUser)

        const isProductAvailable = await cartproduct.findOne({
            productId: productId,
        });

        console.log("isProductAvailabl   ", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Already exits in Add to cart",
                success: false,
                error: true,
            });
        }

        const newAddToCart = new cartproduct({
            productId: productId,
            quantity: 1,
            userId: currentUser,
        });
        await newAddToCart.save();

        return res.json({
            data: newAddToCart,
            message: "Product Added in Cart",
            success: true,
            error: false,
        });
    } catch (err) {
        return res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

// count number of product into cart

const countProduct = async (req, res) => {
    try {
        if (req.userId) {
            // Find the cart associated with the user
            const cart = await cartproduct.countDocuments({ userId: req.userId });

            if (!cart) {
                return res.status(200).json({
                    data: 0,
                    message: "No cart found for the user",
                });
            }

            // Count the number of unique products in the user's cart
            const numberOfProduct = cart;

            console.log("numberOfProduct", numberOfProduct);

            return res.status(200).json({
                data: numberOfProduct,
                message: "Data fetched",
            });
        } else {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
//-----------------------------list of details of  products in cart-------------------------------

const productDetailsWithinCart = async (req, res) => {
    try{
        const currentUser = req.userId

        const allProduct = await cartproduct.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

// --------------------deleteProductFromCart------------------------------

const deleteProductFromCart=async(req,res)=>{

    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await cartproduct.deleteOne({ _id : addToCartProductId})

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


//---------------------------update cart quantity  of product---------------------------------------
const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await cartproduct.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}




export { addProductToCart, countProduct, productDetailsWithinCart ,deleteProductFromCart,updateAddToCartProduct};
