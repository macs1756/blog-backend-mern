import { Router } from 'express'
import { createPost, removePost, getMyPosts, getPostById, getPosts, updatePost } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

///Create
router.post('/create', checkAuth, createPost)

//Get my all posts
router.get('/get', getPosts)

//get post by id 
router.get('/:id', getPostById)

//update post by id
router.put('/:id', checkAuth, updatePost)

//get my posts
router.get('/user/me', checkAuth, getMyPosts)

//Remove my post
router.delete('/:id', checkAuth, removePost)

export default router