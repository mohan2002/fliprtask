import { doc, setDoc } from '@firebase/firestore'
import { async } from '@firebase/util'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { db } from '../Authenticationpart/firebase'
import { useAuth } from '../Authenticationpart/UseAuth'
import "./Styles/UserForm.css"

function UserForm() {
    const firstname = useRef()
    const lastname = useRef()
    const phone = useRef()
    const address = useRef()
    const city = useRef()
    const stateref = useRef()
    const zip = useRef()
    const {currentUser,getLocation,lat,lng} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
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

    async function handleinput(e) {
        e.preventDefault()
        try{
            await setDoc(doc(db,"UserDetails",`${currentUser.uid}`),{
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                phone: phone.current.value,
                address: address.current.value,
                city: city.current.value,
                state: stateref.current.value,
                zip: zip.current.value,
                userid: currentUser.uid,
                email: currentUser.email,
                latitude: lat,
                longitude: lng
            })
            alert("Details added successfully")
            navigate("/userhomepage")
        }
        catch(error){
            console.log(error);
        }


    }
    return (
        <div className="userform-container">
            <form className="formcontainer" onSubmit={handleinput}>
                <div className="groups">
                    <label>First Name</label>
                    <input ref={firstname} required type="text" name="firstname" placeholder="Ram" />
                </div>
                <div className="groups">
                    <label>Last Name</label>
                    <input ref={lastname} required type="text" name="lastname" placeholder="Krishna" />
                </div>
                <div className="groups">
                    <label>Phone Number</label>
                    <input ref={phone} required type="number" name="number" placeholder="9876543210" />
                </div>
                <div className="groups">
                    <label>Address</label>
                    <input ref={address} required type="text" name="address" placeholder="ABC Street" />
                </div>
                <div className="groups">
                    <label>City</label>
                    <input ref={city} required type="text" name="city" placeholder="Pollachi" />
                </div>
                <div className="groups">
                    <label>State</label>
                    <input ref={stateref} required type="text" name="state" placeholder="Tamil Nadu" />
                </div>
                <div className="groups">
                    <label>Zip Code</label>
                    <input ref={zip} required type="number" name="zipcode" placeholder="642101" />
                </div>
                <div className="groups-check">
                    <input type="checkbox" required value="accept"/>
                    <label>By clicking this you accept to rules and regulations and this will access your location details</label>
                </div>

                <div className="groups">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default UserForm
