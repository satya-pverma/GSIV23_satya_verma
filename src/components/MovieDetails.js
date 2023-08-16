import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import star2 from '../media/starpng.png'

const MovieDetails = () => {

const id = useParams().id

const [loading, setLoading] = useState(true)
const [details, setDetails] = useState()


useEffect(()=>{
    setLoading(true)
    const fetchmovies = async()=>{
     var data = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: 'get',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
       }).then(resp => resp.json());
  
       //console.log(data)
       setDetails(data)
       setLoading(false)
   
  
    }
    fetchmovies()
    
  
  },[])


  if(loading){
    return(
       <div style={{maxWidth:'350px', marginLeft:'auto', marginRight:'auto', marginTop:'150px'}} >
         Loading...
     </div>
     )
    }


  return (
    <div className='container-fluid'>
      <div className='row ' style={{height:'91vh'}}>
      <div className=' col-4   p-4  '>
        <div>
          <img className='img-fluid' style={{width:'350px', height:'350px'}} src={`https://image.tmdb.org/t/p/original${details.poster_path}`}  />
        </div>

      </div>
      <div className=' col-8   p-4'>
        <div className='d-flex'>
          <p className='fw-bold' style={{fontSize:'20px'}}>{details.original_title}</p>
          <p className='fw-bold mx-3 mt-1'> ( {details.vote_average} <img src={star2} style={{width:'12px', height:'11px', marginTop:'-9px'}} /> ) </p>
        </div>
        <p className='small text-dark' style={{marginTop:'-15px'}}>{details.tagline}</p>
        
        
        <div className='d-flex text-secondary' style={{marginTop:'-15px'}}>
          
          {
            details.genres.map((item,i)=>{
              return(
                <div className='m-0' key={i}>
                  <p className=' small'>{item.name} | </p>
                </div>
              )
            })
          }

        </div>
        
        <div className='d-flex ' style={{marginTop:'-15px'}}>
          <p className='small text-secondary'>{details.release_date}</p>
          <p className='fw-bold mx-1' style={{marginTop:'-3px'}}>|</p>
          <p className='small text-secondary mx-1'>{details.runtime} mins</p>
          <p className='fw-bold mx-1' style={{marginTop:'-3px'}}>|</p>
          <p className='small text-secondary mx-1'>{details.spoken_languages[0].name} </p>
        </div>
        <p className='small text-secondary' style={{marginTop:'-13px'}}>Casts - Not Found</p>
        
        <div className='languages'>
          <p className='fw-bold small'>Languages Spoken</p>
          <div className='row' style={{marginTop:'-12px'}}>
          {
            details.spoken_languages.map((item,i)=>{
              return(
                <div key={i} className='col'>
                <p className='small text-secondary m-0'>{item.name}</p> 
                </div>
              )
            })
          }
        </div>
        </div>
        

        
        
        <div>
          <p className='mt-4 text-secondary'>{details.overview}</p>
        </div>

        <div className=''>
          <p className='fw-bold small'>Production Companies</p>
          <div className='row'>
          {
            details.production_companies.map((item,i)=>{
              return(
                <div key={i} className='col'>
                <img src={`https://image.tmdb.org/t/p/original${item.logo_path}`} style={{width:'120px', height:'70px'}} alt='picture' />
                <p className='small text-secondary mt-2'>{item.name}</p> 
                </div>
              )
            })
          }
        </div>
        </div>

      </div>
      </div>

    </div>
  )
}

export default MovieDetails