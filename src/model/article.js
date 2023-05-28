import mongoose from 'mongoose'
import { baseSchema, option } from './help.js'

const articleSchema = new mongoose.Schema({
  ...baseSchema,
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  tagList: [String],
  // 以下两字段应该动态处理
  // favorited: {
  //   type: Boolean,
  //   default: false
  // },
  // favoritesCount: {
  //   type: Number,
  //   default: 0
  // },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  }
}, option)

export default mongoose.model('Article', articleSchema)