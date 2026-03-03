import React, { useState } from 'react'
import {Link} from 'react-router'
import '../styles/form.scss'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/api/auth/login',{
            username,
            password
        },{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
        })
    }

    return (
        <main>
            <div className="side-container">
                <img className='icon' src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="" />
                <h2 className='upper'>See everyday moments from your <span>close friends</span>.</h2>
                <img src="https://static.cdninstagram.com/rsrc.php/v4/yD/r/nWfBjz-5_uf.png" alt="" />
            </div>
            <div className="form-container">
                <h1>Log into Instagram</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    onInput={(e)=>{setUsername(e.target.value)}}
                    type="text" 
                    placeholder='Username or email' 
                    name='username' 
                    />
                    <input 
                    onInput={(e)=>{setPassword(e.target.value)}}
                    type="password" 
                    placeholder='Password' 
                    name='password' 
                    />
                    <div className="buttons">
                        <button type='submit'>Log in</button>
                    </div>
                </form>
                <button className='forget'>Forgot password?</button>
                <Link to="/register" className='create-new'>Create new account</Link>
                <div className="meta-icon">
                    <img src="https://pngimg.com/uploads/meta/meta_PNG6.png" alt="" />
                </div>
            </div>
        </main>
    )
}

export default Login
