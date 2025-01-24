// routes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import Hero from './Components/Hero';
import NovidadeDetails from './Components/NovidadeDetails';

const Routes = () => {
  return (
    <>
      <Route path="/" element={<Hero />} />
      <Route path="/novidade/:id" element={<NovidadeDetails />} />
    </>
  );
};

export default Routes;
