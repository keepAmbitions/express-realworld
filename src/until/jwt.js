import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { jwtSecret } from '../config/config.js'

export const sign = payload => promisify(jwt.sign)(payload, jwtSecret)

export const verify = token => promisify(jwt.verify)(token, jwtSecret)

export const decode = token => promisify(jwt.decode)(token, jwtSecret)