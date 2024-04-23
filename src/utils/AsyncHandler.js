

const AsyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err=>next(err)))
    }
}

export default AsyncHandler

// const AsyncHandler=(funx)=>async(req,res,next)=>{
//     try {
//         await funx(req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json(
//             {
//                 success:false,
//                 massage:error.massage
//             }
//         )
        
//     }
// }

// export default AsyncHandler