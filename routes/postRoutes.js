import { Router } from 'express'
import { createPost, getPosts } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

///Create
router.post('/create', checkAuth, createPost)

//Get my all posts
router.get('/get', getPosts)


export default router