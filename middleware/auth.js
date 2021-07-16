import jwt from "jsonwebtoken";
export const auth = (req,res,next)=>{
    try{
        const token = req.header("x-auth-token");
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.send({"error":err});
            req.user = user;
            next();
        });
    }catch(e){
        res.status(500).send({"error":e});
    }
}