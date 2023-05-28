import Article from '../model/article.js'
import User from '../model/user.js'
import UserComment from '../model/userComment.js'

const articlesCtrl = {
  async getArticles(req, res, next) {
    try {
      let { limit = 2, offset = 0, tagList, ...filter } = req.query
      // 复杂的条件查询处理
      filter = filter ?? {}
      // if (filter && tagList) {
      //   // tagList 为 多个时，包含任一个标签都返回
      //   filter.$or = tagList.map(v => ({ 'tagList': v }))
      // }
      if (filter && tagList) {
        // tagList 为 多个时，所选标签都包含任时才返回
        filter.tagList = { $all: tagList }
      }
      if (filter.author) {
        const user = await User.findOne({ username: filter.author })
        // 当 author 值为 undefined 或 null 时，to ObjectId 可以处理
        filter.author = user?._id
      }
      console.log(filter)
      const articles = await Article.find(filter)
        .populate('author').skip(offset).limit(limit)
      const articlesCount = await Article.countDocuments()
      res.status(200).json({ articles, articlesCount })
    } catch (err) {
      next(err)
    }
  },
  async feedArticle(req, res, next) {
    try {
      console.log('get  /api/articles')
      res.send('success')
    } catch (err) {
      next(err)
    }
  },
  async getArticle(req, res, next) {
    try {
      const article = await Article.findById(req.params.articleId)
      if (!article) {
        return res.status(404).send('文章不存在')
      }
      await article.populate('author')
      res.status(200).json({ article })
    } catch (err) {
      next(err)
    }
  },
  async updateArticle(req, res, next) {
    try {
      const updatedArticle = await Article.findOneAndUpdate(
        { _id: req.params.articleId, author: req.userId },
        req.body.article, { new: true })
      if (!updatedArticle) {
        return res.status(404).send('文章不存在 或 无权访问该文章')
      }
      res.status(201).json({ article: updatedArticle })
    } catch (err) {
      next(err)
    }
  },
  async deleArticle(req, res, next) {
    try {
      // 需要搞清楚API的返回值
      const { deletedCount } = await Article.deleteOne(
        { _id: req.params.articleId, author: req.userId })
      if (!deletedCount) {
        return res.status(404).send('文章不存在 或 无权访问该文章')
      }
      res.status(201).send('删除成功')
    } catch (err) {
      next(err)
    }
  },
  async createArticle(req, res, next) {
    try {
      // 往库里新增一条 doc
      const article = new Article(req.body.article)
      article.author = req.userId
      await article.save()
      await article.populate('author')
      res.status(201).json({ article })
    } catch (err) {
      next(err)
    }
  },
  async appendComment(req, res, next) {
    try {
      console.log(req.params.articleId, req.body.comment.body)
      // 将评论信息存入 userComment集合
      let comment = new UserComment({
        author: req.userId,
        article: req.params.articleId,
        body: req.body.comment.body
      })
      await comment.save()
      await comment.populate('author', 'username bio image')
      comment = comment.toObject()
      delete comment.article
      res.status(201).json({ comment })
    } catch (err) {
      next(err)
    }
  },
  async getComment(req, res, next) {
    try {
      const comments = await UserComment
        .find({ article: req.params.articleId })
        .select('body createdAt updatedAt')
        .populate('author', 'username bio image')
      res.status(200).json({ comments })
    } catch (err) {
      next(err)
    }
  },
  async deleComment(req, res, next) {
    try {
      // /api/articles/:articleId/comments/:id
      // 使用 userId 和 articleId 和 commentId 联合查询，能查到就删除
      const { deletedCount } = await UserComment.deleteOne({
        author: req.userId,
        article: req.params.articleId,
        _id: req.params.id
      })
      if (!deletedCount) {
        return res.status(404).send('相关评论不存在')
      }
      res.status(201).send('删除成功')
    } catch (err) {
      next(err)
    }
  },
  async getTags(req, res, next) {
    try {
      console.log('get  /api/tags')
      res.send('success')
    } catch (err) {
      next(err)
    }
  }
}

export default articlesCtrl