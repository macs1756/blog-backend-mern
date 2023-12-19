import Comment from '../models/Comment.js'
import Post from '../models/Post.js'


export const createComment = async (req, res) => {
  try {

    const { postId, comment } = req.body


    if (!comment) res.json({ messange: 'Not found body for comment' })
    
    const newComment = new Comment({ comment })
    await newComment.save()


    try {
      await Post.findByIdAndUpdate(postId, {
        $push: {comments:  newComment?._id}
      })

    } catch (error) {
      res.json({error})
    }


    res.json({ messange: newComment })

  } catch (error) {
    res.status(400).json({ messange: 'Person uncreated' })
  }

}