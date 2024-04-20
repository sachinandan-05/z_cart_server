
import dotenv from "dotenv"
import app from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config(
    {
        path:".env"
    }
)
app.get("/",(req,res)=>{
    res.send("welcome")
})
connectDB()

app.listen(process.env.PORT || 8080 ,()=>{
    console.warn( `app is lising on port: ${process.env.PORT}`);
})
// console.log(process.env.PORT)