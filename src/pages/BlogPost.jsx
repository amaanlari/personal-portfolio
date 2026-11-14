import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { usePosts } from '../lib/usePosts'
import './Blog.css'

const API_URL = import.meta.env.VITE_API_URL

export default function BlogPost() {
  const { slug } = useParams()
  // Result is tagged with its slug so a stale response never renders for a new route
  const [result, setResult] = useState(null)
  const allPosts = usePosts() // newest first; used for prev/next

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/posts/${slug}`)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Post not found')
        if (!cancelled) setResult({ slug, post: data })
      })
      .catch((err) => { if (!cancelled) setResult({ slug, error: err.message }) })
    return () => { cancelled = true }
  }, [slug])

  const current = result?.slug === slug ? result : null
  const post = current?.post

  const index = allPosts ? allPosts.findIndex(p => p.slug === slug) : -1
  const newer = index > 0 ? allPosts[index - 1] : null
  const older = index >= 0 ? allPosts[index + 1] : null

  return (
    <main className="page">
      <div className="container post-article">
        <Link to="/blog" className="back-link">← Back to blog</Link>

        {!current && <p className="mono-label post-state" aria-live="polite">Loading post...</p>}

        {current?.error && (
          <div className="post-state" role="alert">
            <p className="mono-label">Error</p>
            <h1 className="page-title">{current.error}</h1>
          </div>
        )}

        {post && (
          <article>
            <title>{`${post.title} · Mohammad Amaan Lari`}</title>
            <header className="post-header">
              <p className="mono-label">
                {[post.category, post.date, post.readTime].filter(Boolean).join(' · ')}
              </p>
              <h1 className="post-title">{post.title}</h1>
              {post.author && <p className="mono-label">By {post.author}</p>}
              {post.tags.length > 0 && (
                <ul className="pills" aria-label="Tags">
                  {post.tags.map(tag => (
                    <li key={tag}><Link to={`/blog?tag=${encodeURIComponent(tag)}`} className="pill">#{tag}</Link></li>
                  ))}
                </ul>
              )}
            </header>

            <p className="post-excerpt">{post.excerpt}</p>

            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {(older || newer) && (
              <nav className="post-nav" aria-label="More posts">
                {older && (
                  <Link to={`/blog/${older.slug}`} className="prev">
                    <span className="mono-label">← Previous</span>
                    {older.title}
                  </Link>
                )}
                {newer && (
                  <Link to={`/blog/${newer.slug}`} className="next">
                    <span className="mono-label">Next →</span>
                    {newer.title}
                  </Link>
                )}
              </nav>
            )}
          </article>
        )}
      </div>
    </main>
  )
}
