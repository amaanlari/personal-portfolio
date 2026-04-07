import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' })
    }

    // Check if admin exists
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await admin.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(admin._id)

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get current admin
// @route   GET /api/admin/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    res.json(admin)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
