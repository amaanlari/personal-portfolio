import { useState, useEffect } from 'react'
import './Admin.css'

const API_URL = 'http://localhost:5000/api'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    category: 'Engineering',
    tags: '',
    featured: false,
    readTime: '5 min read',
    published: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      fetchPosts()
    }
  }, [token])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('adminToken', data.token)
      setToken(data.token)
      setIsAuthenticated(true)
      setLoginForm({ username: '', password: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
    setIsAuthenticated(false)
    setPosts([])
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/posts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts')
      }

      setPosts(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      const url = editingPost
        ? `${API_URL}/admin/posts/${editingPost._id}`
        : `${API_URL}/admin/posts`

      const response = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save post')
      }

      setShowForm(false)
      setEditingPost(null)
      resetForm()
      fetchPosts()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      featured: post.featured,
      readTime: post.readTime,
      published: post.published
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`${API_URL}/admin/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete post')
      }

      fetchPosts()
    } catch (err) {
      setError(err.message)
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'Engineering',
      tags: '',
      featured: false,
      readTime: '5 min read',
      published: false
    })
    setEditingPost(null)
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-page">
        <div className="admin-container">
          <div className="login-card">
            <h1>Admin Login</h1>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Blog Admin</h1>
          <div className="admin-actions">
            <button onClick={() => { setShowForm(true); resetForm(); }} className="btn-primary">
              New Post
            </button>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {showForm && (
          <div className="post-form-overlay" onClick={() => { setShowForm(false); resetForm(); }}>
            <div className="post-form-card" onClick={(e) => e.stopPropagation()}>
              <h2>{editingPost ? 'Edit Post' : 'New Post'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Slug *</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Excerpt *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="10"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g. Java, Spring Boot, MongoDB"
                    />
                  </div>
                  <div className="form-group">
                    <label>Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-checks">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    Featured
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    Published
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : editingPost ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="posts-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td className="post-title">{post.title}</td>
                  <td>{post.category}</td>
                  <td>
                    <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{post.featured ? '⭐' : '-'}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(post)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(post._id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="no-posts-msg">No blog posts yet. Create your first post!</div>
          )}
        </div>
      </div>
    </main>
  )
}
