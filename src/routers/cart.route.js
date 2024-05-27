 import { Router } from "express";
import authToken from "../middlewares/authToken.middleware.js";
import { addProductToCart, countProduct, deleteProductFromCart, productDetailsWithinCart, updateAddToCartProduct } from "../controllers/cart.controller.js";

 const router= Router()
 router.post("/addtocart",authToken,addProductToCart)
 router.route("/countCartProduct").get(authToken,countProduct)
 router.route("/numberofproduct").get(authToken,productDetailsWithinCart)
 router.route("/delete-from-cart").delete(authToken,deleteProductFromCart)
 router.route("/updatecartproduct").post(authToken,updateAddToCartProduct)
 



 export default router