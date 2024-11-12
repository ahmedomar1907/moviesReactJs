import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import avatar from '../../avatar.jpeg'

export default function MovieDetails() {

    let params = useParams();

    const [itemDetails, setItemDetails] = useState({})
    const [similar, setSimilar] = useState([])
    const [people, setPeople] = useState([])

    async function getItemDetails(){
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}`, {
            params: {
                language: 'en-US',
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTI5NmI2M2U1MjU5OGI2YzVjNzdhY2ZkOGQ4MGQxOSIsIm5iZiI6MTcyODM5ODQ3NC43MzE2NTEsInN1YiI6IjY0ZmUzMDUyZWZlYTdhMDExYWI2ZTQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TGsw0aigPD_A_1LoXcwlhktD32wi24arGkDcEawyuM'      }
            });
            setItemDetails(data);
    }

    async function getSimilar(){
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar`, {
            params: {
                language: 'en-US',
                page: '1'
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTI5NmI2M2U1MjU5OGI2YzVjNzdhY2ZkOGQ4MGQxOSIsIm5iZiI6MTcyODM5ODQ3NC43MzE2NTEsInN1YiI6IjY0ZmUzMDUyZWZlYTdhMDExYWI2ZTQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TGsw0aigPD_A_1LoXcwlhktD32wi24arGkDcEawyuM'      }
            });
            setSimilar(data.results);
    }
    
    async function getPeopleDetails(){
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}`, {
            params: {
                language: 'en-US',
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTI5NmI2M2U1MjU5OGI2YzVjNzdhY2ZkOGQ4MGQxOSIsIm5iZiI6MTcyODM5ODQ3NC43MzE2NTEsInN1YiI6IjY0ZmUzMDUyZWZlYTdhMDExYWI2ZTQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TGsw0aigPD_A_1LoXcwlhktD32wi24arGkDcEawyuM'      }
            });
            setPeople(data);
    }


    useEffect(()=> {
        getItemDetails();
        if (params.media_type !== 'person') {
            getSimilar();
        }
        if (params.media_type === 'person') {
            getPeopleDetails();
        }
        
    } , [params.id, params.media_type])
    
  return <>
    <div className="row py-3">
        <div className="col-md-3">
            {itemDetails.poster_path? <img className='w-100' src={'https://image.tmdb.org/t/p/original'+itemDetails.poster_path} alt="" />:'' }
            {itemDetails.profile_path? <img className='w-100' src={'https://image.tmdb.org/t/p/original'+itemDetails.profile_path} alt="" />:'' }
            {!itemDetails.poster_path && !itemDetails.profile_path? <img className='w-100 high' src={avatar} alt="" />:'' }
        </div>

        <div className="col-md-9">
            {params.media_type !== 'person'? <><h2>{itemDetails.title} {itemDetails.name}</h2>
            <p className='text-white-50 py-2'>{itemDetails.tagline}</p>
            <div className='d-flex'>
                {itemDetails.genres && itemDetails.genres.map(genre => 
                    <p key={genre.id} className='p-2 text-bg-info bg-info  m-1'>{genre.name}</p>
                )}
            </div>
            <p className='text-white-50 py-2'>Vote : {itemDetails.vote_average}</p>
            <p className='text-white-50 py-2'>Vote count : {itemDetails.vote_count}</p>
            <p className='text-white-50 py-2'>popularity : {itemDetails.popularity}</p>
            <p className='text-white-50 py-2'>release date : {itemDetails.release_date}</p>
            <p className='text-white-50'>{itemDetails.overview}</p></>  : <>
            <h2>{people.name}</h2>
            <p className='text-white-50 py-2'>birthday : {people.birthday}</p>
            <p className='text-white-50 py-2'>place of birth : {people.place_of_birth}</p>
            <p className='text-white-50 py-2'>known for department : {people.known_for_department}</p>
            <p className='text-white-50 py-2'>popularity : {people.popularity}</p>
            <p className='text-white-50 py-2'>{people.biography}</p>
            </> }

        </div>
    </div>

    <div className="row py-3 position-relative">
        {similar.slice(0,12).map((movie , index)=><div key={index} className='col-md-2'>
    <Link to={'/moviedetails/'+movie.id+'/'+params.media_type}>
    <div className="movie position-relative">
        <img className='w-100' src={movie.poster_path?'https://image.tmdb.org/t/p/original'+movie.poster_path:'https://image.tmdb.org/t/p/original'+movie.profile_path} alt="" />
        <h3 className='h6 my-2'>{movie.title} {movie.name}</h3>
        {movie.vote_average?<div className='vote p-2 text-center position-absolute top-0 end-0'>{movie.vote_average.toFixed(1)}</div>:''} 
    </div>
    </Link>
  </div>)}
  <Link to='/' className='btn btn-info position-absolute start-0 back ' ><i className="fa-solid fa-circle-left"></i> to home</Link>

    </div>
  </>
}