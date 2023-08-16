import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import homepng from '../media/hm.png'
import searchpng from '../media/search2.jpg'
import arrowback from '../media/arbk.png'

const Navbar = (props) => {

const [search, setSearch] = useState('')

const history = useNavigate()
const route = useLocation()
// console.log(route.pathname)

const SearchMovies = async()=>{
    props.searchMovie(search)
}

useEffect(()=>{
    if(search=="")
    {
        SearchMovies()
    }

},[search])




  return (
    <div className='container-fluid ' style={{height:'60px', width:'100%', boxShadow:"3px 2px 3px 1px #ccc" }}>
        <div className='row'>
            <div className='col-9 col-md-9 col-lg-9 mt-2'>
            {
                route.pathname =="/"
                ?
                <>
                <div className='d-flex' style={{marginLeft:'110px'}}>
                <div className='w-50'>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} className="form-control bg-light " type="search" placeholder="Search" aria-label="Search" />
                </div>
                <div className='mx-2'>
                    <img onClick={()=>SearchMovies()} src={searchpng} style={{width:'35px', height:'30px', cursor:'pointer'}} />
                </div>
                </div>
                </>
                :
                <>
                <div className='d-flex'>
                    <img className='mt-1 mx-4' src={arrowback} style={{width:'60px', height:'30px', cursor:'pointer'}} onClick={()=>history("/")}/>
                    <p className='mx-5 fw-bold mt-2 text-secondary'>Movie Details</p>
                </div>
                </>
            }
            
            
            </div>

            <div className='col-3 col-md-3 col-lg-3 mt-3'>
                <img onClick={()=>history("/")} className='float-end' src={homepng} style={{width:'30px', height:'30px', cursor:'pointer' }} />
            </div>

        </div>
    </div>
  )
}

export default Navbar