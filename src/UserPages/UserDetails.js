import { doc, getDoc } from '@firebase/firestore'
import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { db } from '../Authenticationpart/firebase'
import { useAuth } from '../Authenticationpart/UseAuth'
import Navigationbar from './Navigationuser/Navigationbar'
import "./Styles/UserDetails.css"

function UserDetails() {
    const {currentUser} = useAuth()
    const[data,setData] = useState()
    useEffect(() => {
        async function fetchData() {
            const docref = doc(db,"UserDetails",`${currentUser.uid}`);
            const docsnap = await getDoc(docref)

            if(docsnap.exists()){
                setData(docsnap.data())
            }
            else{
                console.log("No data");
            }    
        }
        fetchData()
    },[])
    return (
        <div className="userDetails">
            <Navigationbar/>
            {
                data && 
                <div className="details">
                    <div>
                        <p>First Name:</p>
                        <p>{data.firstname}</p>
                    </div>
                    <div>
                        <p>Last Name:</p>
                        <p>{data.lastname}</p>
                    </div>
                    <div>
                        <p>Phone Number:</p>
                        <p>{data.phone}</p>
                    </div>
                    <div>
                        <p>Email:</p>
                        <p>{data.email}</p>
                    </div>
                    <div>
                        <p>Address:</p>
                        <p>{data.address}</p>
                    </div>
                    <div>
                        <p>City:</p>
                        <p>{data.city}</p>
                    </div>
                    <div>
                        <p>State:</p>
                        <p>{data.state}</p>
                    </div>
                    <div>
                        <p>Zip code:</p>
                        <p>{data.zip}</p>
                    </div>
                    
                </div>
            }
        </div>
    )
}

export default UserDetails
