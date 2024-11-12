// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import useFetch from '../../Hooks/useFetch';
import MediaItem from '../MediaItem/MediaItem';

export default function Home() {

  let {trendingMovies , trendingTv, trendingPerson} = useFetch()

  // const [trendingMovies, setTrendingMovies] = useState([])
  // const [trendingTv, setTrendingTv] = useState([])
  // const [trendingPerson, setTrendingPerson] = useState([])

  // async function getTrending(mediaType , func){

  //   let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day`, {
  //     params: {
  //       language: 'en-US',
  //     },
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTI5NmI2M2U1MjU5OGI2YzVjNzdhY2ZkOGQ4MGQxOSIsIm5iZiI6MTcyODM5ODQ3NC43MzE2NTEsInN1YiI6IjY0ZmUzMDUyZWZlYTdhMDExYWI2ZTQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TGsw0aigPD_A_1LoXcwlhktD32wi24arGkDcEawyuM'      }
  //   });

  //   func(data.results)
  // }
    
  // useEffect(() =>{
  //   getTrending('movie' , setTrendingMovies);
  //   getTrending('tv' , setTrendingTv);
  //   getTrending('person' , setTrendingPerson);
  // } ,[])
  return <>
  <div className="row">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr mb-3 w-25"></div>
      <h2 className='h4'>Trending <br /> Movies <br /> To Watch Right Now</h2>
      <p className='text-white-50 py-3'>Most Watched Movies By Days</p>
      <div className="brdr mt-3 w-100"></div>
      </div>
    </div>
  {trendingMovies.slice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/> )}
  </div>

  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr mb-3 w-25"></div>
      <h2 className='h4'>Trending <br /> Tv <br /> To Watch Right Now</h2>
      <p className='text-white-50 py-3'>Most Watched Tv By Days</p>
      <div className="brdr mt-3 w-100"></div>
      </div>
    </div>
  {trendingTv.slice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/> )}
  </div>

  <div className="row">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr mb-3 w-25"></div>
      <h2 className='h4'>Trending <br /> Person <br /> To Watch Right Now</h2>
      <p className='text-white-50 py-3'>Most Watched Person By Days</p>
      <div className="brdr mt-3 w-100"></div>
      </div>
    </div>
  {trendingPerson.slice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/> )}
  </div>

  </>
}