
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImage:{type:String,default:""},
    points:{type:Number,default:0},
    badges:{type:[String],default:[]},
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"challenge",
    }]
}, {
    timestamps:true,
})

const userModel = mongoose.models.User || mongoose.model("User",schema)

export default userModel