import React from 'react';
import Filter from '../Components/Filter/Filter';
import Form from '../Components/Form/Form';
import NavbarForm from '../Components/NavbarForm/NavbarForm';
function patients() {
    const patientContainer = {
        display: 'flex',
    }
  return (
    <div>
        <div>
            <NavbarForm/>
            <div style={patientContainer} className='patientContainer'>
                <Filter/>
                <Form/>
            </div>
        </div>
    </div>
  )
}

export default patients;