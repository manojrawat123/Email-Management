import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [customerObject, setCustomerObjectList] = useState();
  const [activeCustomerObject, setActiveCustomerObject] = useState();
  const [ratePageObj, setRatePageObj] = useState();
  const [emailSenderPageObj, setEmailSenderPageObj] = useState();
  const [topRouteTable, setTopRouteTable] = useState();
  const [searchPageData, setSearchPageData] = useState();
  const [filterRate, setFilterRate] = useState();
  const [session, setSession] = useState();
  const [token, setToken] = useState(Cookies.get("token"));
  const [allUser, setAllUser] = useState();
  const [invoiceObj, setInvoiceObj] = useState();
  const [disputePageObj, setDisputePageObj] = useState();
  const [disputeObj, setDisputeObj] = useState();
  const [paymentObj, setPaymentObj] = useState();
  const [countryCode, setCountryCode] = useState();
  const [statementOfAmount ,setStatementOfAmount] = useState();

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

  const commonGetParamsApi = (route,query, setParamsData) => {
    const token = Cookies.get("token");
    axios.get(`${API_BASE_URL}/${route}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params : query
    }).then((value) => {
      console.log(value.data);
      setParamsData(value.data);
    }).catch((err) => {
      console.log(err);
     handleErrorsFunc(err);
    });
  }

  const isValidSessionFunc = async (is_login = null, c_token = null) => {
    setSession();
    setToken(Cookies.get("token"));
    axios.get(`${API_BASE_URL}/session/`, {
      headers: {
        Authorization: `Bearer ${c_token ? c_token : token}`,
      },
    }).then((value) => {
      setSession(value.data);
      if (value.data.session != true) {
        Cookies.remove("token");
        navigate("/login");
      }
      if (is_login != null) {
        navigate("/");
      }
    }).catch((err) => {
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
    setTopRouteTable();
    axios.get(`${API_BASE_URL}/toproute/`, {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      setTopRouteTable(value.data);
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
        setSearchPageData(value.data);
      }
      // setSearchPageData(value.data);
    }).catch((err) => {
      handleErrorsFunc(err);
      setSearchPageData([]);
    });
  }

  const getCustomerFunction = () => {
    const token = Cookies.get("token");
    axios.get(`${API_BASE_URL}/customer/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((value) => {
      setCustomerObjectList(value.data);
      const active_user = value.data.filter((element) => element.active)
      setActiveCustomerObject(active_user);
    }).catch((err) => {
     handleErrorsFunc(err);
    });
  }

  const logoutFunc = ()=>{
    Cookies.remove("token");
    navigate("/login");
  }

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


  const getAllInvoiceFunc = (query)=>{
    commonGetParamsApi('getinvoices', query,setInvoiceObj);
  }

  const getAllPaymentsFunc = (query)=>{
    commonGetParamsApi('payment', query , setPaymentObj);
  }


  const getDisputePageFunc = ()=>{
      commonGetParamsApi('dispute', {page : true}, setDisputePageObj);
  }


  const getDisputeSearchFunc = (query)=>{
      commonGetParamsApi('dispute', query, setDisputeObj);
  }

  const getCountryCodeFunc = ()=>{
    commonGetApi('countrycode', setCountryCode);
  }

  const getCustomerStatmentOfAccount = ()=>{
    commonGetApi('statementofamount', setStatementOfAmount);
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
      handleErrorsFunc,
      logoutFunc,
      getAllInvoiceFunc,
      invoiceObj,
      getDisputePageFunc,
      disputePageObj,
      getDisputeSearchFunc,
      disputeObj,   
      activeCustomerObject  ,
      getAllPaymentsFunc,
      paymentObj ,
      countryCode,
      getCountryCodeFunc,
      getCustomerStatmentOfAccount,
      statementOfAmount
    }}>
      {children}
    </DataContext.Provider>
  );
};