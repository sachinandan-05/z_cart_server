import mongoose from "mongoose"

const connectDB= async()=>{
    
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MONGODB connected DB host: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance)
    } catch (error) {
        console.log("connection failed",error)
        process.exit(1)
    }
}
export{connectDB}