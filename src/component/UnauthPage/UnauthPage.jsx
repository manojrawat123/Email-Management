// Unauthorized.js
import React from 'react';
import { Helmet } from 'react-helmet';

const Unauthorized = () => {
  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}  className='text-lg font-semibold text-gray-800 h-[100%]'>
      <Helmet>
        <title>403 - Unauthorized</title>
      </Helmet>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      
    </div>
  );
};

export default Unauthorized;