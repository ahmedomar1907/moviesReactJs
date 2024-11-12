import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , userName , logOut}) {
  return <>
<nav className="navbar navbar-expand-lg bg-transperent navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">films</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tv">Tv</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
      </ul>:''}
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex me-2">
          <a className="nav-link" href="#"><i className='fab fa-facebook'></i></a>
          <a className="nav-link" href="#"><i className='fab fa-instagram'></i></a>
          <a className="nav-link" href="#"><i className='fab fa-twitter'></i></a>
          <a className="nav-link" href="#"><i className='fab fa-spotify'></i></a>
          <a className="nav-link" href="#"><i className='fab fa-youtube'></i></a>
        </li>
        {userData? <li className="nav-item d-flex">
          <span className="nav-link cursor" onClick={logOut}>Logout</span>
          <Link className='nav-link' to='profile'>welcome {userName}</Link>
          {/* <span className="nav-link">welcome {userName}</span>           */}
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>  </>
}
