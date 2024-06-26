import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";


const app = express();

app.use(cors(
    {
        origin:"https://e-com-client-td2p.vercel.app/",
        methods:["POST","GET","DELETE","UPDATE"],
         allowedHeaders: 'Content-Type,Authorization',
        credentials:true,
    optionsSuccessStatus: 200 

    }
))
app.use(bodyParser.json({limit:"50mb"}))
app.use(cookieParser())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))
//import routes
import userRouter from "./routers/user.route.js"
import productRouter from "./routers/product.route.js";
import cartRouter from "./routers/cart.route.js"



//route Declaration

app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)



export default app ;




