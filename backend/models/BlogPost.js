import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Engineering', 'Architecture', 'Infrastructure', 'Backend']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    default: 'Mohammad Amaan Lari'
  }
}, {
  timestamps: true
})

// Create index for slug
blogPostSchema.index({ slug: 1 })

// Virtual for formatted date
blogPostSchema.virtual('date').get(function() {
  return this.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

// Ensure virtuals are included in JSON
blogPostSchema.set('toJSON', { virtuals: true })
blogPostSchema.set('toObject', { virtuals: true })

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

export default BlogPost
