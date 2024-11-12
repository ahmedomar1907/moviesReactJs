import './App.css';
import {createBrowserRouter, createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';


function App() {

  useEffect(() => {
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  } , [])

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    return <Navigate to='/login'/>
  }

  const [userData , setUserData] = useState(null)
  const [userName , setUserName] = useState(null)

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let userName = localStorage.getItem('userName');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
    setUserName(userName)
  }

  let router = createHashRouter([
    {path:'/' , element:<Layout userData={userData} logOut={logOut} userName={userName}/>, children:[
      {index:true , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Home/></ProtectedRoute> },
      {path:'movies' , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Movies/></ProtectedRoute> },
      {path:'people' , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><People/></ProtectedRoute> },
      {path:'profile' , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Profile/></ProtectedRoute> },
      {path:'tv' , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Tv/></ProtectedRoute> },
      {path:'moviedetails/:id/:media_type' , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><MovieDetails/></ProtectedRoute> },
      {path:'register' , element:<Register/> },
      {path:'login' , element:<Login saveUserData={saveUserData}/> },
  
    ] }
  ]);

  return <RouterProvider router={router} /> 
}
export default App;
