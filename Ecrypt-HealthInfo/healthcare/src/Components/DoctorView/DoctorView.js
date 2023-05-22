import React, {useState,useEffect} from 'react';
import axios from 'axios'
import PatientView from '../PatientView/PatientView';
import { Link, useNavigate , useParams} from 'react-router-dom';

import './Popup.css';

function DoctorView() {
  console.log('cdhbsh ');
  const navigate = useNavigate();
  const [popup, setPop] = useState(false)
  // const [document, setDocument] = useState(null);
  // const  id  = useParams()

  // console.log(id);
  // useEffect(() => {
  //   const fetchDocument = async () => {
  
  //       const response = await axios.get(`http://localhost:4000/display/${id}`);
  //       console.log(response);
  //       setDocument(response.data);
      
      
  //   };

  //   fetchDocument();
  // }, [id]);

  // Get ID from URL
const params = useParams();
    
const [document, setDocument] = useState([])
    useEffect(()=> {
        axios.get(`http://localhost:4000/display/${params.id}`)
        .then(res => {
            console.log(res)
            setDocument(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [params.id])



  console.log('Docs ->',document.patientName);
  const handleClickOpen = () => {
    setPop(!popup)
  }
  const closePopup = () => {
    setPop(false)
  }
  return (
    <>
      <PatientView name={document.patientName} age={document.patientAge} weight={document.patientWeight} tests={document.tests} reports={document.reports}/>
      <button onClick={handleClickOpen}>Emergency access</button>
      <div>
            {
              popup ?
                <div className="main">
                  <div className="doctor-popup">
                    <div className="doctor-popup-header">
                      <h4 style={{textAlign: 'center'}}>Attention!</h4>
                      <div className='closePopup'>
                        <h1 onClick={closePopup}>X</h1>
                      </div>
                    </div>
                    <div className='doctor-popupBody'>
                      <p>Emergency access is required in case of extreme situation. This will direct you to the whole information of patient.</p>
                      <h6>Note: Email will be sent to the patient, so that the patient gets to know that you have accessed the information</h6>
                      <button className='okButton'><h3 style={{ color: "white" }}>OK, fine !</h3></button>
                    </div>
                  </div>
                </div> : ""
            }
          </div>
    </>

  )
}

export default DoctorView