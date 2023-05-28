import mongoose from 'mongoose'
import { baseSchema, option } from './help.js'

const userAssociationSchema = mongoose.Schema({
  ...baseSchema,
  master: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  slave: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
}, option)

export default mongoose.model('UserAssociation', userAssociationSchema)