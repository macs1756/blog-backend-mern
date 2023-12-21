//controller .
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
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
    
    const post = await Post.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
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


export const getCommentsPosts = async (req, res) => {

  try {
    
    const post = await Post.findById(req?.params?.id)

    const comments = await Promise.all(
      post.comments.map((com)=>{
          return Comment.findById(com)
      }))
 
    if(!comments){
      res.json({messange: 'Comments is not found'})
    }else{
      res.json({ comments })
    }

  } catch (error) {
    res.json({ error })
  }
}



export const getMyPosts = async (req, res) => {

  try {
    const user = await User.findById(req.userId)
    const list = await Promise.all(user.posts.map(post => {
        return Post.findById(post._id)
    }))
 
    if(!list){
      res.json({messange: 'Missing the post'})
    }else{
      res.json({ posts: list })
    }

  } catch (error) {
    res.json({ error })
  }
}

export const removePost = async (req, res) => {

  try {
    
    const post = await Post.findByIdAndDelete(req.params.id)

    if(!post){
      res.json({messange: 'Post not found'})
    }else{

      await User.findByIdAndUpdate(req.userId, {
        $pull: { posts: req.params.id }
      })

      res.json({ messange: 'Post is delete' })
    }

  } catch (error) {
    res.json({ error })
  }
}


export const updatePost = async (req, res) => {

  try {
    
    const { title, description, id } = req.body

    const post = await Post.findById(id)

    if (req.files) {

      let fileName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
      post.image = fileName || ''
    }

    post.title = title
    post.description = description

    await post.save()

    if(!post){  
      res.json({ messange: 'Error on server' })
    }else{
      res.json({ post })
    }

  } catch (error) {
    res.json({messange: error})
  }

}