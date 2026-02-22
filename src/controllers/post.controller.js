const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');
const likeModel = require('../models/like.model');

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    console.log(req.body, req.file)


    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName:"Test",
        folder:"Instagram-clone"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

async function getPostcontroller(req, res) {

    const userID = req.user.id

    const posts = await postModel.find({
        user:userID
    })

    res.status(200).json({
        message:"Posts fetched successfully.",
        posts
    })
}

async function getPostDetailsController(req, res) {

    const userID = req.user.id
    const postID = req.params.postID

    const post = await postModel.findById(postID)

    if(!post){
        return res.status(404).json({
            message:"Post not Found."
        })
    }

    const isValid = post.user.toString() === userID

    if(!isValid){
        return res.status(403).json({
            message:"Forbidden Content!"
        });
    }

    res.status(200).json({
        message:"posts fetched succesfully",
        post
    })
}


async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const like = await likeModel.create({
        post:postId,
        user:username
    })

    res.status(201).json({
        message:"Post liked successfully",
        like
    })
}

module.exports = {
    createPostController,
    getPostcontroller,
    getPostDetailsController,
    likePostController,
}