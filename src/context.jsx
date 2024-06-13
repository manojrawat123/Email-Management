import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [customerObject, setCustomerObjectList] = useState();
  const [ratePageObj, setRatePageObj] = useState();
  const [emailSenderPageObj, setEmailSenderPageObj] = useState();
  const [topRouteTable, setTopRouteTable] = useState();
  const [searchPageData, setSearchPageData] = useState();
  const [filterRate, setFilterRate] = useState();
  const [session, setSession] = useState();
  const [token, setToken] = useState(Cookies.get("token"));
  const [allUser, setAllUser] = useState();

  const navigate = useNavigate();

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const handleErrorsFunc = (err) => {
    if (err?.response) {
      if (err?.response?.status) {
        if (err?.response?.status == 401) {
          isValidSessionFunc();
        }
        if (err?.response?.status == 500) {
          toast.error("Internal Server Error", {
            position: "top-center"
          });
          return
        }
        if (err?.response?.status == 400) {
          if (err?.response?.data) {
            if (err?.response?.data?.error) {
              toast.error(err?.response?.data?.error, {
                position: "top-center"
              });
            }
            else if (err?.response?.data) {
              for (const key in err.response.data) {
                if (Array.isArray(err.response.data[key])) {
                  toast.error(`${key}: ${err.response.data[key][0]}`);
                }
                else {
                  toast.error(error.response.err.response.data[key]);
                }
              }
            }
            else {
              toast("Some error Occured");
            }
          }
        }
      }
      else {
        toast.error("Some Error occured");
      }
    }
    else {
      toast.error("Some Error Occured!");
    }

  }

  const commonGetApi = (route, setParamsData) => {
    const token = Cookies.get("token");
    axios.get(`${API_BASE_URL}/${route}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((value) => {
      setParamsData(value.data);
    }).catch((err) => {
     handleErrorsFunc(err);
    });
  }

  const isValidSessionFunc = async (is_login = null, c_token = null) => {
    setToken(Cookies.get("token"));
    axios.get(`${API_BASE_URL}/session/`, {
      headers: {
        Authorization: `Bearer ${c_token ? c_token : token}`,
      },
    }).then((value) => {
      if (value.data.session != true) {
        Cookies.remove("token");
        navigate("/login");
      }
      if (is_login != null) {
        navigate("/");
      }
    }).catch((err) => {
      console.log(err);
      console.log(token);
      toast.error("Session Expired", { position: "top-center" });
      navigate("/login");
    });

  }

  const getAllUserFunc = () => {
    commonGetApi('myuser', setAllUser);
  }

  const emailSenderPageFunc = () => {
    commonGetApi('emaillog', setEmailSenderPageObj);
  }

  // const emailRatePageSenderFunc = ()=>{

  // }

  const getCustomerRatePageFunc = () => {
    axios
      .get(`${API_BASE_URL}/rate/`, authHeader)
      .then((value) => {
        setRatePageObj(value.data);
      })
      .catch((err) => {
        handleErrorsFunc(err);
      });
  }

  const getTopRouteFunc = (query) => {
    setTopRouteTable()
    axios.get(`${API_BASE_URL}/toproute/`, {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      setTopRouteTable(value.data)
    }).catch((err) => {
      handleErrorsFunc(err);
      setTopRouteTable([]);
    });
  }

  const searchPageOptionGetFunc = (page_name) => {
    setSearchPageData();
    axios.get(`${API_BASE_URL}/searchpage/`, {
      params: {
        page: page_name
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      if (value.data.page == "top_route") {
        const searchPageData = value.data?.data?.map((element, index) => {
          return {
            value: element,
            label: element
          }
        });
        console.log(searchPageData);
        setSearchPageData({
          options: searchPageData,
          page: value?.data?.page
        });
      }

      if (value.data.page == "rate_page") {
        console.log(value.data);
        const searchPageData = value.data?.data?.map((element, index) => {
          return {
            value: element,
            label: element
          }
        });
        setSearchPageData({
          options: searchPageData,
          page: value?.data?.page
        });
      }
      // setSearchPageData(value.data);
    }).catch((err) => {
      handleErrorsFunc(err);
      setSearchPageData([]);
    });
  }

  const getCustomerFunction = () => {
    commonGetApi('customer', setCustomerObjectList);
  }

  // const saveCountriesFunction = ()=>{
  //   commonGetApi('savecountry', setAllUser)
  // }

  const getRateSearchFunction = (query) => {
    if (!query) return;
    axios.get(`${API_BASE_URL}/rate-search/`, {

      params: query,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      setFilterRate(value.data)
    }).catch((err) => {
     handleErrorsFunc(err);
    })
  }

  // End OF lead Function
  return (
    <DataContext.Provider value={{
      customerObject,
      getCustomerFunction,
      emailSenderPageFunc,
      emailSenderPageObj,
      getCustomerRatePageFunc,
      ratePageObj,
      getTopRouteFunc,
      topRouteTable,
      setTopRouteTable,
      searchPageOptionGetFunc,
      searchPageData,
      getRateSearchFunction,
      filterRate,
      isValidSessionFunc,
      session,
      authHeader,
      getAllUserFunc,
      allUser,
      handleErrorsFunc
    }}>
      {children}
    </DataContext.Provider>
  );
};