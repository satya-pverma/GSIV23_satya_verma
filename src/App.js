import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { useEffect, useState } from 'react';

function App() {

const [movies, setMovies] = useState([]) 
const [loading, setLoading] = useState(true) 
const [totalpage,setTotalPage]  = useState()
const [refresh, setRefresh] = useState(false)
const [search, setSearch] = useState('')
const [page, setPage] = useState('1')

useEffect(()=>{
  setLoading(true)
  if(search=="")
  {
    const fetchmovies = async()=>{
      var data = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
         method: 'get',
         headers: {'Content-Type':'application/json', 'Authorization':`Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
        }).then(resp => resp.json());
   
       //  console.log(data)
        setMovies(data.results)
        setTotalPage("500")
        setLoading(false)
   
     }
     fetchmovies()
  }
  else{
    FindMovie(search)
  }
 
},[page, refresh])

const FindMovie=async(input)=>{
  if(input=="")
  { 
    setSearch("")
    setPage("1")
    setRefresh(!refresh)
  }
  else{
    setLoading(true)
    let rep = "%20"
    for(let i=0 ; i<input.length ; i++)
    {
        if(input[i] == ' ')
            input = input.replace(input[i],rep);
    }
    setSearch(input)
    // console.log(input)
    var url= `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=${page}` 
    // console.log(url)
    var data = await fetch(url, {
      method: 'get',
      headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`},
    }).then(resp => resp.json());
    // console.log(data)
    setMovies(data.results)
    setTotalPage(data.total_pages)

    setLoading(false)
  }

 

}

const GoToPageNo = async(item)=>{
  console.log(item)
  if(item<= totalpage)
  {
    setPage(item)
  }
  


}


  return (
    <div className="">
      <Navbar searchMovie={FindMovie}   />
      <Routes>
        <Route path='/' element={<MovieList data={movies} pages={totalpage} currentpage={page} gotopage={GoToPageNo} loading={loading} />}  />
        <Route path='/details/:id' element={ <MovieDetails/> } />
      </Routes>
      
    </div>
  );
}

export default App;
