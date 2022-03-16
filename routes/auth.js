const router=require('express').Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {registerValidation,loginValidation}=require('./validation');



//middleware với phương thức post
router.post('/register',async(req,res)=>{

    //validate before creating a user.
    //Gồm 2 tham số là nội dung của request và phần kiểm tra xem hợp lệ hay không
    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //res.send(validation);

    //Checking if the user was in the database
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords. Sử dụng Bcrypt để tạo ra mật khẩu dạng mã hóa, tính bảo mật, chậm mà chắc hơn so với các đời của SHA
    const salt= await bcrypt.genSalt(10);
    const hassedPassword= await bcrypt.hash(req.body.password,salt);

   // create a user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hassedPassword
    });

    try{
        const savedUser=await user.save();
        res.send(savedUser);
        //res.send({user:user._id}); //hiển thị mỗi thông tin id
    }catch(err){
        res.status(400).send(err);
    }

});

//Login
router.post('/login',async (req,res)=>{
    //validate before loginning
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        //Check email exists
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Email is not found');

        //password is correct
        const validPass=await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        //Create and assisn a token to realize that user logged in
        const token=jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);

        //res.send('Loggged in!');
})

module.exports=router;