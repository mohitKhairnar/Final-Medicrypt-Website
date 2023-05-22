import React, { useState, useEffect} from 'react';
import './PatientView.css';
import image from "./hospitalLogo.png";
import Item from './Itempatient';
import './Itempatient.css';
import Navbar from "../HomeComponents/Navbar";
// import PDF from ;
import { Document, Page, pdfjs } from "react-pdf";
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import sarthak from '../../../../../server/'

function PatientView(params) {
  const [isVisible, setIsVisible] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/data')
  //     .then(response => setData(response.data))
  //     .catch(error => console.error(error));
  // }, []);


  function openpdf() {
    setIsVisible(prevState => !prevState);
  }
  return (
    <>
      <Navbar />
      <div className='patientpage'>
        <div className="doctorinfo">
          <Item name="Sarthak Deshmukh" edu="abc" email="sarthakd1512@gmail.com" contact="+919137387016"/>
        </div>
        <div className='patientdata'>
          <div className="formHeader">
            <div className="leftWala">
              <div className="leftHeader">
                <img src={image} alt="Hospital Logo" />
              </div>
              <div className="rightHeader">
                <h1 style={{ fontSize: "2rem", color: "#22385f" }}>KIHS</h1>
                <p style={{ fontSize: "10px", fontWeight: "700" }}>
                  KULLOLLI INSTITUTE OF HEALTH SERVICES
                </p>
              </div>
            </div>
            <div className="rightWala">
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                Dr.Mohit Khairnar
              </p>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                MD MS In Medicine
              </p>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>From America</p>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                Place: Sangli, Maharashtra
              </p>
            </div>
          </div>
          <hr className='mainbreak' />
          <div className="fields">
            <h3>Patient Name: {params.name}</h3>
            {/* {data.map(item => (
              <div key={item._id}>
              <h2>{item.doctorName}</h2>
              </div>
            ))} */}
          </div>
          <hr />
          <div className="ageweight">
            <div className="fields">
              <h3>Patient Age: {params.age}</h3>
            </div>
            <div className="fields">
              <h3>Patient Weight: {params.weight}</h3>
            </div>
          </div>
          <hr />
          <div className="medcontainer">
            <div className="medicine">
              <div className="medetails">
                <h3>Medicine Name</h3>
                <h3>{params.medicines.medicineName[0]}</h3>
              </div>
              <div className="medetails">
                <h3>Medicine Quantity</h3>
                <h3>{params.medicines.medicineQuantity[0]}</h3>
              </div>
              <div className="medetails">
                <h3>Medicine Time</h3>
                <h3>{params.medicines.medicineTime[0]}</h3>
              </div>
            </div>
          </div>

          <hr />
          <div className="fields">
            <h3>Required medical Checkups: {params.tests}</h3>
          </div>
          <hr />
          <div className="fields">
            <h3>Medical Report file: {params.reports}</h3>
            <button onClick={openpdf} className="report">Open Report</button>
            {isVisible && <Document file={`${params.filePath}+${params.reports}`} onContextMenu={(e) => e.preventDefault()}>
              <Page pageNumber={3} />
            </Document>}
          </div>

        </div>
      </div>
    </>
  )
}

export default PatientView