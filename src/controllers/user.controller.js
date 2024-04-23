
// import AsyncHandler from "../utils/AsyncHandler.js"
import apiError from "../utils/ApiError.js"
import apiResponse from "../utils/ApiRespose.js"
import { User } from "../models/User.model.js"
// import { json } from "express"
// import bcrypt from "bcrypt"


const generateAccessToken= async (userId)=>{
    
        const user= await User.findById(userId);
        const accessToken= await user.createAccessToken()

        await user.save({validateBeforeSave:false})

        return accessToken
        

}


const signUp = async(req,res)=>{

    
        const {username,email,password}=req.body
        // console.log(username);

        const alredyExist=await User.findOne({email})
        console.log(alredyExist)
        if (alredyExist) {
            throw new apiError( 400,alredyExist," user alredy  exist "

            )
           
            
            
        }
    
        // if ([username,email,password].slice((field)=>field?.trim()==="")) {
        //     throw new apiError(404,`all field are required`)
        // }
        if (!username) {
            throw new apiError(404,"user name is required")
            
        }
        if (!email) {
            throw new apiError(404,"email name is required")
            
        }
        if (!password) {
            throw new apiError(404,"password  is required")
            
        }

        
        const user= await User.create(
            {
                username:username,
                email:email,
                password:password,
                role:"GENERAL"
            
    
                
                
            }
        )
    
        if (!user) {
            throw new apiError(404,"user reqired")
            
        } 
    
        console.log(user);
        return res.status(200).json( new apiResponse(200,user,"signup successfully"))
    
    
    
        
    }


    // ---------------------LOGIN------------------------

    const loginUser=async (req,res)=>{

        const {email,password}=req.body

        if (!(email && password)) {
            throw new apiError(404 ,"please enter password and email")
            
        }

        const user= await  User.findOne({email});

        if (!user) {
            throw new apiError("user is not resistered please signup first")
            
        }
        const cheakPassword= await user.isPasswordCorrect(password)
        if (!cheakPassword) {
            throw new apiError(400,"invalid password")
        }
        console.log(cheakPassword,user._id)
        const accessToken= await generateAccessToken(user._id)
        console.log("access Token:",accessToken);

        const LoggedInUser= await User.findById(user._id).select("-password ")

        const Options={
            httpOnly: true,
            secure:true
        }

        return res.status(200)
        .cookie("access Token:",accessToken,Options)
        .json(
            new apiResponse(200,{user,LoggedInUser,accessToken},"user logined successfully")
        )
        // console.log(user)



    }

    


export{
    signUp,
    loginUser
}