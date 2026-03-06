require("dotenv").config()

const express = require("express")
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/db")

const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const fileRoutes = require("./routes/file.routes")

connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// static file
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/files", fileRoutes)

// health check
app.get("/", (req, res) => {
  res.json({ message: "AI Chat API running..." })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})