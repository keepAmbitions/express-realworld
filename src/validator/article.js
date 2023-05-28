import { body, param } from 'express-validator'
import { parallelProcess, isNullOf, isNullOfOptional } from './help.js'

export default {
  createArticle: parallelProcess([
    isNullOf('article.title'),
    isNullOf('article.description'),
    isNullOf('article.body'),
    body('article.tagList').optional()
      .isArray().withMessage('tagList 期待 array')
  ]),
  getArticle: parallelProcess([
    param('articleId').isMongoId().withMessage('articleId 无效')
  ]),
  getArticles: parallelProcess([
    // 字段可以不传，但是已传字段不能为空值
    isNullOfOptional('author'),
    isNullOfOptional('favorited').isBoolean()
      .withMessage('favorited 期待 boolean')
      .toBoolean(),
    // 自定义消毒处理
    isNullOfOptional('tagList').customSanitizer(
      (tags) => tags.split(',')),
    isNullOfOptional('limit').isNumeric()
      .withMessage('limit 期待 numeric'),
    isNullOfOptional('offset').isNumeric()
      .withMessage('offset 期待 numeric'),
  ]),
  updateArticle: parallelProcess([
    param('articleId').isMongoId()
      .withMessage('articleId 无效'),
    isNullOfOptional('article.title'),
    isNullOfOptional('article.description'),
    isNullOfOptional('article.body'),
    body('article.tagList').optional()
      .isArray().withMessage('tagList 期待 array')
  ]),
  deleteArticle: parallelProcess([
    param('articleId').isMongoId()
      .withMessage('articleId 无效')
  ]),
  addComment: parallelProcess([
    isNullOf('comment.body')
      .isLength({ min: 1, max: 10 })
      .withMessage('长度为1~10个字符')
  ])
}