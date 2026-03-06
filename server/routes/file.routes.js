const express = require("express")
const upload = require("../middleware/upload.middleware")
const authOptional = require("../middleware/authOptional.middleware")
const { uploadFile } = require("../controllers/file.controller")

const router = express.Router()

router.post("/upload", authOptional, upload.single("file"), uploadFile)

module.exports = router