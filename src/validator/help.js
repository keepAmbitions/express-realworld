import { validationResult, body, check } from 'express-validator'

export const handleValidationResult = (req, res, next) => {
  // 从此函数中获取校验结果
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  res.status(400).send({ error: errors.array() })
}
// 并行处理校验器
export const parallelProcess = valitators => {
  return async (req, res, next) => {
    // 只等待他们并行执行完成，并不需要返回结果
    await Promise.all(valitators.map(validator => validator.run(req)))
    handleValidationResult(req, res, next)
  }
}

export const inspectEmailPattern = () => body('user.email')
  .notEmpty().withMessage('邮箱不能为空')
  .isEmail().withMessage('邮箱格式不正确')

export const inspectPasswordPattern = () => body('user.password')
  .isLength({ min: 4, max: 8 }).withMessage('密码长度为4~6位')
  .isAlphanumeric().withMessage('密码格式为数字或字母')

export const isNullOf = path => check(path)
  .trim().notEmpty().withMessage(`${path}不能为空`)

export const isNullOfOptional = path => check(path)
  .optional().trim().notEmpty().withMessage(`${path}不能为空`)
