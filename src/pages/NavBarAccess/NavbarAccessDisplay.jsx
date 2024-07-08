import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { Switch } from '@mui/material';
import NoDataPage from '../../component/NoDataPage/NoDataPage';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import Cookies from 'js-cookie';

const NavbarAccessDisplay = () => {

  const { navbarAccessPageObj,
    navBarAccessDisplayPageFunc } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState();

  const { id } = useParams();

  useEffect(() => {
    navBarAccessDisplayPageFunc(id);
  }, []);

  const postRequest = (data) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    axios.post(`${API_BASE_URL}/menuaccess/${id}/`, {
      ...data
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      navBarAccessDisplayPageFunc(id);
      console.log(value);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }


  const deleteRequest = (data)=>{
    setIsLoading(true);
    const token = Cookies.get('token');
    axios.delete(`${API_BASE_URL}/menuaccess/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
       ...data
      }
    }).then((value) => {
      console.log(value);
      navBarAccessDisplayPageFunc(id);
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  if (!navbarAccessPageObj) {
    return <Loading />
  }

  console.log(navbarAccessPageObj);
  return (
    <div className='grid grid-cols-2 gap-10'>
      {
        isLoading ?
          <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
            <Loading />
          </div> : null
      }
      <div >
        <h1 className='text-2xl font-bold text-gray-800 underline text-center'> Dissallowed Menu</h1>
        {navbarAccessPageObj?.not_allowed?.map((element, index) => {
          return <div className='m-2 p-2 border border-solid'>
            <span className='font-bold text-gray-800'>{element.label}</span>
            <button onClick={() => {
              postRequest({
                post_menu: true,
                menu_id: [element.id]
              });
            }}>
              <Switch checked={false} />
            </button>
          </div>
        })}
      </div>
      <div >
        {navbarAccessPageObj?.allowed.length != 0 ? <h1 className='text-2xl font-bold text-gray-800 underline text-center'> Allowed Menu</h1> : ''}
        {navbarAccessPageObj?.allowed.length == 0 ?
          <NoDataPage noDataMessage={"No menu Allowed"} noDataSubmessage={"No Data Here!!"} height={"h-[20rem]"} />
          : navbarAccessPageObj?.allowed?.map((element, index) => {
            return <div className='m-2 p-2 border border-solid'>
              <span className='font-bold text-gray-800'>{element.label}</span>
              <button onClick={() => {
               deleteRequest({ 'menu_id': element.id,
                'menu_delete': true})
              }}>
                <Switch checked={true} />
              </button>

              {element.allowed_option.length != 0 ? <h1 className="text-gray-700 font-semibold">Allowed Submenus</h1> : null}
              <div>{element.allowed_option.map((el, index) => {
                return <div className='ml-8 font-semibold'>
                  <span className='font-bold'>Label :</span> {el.label} &nbsp;&nbsp;&nbsp;
                  <span className='font-bold'>Link :</span>{el.link}
                  <button
                  onClick={()=>{
                    deleteRequest({
                      'sub_menuid' : el.id
                    });
                  }}
                  >
                    <Switch checked />
                  </button>
                </div>
              })}</div>
              {element.not_allowed_option.length != 0 ? <h1 className="text-gray-700 font-semibold">Not Allowed Submenus</h1> : ""}
              <div>{element.not_allowed_option.map((el, index) => {
                return <div className='ml-8 font-semibold'>
                  <span className='font-bold'>Label :</span> {el.label} &nbsp;&nbsp;&nbsp;
                  <span className='font-bold'>Link :</span>{el.link}
                  <button onClick={() => {
                    postRequest(
                      { submenu: el.id });
                  }}>
                    <Switch checked={false} />
                  </button>
                </div>
              })}</div>
            </div>
          })}
      </div>
    </div>
  )
}

export default NavbarAccessDisplay