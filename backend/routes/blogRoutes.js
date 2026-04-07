import express from 'express'
import {
  getPosts,
  getPostBySlug,
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/posts', getPosts)
router.get('/posts/:slug', getPostBySlug)

// Admin routes (protected)
router.get('/admin/posts', protect, getAllPosts)
router.post('/admin/posts', protect, createPost)
router.put('/admin/posts/:id', protect, updatePost)
router.delete('/admin/posts/:id', protect, deletePost)

export default router
