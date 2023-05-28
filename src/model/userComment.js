import mongoose from 'mongoose'
import { baseSchema, option } from './help.js'

const CommentSchema = mongoose.Schema({
  ...baseSchema,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    select: false
  },
  article: {
    type: mongoose.Types.ObjectId,
    ref: 'Article',
    select: false
  },
  body: {
    type: String,
    default: null
  }
}, option)

export default mongoose.model('UserComment', CommentSchema)