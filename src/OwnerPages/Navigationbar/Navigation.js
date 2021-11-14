import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../../Authenticationpart/UseAuth'
import "./Navigation.css"

function Navigation({color}) {
    const[open,setOpen]=React.useState(false)
    const{logout} = useAuth()
    return (
        <div className="nav-container" style={{color:color}}>
            <div className="logo">
                <h2>TAP 2 EAT</h2>
            </div>
            <ul className="list" >
                <Link to="/ownerhomepage" className="links"  style={{color:color}}>Home</Link>
                <Link to="/restaurantdetails"  className="links"  style={{color:color}}>Restaurant Details</Link>
                <Link to="/checkorder" className="links"  style={{color:color}}>Check Orders</Link>
                <Link to="/" className="links"  style={{color:color}}>Dashboard</Link>
                <button onClick={() => {logout()}} to="/" className="btns"  style={{color:color}}>Logout</button>

            </ul>

            <div className="icon" onClick={() => {setOpen(!open)}}>
                <i class="fa fa-bars"></i>
            </div>

            {open && 
            <div className="responsive-bar">
                <Link to="/ownerhomepage"   style={{color:color}} className="links-resp">Home</Link>
                <Link to="/restaurantdetails"   style={{color:color}} className="links-resp">Restaurant Details</Link>
                <Link to="/" className="links-resp"   style={{color:color}}>Check Orders</Link>
                <Link to="/" className="links-resp"   style={{color:color}}>Dashboard</Link>
                <button to="/" className="links-resp"  style={{color:color}}>Logout</button>
            </div>
            }
        </div>
    )
}

export default Navigation
