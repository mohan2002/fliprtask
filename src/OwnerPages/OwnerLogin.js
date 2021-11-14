import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Authenticationpart/UseAuth'
import "../UserPages/Styles/UserLogin.css"
import { useNavigate } from 'react-router'

function OwnerLogin() {
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
            navigate('/ownerhomepage')
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="box-container">
                    <h1 className="login">LOGIN AS OWNER</h1>
                        <form onSubmit={handlelogin}>
                            <input type="email" ref={emailref} required placeholder="EMAIL" className="txt-box"/>
                            <input type="password" ref={passwordref} required placeholder="PASSWORD" className="txt-box"/>
                            <input type="submit" className="sbt-btn"/>
                        </form>
                        <p>or</p>
                        <div className="social-btn">
                            <i className="fab fa-google gg"></i>
                            <p>Google</p>
                        </div>

                    <div className="down">
                        <p>Don't have an account? <Link to="/ownersignin">Sign Up</Link></p>
                        <Link to="/ownerforgotpassword">Forgot Password?</Link>
                    </div>

                   
        </div>
    )
}

export default OwnerLogin
