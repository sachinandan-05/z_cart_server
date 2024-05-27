import jwt from "jsonwebtoken"

async function authToken(req,res,next){
    try {
        const token= await req.cookies?.accessToken

        if (!token) {
          return   res.json({
                message:"user is not login",
                error: "true",
                success:"false"
            })
            
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {

            console.log(err)
            console.log("decoded:",decoded) 

            if (err) {
                console.log("auth error:",err)
                
            }
            
            req.userId=decoded?._id
            
            console.log("userId",req.userId)
            // next()
        });
       
            
        
        

        console.log("midleware called successfully")
           
        // console.log ("tokens:    -",token)
        next()
    } catch (err) {

        res.status(400).json({
            message: err.message || err,
            data:[],
            error: true,
            success:false
        })
        
    }

}
export default authToken