import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context';
import Loading from '../LoadingSpinner/LoadingSpinner';
import LoginPage from '../LoginComponent/Login/LoginPage';

const ProtectedRoutes = () => {

  const navigate = useNavigate();

  const { isValidSessionFunc, session } = useContext(DataContext);
  const token = Cookies.get("token");

  useEffect(() => {
    isValidSessionFunc();
  }, []);

  if (!token) {
    navigate("/login");
  }

  return (
      <Outlet /> 
  )
}

export default ProtectedRoutes
