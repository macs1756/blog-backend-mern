import { Router } from 'express'
import { createPost, getPostById, getPosts } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

///Create
router.post('/create', checkAuth, createPost)

//Get my all posts
router.get('/get', getPosts)

//get post by id 
router.get('/:id', getPostById)

export default router