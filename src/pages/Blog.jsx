import { Link, useSearchParams } from 'react-router-dom'
import { usePosts } from '../lib/usePosts'
import './Blog.css'

const categories = ['All', 'Engineering', 'Architecture', 'Infrastructure', 'Backend']

export default function Blog() {
  // Filters live in the URL: /blog?category=Backend&tag=kafka
  const [params] = useSearchParams()
  const activeCategory = categories.includes(params.get('category')) ? params.get('category') : 'All'
  const activeTag = params.get('tag')

  const posts = usePosts(activeCategory)
  const loading = posts === null
  const visible = (posts ?? []).filter(p => !activeTag || p.tags.includes(activeTag))

  const hrefFor = (next) => {
    const merged = { category: activeCategory, tag: activeTag, ...next }
    const query = new URLSearchParams()
    if (merged.category && merged.category !== 'All') query.set('category', merged.category)
    if (merged.tag) query.set('tag', merged.tag)
    const qs = query.toString()
    return qs ? `/blog?${qs}` : '/blog'
  }

  return (
    <main className="page">
      <title>Blog · Mohammad Amaan Lari</title>
      <div className="container">
        <h1 className="page-title">Blog</h1>
        <p className="page-lead">
          Deep dives into distributed systems, manufacturing software, backend architecture,
          and the engineering decisions made at scale.
        </p>

        <nav className="pills blog-filters" aria-label="Filter by category">
          {categories.map(cat => (
            <Link key={cat} to={hrefFor({ category: cat })} className="pill" aria-current={activeCategory === cat ? 'true' : undefined}>
              {cat}
            </Link>
          ))}
        </nav>

        {activeTag && (
          <p className="mono-label blog-state">
            Tagged #{activeTag} · <Link to={hrefFor({ tag: null })}>clear</Link>
          </p>
        )}

        <div aria-live="polite">
          {loading && <p className="mono-label blog-state">Loading posts...</p>}
          {!loading && visible.length === 0 && <p className="mono-label blog-state">No posts here yet.</p>}
        </div>

        {visible.length > 0 && (
          <ul className="entries post-list">
            {visible.map(post => (
              <li className="entry" key={post._id}>
                <div className="entry-head">
                  <h2 className="entry-title"><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <span className="mono-label">{[post.date, post.readTime].filter(Boolean).join(' · ')}</span>
                </div>
                <p className="entry-text post-excerpt-line">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <ul className="pills" aria-label="Tags">
                    {post.tags.map(tag => (
                      <li key={tag}>
                        <Link to={hrefFor({ tag })} className="pill" aria-current={activeTag === tag ? 'true' : undefined}>#{tag}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="blog-note">
          More articles in progress.{' '}
          <a href="mailto:amaanlari.official@gmail.com?subject=Blog subscription">Get notified by email →</a>
        </p>
      </div>
    </main>
  )
}
