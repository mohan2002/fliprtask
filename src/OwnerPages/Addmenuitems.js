import { collection, doc, setDoc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React from 'react'
import { db, storage } from '../Authenticationpart/firebase';
import { useAuth } from '../Authenticationpart/UseAuth';
import "./Styles/Addmenuitems.css"
import {useNavigate} from 'react-router-dom'

function Addmenuitems() {
    const[count, setCount] = React.useState(1);
    const[img,setImg]=React.useState('https://thumbs.dreamstime.com/b/gallery-icon-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133760416.jpg');
    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[description,setDescription]=React.useState('');
    const[category,setCategory]=React.useState('');
    const[status,setstatus]=React.useState('');
    const[quantity,setQuantity]=React.useState('');
    const {        currentUser    } = useAuth()
    const navigate = useNavigate();

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
                setstatus('Upload is ' + progress + '% done');
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
               
                setImg(downloadURL);
                console.log(img);
                });
            }
            );

            

    }

    async function handlesubmit(e){
        e.preventDefault()
            if(name==''||price==''||description==''||category==''||quantity==''){
                alert("Please fill all the fields")
            }
            else{
                const frstref = collection(db, "RestaurantDetails");
                const secondref = doc(frstref, `${currentUser.uid}`);
                const thirdref = doc(collection(secondref, "items"));
                
                await setDoc(thirdref, {
                   itemname: name,
                    itemprice: price,
                    itemdescription: description,
                    itemcategory: category,
                    itemquantity: quantity,
                    itemimage: img,
                })
            
            alert("Item added successfully")
            setName('')
            setPrice('')
            setDescription('')
            setCategory('')
            setQuantity('')
            setImg('https://thumbs.dreamstime.com/b/gallery-icon-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133760416.jpg')
            }
    }

    
    
    return (
        <div className="addmenu-container">
           
            <form className="add" onSubmit={handlesubmit}>
                <input value={name} type="text" placeholder="Enter Item Name" required onChange={(e) =>{setName(e.target.value)}} />
                <input value={price} type="text" placeholder="Enter Item Price"  onChange={(e) =>{setPrice(e.target.value)}} />
                <input value={category} type="text" placeholder="Enter Item Type"  onChange={(e) =>{setCategory(e.target.value)}} />
                <input value={description} type="text" placeholder="Enter Item Description"  onChange={(e) =>{setDescription(e.target.value)}} />
                <input value={quantity} type="text" placeholder="Enter Item Quantity"  onChange={(e) =>{setQuantity(e.target.value)}} />
                <img className="sampleimg" src={img}/>
                <div class="parent-div">
                    <button className="btn-upload">Choose file</button>
                    <input type="file" name="upfile" onChange={filechangehandler}/>
                </div>
                <p>{status}</p>
                <input type="submit" value="Add Item" className="btn"/>
            </form>

            <button className="btnfw" onClick={() =>{navigate('/ownerhomepage')}}>Thats it Take me Forward</button>
        </div>
    )
}

export default Addmenuitems
