import { async } from '@firebase/util'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Authenticationpart/UseAuth'
import "./Styles/UserLogin.css"
import { useNavigate } from 'react-router'

function UserLogin() {
    const emailref = useRef()
    const passwordref = useRef()
    const{loginwithemail} = useAuth()
    const navigate = useNavigate()


    async function handlelogin(e){
        e.preventDefault()
        const email = emailref.current.value
        const password = passwordref.current.value
        try{
            await loginwithemail(email,password)
            navigate('/userhomepage')
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className="box-container">
                    <h1 className="login">LOGIN AS USER</h1>
                        <form onSubmit={handlelogin}>
                            <input type="email" ref={emailref} placeholder="EMAIL" required className="txt-box"/>
                            <input type="password" ref={passwordref} placeholder="PASSWORD" required className="txt-box"/>
                            <input type="submit" className="sbt-btn"/>
                        </form>
                        <p>or</p>
                        <div className="social-btn">
                            <i className="fab fa-google gg"></i>
                            <p>Google</p>
                        </div>

                    <div className="down">
                        <p>Don't have an account? <Link to="/usersignin">Sign Up</Link></p>
                        <Link to="/userforgotpassword">Forgot Password?</Link>
                    </div>

                   
        </div>
    )
}

export default UserLogin
