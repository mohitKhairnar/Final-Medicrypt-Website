import React,{useState} from 'react'
import "./Signup.css";
import { RiLockPasswordLine } from "react-icons/ri";
import {MdDriveFileRenameOutline} from 'react-icons/md'
import { AiTwotoneMail } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import  {axiosClient} from '../../utils/axiosClient';
import Navbar from '../HomeComponents/Navbar';
function Signup() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [mobile,setMobile] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e){
    try{
      const result = await axiosClient.post('/auth/signup',{
        name,
        email,
        password,
        mobile
      });
      console.log("Hello")
      navigate('/login');
    }
    catch(e){
      setError(e.response.data.error);
    }
  }

  return (
    <>    
    <Navbar />
    <div className="signupMainBody">
      <div className="signupContainer">
        <div className='error'>
          <h2>{error}</h2>
        </div>
        <h2>Welcome to MediCrypt !!</h2>
        <h2>You will be having a great experience here!</h2>
        <h4 style={{ color: "grey" }}>
          Let's help you to follow HIPPA policies
        </h4>
        <div className='signupInputwala'>
          <p>Name</p>
          <div className='signupIconinput'>
            <h2><MdDriveFileRenameOutline/></h2>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>
          </div>
        </div>
        <div className="signupInputwala">
          <p>Email Address</p>
          <div className="signupIconinput">
            <h2>
              <AiTwotoneMail />
            </h2>
            <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
          </div> 
        </div>
        <div className='signupInputwala'>
          <p>Mobile Number</p>
          <div className='signupIconinput'>
            <h2><FaMobileAlt/></h2>
          <input type="number" onChange={(e)=>setMobile(e.target.value)}/>
          </div>
        </div>
        <div className="signupInputwala">
          <p>Password</p>
          <div className='signupIconinput'>
            <h2><RiLockPasswordLine/></h2>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <button className="signupButton" onClick={handleSubmit}><h3>Sign Up</h3></button>
      </div>
    </div>
    </>

  );
}

export default Signup;
