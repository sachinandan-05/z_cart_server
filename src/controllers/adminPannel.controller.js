import { User } from "../models/User.model.js"
import apiResponse from "../utils/ApiRespose.js"

// ------------------getting user details ------------------------------
const getUsers=async(req,res)=>{

    try {
        const users=await User.find()
        console.log("Users",users)
        
        res.status(200)
        .json(new apiResponse(200,users,"here you got all users"))
    } catch (error) {
        throw Error("somthing went wrong while getting user details")
    }

}
// _--------------------------------------updating user details--------------------------------------




const updateUsersDetails=async(req,res)=>{
    try{
        const sessionUser = req.userId

        const { userId , email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await User.findById(sessionUser)

        console.log("user.role",user.role)



        const updateUser = await User.findByIdAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}



export{
    getUsers,
    updateUsersDetails
}
/**
 
   const user = User.findByIdAndUpdate(req.user?._id,
      {
         $set: {
            fullname:fullname,
            email:email
         }
            
         
      },{new:true})
     
})
 */