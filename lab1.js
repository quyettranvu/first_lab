const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
//Import Routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');

dotenv.config();

//connect database
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('Connected to DB!');
})

//Middleware để cho phép send request ở dạng json
app.use(express.json());

//Router Middleware.Ở đây khi truy cập sẽ gọi là api/user/register
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(3000,()=>console.log("Server up and running!"));