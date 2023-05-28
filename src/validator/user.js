import {
  handleValidationResult,
  parallelProcess,
  inspectEmailPattern,
  inspectPasswordPattern,
  isNullOf
} from './help.js'
import { body } from 'express-validator'
import User from '../model/user.js'
import md5 from '../until/md5.js'

export default {
  register: [
    parallelProcess([
      // 基础校验：非空，长度，格式等
      inspectEmailPattern(),
      inspectPasswordPattern(),
      isNullOf('user.username'),
    ]),
    // 假如这里使用并发处理，将有利于后期业务拓展
    body('user.email').custom(async email => {
      // 业务校验：是否已注册
      const user = await User.findOne({ email })
      if (user) {
        // 抛出错误，会被 validationResult捕获
        throw new Error('email already in use')
      }
    }),
    handleValidationResult
  ],
  login: [
    parallelProcess([
      inspectEmailPattern(),
      inspectPasswordPattern(),
    ]),
    // 假如这里使用并发处理，将有利于后期业务拓展
    body('user.email').custom(async (email, { req }) => {
      // 业务校验：是否已注册
      const user = await User.findOne({ email })
        .select(['email', 'password', 'username']).lean()
      if (!user) {
        // 抛出错误，会被 validationResult捕获
        return Promise.reject('用户不存在')
      }
      // 把 user 挂载到req上的临时字段
      req.temporaryUser = user
    }),
    handleValidationResult,
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.temporaryUser.password) {
        // 抛出错误，会被 validationResult捕获
        return Promise.reject('密码错误')
      }
    }),
    handleValidationResult
  ],
  updateUser: [
    // 检查字段有么有，再检查内容格式正不正确
    parallelProcess([
      inspectEmailPattern().optional(),
      inspectPasswordPattern().optional(),
      isNullOf('user.username').optional(),
      isNullOf('user.bio').optional(),
      isNullOf('user.image')
        .isURL({ require_protocol: true })
        .withMessage('应该是URL').optional(),
    ]),
  ]
}