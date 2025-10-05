const jwt=require('jsonwebtoken');
const user=require("../models/User");

const protect=async (req,res,next)=>{
    try {
        let token=req.headers.authorization;

        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await user.findById(decoded.id).select("-password");
            next();
        }else{
            res.status(401).json({message:"Not authorized, no token"});
        }
    }catch (error) {
        res.status(401).json({message:"Not authorized, token failed"});
    }
};

module.exports={protect};