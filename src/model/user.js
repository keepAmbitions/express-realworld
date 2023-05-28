import mongoose from 'mongoose'
import md5 from '../until/md5.js'
import { baseSchema, option } from './help.js'

const userSchema = mongoose.Schema({
  ...baseSchema,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: v => md5(v),
    select: false
  },
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  // 该字段不能入库，因为这不是该实体的属性
  // following: {
  //   type: Boolean,
  //   default: false
  // },

}, option)

const User = mongoose.model('User', userSchema)
export default User
// 初代方案
// 已关注的用户
// hasFollowedUsers: {
  // 这样声明的好处是方便后期扩充，进可攻，退可守（item.toString()就可以降级为字符串）
  // type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  // default: null
// },
// followers: {
  // 如何仅仅存 String类型的ID 则无法扩充
//   type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
//   default: null
// }