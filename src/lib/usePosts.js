import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

// Published posts from the blog API, newest first. `posts` is null while loading.
export function usePosts(category) {
  const key = category || 'All'
  const [result, setResult] = useState(null)

  useEffect(() => {
    let cancelled = false
    const url = key === 'All' ? `${API_URL}/posts` : `${API_URL}/posts?category=${encodeURIComponent(key)}`
    fetch(url)
      .then(async (response) => {
        const data = await response.json()
        if (!cancelled) setResult({ key, posts: response.ok ? data : [] })
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error)
        if (!cancelled) setResult({ key, posts: [] })
      })
    return () => { cancelled = true }
  }, [key])

  return result?.key === key ? result.posts : null
}
