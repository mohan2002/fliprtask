import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Authenticationpart/UseAuth'
import Navigation from './Navigationbar/Navigation'
import "./Styles/OwnerHome.css"

function OwnerHome() {
    const {currentUser} = useAuth()
    {
        currentUser && console.log(currentUser)
    }
    const navigate = useNavigate()

    function takemetoaddrestaurant(){
        navigate('/addrestaurant')
    }
    return (
        <div className="owner-container">
            <div className="ownerbanner">
                <Navigation/>
                <div className="centered">
                    <h1>Welcome🖐</h1>
                    <h1>Register your restaurant here!</h1>
                    <p>Reach out more customers and get benifited</p>
                    
                    <button className="btn" onClick={takemetoaddrestaurant}>Register your restaurant</button>
                </div>
            </div>

            <div className="next-content">
                <h1 className="next-content-title">Enables you to get 60% more revenue, 10x new customers and boost your brand visibility by providing insights to improve your business.</h1>
            </div>
            
            <div className="third-content">
                <h1 className="next-content-work">How it works</h1>
                <div>
                    <p>1.To add a restaurant in Zomato, visit the Add Restaurant Link and fill the registration form with restaurant name, phone number, city etc.</p>
                    <p>2.Then click on Add Restaurant to add the restaurant to the Zomato Listing.</p>
                    <p>3.Add your Restaurant Details images etc...</p>
                    <p>4.Add menu related and pricing details.</p>
                    <p>5.Give Description of your Restaurant.</p>

                </div>
            </div>

            <div className="fourth-con">

            </div>
        </div>
    )
}

export default OwnerHome
