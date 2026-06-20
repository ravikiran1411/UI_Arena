import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { addBookmark, getBookmarks, getProfileData, updateProfileData } from '../controllers/profileController.js';
import upload from '../middleware/multer.js';

const profileRouter = express.Router();

profileRouter.get('/details',userAuth,getProfileData);

profileRouter.patch('/update',userAuth,upload.single("profileImage"),updateProfileData);

profileRouter.post('/bookmark',userAuth,addBookmark)

profileRouter.get('/allbookmarks',userAuth,getBookmarks)

export default profileRouter;