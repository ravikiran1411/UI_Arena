
import express from 'express'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
import { addChallenge, getChallenge, updateChallenge } from '../controllers/challengeController.js'

const challengeRouter = express.Router()

challengeRouter.post('/addchallenge',adminAuth,upload.single("image"),addChallenge);

challengeRouter.get('/list',getChallenge);

challengeRouter.patch('/update',adminAuth,updateChallenge)

export default challengeRouter
