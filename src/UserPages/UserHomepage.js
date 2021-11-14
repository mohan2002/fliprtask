import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import {useAuth} from "../Authenticationpart/UseAuth"
import Navigationbar from './Navigationuser/Navigationbar'
import "./Styles/UserHome.css"

function UserHomepage() {
    const{currentUser} = useAuth()
    {
        currentUser && console.log(currentUser)
    }
    const{getLocation,lat,lng} = useAuth()
    const[city,setCity] = useState("")


    useEffect(() => {
        async function getlocation() {
            try{
                await getLocation()
            }
            catch(error){
                console.log(error);
            }
        }
        getlocation()
    },[])

    useEffect(() => {
        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.58038f885a4f6a59fa1a8797093ec95f&lat=${lat}&lon=${lng}&format=json`).then(res => res.json()).then(data => {
            setCity(data.address.city)
        }
        )
        .catch(err => console.log(err))
    },[])
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return console.log(d);;
      }
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    // getDistanceFromLatLonInKm(lat,lng,12.9716,77.5946)
    return (
        <div className="container">
            <div className="banner">
                <Navigationbar/>
                <div className="centered-content">
                    <h1>Welcome🖐</h1>
                    <h1>Order your Foods and be happy:)</h1>
                    <div className="combined">
                        <div className="location">
                            <i class="fas fa-map-marker-alt"></i>
                            {city && <p>{city}</p>}
                        </div>
                        <input type="text" placeholder="FOOD"/>
                    </div>
                </div>
            </div>

            
            
            
        </div>
    )
}

export default UserHomepage
