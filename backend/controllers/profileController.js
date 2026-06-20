import upload from "../middleware/multer.js";
import challengeModel from "../model/ChallengeModel.js";
import userModel from "../model/userModel.js";
import {v2 as cloudinary} from 'cloudinary'

const getProfileData = async (req,res) => {
    try {
        
        const userId = req.userId;

        const user = await userModel.findById(userId)
        
        res.json({success:true,userData:{
            name:user.name,
            email:user.email,
            profileImage:user.profileImage,
            points:user.points,
            createdAt:user.createdAt
        }})
        

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const updateProfileData = async (req,res) => {
    try {
        
        const userId = req.userId;
        const {name} = req.body;
        let updateData = {}
        
        if(name){
            updateData.name = name
        }

        if (req.file) {
            const results = await cloudinary.uploader.upload(req.file.path);
            updateData.profileImage=results.secure_url;
        }

        await userModel.findByIdAndUpdate(userId,updateData);
        res.json({success:true,message:"profile updated.."})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

const addBookmark = async (req,res) => {
    try {
        
        const userId=req.userId;
        const {challengeId} = req.body;
        
        const user = await userModel.findById(userId);

        const isBookmark = user.bookmarks.includes(challengeId)

        if (isBookmark) {
            user.bookmarks = user.bookmarks.filter(item => item.toString() !== challengeId.toString())
            await user.save();
            res.json({success:true,message:"challenge remover in bookmark"})
        }
        else{
            user.bookmarks.push(challengeId)
            await user.save()
            res.json({success:true,message:"challenge add to bookmark"})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

const getBookmarks = async (req,res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId).populate("bookmarks","title challengeNumber difficulty category")

        res.json({success:true,bookmarks:user.bookmarks})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export {getProfileData,updateProfileData,addBookmark,getBookmarks}