//controller .
import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {

  try {

    const { title, description } = req.body
    const user = await User.findById(req.userId)

    if (req.files) {

      let fileName = Date.now().toString() + req.files.image.name

      const __dirname = dirname(fileURLToPath(import.meta.url))

      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

      const newPostWithImage = new Post({
        username: user.username,
        title,
        description,
        image: fileName,
        autor: req.userId,
      })

      await newPostWithImage.save()

      await User.findByIdAndUpdate(req.userId, {
        $push: {
          posts: newPostWithImage
        }
      })

      res.json({ messange: newPostWithImage })

    }else{

    const newPostWithOutImage = new Post({
        username: user.username,
        title,
        description,
        image: 'missing',
        autor: req.userId
    })
    

    await newPostWithOutImage.save()

    await User.findByIdAndUpdate(req.userId, {
        $push: {
          posts: newPostWithOutImage
        }
      })

    res.json({ messange: newPostWithOutImage })

    }

  } catch (error) {
    res.json({
      messange: error
    })
  }


}


export const getPosts = async (req, res) => {

  try {
    
    const posts = await Post.find().sort('-createdAt')
    const popularPosts = await Post.find().limit(5).sort('-views')

    if(!posts){
      res.json({messange: 'Missing the posts'})
    }else{
      res.json({ posts, popularPosts })
    }

  } catch (error) {
    res.json({messange: error})
  }
  

}


export const getPostById = async (req, res) => {

  try {
    
    const post = await Post.findOneAndUpdate(req.params.id, {
        $inc: { view: 1 },
    })


    if(!post){
      res.json({messange: 'Missing the post'})
    }else{
      res.json({ post })
    }

  } catch (error) {
    res.json({messange: error})
  }
  

}
