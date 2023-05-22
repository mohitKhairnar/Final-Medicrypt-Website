import React from 'react';
import './Itempatient.css';
import {IoPersonCircle} from 'react-icons/io5';
function Itempatient(param) {
  return (
    <div className='itemContainer'>
        <div className='iconAndName'>
            <h4 style={{fontSize: '32px'}}><IoPersonCircle/></h4>
            <h4>Dr. {param.name}</h4>
        </div>
        <p>Education: {param.edu}</p>
        <div className='dateAndButton'>
            <p>Email: {param.email}</p>
            <p>Contact: {param.contact}</p>
            {/* <button className='itemButton'>View Details</button> */}
        </div>
    </div>
  )
}

export default Itempatient