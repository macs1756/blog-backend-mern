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

    }


    const newPostWithOutImage = new Post({
        username: user.username,
        description,
        image: '',
        autor: req.userId
    })
    

    await newPostWithOutImage.save()

    await User.findByIdAndUpdate(req.userId, {
        $push: {
          posts: newPostWithOutImage
        }
      })

    res.json({ messange: newPostWithOutImage })

  } catch (error) {
    res.json({
      messange: 'Error on server'
    })
  }


}


