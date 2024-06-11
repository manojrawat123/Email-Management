import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { split } from 'postcss/lib/list';
import { API_BASE_URL } from '../../config';
import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const TabelSupport = ({ row_data, topTableHeading, EditModal, url_route, getFunc, query }) => {


  const [deleteButton, setDeleteButton] = useState();
  const [isModalOpen, setIsModalOpen] = useState();

  const filterTabel = topTableHeading.filter(item => item.label !== "Action");

  return (
    <>
      <EditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        row_data={row_data}
        topTableHeading={filterTabel}
        getFunc={getFunc}
        query={query}
        url_route={url_route}
      />
      <tr className="hover:bg-gray-100 text-center">
        {topTableHeading?.map((element, index) => {
          if (element.label == "Action") {
            return <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >Edit</button>
              <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                onClick={() => {
                  setDeleteButton(true);
                  const token = Cookies.get("token");
                  axios.delete(`${API_BASE_URL}/${url_route}/${row_data.id}/`, {headers :{"Authorization" : `Bearer ${token}`}}).then(() => {
                    // getCustomerFunction();
                    if (query) {
                      getFunc(query);
                    }
                    else {
                      getFunc();
                    }
                    toast.success("Customer Deleted");

                  }).catch((err) => {
                    console.log(err);
                    toast.error();
                  }).finally(() => {
                    setDeleteButton(false);
                  })
                }}
              >{deleteButton ? <CircularProgress size={19} color='inherit' /> : "Delete"}</button>
            </td>
          }
          return <>{ (element.label == "Increment" && !row_data[element.name])  ?
            <td className="py-2 px-4 border-b"> {`${row_data['billing_increment_1']?.split(".")[0]} + ${row_data['billing_increment_n']?.split(".")[0]}`}</td>
            : element.display != false ? <td className="py-2 px-4 border-b">{row_data[element.name]} </td> : null}</>
        })}

      </tr>
    </>
  )
}

export default TabelSupport
