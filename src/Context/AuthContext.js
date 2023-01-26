import React, {useContext, createContext, useState, useEffect}from 'react'
import {auth, db} from "../firebase";
import { 
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut,
onAuthStateChanged
} from 'firebase/auth';
import {setDoc, doc} from "firebase/firestore"

const AuthContext = createContext();

export function AuthContextProvider(props){

    const [user,setUser] = useState({})
    
    const signUp = (email, password) => {
            createUserWithEmailAndPassword(auth,email,password)
            setDoc(doc(db, "users", email), {
            savedShows: []
        })
    }
    function signIn(email, password){

        signInWithEmailAndPassword(auth,email, password)
    }
    const logOut = () => {
        signOut(auth)
    }
    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return unSubscribe()
    })
  return (
    <>
        <AuthContext.Provider
            value={
                {
                    signUp,
                    signIn,
                    logOut,
                    user
                }
            }>
            {props.children}
        </AuthContext.Provider>
    </>
  )
}

export const useGlobalContext = () => {
    return useContext(AuthContext)
}