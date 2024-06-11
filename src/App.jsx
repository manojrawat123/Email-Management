import { useState } from 'react'
import RateManagmentForm from './pages/ratemanagement/RateManagmentForm'
import { Route, Routes, useLocation } from 'react-router-dom'
import EmailSender from './pages/EmailSender/EmailSender'
import Navbar from './component/Navbar/Navbar'
import AddCustomer from './pages/Customer/AddCustomer/AddCustomer'
import UpdateRate from './pages/ratemanagement/UpdateRate/UpdateRate'
import SearchRoutePage from './pages/TopRoute/SearchRoutePage/SearchRoutePage'
import AddTopRoute from './pages/TopRoute/AddTopRoute/AddTopRoute'
import SearchRatePage from './pages/ratemanagement/SearchRatePage/SearchRatePage'
import DisplayRate from './pages/ratemanagement/DisplayRate/DisplayRate'
import DisplayCustomer from './pages/Customer/ShowCustomer/DisplayCustomer'
import DisplayTopRoutes from './pages/TopRoute/DisplayTopRoute/TopRouteDisplay'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'
import LoginPage from './component/LoginComponent/Login/LoginPage'
import Register from './component/registerComp/Register'
import DisplayUser from './pages/display_user/DisplayUser'
import ResetPassword from './component/LoginComponent/ResetPassword/ResetPassword'
import RouteDeleteUpdate from './pages/TopRoute/RouteDeleteUpdate/RouteDeleteUpdate'

function App() {

  const location = useLocation();

  console.log()

  return (
    <>
     {["/login", "/add"].includes(location.pathname) ? null :  <Navbar />}
      <Routes>

      {/* Un Protected Routes */}
      <Route path='/login' Component={LoginPage} />
      <Route path="/reset-password/:userid_encode/:verify_token/" Component={ResetPassword} />

      <Route path='' Component={ProtectedRoutes}>
        <Route path='/register' Component={Register}/>
      </ Route >
      <Route path='' Component={ProtectedRoutes}>
        <Route path='/manage-user' Component={DisplayUser}/>
      </ Route >


       
        {/* Protected Routes  */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addrate' Component={RateManagmentForm} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/emailsender' Component={EmailSender} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addcustomer' Component={AddCustomer} />
        </Route>
        <Route path='' Component={ProtectedRoutes}>
          <Route path='' Component={AddCustomer} />
        </Route>
        {/* <Route path='/showcustomer' Component={ShowCustomer}/> */}

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/showcustomer' Component={DisplayCustomer} />
        </Route>

        {/* Route Management */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addtoproute' Component={AddTopRoute} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/search-route' Component={SearchRoutePage} />
        </Route>
        {/* <Route path='/route' Component={MainTopRouteDis} /> */}

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/route' Component={DisplayTopRoutes} />
        </Route>
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/route-update-delete' Component={RouteDeleteUpdate} />
        </Route>

        {/* Rate Management */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/search-rate' Component={SearchRatePage} />

        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/updaterate' Component={UpdateRate} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/rate' Component={DisplayRate} />
        </Route>

      </Routes>
    </>
  )
}

export default App
