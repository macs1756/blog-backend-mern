import { Router } from 'express'
import { createPost } from '../controllers/post.js'

const router = new Router()

///Create
router.post('/create', createPost)


export default router