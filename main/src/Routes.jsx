
import React from 'react';
import { Route } from 'react-router-dom';
import Hero from './Components/Hero';
import NewDetail from './Components/NewDetail';
import MainProductDetails from './Components/MainProductDetails'

const Routes = () => {
  return (
    <>
      <Route path="/" element={<MainPage/>} />
      <Route path="/novidade/:id" element={<NewDetail />}/> 
      <Route path='/produto/:id' element={<MainProductDetails/>}/>
    </>
  );
};

export default Routes;
