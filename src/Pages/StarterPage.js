import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OwnerLogin from '../OwnerPages/OwnerLogin'
import UserLogin from '../UserPages/UserLogin'
import "./Styles/Starterpage.css"

function StarterPage() {
    const[loginas,setloginas] = useState("USER")
    return (
        <div className="starter-container">
            <div className="left-side">
            </div>

            <div className="right-side">
                <div className="choose">
                    <p className= {loginas==="USER" && "choosen"} onClick={() => (setloginas("USER"))}>USER</p>
                    <p className= {loginas==="OWNER" && "choosen"} onClick={() => (setloginas("OWNER"))}>OWNER</p>
                </div>

                {
                    loginas === "USER" ? <UserLogin /> : <OwnerLogin/>
                }
            </div>
        </div>
    )
}

export default StarterPage
