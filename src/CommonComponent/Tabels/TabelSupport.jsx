import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { split } from 'postcss/lib/list';
import { API_BASE_URL } from '../../config';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import DeleteConfirm from '../../component/ConfirmButton/DeleteConfirm';
import { OpenInBrowser } from '@mui/icons-material';

const TabelSupport = ({ row_data, topTableHeading, EditModal, url_route, getFunc, query }) => {

  const [deleteButton, setDeleteButton] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const filterTabel = topTableHeading.filter(item => item.label !== "Action");

  return (
    <>
      {confirmDelete ? <DeleteConfirm url_route={url_route} id={row_data.id} getFunc={getFunc} query={query} setConfirmDelete={setConfirmDelete} row_data={row_data} /> : null}
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
              <button className={` text-white py-1 px-3 rounded ${row_data.active == false && "active" in row_data ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >{"active" in row_data ? row_data.active == false ? "Activate" : "De-Activate" : "Delete"}</button>
            </td>
          }
          return <>{
            (element.label == "Increment") ?
              <td className="py-2 px-4 border-b"> {!row_data['increment'] ? `${row_data['billing_increment_1']} + ${row_data['billing_increment_n']}` : row_data['increment']}</td>
              :
              element.display != false ? <td className="py-2 px-4 border-b">
                {element.name == "payment_in" ?
                  <NavLink to={`/display-payment/?customer_id=${row_data['id']}&payment_type=${"IN"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}
                {element.name == "payment_out" ?
                  <NavLink to={`/display-payment/?customer_id=${row_data['id']}&payment_type=${"OUT"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}
                {element.name == "dispute_amount_in" ?
                  <NavLink to={`/display-dispute/?customer_id=${row_data['id']}&dispute_type=${"IN"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}
                {element.name == "dispute_amount_out" ?
                  <NavLink to={`/display-dispute/?customer_id=${row_data['id']}&dispute_type=${"OUT"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}
                {element.name == "invoice_amount_in" ?
                  <NavLink to={`/display-invoice/?customer_id=${row_data['id']}&invoice_type=${"IN"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}
                {element.name == "invoice_amount_out" ?
                  <NavLink to={`/display-invoice/?customer_id=${row_data['id']}&invoice_type=${"OUT"}`} className="text-blue-700"><OpenInBrowser /></NavLink> : null}

                {url_route == "myuser" && element.name == "user_name" ? <NavLink className={'text-blue-600 underline'} to={`/navbar-access/${row_data['id']}`} > {row_data[element.name]}</NavLink> : row_data[element.name]} </td> : null}</>
        })}
      </tr>
    </>
  )
}

export default TabelSupport
