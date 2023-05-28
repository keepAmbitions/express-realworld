import crypto from 'crypto'
import { md5Secret } from '../config/config.js'

// 不需要解密的加密方式
export default raw => {
  // 每次应该新创建Hash
  return crypto.createHash('md5')
    .update(md5Secret + raw).digest('hex')
}