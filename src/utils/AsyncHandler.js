


// const AsyncHandler =async (funx) => {
//     return (req,res,next)=>{

//         Promise.resolve(funx)
//         .catch((err)=>next(err))

//     }
// }

// export default AsyncHandler

const AsyncHandler=(funx)=>async(req,res,next)=>{
    try {
        await funx(req,res,next)
        
    } catch (error) {
        res.status(err.code||500).json(
            {
                success:false,
                massage:err.massage
            }
        )
        
    }
}

export default AsyncHandler