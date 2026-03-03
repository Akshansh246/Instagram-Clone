import React, { useState } from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import '../styles/form.scss'

const Register = () => {

    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    async function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/api/auth/register',{
            username,
            email,
            password,
        },{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
        })
    }

    return (
        <div className='reg-main'>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="meta-icon">
                    <img src="https://pngimg.com/uploads/meta/meta_PNG6.png" alt="" />
                </div>
                <h2>Get Started on Instagram.</h2>
                <p>Sign up to see photos and videos from your friends.</p>
                <p className='label'>Email</p>

                <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="email" 
                name='email'
                placeholder='Email'
                />

                <p>You may receive notifications from us. <span>Learn why we ask for your contact information.</span> </p>
                <p className='label'>Password</p>

                <input 
                onInput={(e)=>{setPassword(e.target.value)}}
                type="text" 
                name='password'
                placeholder='Password'
                />

                <p className='label'>Username</p>

                <input 
                onInput={(e)=>{setUsername(e.target.value)}}
                type="text" 
                name='username'
                placeholder='Username'
                />


                <p className='declare'>People who use our service may have uploaded your contact information to Instagram. <span>Learn more.</span></p>
                <p>By tapping Submit, you agree to create an account and to Instagram's <span>Terms</span>, <span>Privacy Policy </span> and <span> Cookies Policy</span>.</p>
                <p>The <span>Privacy Policy</span> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.</p>

                <button className='submit'>Submit</button>

                <Link className='to-login' to={'/login'}>I already have an account</Link>
            </form>
        </div>
    )
}

export default Register
