import User from '../model/user.js'
// 这是最初的版本，不适合企业化开发
const profilesCtrl = {
  async followUser(req, res, next) {
    try {
      // console.log(req.userId, req.params)
      // 先查到要关注的User，将self 的 ID 追加到 idol 的 followers里
      const idol = await User.findOneAndUpdate(
        { username: req.params.username },
        { $addToSet: { followers: req.userId } },
        { select: 'username bio image', lean: true })
      if (!idol) {
        return res.status(404).send('要关注的用户不存在')
      }
      // 再将idol的 id添加到 self的 hasFollowedUsers
      const { acknowledged } = await User.updateOne({ _id: req.userId },
        { $addToSet: { hasFollowedUsers: idol._id } })
      // acknowledged 为 true 时，表示一切顺利
      if (!acknowledged) {
        return res.status(500).send('关注失败')
      }
      // 由于 Schema 中未定义该 字段，所以需要lean后才可以动态添加
      idol.following = true
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  },
  async getProfiles(req, res, next) {
    try {
      // console.log(req.userId, req.params)
      // 如果 idol 的 followers 里 包含 self 的 ID 则 following = true
      const idol = await User.findOne({ username: req.params.username },
        'username bio image followers').lean()
      if (!idol) {
        return res.status(404).send('用户不存在')
      }
      // console.log(typeof idol.followers[0])
      // idol.following = idol.followers.includes(req.userId)
      idol.following = idol.followers.some(id => id.toString() === req.userId)
      delete idol.followers
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  },
  async unfollowUser(req, res, next) {
    try {
      // 先查到要关注的User，将self 的 ID 从 idol 的 followers里剔除
      const idol = await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { followers: req.userId } },
        { select: 'username bio image', lean: true })
      if (!idol) {
        return res.status(404).send('要取消关注的用户不存在')
      }
      // 再将idol的 id从 self的 hasFollowedUsers里剔除
      const { acknowledged } = await User.updateOne({ _id: req.userId },
        { $pull: { hasFollowedUsers: idol._id } })
      // acknowledged 为 true 时，表示一切顺利
      if (!acknowledged) {
        return res.status(500).send('取消关注失败')
      }
      // 由于 Schema 中未定义该 字段，所以需要lean后才可以动态添加
      idol.following = false
      res.status(200).json({ profile: idol })
    } catch (err) {
      next(err)
    }
  }
}

export default profilesCtrl