/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {
    const context = useContext(PostContext)

    const {loading, setLoading, post, feed, setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    const handleLike = async (post) => {
        setLoading(true)
        const data = await likePost(post)
        handleGetFeed()
        setLoading(false)
    }
    
    const handleUnLike = async (post) => {
        setLoading(true)
        const data = await unlikePost(post)
        handleGetFeed()
        setLoading(false)
    }

    useEffect(() => {
       handleGetFeed() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, post, feed, handleGetFeed, handleCreatePost, handleLike, handleUnLike }
}