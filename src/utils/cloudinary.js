import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import apiError from './ApiError';


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET

});
const uploadOnCloudinary= async(localPath)=>{
    try {
        if (!localPath) return null ; // no file uploaded 
            
        
        const response=  await cloudinary.uploader.upload(localPath,{
            resource_type:'auto'
        });
        console.log("file uploaded on cloudinary",response.url)
        fs.unlinkSync(localPath) //removed from local storage
    } catch (error) {
        throw new apiError(400,"something went wrong while uploading file on cloudinary")
        fs.unlinkSync(localPath) //removed file from local storage
        
    }
}

const removeFromCloudinary=(file)=>{
    
    
}


export default{
    uploadOnCloudinary,
    removeFromCloudinary}