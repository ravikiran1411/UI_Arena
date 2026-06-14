
import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = () => {
    try {
        
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_NAME,
            api_key:process.env.CLOUDINARY_APIKEY,
            api_secret:process.env.CLOUDINARY_APISECRET,
        },
    console.log("cloudinary connected..")
    )

    } catch (error) {
        console.log("cloudinary error");
    }
}

export default connectCloudinary;