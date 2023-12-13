//controller
import Post from '../models/Post.js'
import User from '../models/User.js'

export const createPost = async (req,res) => {

  try {

    res.json({messange: "create post"})

  } catch (error) {
    res.json({
      messange: 'Error on server'
    })
  }
  

}


