import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import star2 from '../media/starpng.png'

const MovieList = (props) => {

var data = props.data
var pages = props.pages
var currentpage = props.currentpage
var loading = props.loading

const [goto, setGoTo] = useState('')
const history = useNavigate()

// console.log(currentpage)

const GoToPage = async()=>{
    props.gotopage(goto)
}

const GoToNext = async()=>{

    var nextpage = parseInt(currentpage) + 1
    props.gotopage(nextpage.toString())

}

const GoToPrev = async()=>{

    var prevpage = parseInt(currentpage) - 1
    if(prevpage>0)
    {
        props.gotopage(prevpage.toString())
    }
    

}


if(loading){
    return(
       <div style={{maxWidth:'350px', marginLeft:'auto', marginRight:'auto', marginTop:'150px'}} >
         Loading...
     </div>
     )
    }


    
  return (
    <div className='container'>
        <div className='' style={{height:'75vh '}}>
            <div className='row row-cols-4 d-flex scroll mb-5 m-0 mx-4 ' style={{overflowY:'scroll' , height:'75vh',  }}>
            
            {
                data.map((item,i)=>{
                    return(
                    <div onClick={()=>history(`/details/${item.id}`)} key={i} className='col-3 col-lg-4 col-md-3 col-sm-12 mx-2  p-0  rounded mt-4  mb-2 ' style={{boxShadow:"0px 0px 3px 1px #ccc", width:'18rem', height:'64%', cursor:'pointer'}} >
                        <div className="card" style={{height:'100%'}} >
                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="card-img-top" alt="..." style={{width:'100%', height:'200px'}}/>
                        <div className="card-body">
                            <div className='d-flex '>
                            <div className='me-auto w-75'><p className='small fw-bold' style={{fontSize:'12px'}}>{item.title}</p></div>
                            <div className='text-end'><p className='small fw-bold' style={{fontSize:'12px'}}>{item.vote_average} <img src={star2} style={{width:'9px', height:'9px', marginTop:'-9px'}} /> </p></div>
                            </div>
                            <p  className='small truncate'>{item.overview}</p>
                        </div>
                        </div>
                    </div>
                    )
                })
            }

            </div>
        </div>

        <div className=' p-3 mt-1' >    
            <div className='mt-3 d-flex'>

                <div className='me-auto d-flex'>
                   <p className='small mt-1 text-dark'>Page - {currentpage} of {pages} </p> 
                   <button onClick={()=>GoToPrev()} className='btn btn-outline-success mb-4 mx-3'>⏴ Prev</button>
                   <button onClick={()=>GoToNext()} className='btn btn-outline-success mb-4 mx-1'>Next ⏵</button>

                </div>

                <div className='text-end '>
                    <div className='d-flex'>
                        <div className='small mt-2 text-dark '> Go To Page</div>
                        <div className='mx-3 d-flex'>
                            <input value={goto} onChange={(e)=>setGoTo(e.target.value)} className='form-control w-25' />
                            <button onClick={()=>GoToPage()} className='mx-2 btn btn-outline-success'>Go</button>
                        </div>
                       

                    </div>
                    
                </div>

            </div>
        </div>    

    </div>
  )
}

export default MovieList