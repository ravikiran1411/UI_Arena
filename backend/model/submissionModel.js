
import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    challengeId:{type:mongoose.Schema.Types.ObjectId,ref:"challenge",required:true},
    htmlCode:{type:String,default:""},
    cssCode:{type:String,default:""},
    status:{type:String,enum:["in-progress","completed"],default:"in-progress"},
    

},{timestamps:true})

schema.index({ userId:1, challengeId:1 },{ unique:true })

const submissionModel = mongoose.models.submission || mongoose.model("submission",schema)

export default submissionModel;