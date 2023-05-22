import React, { useEffect } from 'react';
import Navbar from '../Components/HomeComponents/Navbar';
import Carousel from '../Components/HomeComponents/Carousel';
import Cards from '../Components/HomeComponents/Cards';
import {axiosClient} from '../utils/axiosClient';

function Home() {
  return (
    <div>
      <Navbar/>
      <Carousel/>
      <Cards/>
    </div>
  )
}

export default Home