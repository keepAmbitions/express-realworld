import mongoose from 'mongoose'
import { baseSchema, option } from './help.js'

const userArticleSchema = mongoose.Schema({
  ...baseSchema,
  master: {
    type: mongoose.Types.ObjectId,
    ref: 'Article'
  },
  slave: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
}, option)

export default mongoose.model('UserArticle', userArticleSchema)