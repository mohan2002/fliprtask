import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import "../UserPages/Styles/UserLogin.css"
import "../UserPages/Styles/UserSignin.css"
import { useNavigate } from 'react-router'
import { useAuth } from '../Authenticationpart/UseAuth'

function OwnerSignin() {
    const emailref = useRef()
    const passwordref = useRef()
    const confirmpasswordref = useRef()
    const navigate = useNavigate()
    const {signinwithemail} = useAuth()

    async function handlesignin(e)
    {
        e.preventDefault()
        const email = emailref.current.value
        const password = passwordref.current.value
        const confirmpassword = confirmpasswordref.current.value
        if(password === confirmpassword)
        {
            try{
                await signinwithemail(email,password)
                navigate("/ownerhomepage")
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            alert("Password does not match")
        }

    }

    return (
        <div className="signin-container">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className="box-container">
                            <h1 className="login">SIGNIN AS OWNER</h1>
                                <form onSubmit={handlesignin}>
                                    <input type="email" required ref={emailref} placeholder="EMAIL" className="txt-box"/>
                                    <input type="password" required ref={passwordref} placeholder="PASSWORD" className="txt-box"/>
                                    <input type="password" required ref={confirmpasswordref} placeholder="CONFIRM PASSWORD" className="txt-box"/>
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

export default OwnerSignin
