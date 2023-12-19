import Comment from '../models/Comment.js'
import Post from '../models/Post.js'


export const createComment = async (req, res) => {
  try {

    const { postId, comment } = req.body


    if (!comment) {
      res.json({ messange: 'Not found body for comment' })
    }

    res.json({
      messange: 'Comments create'
    })

  } catch (error) {
    res.status(400).json({
      messange: 'Person uncreated'
    })
  }

}