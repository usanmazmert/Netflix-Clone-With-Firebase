import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useGlobalContext } from '../Context/AuthContext'

const Navbar = () => {
  const {user, logOut} = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      await logOut()
      navigate("/")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="flex justify-between w-full p-4 z-[100] absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer uppercase">Netflix</h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='text-white pr-4'>Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='text-white pr-4'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar