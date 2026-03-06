const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })
}

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const existing = await User.findOne({ email })
    if (existing)
      return res.status(400).json({ message: "Email already exists" })

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashed,
      name
    })

    const token = generateToken(user._id)

    const { password: _, ...userData } = user.toObject()

    res.json({ user: userData, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" })

    const token = generateToken(user._id)

    const { password: _, ...userData } = user.toObject()

    res.json({ user: userData, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.logout = async (req, res) => {
  res.json({ message: "Logged out" })
}

exports.getMe = async (req, res) => {
  try {

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await User.findById(req.user.userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const token = req.headers.authorization?.split(" ")[1]

    res.json({
      user,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}