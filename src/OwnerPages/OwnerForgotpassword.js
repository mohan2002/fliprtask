import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Authenticationpart/UseAuth'
import "../UserPages/Styles/UserLogin.css"
import "../UserPages/Styles/UserSignin.css"


function OwnerForgotpassword() {
    const emailref = useRef()
    const {ForgotPassword} = useAuth()

    async function handlechange(e){
        e.preventDefault()
        const email = emailref.current.value
        try{
            await ForgotPassword(email)
            alert("Password reset link sent to your email")
        }
        catch(e){
            console.log(e)
        }

    }

    return (
        <div className="signin-container">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className="box-container">
                                <h1 className="login">FORGOT PASSWORD</h1>
                                    <form onSubmit={handlechange}>
                                        <input required ref={emailref} type="email" placeholder="EMAIL" className="txt-box"/>
                                        <input type="submit" className="sbt-btn"/>
                                    </form>
                                    
                                <div className="down">
                                    <p>Already have an account? <Link to="/">Login</Link></p>
                                </div>

                            
                    </div>
            </div>
        </div>
    )
}

export default OwnerForgotpassword
