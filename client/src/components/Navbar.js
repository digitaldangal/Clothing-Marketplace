import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return(
        <header>
              <div className='wrapper'>
                <h1>Copped App</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
        </header>
    )
}

export default Navbar