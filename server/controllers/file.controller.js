const File = require("../models/File")

exports.uploadFile = async (req, res) => {
  try {

    const file = req.file

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const isGuest = !req.user

    /*
    GUEST USER
    */
    if (isGuest) {
      return res.json({
        message: "File uploaded (guest mode)",
        guest: true,
        file: {
          originalName: file.originalname,
          fileName: file.filename,
          path: `/uploads/${file.filename}`,
          mimeType: file.mimetype,
          size: file.size
        }
      })
    }

    /*
    LOGGED USER
    */

    const savedFile = await File.create({
      user: req.user.userId,
      conversation: req.body.conversationId,
      fileName: file.filename,
      originalName: file.originalname,
      path: `/uploads/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size
    })

    res.json({
      message: "File uploaded",
      guest: false,
      conversationId: req.body.conversationId,
      file: savedFile
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Upload failed" })
  }
}