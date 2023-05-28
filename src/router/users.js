import express from 'express'
import userCtrl from '../controller/users.js'
import validator from '../validator/user.js'
import chechToken from '../middleware/chechToken.js'

const router = express.Router()

// 注册
router.post('/api/users', validator.register, userCtrl.registerUser)

// 更新用户信息
router.put('/api/users', chechToken, validator.updateUser, userCtrl.updataUser)

// 获取用户信息
router.get('/api/users', chechToken, userCtrl.getUser)

// 登录认证
router.post('/api/users/login', validator.login, userCtrl.loginUser)

export default router