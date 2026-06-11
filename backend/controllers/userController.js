import userModel from "../model/userModel";
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

        const isMatching = await bcrypt.compare(password,user.password)

        if (!isMatching) {
            return res.json({success:false,message:"wrong password"})
        }

        const token = generateToken(user._id)

        res.json({success:true,token})


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

        res.json({success:true,token})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
        
    }
}

export {userLogin,userRegister}