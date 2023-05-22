import React from 'react';
import './Cards.css';
function Cards() {
    const cardHeader = {
        fontSize: '1.3rem',
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#364d79',
        padding: '20px'
    }
    const cardDescription = {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '1rem',
        fontWeight: '500',
        color: 'grey',
        padding: '10px',
        overflow: 'hidden',
    }
  return (
    <div className='cards-style'>
        <div className='card'>
            <p className='cardHeader'>Our Policies</p>
            <p className='cardDescription'>Healthcare helps you store your medical records online and securely share them. MediCrypt is designed as a self service app that works in a variety of mobile, tablet and desktop browsers and is available at .</p>
        </div>
        <div className='card'>
           <p className='cardHeader'>Features</p>
           <p className='cardDescription'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias distinctio non veniam dolore vel quos accusamus beatae pariatur optio, culpa ratione ad cumque nisi fuga, quaerat voluptas est laborum nam.
           </p>
        </div>
        <div className='card'>
            <p className='cardHeader'>Is My Data Private?</p>
            <p className='cardDescription'>
            You decide what to share and with whom using your account and settings. We don't take any decisions on your behalf. Once your purpose is accomplished, you can also discontinue access to your shares.
            </p>
        </div>
    </div>
  )
}

export default Cards