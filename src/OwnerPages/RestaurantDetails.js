import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../Authenticationpart/firebase';
import { useAuth } from '../Authenticationpart/UseAuth';
import "./Styles/RestaurantDetails.css"
import Navigation from "./Navigationbar/Navigation"

function RestaurantDetails() {
    const[data,setData]=React.useState([]);
    const{currentUser} = useAuth()
    useEffect(() => {
        async function fetchData() {
            const docref = doc(db,"RestaurantDetails",`${currentUser.uid}`)
            const docsnap = await getDoc(docref)

            if(docsnap.exists()){
                setData(docsnap.data())
            }
        }
        fetchData();
    },[])



    return (
        <div className="myres-container">
            <div className="nav">
                <Navigation color={"black"}/>
            </div>
           {data && <img src={data.image} className="rest-img">
              
               </img>}

           {
               data &&  
                    <div className="contents">
                        <h1 className="rest-name">{data.restaurantname}</h1>
                        <h3 className="rest">{data.restaurantaddress}</h3>
                        <h3 className="rest">{data.restaurantphone}</h3>
                        <h3 className="rest">{data.restaurantemail}</h3>
                        <h3 className="rest">{data.restauranttype}</h3>
                        <h3 className="rest">{data.restaurantcuisines}</h3>
                        <h3 className="rest">{data.restauranttimings}</h3>

                    </div>
           }
        </div>
    )
}

export default RestaurantDetails
