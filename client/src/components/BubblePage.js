import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.error(err))
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getData={getData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
