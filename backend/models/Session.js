const mongoose=require("mongoose");

const sessionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    role:{
        type:String,
        required:true,
    },
    experince:{
        type:String,
        required:true,
    },
    topicsToFocus:{
        type:String,
        required:true,
    },
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"question"}],
},
{timestamps:true}
);


module.exports=mongoose.model("session",sessionSchema);