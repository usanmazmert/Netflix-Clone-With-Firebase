import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Movie from './Movie'
import { useGlobalContext } from '../Context/AuthContext'
import { useEffect, useState } from 'react'
import {db} from "../firebase"
import {updateDoc, doc, onSnapshot} from "firebase/firestore"
import {AiOutlineClose} from "react-icons/ai"

const Shows = () => {
    const [movies, setMovies] = useState([])
    const {user} = useGlobalContext()
    function slideLeft(){
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft - 500
    }
    function slideRight(){
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft + 500
    }


    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows)
        })
    }, [user?.email])
    const movieRef = doc(db, "users", `${user?.email}`)
    const deleteShow = async(id) => {
         try{
            const result = movies.filter((item) => item.id !== id)
            await updateDoc(movieRef, {
                savedShows: result
            })
         }catch(err){
            console.log(err)
         }
    }
  return (
    <div>
        <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
        <div className="relative flex items-center group">
            <MdChevronLeft onClick={slideLeft} className="bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40}/>
            <div id={"slider"} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                {movies.map((item, id) => {
                    return(
                        <div key={item?.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative mx-1 my-0.5">
                        <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title}/>
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white" >
                            <p className='text-xs md:text-sm font-bold flex items-center justify-center h-full'>{item?.title}</p>
                            <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose/></p>
                        </div>
                    </div>
                )})}
            </div>
            <MdChevronRight onClick={slideRight} className="bg-white rounded-full right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40} />
        </div>
    </div>
  )
}

export default Shows