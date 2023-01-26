import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

const Row = ({title, url, rowId}) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(url).then((response) => {
            setMovies(response.data.results);
        }).catch()
    }, [url])

    function slideLeft(){
        var slider = document.getElementById("slider-" + rowId)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    function slideRight(){
        var slider = document.getElementById("slider-" + rowId)
        slider.scrollLeft = slider.scrollLeft + 500
    }
  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
        <div className="relative flex items-center group">
            <MdChevronLeft onClick={slideLeft} className="bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40}/>
            <div id={"slider-" + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                {movies.map((item, id) => {
                    return(
                    <Movie item={item}/>
                )})}
            </div>
            <MdChevronRight onClick={slideRight} className="bg-white rounded-full right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40} />
        </div>
    </>
  )
}

export default Row