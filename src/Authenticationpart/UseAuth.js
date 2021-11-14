import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from './firebase'

const AuthContext = React.createContext()  

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {

    const [currentUser,setCurrentUser] = useState()
    const[loading,setLoading] = useState(true)
    const navigate = useNavigate()

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
          
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }
      }

    function signinwithemail(email,password) {
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }
    function loginwithemail(email,password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }

    function logout(){
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }
    function ForgotPassword(email){
        sendPasswordResetEmail(auth,email).then(() =>{

        }).catch((error) => {
            console.log(error)
        });
    }

    const value = { 
        signinwithemail,
        currentUser,
        loginwithemail,
        logout,
        ForgotPassword,
        getLocation,
        lat,
        lng,
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


