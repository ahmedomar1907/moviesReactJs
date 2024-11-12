import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useFetch(){
    const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPerson, setTrendingPerson] = useState([])

  async function getTrending(mediaType , func){

    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day`, {
      params: {
        language: 'en-US',
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTI5NmI2M2U1MjU5OGI2YzVjNzdhY2ZkOGQ4MGQxOSIsIm5iZiI6MTcyODM5ODQ3NC43MzE2NTEsInN1YiI6IjY0ZmUzMDUyZWZlYTdhMDExYWI2ZTQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TGsw0aigPD_A_1LoXcwlhktD32wi24arGkDcEawyuM'      }
    });

    func(data.results)
  }
    
  useEffect(() =>{
    getTrending('movie' , setTrendingMovies);
    getTrending('tv' , setTrendingTv);
    getTrending('person' , setTrendingPerson);
  } ,[]);

  return {trendingMovies , trendingTv , trendingPerson}
}