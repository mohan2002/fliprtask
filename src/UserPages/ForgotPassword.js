import React from 'react'
import { Link } from 'react-router-dom'
import "./Styles/UserSignin.css"
import "./Styles/UserSignin.css"


function ForgotPassword() {
    return (
        <div className="signin-container">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className="box-container">
                                <h1 className="login">FORGOT PASSWORD</h1>
                                    <form>
                                        <input type="email" placeholder="EMAIL" className="txt-box"/>
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

export default ForgotPassword
