const express = require('express');
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');
const userRouter = express.Router()

/* 
@route POST /api/users/follow/:username
@description follows a user with username
*/
userRouter.post('/follow/:username',identifyUser, userController.followUserController)


/*
@route POST /api/users/follow/:username
@description unfollows the user with username
*/
userRouter.post('/unfollow/:username',identifyUser, userController.unfollowUserController)

/**
 * @route PATCH /api/users/follow/:username/accept
 * @description accepts the user follow request
 */
userRouter.patch('/follow/:username/accept', identifyUser, userController.acceptFollowRequestController)

/**
 * @route PATCH /api/users/follow/:username/reject
 * @description rejects the follow request
 */
userRouter.patch('follow/:username/reject', identifyUser, userController.rejectFollowRequestController)

module.exports = userRouter