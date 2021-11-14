import { doc, setDoc } from '@firebase/firestore'
import { getDownloadURL, uploadBytesResumable ,ref} from '@firebase/storage'
import { async } from '@firebase/util'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { db, storage } from '../Authenticationpart/firebase'
import { useAuth } from '../Authenticationpart/UseAuth'
import "./Styles/Addrestaurant.css"

function Addrestaurant() {
    const restaurantname = useRef()
    const restaurantaddress = useRef()
    const restaurantphone = useRef()
    const restaurantemail = useRef()
    const restaurantdescription = useRef()
    const restauranttype = useRef()
    const restauranttimings = useRef()
    const restaurantcuisines = useRef()
    const[image,setImage] = useState()
    const{currentUser} = useAuth()
    const navigate = useNavigate()

    const filechangehandler = async (e) => {
        e.preventDefault()
        const metadata = {
            contentType: 'image/jpeg'
          };
        const file = e.target.files[0]
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               
                setImage(downloadURL);
                });
            }
            );

            

    }



    async function handleRestaurant(e){
        e.preventDefault()
        try{
            await setDoc(doc(db,"RestaurantDetails",`${currentUser.uid}`),{
                restaurantname:restaurantname.current.value,
                restaurantaddress:restaurantaddress.current.value,
                restaurantphone:restaurantphone.current.value,
                restaurantemail:restaurantemail.current.value,
                restaurantdescription:restaurantdescription.current.value,
                restauranttype:restauranttype.current.value,
                restauranttimings:restauranttimings.current.value,
                restaurantcuisines:restaurantcuisines.current.value,
                image:image,
                ratings:4,
                restaurantid:currentUser.uid, 
            })
            navigate('/addmenuitems')
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <form className="addrestaurant-container" onSubmit={handleRestaurant}>
            <h1>Add Restaurant</h1>
            <div className="groups">
                <label>Restaurant Name</label>
                <input ref={restaurantname} type="text" className="txtbox" required placeholder="ABC RESTAURANT" />
            </div>
            <div className="groups">
                <label>Restaurant Address</label>
                <input ref={restaurantaddress} type="text" className="txtbox" required placeholder="ABC STREET" />
            </div>
            <div className="groups">
                <label>Restaurant Phone</label>
                <input ref={restaurantphone} type="text" className="txtbox" required placeholder="9876543210" />
            </div>
            <div className="groups">
                <label>Restaurant Email</label>
                <input ref={restaurantemail} type="text" className="txtbox" required placeholder="abc@gmail.com" />        
            </div>
            <div className="groups">
                <label>Restaurant Images</label>
                <input type="file" onChange={filechangehandler} required placeholder="Restaurant Images" />
            </div>
            <div className="groups">
                <label>Restaurant Description</label>
                <textarea ref={restaurantdescription} placeholder="Desc" required></textarea>
            </div>
            <div className="groups">
                <label>Restaurant Category</label>
                <select ref={restaurantcuisines}>
                    <option>Select Category</option>
                    <option>Fast Food</option>
                    <option>Chinese</option>
                    <option>Italian</option>
                    <option>Mexican</option>
                    <option>Indian</option>
                    <option>Thai</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                </select>
            </div>

            <div className="groups">
                <label>Restaurant timing</label>
                <input ref={restauranttimings} type="text" required className="txtbox" placeholder="12 - 12" />
            </div>
            
            <div className="groups">
                <label>Restaurant Food types</label>
                <input ref={restauranttype} type="text" required className="txtbox" placeholder="Burger, Fast Food, Beverages, Desserts" />
            </div>


            <div className="groups">
                <input type="submit" className="sbt-btn"/>
            </div>
        </form>
    )
}

export default Addrestaurant
