# Portfolio Blog Backend

Node.js/Express backend API for managing blog posts with JWT authentication.

## Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-blog
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running locally or use MongoDB Atlas

5. Create admin user:
```bash
npm run create-admin <username> <password>
# Example: npm run create-admin admin mySecurePassword123
```

6. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Public Routes
- `GET /api/posts` - Get all published posts (optional query: ?category=Engineering)
- `GET /api/posts/:slug` - Get single post by slug

### Admin Routes (Protected with JWT)
- `POST /api/admin/login` - Admin login
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
  Returns: `{ token, admin }`

- `GET /api/admin/me` - Get current admin (requires Bearer token)

- `GET /api/admin/posts` - Get all posts including unpublished (requires Bearer token)

- `POST /api/admin/posts` - Create new post (requires Bearer token)
  ```json
  {
    "slug": "my-blog-post",
    "title": "My Blog Post",
    "excerpt": "Short description...",
    "content": "Full content here...",
    "category": "Engineering",
    "tags": ["Node.js", "MongoDB"],
    "featured": false,
    "readTime": "5 min read",
    "published": true
  }
  ```

- `PUT /api/admin/posts/:id` - Update post (requires Bearer token)

- `DELETE /api/admin/posts/:id` - Delete post (requires Bearer token)

## Authentication

All admin routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Blog Post Schema
```javascript
{
  slug: String (unique, required),
  title: String (required),
  excerpt: String (required),
  content: String (required),
  category: String (enum: Engineering, Architecture, Infrastructure, Backend),
  tags: [String],
  featured: Boolean (default: false),
  readTime: String (default: "5 min read"),
  published: Boolean (default: false),
  author: String (default: "Mohammad Amaan Lari"),
  createdAt: Date,
  updatedAt: Date
}
```
