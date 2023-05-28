import express from 'express'
import userRoute from './users.js'
import articlesRoute from './articles.js'
import profilesRoute from './profiles.js'

const router = express.Router()

router.use(userRoute)
router.use(articlesRoute)
router.use(profilesRoute)

export default router