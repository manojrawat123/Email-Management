import axios from 'axios';
import React, { useContext, useState } from 'react'
import { API_BASE_URL } from '../../../config';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const EmailLastConfirm = (props) => {

  const { authHeader, isValidSessionFunc } = useContext(DataContext);
  

  return (
     <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
      <div className="bg-white p-4 rounded-lg">
        <p>{`Are you sure you want to send Email?`}</p>
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mx-2"
            type='button'
            onClick={() => {
              props.setLoading(true);
              axios.post(`${API_BASE_URL}/${ props.route ? props.route : "emaillog"}/`, props.lastData, authHeader).then((res) => {
                toast.success(props?.success_message ? props?.success_message : "Email Send Successfully", { position: "top-center" });
                props.setIsModalOpen(false);
                props.resetFunction();
                props.fieldValueFunc('customer_id' , null)
              }).catch((error) => {
                console.log(error);
                isValidSessionFunc()
                console.log(props.lastData);
              }).finally(() => {
                props.setLoading(false);
              });
            }}
          >
            {
              <>{"Confirm"} </>
            }
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mx-2"
            type='button'
            onClick={() => {
              props.setShowConfirmEmail(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailLastConfirm
