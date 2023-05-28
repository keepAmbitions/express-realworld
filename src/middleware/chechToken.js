import { verify } from '../until/jwt.js'

export default async (req, res, next) => {
  let auth = req.headers['authorization']
  auth = auth ? auth.split(' ')[1] : null
  if (!auth) {
    return res.status(401).send('token 不存在')
  }
  try {
    const encodedToken = await verify(auth)
    // 仅仅把 userId 挂载到 req 上，不处理任何 业务
    req.userId = encodedToken.userId
    next()
  } catch (err) {
    return res.status(401).send(err)
  }
}