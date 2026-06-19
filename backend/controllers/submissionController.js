import challengeModel from "../model/ChallengeModel.js";
import submissionModel from "../model/submissionModel.js";
import userModel from "../model/userModel.js";

const saveSubmission = async (req,res) => {
    try {
        
        const {challengeId,htmlCode,cssCode,status} = req.body;

        const userId = req.userId

        if (!challengeId || !status) {
            return res.json({success:false,message:"required all the feilds"})
        }
        
        const challenges = await submissionModel.findOne({userId,challengeId})

        if (status==="completed" && (!challenges || challenges.status!=="completed")) {
            let points = 0
            const challenge = await challengeModel.findById(challengeId)

            if (!challenge) {
                return res.json({success:false,message:"Challenge not found"})
            }

            if (challenge.difficulty==="Easy") {
                points=10
            }
            else if (challenge.difficulty==="Medium") {
                points = 25
            }
            else if (challenge.difficulty === "Hard") {
                points = 50
            }
            await userModel.findByIdAndUpdate(userId,{$inc:{points:points}})
        }

        const submission = await submissionModel.findOneAndUpdate({userId,challengeId},{htmlCode,cssCode,status},{new:true,upsert:true})

        res.json({success:true,submission})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
       
    }
}

const getSubmission = async (req,res) => {
    try {
        const {challengeId} = req.params
        const userId = req.userId

        if (!challengeId) {
            return res.json({success:false,message:"challengeId required"})
        }

        const submission = await submissionModel.findOne({userId,challengeId})

        res.json({success:true,submission})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})        
    }
}

const getUserSubmission = async (req,res) => {
    try {
        
        const userId = req.userId

        const challenges = await submissionModel.find({userId}).select("challengeId status updatedAt").populate("challengeId" ,"title difficulty challengeNumber category")
        
        res.json({success:true,challenges})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})        
    }
}

export {saveSubmission,getSubmission,getUserSubmission};