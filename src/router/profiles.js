import express from 'express'
import profilesCtrl from '../controller/profiles.js'
import validator from '../validator/profile.js'
import chechToken from '../middleware/chechToken.js'

const router = express.Router()

// 关注用户
router.post('/api/profiles/:username/follow', chechToken, validator.username, profilesCtrl.followUser)

// 获取简介
router.get('/api/profiles/:username', chechToken, validator.username, profilesCtrl.getProfiles)

// 取关用户
router.delete('/api/profiles/:username/follow', chechToken, validator.username, profilesCtrl.unfollowUser)

export default router