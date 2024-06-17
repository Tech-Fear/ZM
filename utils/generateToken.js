const jwt=require('jsonwebtoken');

    const generateTokenAndSetCookie=(UserId,res)=>{
    const token=jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn: '10d'
    })
    res.cookie('jwt',token,{
        maxAge: 15*24*60*60*1000, //milliseconds
        httpOnly: true, //prevent Xss Attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV==="production"?true:false

    })
}
module.exports=generateTokenAndSetCookie;