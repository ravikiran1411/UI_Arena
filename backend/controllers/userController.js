import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}

const userLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body;

        if (!email || !password) {
            return res.json({success:false,message:"enter both email and password"})
        }

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"user not found..please register"})
        }

        const name=user.name

        const isMatching = await bcrypt.compare(password,user.password)

        if (!isMatching) {
            return res.json({success:false,message:"wrong password"})
        }

        const token = generateToken(user._id)

        res.json({success:true,token,name})


    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
        
    }
}

const userRegister = async (req,res) => {
    try {
        
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.json({success:false,message:"enter both email and password"})
        }

        const isMatch = await userModel.findOne({email})

        if (isMatch) {
            return res.json({success:false,message:"email already registered please login.."})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await userModel.create({
            name,
            email,
            password:hashPassword,
        })

        const token = generateToken(user._id)

        res.json({success:true,token,name})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
        
    }
}

const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body;

        if (!email || !password) {
            return res.json({success:false,message:"required both admin email and password"});
        }

        if (email !== process.env.ADMIN_EMAIL) {
            return res.json({success:false,message:"email mismatched.."})
        }

        if (password!==process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"wrong password"})
        }

        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'2d'})

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getLeaderboard = async (req,res) => {
    try {
        
        const userId = req.userId;

        const leaderboard = await userModel.find({}).select("name points profileImage").sort({points:-1}).limit(10);

        const allUsers = await userModel.find({}).select("_id name points profileImage").sort({points:-1})

        const userRank = allUsers.findIndex(user=>user._id.toString()===userId)+1

        const userDetails = allUsers.find(user=>user._id.toString()===userId);

        res.json({success:true,leaderboard,currentUserDetails:{
            rank:userRank,
            name:userDetails?.name,
            points:userDetails?.points,
            profileImg:userDetails?.profileImage,
        }})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export {userLogin,userRegister,adminLogin,getLeaderboard}