//Tạo ra private router
const router=require('express').Router();
const verify=require('./verifyToken');

router.get('/',verify,(req,res)=>{
    res.json([{
        "id":1,
        "model":"m3",
        "power":500,
        "description":null,
        "brandName":"BWM"
    },
    {
        "id":2,
        "model":"m2 competition",
        "price":100000000,
        "power":1000,
        "description":null,
        "brandName":"BWM"
    }
    ]);
    //nếu sử dụng res.send(req.user) nhận được thông tin của người dùng
    
});

module.exports=router;