import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Blog.css'

const API_URL = 'http://localhost:5000/api'

const categories = ['All', 'Engineering', 'Architecture', 'Infrastructure', 'Backend']

export default function Blog() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [activeCategory])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const url = activeCategory === 'All'
        ? `${API_URL}/posts`
        : `${API_URL}/posts?category=${activeCategory}`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setPosts(data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = posts

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  const handlePostClick = (post) => {
    navigate(`/blog/${post.slug}`)
  }

  return (
    <main className="blog-page">
      <div className="container">

        {/* Header */}
        <div className="blog-header fade-up">
          <span className="mono-label">Writing</span>
          <h1 className="blog-title">
            Engineering<br /><em>in depth.</em>
          </h1>
          <p className="blog-sub">
            Deep dives into distributed systems, manufacturing software, backend architecture,
            and the engineering decisions made at scale.
          </p>
        </div>

        {/* Filter */}
        <div className="blog-filters fade-up-2">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading-msg fade-up-3">
            <span className="mono-label">Loading posts...</span>
          </div>
        )}

        {/* Featured posts */}
        {!loading && featured.length > 0 && (
          <div className="featured-grid fade-up-3">
            {featured.map(post => (
              <article
                key={post._id}
                className={`featured-card${hoveredId === post._id ? ' hovered' : ''}`}
                onClick={() => handlePostClick(post)}
                onMouseEnter={() => setHoveredId(post._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="fc-top">
                  <span className="fc-category">{post.category}</span>
                  <span className="fc-featured-badge">Featured</span>
                </div>
                <h2 className="fc-title">{post.title}</h2>
                <p className="fc-excerpt">{post.excerpt}</p>
                <div className="fc-bottom">
                  <div className="fc-tags">
                    {post.tags.map(t => <span className="btag" key={t}>{t}</span>)}
                  </div>
                  <div className="fc-meta">
                    <span>{post.date}</span>
                    <span className="meta-dot">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Rest of posts */}
        {!loading && rest.length > 0 && (
          <div className="posts-list fade-up-4">
            {rest.map(post => (
              <article
                key={post._id}
                className="post-row"
                onClick={() => handlePostClick(post)}
              >
                <div className="pr-left">
                  <span className="pr-category">{post.category}</span>
                  <h3 className="pr-title">{post.title}</h3>
                  <p className="pr-excerpt">{post.excerpt}</p>
                  <div className="pr-tags">
                    {post.tags.map(t => <span className="btag" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="pr-right">
                  <span>{post.date}</span>
                  <span className="pr-read">{post.readTime}</span>
                  <span className="pr-arrow">→</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="no-posts fade-up-3">
            <span className="mono-label">No posts in this category yet.</span>
          </div>
        )}

        {/* Coming soon note */}
        <div className="blog-note fade-up-5">
          <span className="mono-label">More articles in progress —</span>
          <span className="note-text">subscribe via email to get notified when new posts drop.</span>
          <a href="mailto:amaanlari.official@gmail.com?subject=Blog subscription" className="note-link">Notify me →</a>
        </div>

      </div>
    </main>
  )
}
