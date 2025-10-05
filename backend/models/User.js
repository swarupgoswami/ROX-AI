const mongoose=require('mongoose');


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    profileImageUrl:{
        type:String,
        default:null
    },

},
{timestamps:true});



module.exports=mongoose.model("user",userSchema);