import { Router } from "express";
import { allProductInfo, deleteProduct,
       
        filterProduct,
       
        getListOfProductCategrywise,
       
        getProductCatogryWise,
       
        getProductDetails,
       
        searchProductbyName,
       
        sendProduct, updateProductsDetails } from "../controllers/product.controller.js";
// import authToken from "../middlewares/authToken.middleware.js"




const router=Router()
// -------------uploadProduct-------------
router.route("/uploadproduct").post(sendProduct)
router.route("/allproduct").get(allProductInfo)
router.route("/updateProduct").post(updateProductsDetails)
router.route("/deleteproduct").delete(deleteProduct)
router.route("/getaproduct").get(getListOfProductCategrywise)
router.route("/getalistofproductcatogrywise").post(getProductCatogryWise)
router.route("/productdetails").post(getProductDetails)
router.route("/search").get(searchProductbyName)
router.route("/filter").post(filterProduct)




export default router