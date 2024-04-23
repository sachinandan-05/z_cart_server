import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"user name must be required"]
    },
    email:{
        type:String,
        require:true,
        unique:[true,"email must be required"],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },

    
    profilePic:{
        type:String
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    

    next();
    
})
userSchema.methods.isPasswordCorrect= async function(password){

    return await bcrypt.compare(password,this.password);
}

userSchema.methods.createAccessToken=async function(){
    return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )

}





export const User= mongoose.model("User",userSchema)