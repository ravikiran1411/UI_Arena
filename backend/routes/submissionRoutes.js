
import express from 'express'
import { getSubmission, getUserSubmission, saveSubmission } from '../controllers/submissionController.js'
import userAuth from '../middleware/userAuth.js'

const submissionRouter = express.Router()

submissionRouter.post('/save',userAuth,saveSubmission);

submissionRouter.get('/user',userAuth,getUserSubmission);

submissionRouter.get('/:challengeId',userAuth,getSubmission);

export default submissionRouter