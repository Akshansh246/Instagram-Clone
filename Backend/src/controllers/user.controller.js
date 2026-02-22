const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')


async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself."
        })
    }

    const followeeUser = await userModel.findOne({
        username: followeeUsername
    })

    if (!followeeUser) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const existingFollow = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if (existingFollow) {
        return res.status(200).json({
            message: `Follow request already ${existingFollow.status}`,
            follow: existingFollow
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending" // request sent
    })

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    })
}

async function acceptFollowRequestController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const request = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername,
        status: "pending"
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    request.status = "accepted"
    await request.save()

    res.status(200).json({
        message: `${followerUsername} is now following you`,
        follow: request
    })
}


async function rejectFollowRequestController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const request = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername,
        status: "pending"
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    request.status = "rejected"
    await request.save()

    res.status(200).json({
        message: `Follow request from ${followerUsername} rejected`
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        followee:followeeUsername,
        follower:followerUsername,
        status:"accepted"
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController
}