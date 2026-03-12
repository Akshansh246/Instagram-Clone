import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Navbar from '../components/Navbar'

const Feed = () => {

    const {loading, feed, handleGetFeed} = usePost()

    useEffect(()=>{
        handleGetFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loading || !feed){
        return(
            <main><h1>Loading....</h1></main>
        )
    }

    return (
        <main className='feed-page'>
            <Navbar />
            <div className="feed">
                <div className="posts">
                    {feed.map((post)=>{
                        return <Post user={post.user} post={post}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
