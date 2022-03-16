const mongoose=require('mongoose');

//tạo giản đồ chứa dữ liệu người dùng mà sẽ được hiển thị trên database khi mình send post từ postman
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min : 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    my_password:{
        type:String,
        required:true,
        max: 1024,
        min: 6
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports=mongoose.model('User',userSchema);
