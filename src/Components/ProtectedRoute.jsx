import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/AuthContext'

const ProtectedRoute = ({children}) => {
    const {user} = useGlobalContext();
  return(
    <>
        {!user ? <Navigate to="/" /> : children}
    </>
  )
}

export default ProtectedRoute