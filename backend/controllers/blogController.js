import BlogPost from '../models/BlogPost.js'

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const { category } = req.query

    let query = { published: true }
    if (category && category !== 'All') {
      query.category = category
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .select('-content')

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      published: true
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all posts (admin)
// @route   GET /api/admin/posts
// @access  Private
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create new post
// @route   POST /api/admin/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { slug, title, excerpt, content, category, tags, featured, readTime, published } = req.body

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug })
    if (existingPost) {
      return res.status(400).json({ message: 'Slug already exists' })
    }

    const post = await BlogPost.create({
      slug,
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      featured: featured || false,
      readTime: readTime || '5 min read',
      published: published || false
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update post
// @route   PUT /api/admin/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // If slug is being updated, check if new slug already exists
    if (req.body.slug && req.body.slug !== post.slug) {
      const existingPost = await BlogPost.findOne({ slug: req.body.slug })
      if (existingPost) {
        return res.status(400).json({ message: 'Slug already exists' })
      }
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json(updatedPost)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete post
// @route   DELETE /api/admin/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await BlogPost.findByIdAndDelete(req.params.id)

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
