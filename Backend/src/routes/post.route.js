const express = require('express');
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer');
const identifyUser = require('../middlewares/auth.middleware');
const upload = multer({storage:multer.memoryStorage()})

//this api is protected viz token is required 
postRouter.post('/',upload.single('image'),identifyUser ,postController.createPostController)


//api to get all posts of a user using token
postRouter.get('/',identifyUser,postController.getPostcontroller)


//api to get details of a post and check whether the posts belongs to the user or not
postRouter.get('/details/:postID',identifyUser, postController.getPostDetailsController)

//@description Like feature
postRouter.post('/like/:postId',identifyUser, postController.likePostController)

module.exports = postRouter