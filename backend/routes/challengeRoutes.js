
import express from 'express'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
import { addChallenge, deleteChallenge, getChallenge, singleChallenge, updateChallenge } from '../controllers/challengeController.js'

const challengeRouter = express.Router()

challengeRouter.post('/addchallenge',adminAuth,upload.single("image"),addChallenge);

challengeRouter.get('/list',getChallenge);

challengeRouter.patch('/update/:id',adminAuth,upload.single("image"),updateChallenge)

challengeRouter.get('/singlechallenge/:id',singleChallenge)

challengeRouter.post('/delete/:id',adminAuth,deleteChallenge)

export default challengeRouter 
