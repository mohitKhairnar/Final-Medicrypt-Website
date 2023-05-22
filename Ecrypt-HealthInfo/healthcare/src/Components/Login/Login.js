import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import {RiLockPasswordLine} from 'react-icons/ri';
import {AiTwotoneMail} from 'react-icons/ai';
import {FaMobileAlt} from 'react-icons/fa';
import {IoMdStar} from 'react-icons/io';
import { Link } from 'react-router-dom';
import  {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN,setItem,getItem } from '../../utils/localStorageManager';

function Login() {
  //Let's create an API here
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [mobile,setMobile] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    if(email=='' || password=='' || mobile==''){
      setError("All field are mandatory")
    }
    try {
      console.log("Hello all");
        const response = await axiosClient.post('/auth/login', {
            email,
            password,
        });
        console.log(response);
        // console.log(response.data.result.accessToken);
        setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
        // console.log(getItem(KEY_ACCESS_TOKEN));
        // console.log("I am in try");
        navigate('/login/patients');
    } catch (e) {
      console.log(e);
      // console.log("I am in catch");
      // if(e.response.data.error){
      //   setError(e.response.data.error);
      // }
    }
}

  return ( 
    <div className='mainBody'>
      <div className="container">
      <iframe src="https://embed.lottiefiles.com/animation/102773"></iframe>
      <div className='rightLogin'>
        <div className='error'>
          <h2>{error}</h2>
        </div>
        <h2>Welcome to MediCrypt !!</h2>
        <h2>You will be having a great experience here!</h2>
        <h4 style={{color:"grey"}}>Let's help you to follow HIPPA policies</h4>
        <div className='inputWala'>
          <p>Email Address</p>
          <div className='iconInput'>
            <h2><AiTwotoneMail/></h2>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
        </div>
        <div className='inputWala'>
          <p>Mobile Number</p>
          <div className='iconInput'>
            <h2><FaMobileAlt/></h2>
          <input type="number" onChange={(e)=>setMobile(e.target.value)}/>
          </div>
        </div>
        <div className="inputWala">
          <p>Password</p>
          <div className='iconInput'>
            <h2><RiLockPasswordLine/></h2>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
        </div>
        <br />
        <div className='agreed'>
          <input type="checkbox" id="agree" name="agree" value="agree" className='agree'></input>
          <label for="agree">Agreed upon terms and conditions<IoMdStar/></label>
        </div>
        <button onClick={handleSubmit}><h3>Log In</h3></button>
        <p style={{display: 'inline-block'}}>Don't have an account? <Link style={{color: "blue",textDecoration: "none",display: "inline-block"}} className="link" to='/Signup'><h3>Signup</h3></Link></p>
      </div>
        </div>
    </div>
  )
}

export default Login