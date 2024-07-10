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

  let ex_url_routes = [];
  let start_url_routes = ['/change-password'];
  session?.navbar?.forEach((element, index) => {
    element?.option?.forEach((el) => {
      if (el.link == "/addcustomer"){
        ex_url_routes.push("/");
      }
      if (el.link == "/manage-user") {
        start_url_routes.push("/navbar-access");
      }
      if (el.link == "/search-invoice"){
        start_url_routes.push("/display-invoice");
      }
      if (el.link == "/search-dispute"){
        start_url_routes.push("/display-dispute");
      }
      if (el.link == "/search-payment"){
        start_url_routes.push("/display-payment");
      }
      if (el.link == "/search-ip"){
        start_url_routes.push("/display-ip");
      }
      if (el.link == "/search-route"){
        start_url_routes.push("/display-route");
      }
      if (el.link == "/search-rate"){
        start_url_routes.push("/display-rate");
      }
      if (el.link == "/search-vendor-rate"){
        start_url_routes.push("/display-vendor-rate");
      }
      if (el.link == "/search-vendor-rate-country"){
        start_url_routes.push("/display-vendor-rate-country");
      }
      if (el.link == "/search-vendor-target-sheet"){
        start_url_routes.push("/display-vendor-target-sheet");
      }
      if (el.link == "/search-vendor-target-sheet-country_code"){
        start_url_routes.push("/display-vendor-target-sheet");
      }
      ex_url_routes.push(el.link);
      start_url_routes.push(el.link);
    })
  });

  return (
    ex_url_routes.includes(location.pathname) || start_url_routes.some((el) => location.pathname.startsWith(el)) ? <Outlet /> : <Unauthorized />
  )
}

export default ProtectedRoutes
