import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Authenticationpart/UseAuth'
import "./Styles/UserLogin.css"
import "./Styles/UserSignin.css"
import { useNavigate } from 'react-router'

function UserSignin() {
    const emailref = useRef()
    const passwordref = useRef()
    const confirmpasswordref = useRef()
    const navigate = useNavigate()
    const {signinwithemail} = useAuth()
    async function handlesignin(e){
        e.preventDefault()
        if(passwordref.current.value != confirmpasswordref.current.value){
            alert("Password doesn't match")
        }
        else{
            try{
                await signinwithemail(emailref.current.value,passwordref.current.value)
                navigate('/userform')
            }
            catch(e){
                console.log(e);
            }
        }
        
    }

    return (
        <div className="signin-container">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className="box-container">
                            <h1 className="login">SIGNIN AS USER</h1>
                                <form onSubmit={handlesignin}>
                                    <input type="email" placeholder="EMAIL" ref={emailref} className="txt-box" required/>
                                    <input type="password" placeholder="PASSWORD" ref={passwordref} className="txt-box" required/>
                                    <input type="password" placeholder="CONFIRM PASSWORD" ref={confirmpasswordref} className="txt-box" required/>
                                    <input type="submit" className="sbt-btn"/>
                                </form>
                                <p>or</p>
                                <div className="social-btn">
                                    <i className="fab fa-google gg"></i>
                                    <p>Google</p>
                                </div>

                            <div className="down">
                                <p>Already have an account? <Link to="/">Login</Link></p>
                            </div>

                        
                </div>
            </div>
        </div>
    )
}

export default UserSignin
