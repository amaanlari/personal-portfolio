import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB Connected')

    const username = process.argv[2] || 'admin'
    const password = process.argv[3] || 'admin123'

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      console.log(`Admin '${username}' already exists`)
      process.exit(0)
    }

    // Create admin
    const admin = await Admin.create({
      username,
      password
    })

    console.log(`Admin created successfully:`)
    console.log(`Username: ${admin.username}`)
    console.log(`Password: ${password}`)
    console.log(`\nIMPORTANT: Change the password after first login!`)

    process.exit(0)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

createAdmin()
