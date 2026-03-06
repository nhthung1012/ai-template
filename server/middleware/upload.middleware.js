const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const fileName = uuidv4() + ext
    cb(null, fileName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
})

module.exports = upload