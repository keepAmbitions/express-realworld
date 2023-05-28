import express from 'express'
import articlesCtrl from '../controller/articles.js'
import validator from '../validator/article.js'
import chechToken from '../middleware/chechToken.js'

const router = express.Router()

// 获取文章列表
router.get('/api/articles', validator.getArticles, articlesCtrl.getArticles)

// 订阅文章
router.get('/api/articles/feed', articlesCtrl.feedArticle)

// 获取文章
router.get('/api/articles/:articleId', validator.getArticle, articlesCtrl.getArticle)

// 更新文章
router.put('/api/articles/:articleId', chechToken, validator.updateArticle, articlesCtrl.updateArticle)

// 删除文章
router.delete('/api/articles/:articleId', chechToken, validator.deleteArticle, articlesCtrl.deleArticle)

// 创建文章
router.post('/api/articles', chechToken, validator.createArticle, articlesCtrl.createArticle)

// 给文章添加评论
router.post('/api/articles/:articleId/comments', chechToken, validator.addComment, articlesCtrl.appendComment)

// 获取文章评论
router.get('/api/articles/:articleId/comments', articlesCtrl.getComment)

// 删除文章评论
router.delete('/api/articles/:articleId/comments/:id', chechToken, articlesCtrl.deleComment)

// 最爱的文章 TODO
// 删除最爱文章 TODO

// 获取标签列表
router.get('/api/tags', articlesCtrl.getTags)

export default router