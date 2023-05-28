import User from '../model/user.js'
import { omit } from './help.js'
import { sign } from '../until/jwt.js'

const userCtrl = {
  async registerUser(req, res, next) {
    try {
      // pass all valitation, then save into DB
      let user = new User(req.body.user)
      await user.save()
      user = user.toObject()
      user = omit(user, ['createdAt', 'updatedAt', 'password'])
      res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  },
  async updataUser(req, res, next) {
    try {
      // 通过userId 找到对应的doc更新，并返回新的 user
      const newUser = await User.findByIdAndUpdate(req.userId, req.body.user,
        { new: true, lean: true }).lean()
      res.status(201).json({ user: newUser })
    } catch (err) {
      next(err)
    }
  },
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.userId).lean()
      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  },
  async loginUser(req, res, next) {
    try {
      // 应该生成token并返回
      let user = req.temporaryUser
      const token = await sign({
        userId: user._id
      })
      user.token = token
      delete user.password
      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }
}

export default userCtrl