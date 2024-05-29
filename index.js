import dotenv from "dotenv"

import app from "./src/app.js";
import { connectDB } from "./src/db/index.js";

dotenv.config(
    {
        path:".env"
    }
)
app.get("/",(req,res)=>{
    res.send("welcome")
})
await connectDB()
.then(()=>{

    app.listen(process.env.PORT || 8080 ,()=>{
        console.warn( `server is lising on port: ${process.env.PORT}`);
    })

    console.log("data base connected succesfully")
})




// console.log(process.env.PORT)