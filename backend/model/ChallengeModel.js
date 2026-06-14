
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    difficulty:{type:String,enum:["Easy","Medium","Hard"],required:true},
    category:{type:String,enum:["HTML","CSS"]},
    requirements:{type:[String],default:[]},
    outputImage:{type:String,required:true},
    challengeNumber:{type:Number,required:true,unique:true},
    validationRules:[{
        selector:{
            type:String,
            required:true
        },
        type:{
            type:String,
            enum:["count","exists"],
            required:true
        },
        expected:{
            type:mongoose.Schema.Types.Mixed,
        }
    }],
    solvedCount:{type:Number,default:0}

}, {timestamps:true},
)

const challengeModel = mongoose.models.challenge || mongoose.model("challenge",schema);

export default challengeModel