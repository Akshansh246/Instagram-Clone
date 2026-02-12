const express = require('express');
const postRouter = express.Router()
const postController = require('../controllers/post.controller')

const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

//this api is protected viz token is required 
postRouter.post('/',upload.single('image'), postController.createPostController)


module.exports = postRouter