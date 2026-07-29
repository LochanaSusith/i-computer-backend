import jwt from 'jsonwebtoken';

export default function authorizeUser(req,res,next){

    const header = req.header("Authorization") 

    if(header != null){
        const token = header.replace("Bearer ","");
        
        jwt.verify(token,"i-computer-54!", 
            (err,decoded)=>{
                if(decoded == null){
                    res.status(401).json({
                        message:"Invalid token please login again"
                    })
                }else{
                    req.user = decoded;
                    next();
                }
            }
        ) 
    }else{
        //past the requist other endpoints
        next();
    }
    
}