import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import image from "./hospitalLogo.png";
import { Button, message, Upload, Space, Typography } from "antd";
import { FaMobileAlt } from "react-icons/fa";
import { axiosClient } from "../../utils/axiosClient";




function Form() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    //By using setTimeInterval we are able to get the current time of system..And even updating time.
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleremove = (index) => {
    const list = [...prescription];
    list.splice(index, 1);
    setprescription(list);
  };
  const handleaddclick = () => {
    setprescription([...prescription, { medicineName: "", medicineQuantity: 0, medicineTime: "" }]);
  };



  //Adding multiple files
  // const [doc, setdoc] = useState([""]);

  // const [files, setFiles] = useState({});
  // const axios = require("axios");
  // function handleFileUpload({ file }) {
  //   setFiles((pre) => {
  //     return { ...pre, [file.uid]: file };
  //   });
  //   axios.post("http://localhost:3000/fileUpload", file, {
  //     onUploadProgress: (event) => {
  //       console.log(event);
  //     },
  //   });
  // }
  const [files, setFiles] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const handleChange = (event) => {
    const selectedFiles = event.target.files;
    setSingleFile(selectedFiles[0]);
    const newArray = [...files, ...selectedFiles];
    setFiles(newArray);
  };

  const navigate = useNavigate();
  //Form variables
  const [pname, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [desc, setDesc] = useState('');
  const [prescription, setprescription] = useState([{ medicineName: "", medicineQuantity: 0, medicineTime: "" }]);
  const [curTest, setcurTest] = useState("");
  const [email, setEmail] = useState("");


  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...prescription];
    list[index][name] = value;
    setprescription(list);
  };
  //Medical Checkup
  const [tests, setTests] = useState([]);
  function updateCurTest(event) {
    setcurTest(event.target.value);
  }

  function addTest(event) {
    event.preventDefault();
    const newTestArray = [...tests, curTest];
    setTests(newTestArray);
    console.log(newTestArray);
  }

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('fileSave', selectedFiles[i]);
    }
  };
  // const handleFileSelect = (event) => {
  //   setFile(event.target.files[0]);
  // };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('fileSave', selectedFiles[i]);
    }

    formData.append('pname', pname);
    formData.append('age', age);
    formData.append('weight', weight);
    formData.append('desc', desc);
    prescription.forEach((prescription, index) => {
      formData.append(`prescription[${index}][medicineName]`, prescription.medicineName);
      formData.append(`prescription[${index}][medicineQuantity]`, prescription.medicineQuantity);
      formData.append(`prescription[${index}][medicineTime]`, prescription.medicineTime);
    });
    formData.append('tests', tests);
    formData.append('email', email);
    navigate('/');

    try {
      const response = await fetch('http://localhost:4000/save', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.warn(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="formContainer">
      <div className="formHeader">
        <div className="leftWala">
          <div className="leftHeader">
            <img src={image} alt="Hospital Logo" />
          </div>
          <div className="rightHeader">
            <h1 style={{ fontSize: "5rem", color: "#22385f" }}>KIHS</h1>
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
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
        {/* <img src={header} alt="" /> */}
      </div>
      <hr className="breaker" />
      <form onSubmit={handleSubmit}>
        <div className="formBody">
          <div className="dateAndTime">
            <h4>Date: {date}</h4>
            <h4>Time: {time.toLocaleTimeString()}</h4>
          </div>
          <div className="nameemail">
            <div className="formInputWala">
              <h4>Name</h4>
              <input type="text" style={{ width: "500px" }} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="formInputWala">
              <h4>Email</h4>
              <input type="email" style={{ width: "500px" }} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="AgeWeight">
            <div className="formInputWala">
              <h4>Age</h4>
              <input type="number" style={{ width: "500px" }} onChange={e => setAge(e.target.value)} required />
            </div>
            <div className="formInputWala">
              <h4>Weight</h4>
              <input type="number" style={{ width: "500px" }} onChange={e => setWeight(e.target.value)} required />
            </div>
          </div>
          <div className="description">
            <h4>Description</h4>
            <textarea name="postContent" rows={4} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="medicines">
            <h4>Medicine</h4>
            <div className="allMedicines">
              {prescription.map((x, i) => {
                return (
                  <div className="singleMedicine">
                    <div class="medicineName">
                      <h4>Medine Name</h4>
                      <input
                        type="text"
                        name="medicineName"
                        class="medicineInput"
                        placeholder="Enter Medicine Name"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineQuantity">
                      <h4>Medicine Quantity</h4>
                      <input
                        type="number"
                        name="medicineQuantity"
                        class="medicineInput"
                        placeholder="Enter Medicine Quantity"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineTime">
                      <h4>Time For Medicine</h4>
                      <input
                        type="text"
                        name="medicineTime"
                        class="medicineInput"
                        placeholder="Enter Time for Medicine"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineButtons">
                      {prescription.length !== 1 && (
                        <button
                          className="medicineRemove"
                          onClick={() => handleremove(i)}
                        >
                          <h4>Remove</h4>
                        </button>
                      )}
                      {prescription.length - 1 === i && (
                        <button
                          className="medicineAdd"
                          onClick={handleaddclick}
                        >
                          <h4>Add More</h4>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="requiredMedicalCheckups">
            <h4>Required Medical Checkups</h4>
            <div
              style={{
                border: "2px solid black",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px 0px rgba(154, 183, 216, 0.5)",
                padding: "20px",
              }}
            >
              <input
                className="testInput"
                onChange={updateCurTest}
                type="text"
                placeholder="Enter Test Name"
              />
              <button onClick={addTest}>
                <h4>Add Test</h4>
              </button>
              <div className="allTests">
                {tests.map((test, index) => {
                  return (
                    <div className="test" key={index}>
                      <h4>{test}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="addingDocuments">
            <h4>Upload Medical Reports</h4>

            <div>
              <input type="file" multiple onChange={handleFileSelect} />
              {files.length > 0 && (
                <ul>
                  {files.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              )}
              <button onClick={handleUpload}>Upload Files</button>
            </div>
          </div>
          <div className="submitFormButton">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;


// AES is considered a very secure encryption algorithm and is widely used in various applications, including online banking, email encryption, and secure file transfer. It has been standardized by the National Institute of Standards and Technology (NIST) and is approved by the US government for protecting classified information up to the level of "Top Secret".
