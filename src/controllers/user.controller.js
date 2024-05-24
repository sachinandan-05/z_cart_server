
// import AsyncHandler from "../utils/AsyncHandler.js"
import apiError from "../utils/ApiError.js"
import apiResponse from "../utils/ApiRespose.js"
import { User } from "../models/User.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { json } from "express"
// import bcrypt from "bcrypt"


const generateAccessToken= async (userId)=>{
    
        const user= await User.findById(userId);
        const accessToken= await user.createAccessToken()

        await user.save({validateBeforeSave:false})

        return accessToken
        

}

const signUp = async(req,res)=>{

    // const profilePic=req.file
    
        const {username,email,password,profilePic}=req.body
        // console.log(username);
        console.log(username,email,password,profilePic)

        const alredyExist=await User.findOne({email})
        console.log(alredyExist)
        if (alredyExist) {
            throw new apiError( 400,alredyExist," user alredy  exist "

            )
        
            
            
        }
    
        // if ([username,email,password].slice((field)=>field?.trim()==="")) {
        //     throw new apiError(404,`all field are required`)
        // }
        // if (!username) {
        //     throw new apiError(404,"user name is required")
            
        // }
        if (!email) {
            throw new apiError(404,"email name is required")
            
        }
        if (!password) {
            throw new apiError(404,"password  is required")
            
        }
        // const localpathOfprofile=req.file?.path
        
        // // console.log("request:",req)
        // console.log("localpath :",localpathOfprofile)

        // if (localpathOfprofile) {
        //     var profile= await uploadOnCloudinary(localpathOfprofile)
        // console.log("url from cloudinary",profile.url)
            
        // }


        
        const user= await User.create(
            {
                username:username,
                email:email,
                password:password,
                profilePic:(profilePic || "") ,
                role:"GENERAL"
            
    
                
                
            }
        )
    
        if (!user) {
            throw new apiError(404,"user reqired")
            
        } 
        // console.log("res",res)
    
        console.log(user);
        return res.status(200).json( new apiResponse(200,user,"signup successfully"))
    
    
    
        
    }


    // ---------------------LOGIN------------------------

    const loginUser=async (req,res)=>{

        const {email,password}=req.body

        if(!email){
            throw new Error ("please enter email")
        }
        if (!password) {
            throw new Error("please enter password")
            
        }

        const user= await  User.findOne({email});

        if (!user) {
            throw new Error("user is not resistered please signup first")
            
        }
        const cheakPassword= await user.isPasswordCorrect(password)
        if (!cheakPassword) {
            throw new Error("Please cheak password")
        }
        console.log(cheakPassword,user._id)
        const accessToken= await generateAccessToken(user._id)
        // console.log("accessToken:",accessToken);

        const LoggedInUser= await User.findById(user._id).select("-password ")

        const Options={
            httpOnly: true,
            secure:true
        }

        return res.status(200)
        .cookie("accessToken",accessToken,Options)
        .json(
            new apiResponse(200,{user,LoggedInUser,accessToken},"user logined successfully")
        )
        // console.log(user)



    }

    // -------------------user details----------------------------------------------

    const userDetails= async(req,res)=>{
        try {
            console.log("user Id:",req.userId)

            const user= await User.findById(req.userId)
            console.log("user Details:",user)

            res.status(200).json({
                data:user,
                message:"users details",
                success:true,
                error:false
            })
        } catch (err) {
            res.status(400).json(
                {
                    message: err.message || err,
                    error:true,
                    success:false
                }
            )
            
        }
    }

    // ------------------userLogout---------------------------------

    const logoutUser =async(req,res)=>{
        
            
        try {
            res.clearCookie("accessToken") 

            res.json({
                message:"logout successfully",
                error:false,
                success:true,
                data:[]
            })
    
        } catch (err) {
            res.json({
                message:err.message || err,
                error:true,
                success:false
            })
            
        }
        
        
        }
        

export{
    signUp,
    loginUser,
    logoutUser,
    userDetails
}