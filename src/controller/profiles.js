import User from '../model/user.js'
import UserAssociation from '../model/userAssociation.js'

const profilesCtrl = {
  async followUser(req, res, next) {
    try {
      // console.log(req.userId, req.params)
      // 将 self 和 idol的ID 存入 userAssociation 表
      const idol = await User.findOne(
        { username: req.params.username }, 'username bio image').lean()
      const follow = new UserAssociation({ master: idol._id, slave: req.userId })
      await follow.save()
      idol.following = true
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  },
  async getProfiles(req, res, next) {
    try {
      const idol = await User.findOne(
        { username: req.params.username },
        'username bio image').lean()
      if (!idol) {
        return res.status(404).send('用户不存在')
      }
      const follow = await UserAssociation.findOne(
        { master: idol._id, slave: req.userId })
      idol.following = follow ? true : false
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  },
  async unfollowUser(req, res, next) {
    try {
      // 将 self 和 idol的ID 那跳数据 从 userAssociation 表移除
      const idol = await User.findOne(
        { username: req.params.username }, 'username bio image').lean()
      await UserAssociation.deleteOne({ master: idol._id, slave: req.userId })
      idol.following = false
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  }
}

export default profilesCtrl