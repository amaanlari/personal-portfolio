import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './BlogPost.css'

const API_URL = 'http://localhost:5000/api'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/posts/${slug}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Post not found')
      }

      setPost(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="blog-post-page">
        <div className="container">
          <div className="loading-state">
            <span className="mono-label">Loading post...</span>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="blog-post-page">
        <div className="container">
          <div className="error-state">
            <span className="mono-label">Error</span>
            <h1>{error}</h1>
            <button onClick={() => navigate('/blog')} className="back-btn">
              ← Back to Blog
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!post) return null

  return (
    <main className="blog-post-page">
      <div className="container">

        <button onClick={() => navigate('/blog')} className="back-btn fade-up">
          ← Back to Blog
        </button>

        <article className="post-content">
          <header className="post-header fade-up-2">
            <div className="post-meta-top">
              <span className="post-category">{post.category}</span>
              {post.featured && <span className="post-featured-badge">Featured</span>}
            </div>

            <div className="post-title">{post.title}</div>

            <div className="post-meta-info">
              <span className="post-author">{post.author}</span>
              <span className="meta-dot">·</span>
              <span className="post-date">{post.date}</span>
              <span className="meta-dot">·</span>
              <span className="post-read-time">{post.readTime}</span>
            </div>

            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="post-excerpt fade-up-3">
            <p>{post.excerpt}</p>
          </div>

          <div className="post-body markdown-content fade-up-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

      </div>
    </main>
  )
}
