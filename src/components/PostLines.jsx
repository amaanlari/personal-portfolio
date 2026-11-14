import { Link } from 'react-router-dom'
import { usePosts } from '../lib/usePosts'

// The newest blog posts as chevron lines. Renders nothing if the API has no posts.
export default function PostLines({ title, count = 3 }) {
  const posts = usePosts()
  if (!posts || posts.length === 0) return null
  return (
    <section className="section" aria-labelledby="latest-writing">
      <h2 className="section-title" id="latest-writing">{title}</h2>
      <ul className="chevron-list">
        {posts.slice(0, count).map((post) => (
          <li key={post._id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            <span className="mono-label">{post.date}</span>
          </li>
        ))}
      </ul>
      <Link to="/blog" className="more-link">All posts →</Link>
    </section>
  )
}
