import React from 'react'
import "./Styles/Navigation.css"
import {Link} from 'react-router-dom'
import { useAuth } from '../../Authenticationpart/UseAuth'

function Navigationbar() {
    const[open,setOpen]=React.useState(false)
    const{logout} = useAuth()
    return (
        <div className="nav-container">
            <div className="logo">
                <h2>TAP 2 EAT</h2>
            </div>
            <ul className="list">
                <Link to="/userhomepage" className="links">Home</Link>
                <Link to="/mydetails"  className="links">My Details</Link>
                <Link to="/" className="links">Dashboard</Link>
                <button to="/" onClick={() => {logout()}} className="btns">Logout</button>
            </ul>

            <div className="icon" onClick={() => {setOpen(!open)}}>
                <i class="fa fa-bars"></i>
            </div>

            {open && 
            <div className="responsive-bar">
                <Link to="/userhomepage" className="links-resp">Home</Link>
                <Link to="/mydetails"  className="links-resp">My Details</Link>
                <Link to="/" className="links-resp">Dashboard</Link>
                <Link to="/" className="links-resp">Settings</Link>
            </div>
            }
        </div>
    )
}

export default Navigationbar
