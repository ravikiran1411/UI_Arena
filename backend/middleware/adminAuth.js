import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        
        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:"login required"})
        }
        console.log("reached");
        

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({success: false,message: "Admin Access Required"});
        }

        next()

    } catch (error) {

        console.log(error.message);
        res.json({success: false,message: error.message});

    }
}

export default adminAuth