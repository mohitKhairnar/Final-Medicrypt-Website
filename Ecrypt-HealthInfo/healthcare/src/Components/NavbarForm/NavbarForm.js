import React from 'react';
import './NavbarForm.css';
import {AiOutlineLogout} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
// const jwt = require('jsonwebtoken');
import { KEY_ACCESS_TOKEN, setItem,getItem,removeItem } from '../../utils/localStorageManager';
import { axiosClient } from '../../utils/axiosClient';
function NavbarForm() {
    const navigate = useNavigate();
    function handleLogout(){
      const temp = axiosClient('http://localhost:4000/logout',()=>{
        
      });
      removeItem('access_token')
      navigate('/login');
      console.log("hello");
    }
  return (
    <nav className='navbar'>
      <div className="nav-container">
        <h2 className="banner" onClick={()=>navigate('/')}>Medicrypt</h2>
        <div className="nav-right-side" onClick={handleLogout}>
             <h1><AiOutlineLogout/></h1>
        </div>
      </div>
    </nav>
  )
}

export default NavbarForm