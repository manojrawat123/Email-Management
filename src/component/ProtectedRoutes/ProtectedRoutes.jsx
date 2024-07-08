import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context';
import Loading from '../LoadingSpinner/LoadingSpinner';
import LoginPage from '../LoginComponent/Login/LoginPage';
import Unauthorized from '../UnauthPage/UnauthPage';

const ProtectedRoutes = () => {

  const navigate = useNavigate();

  const { isValidSessionFunc, session } = useContext(DataContext);
  const token = Cookies.get("token");
  const location = useLocation();

  useEffect(() => {
    isValidSessionFunc();
  }, []);

  if (!token || !session) {
    if (!token) {
      navigate('/login');
    }
    if (!session) {
      return <Loading />
    }
  }
  console.log(session);

  let ex_url_routes = [];
  let start_url_routes = [];
  session?.navbar?.forEach((element, index) => {
    element?.option?.forEach((el) => {
      if (el.link == "/addcustomer"){
        ex_url_routes.push("/");
      }
      if (el.link == "/manage-user") {
        
        start_url_routes.push("/navbar-access");
      }
      ex_url_routes.push(el.link);
      start_url_routes.push(el.link);
    })
  })



  return (
    ex_url_routes.includes(location.pathname) || start_url_routes.some((el) => location.pathname.startsWith(el)) ? <Outlet /> : <Unauthorized />
  )
}

export default ProtectedRoutes
