import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({userData , userName , logOut}) {
  return <>
  <Navbar userData={userData} logOut={logOut} userName={userName}/>
  <div className='container'>
  <Outlet></Outlet>
  </div>
  <Footer/>
  </>
}
