import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context';

function DropDown () {
  useEffect(()=>{
      getCustomerFunction();
  },[])


  return (
    <div className="custom-dropdown">
        {<Select
        options={customerList}
        isSearchable={true}
        isMulti
        isClearable={true}
        placeholder="Select a Customer"
        required
      />}      
    </div>
  );
}

export default DropDown ;
