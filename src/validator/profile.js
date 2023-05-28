import { parallelProcess, isNullOf } from './help.js'

export default {
  username: parallelProcess([
    isNullOf('username').isLength({ mix: 1, max: 6 }).withMessage('长度为1~6个字符')
  ])
}