const jwt=require('jsonwebtoken');

//Create a function to check the token is avalable
module.exports=function(req,res,next){
    const token=req.header('auth-token'); //lấy token
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified; //nếu verify hợp lệ thì add user
        next();
    }catch(err){
        res.status(404).send('Invalid Token');
    }

}