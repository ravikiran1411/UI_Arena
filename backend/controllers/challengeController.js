
import {v2 as cloudinary} from 'cloudinary'
import challengeModel from '../model/ChallengeModel.js'


const addChallenge = async (req,res) => {
    try {
        
        const {title,description,difficulty,category,requirements,validationRules} = req.body

        const outputImage = req.file

        if (!title || !description || !difficulty || !category || !requirements || !validationRules || !outputImage ) {
            return res.json({success:false,message:"fill all feilds"})
        }

        let imageUrl="";

        if (outputImage) {
            const resultURL = await cloudinary.uploader.upload(outputImage.path,{resource_type:"image"})
            imageUrl=resultURL.secure_url;
        }

        const challenge= await challengeModel.create({
            title,
            description,
            difficulty,
            category,
            requirements:JSON.parse(requirement),
            validationRules:JSON.parse(validationRules),
            outputImage:imageUrl
        });

        res.json({success:true,message:"challenge added successfully..",challenge})


    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

const getChallenge = async (req,res) => {
    try {
        
        const challenges = await challengeModel.find({}).sort({createdAt:-1})

        res.json({success:true,challenges})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:error.message});
    }
}

const updateChallenge = async (req,res) => {
    try {
        
        const {id,title,description,difficulty,category,requirements,validationRules} = req.body;

        const imageFile = req.file

        const challenge = await challengeModel.findById({id});

        if (!challenge) {
            return res.json({success:false,message:"challenge not found"})
        }


        if (imageFile) {
            const resultUrl = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
            challenge.outputImage=resultUrl.secure_url;
        }

        if (title) challenge.title=title;
        if (description) challenge.description=description;
        if (difficulty) challenge.difficulty=difficulty;
        if (category) challenge.category=category;
        if (requirements) challenge.requirements=JSON.parse(requirements)
        if (validationRules) challenge.validationRules=JSON.parse(validationRules)

        await challenge.save()

        res.json({success:true,challenge})

    } catch (error) {

        console.log(error.message);
        res.status(500).json({success:false,message:error.message});

    }
}

const singleChallenge = async (req,res) => {
    try {
        
        const challenge = await challengeModel.findById(req.body.id);

        if (!challenge) {
            return res.json({success:false,message:"challenge not found"})
        }

        res.json({success:true,challenge})

    } catch (error) {

        console.log(error.message);
        res.status(500).json({success:false,message:error.message});
    }
}

export {addChallenge,getChallenge,updateChallenge,singleChallenge}