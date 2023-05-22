import React,{useState,useEffect} from 'react';
import './Filter.css';
import axios from 'axios'
import {FiFilter} from 'react-icons/fi';
import Item from '../Item/Item';
import { Link, useNavigate } from 'react-router-dom';

function Filter() {
  const [filterBy,filtering] = useState('Filter By ID');
  const [documents,setDocuments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/save')
      .then(response => setDocuments(response.data) )
      .catch(error => console.error(error));
  }, []);

  function filterByID() {
    filtering('Filter By ID');
  }
  function filterByName() {
    filtering('Filter By Name');
  }
  function filterByEmail() {
    filtering('Filter By Email');

    console.log(documents);


  }
  return (
    <div className='filterContainer'>
      <div className='filterBy'>
        <button onClick={filterByID} className='filterByButton'>
          <div className='filterItem'>
          <FiFilter/>
          <h4>ID</h4>
          </div>
        </button>
        <button onClick={filterByName}  className='filterByButton'>
        <div className='filterItem'>
          <FiFilter/>
          <h4>Name</h4>
          </div>
        </button>
        <button onClick={filterByEmail}  className='filterByButton'>
        <div className='filterItem'>
          <FiFilter/>
          <h4>Email</h4>
          </div>
        </button>
      </div>
      <input className="filterInput" type="text" placeholder={filterBy} />
      <div className='allItems'>
        {documents.map(document=>(
          <li key={document.id}>
            <Item name={document.patientName} age={document.patientAge} id={document._id}/>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Filter